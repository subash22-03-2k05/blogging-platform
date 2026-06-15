import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'

const DATA_PATH = path.join(process.cwd(), 'data', 'users.json')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, username, email, password } = body
    if (!email || !password || !username || !fullName) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const raw = await readFile(DATA_PATH, 'utf-8')
    const users = JSON.parse(raw || '[]')
    if (users.find((u: any) => u.email === email || u.username === username)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = {
      id: String(Date.now()),
      full_name: fullName,
      username,
      email,
      password_hash: hashed,
      role: 'user',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    users.push(user)
    await writeFile(DATA_PATH, JSON.stringify(users, null, 2), 'utf-8')

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, username: user.username } })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
