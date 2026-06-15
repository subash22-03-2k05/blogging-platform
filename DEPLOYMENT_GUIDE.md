# Deployment Guide

## Overview

This guide covers deploying the Blogging Platform to various hosting providers.

## Pre-Deployment Checklist

- [ ] Update `.env` variables for production
- [ ] Set strong `NEXTAUTH_SECRET` and `JWT_SECRET`
- [ ] Configure database backups
- [ ] Set up SSL certificate
- [ ] Configure CDN for assets
- [ ] Set up email service (SendGrid, etc.)
- [ ] Configure reCAPTCHA
- [ ] Test all features in staging
- [ ] Verify Lighthouse scores
- [ ] Set up monitoring and logging

## Deployment Options

### 1. Vercel (Recommended)

**Pros**: Automatic scaling, serverless, built for Next.js

**Steps**:
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
# Manual deployment
npm install -g vercel
vercel --prod
```

### 2. VPS (Hostinger, DigitalOcean, Linode)

**Prerequisites**:
- Ubuntu 22.04 LTS
- Node.js 18+
- MySQL 8.0+
- PM2 or similar process manager

**Steps**:

1. SSH into server
```bash
ssh root@your_server_ip
```

2. Install dependencies
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install MySQL
apt install -y mysql-server

# Install PM2
npm install -g pm2
```

3. Clone repository
```bash
cd /var/www
git clone https://github.com/subash22-03-2k05/blogging_page.git
cd blogging_page
```

4. Install dependencies
```bash
npm install
npm run build
```

5. Configure environment
```bash
nano .env.local
# Add all required environment variables
```

6. Setup database
```bash
mysql -u root -p < DATABASE_SCHEMA.md
```

7. Start with PM2
```bash
pm2 start npm --name blogging-app -- start
pm2 save
pm2 startup
```

8. Configure Nginx reverse proxy
```bash
apt install -y nginx
```

Create `/etc/nginx/sites-available/blogging`:
```nginx
upstream nodejs {
  server 127.0.0.1:3000;
}

server {
  listen 80;
  server_name your_domain.com;

  location / {
    proxy_pass http://nodejs;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/blogging /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

9. Setup SSL with Let's Encrypt
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your_domain.com
```

### 3. Cloudways (Managed VPS)

**Steps**:
1. Create account at cloudways.com
2. Create new server (PHP Stack)
3. SSH into server
4. Follow VPS deployment steps above
5. Use Cloudways dashboard for backups and monitoring

### 4. cPanel Hosting

**Prerequisites**:
- cPanel with Node.js support
- MySQL database
- File manager access

**Steps**:
1. Create Node.js application in cPanel
2. Upload project files via File Manager or SSH
3. Run npm install
4. Configure environment variables
5. Set start script to `npm start`
6. Configure SSL certificate

## Production Configuration

### Environment Variables

```env
NODE_ENV=production
NEXTAUTH_SECRET=your-very-secure-secret
JWT_SECRET=your-jwt-secret
DATABASE_URL=mysql://user:pass@host:3306/blogging_platform
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
SENDGRID_API_KEY=your-sendgrid-key
```

### Database Backup

Set up daily automated backups:

```bash
# Create backup script
cat > /usr/local/bin/backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u user -p'password' blogging_platform > $BACKUP_DIR/backup_$DATE.sql
gzip $BACKUP_DIR/backup_$DATE.sql
# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
EOF

chmod +x /usr/local/bin/backup-db.sh

# Add to crontab for daily 2 AM backup
crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-db.sh
```

### Monitoring & Logging

1. **PM2 Monitoring**
```bash
pm2 monit
pm2 logs
```

2. **Server Monitoring**
```bash
# Install htop
apt install -y htop
htop
```

3. **Application Monitoring**
```bash
# Install New Relic agent (optional)
npm install newrelic
```

### Performance Optimization

1. **Enable Gzip Compression** (Nginx)
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

2. **Configure Cache Headers**
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
  expires 30d;
  add_header Cache-Control "public, immutable";
}
```

3. **Setup CDN**
- Configure Cloudflare for caching and DDoS protection
- Set up image CDN (Cloudinary, Imgix)

## Monitoring Checklist

- [ ] Server CPU and memory usage
- [ ] Database connection pool
- [ ] Application error logs
- [ ] API response times
- [ ] Visitor analytics
- [ ] Email delivery status
- [ ] SSL certificate expiration
- [ ] Disk space usage
- [ ] Backup integrity
- [ ] Security updates

## Troubleshooting

### Application won't start
```bash
pm2 logs
npm run build
npm start
```

### Database connection errors
```bash
# Check MySQL is running
systemctl status mysql
mysql -u user -p -e "SELECT 1;"
```

### High memory usage
```bash
pm2 kill
pm2 start npm --name blogging-app -- start
```

### SSL certificate issues
```bash
certbot renew --dry-run
systemctl restart nginx
```

## Security Hardening

1. **Firewall Rules**
```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

2. **SSH Security**
- Disable root login
- Use key-based authentication
- Change default SSH port

3. **Database Security**
- Create strong passwords
- Use separate database user for app
- Restrict database access to localhost

4. **Application Security**
- Keep dependencies updated: `npm audit`
- Use environment variables for secrets
- Enable HTTPS only
- Set security headers

## Scaling Considerations

- **Load Balancing**: Use Nginx as reverse proxy
- **Database Replication**: Setup MySQL master-slave
- **Caching Layer**: Add Redis for session/query cache
- **Static Asset CDN**: Distribute images globally
- **Auto-scaling**: Use container orchestration (Kubernetes)

## Support

For deployment issues, contact your hosting provider or check:
- Next.js deployment docs: https://nextjs.org/docs/deployment
- PM2 documentation: https://pm2.keymetrics.io/
- Nginx documentation: https://nginx.org/en/docs/
