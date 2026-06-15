# Database Schema Documentation

## Overview
This document outlines the complete database structure for the Blogging Platform built with MySQL and Next.js.

## Database Connection
```
Database Type: MySQL
Connection: Provided via environment variables
Driver: mysql2 or similar Node.js MySQL driver
```

## Tables

### 1. users
Stores user account information and authentication data.

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  full_name VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  role ENUM('user', 'author', 'admin') DEFAULT 'user',
  status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_username (username),
  INDEX idx_status (status)
);
```

### 2. posts
Stores blog post content and metadata.

```sql
CREATE TABLE posts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  featured_image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  author_id VARCHAR(36) NOT NULL,
  status ENUM('draft', 'published', 'scheduled') DEFAULT 'draft',
  seo_title VARCHAR(255),
  seo_description VARCHAR(500),
  views INT DEFAULT 0,
  reading_time INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,
  
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_slug (slug),
  INDEX idx_author (author_id),
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at)
);
```

### 3. post_tags
Junction table for posts and tags (many-to-many relationship).

```sql
CREATE TABLE post_tags (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  post_id VARCHAR(36) NOT NULL,
  tag VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_tag (post_id, tag),
  INDEX idx_tag (tag)
);
```

### 4. categories
Stores blog categories.

```sql
CREATE TABLE categories (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_slug (slug)
);
```

### 5. comments
Stores user comments on posts.

```sql
CREATE TABLE comments (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  post_id VARCHAR(36) NOT NULL,
  content TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  INDEX idx_post (post_id),
  INDEX idx_user (user_id),
  INDEX idx_status (status)
);
```

### 6. bookmarks
Stores user bookmarked articles.

```sql
CREATE TABLE bookmarks (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  post_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE KEY unique_bookmark (user_id, post_id),
  INDEX idx_user (user_id),
  INDEX idx_post (post_id)
);
```

### 7. newsletters
Stores newsletter subscriptions.

```sql
CREATE TABLE newsletters (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE,
  
  INDEX idx_email (email),
  INDEX idx_active (is_active)
);
```

### 8. reading_history
Tracks user reading history.

```sql
CREATE TABLE reading_history (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  post_id VARCHAR(36) NOT NULL,
  read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_spent INT,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_post (post_id)
);
```

### 9. analytics
Stores analytics data for posts and site traffic.

```sql
CREATE TABLE analytics (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  post_id VARCHAR(36),
  page_path VARCHAR(255),
  user_agent TEXT,
  ip_address VARCHAR(50),
  referrer VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE SET NULL,
  INDEX idx_post (post_id),
  INDEX idx_created_at (created_at),
  INDEX idx_ip (ip_address)
);
```

### 10. social_profiles
Stores user social media profiles.

```sql
CREATE TABLE social_profiles (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL UNIQUE,
  twitter VARCHAR(255),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Relationships

```
users (1) ─── (many) posts
users (1) ─── (many) comments
users (1) ─── (many) bookmarks
users (1) ─── (many) reading_history
users (1) ─── (1) social_profiles

posts (1) ─── (many) comments
posts (1) ─── (many) bookmarks
posts (1) ─── (many) post_tags
posts (1) ─── (many) reading_history
posts (1) ─── (many) analytics

categories (1) ─── (many) posts
```

## Indexes Strategy

- **Primary Keys**: All tables use UUID for global uniqueness
- **Foreign Keys**: Indexed for fast joins
- **Unique Constraints**: On frequently searched fields (email, username, slug)
- **Composite Indexes**: For common query patterns

## SQL Setup Script

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS blogging_platform;
USE blogging_platform;

-- Run all CREATE TABLE statements above
-- Set character encoding
ALTER DATABASE blogging_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Environment Configuration

Add these to your `.env.local`:

```
DATABASE_URL=mysql://user:password@localhost:3306/blogging_platform
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=blogging_platform
```

## Performance Considerations

1. **Partitioning**: Consider partitioning `analytics` and `reading_history` by date
2. **Archiving**: Archive old analytics data regularly
3. **Replication**: Set up MySQL replication for backup
4. **Backups**: Daily backups recommended
5. **Query Optimization**: Monitor slow queries with MySQL slow query log
