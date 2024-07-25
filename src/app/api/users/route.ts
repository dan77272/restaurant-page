import { NextResponse } from 'next/server';
import db from '../../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  const { name, username, password, role } = await req.json();

  // Ensure required fields are present
  if (!name || !username || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const result = await db.query(
      'INSERT INTO users (name, username, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, username, hashedPassword, role || 'user']
    );

    const user = result.rows[0];
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
  }
}

