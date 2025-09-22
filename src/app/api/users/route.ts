import { NextResponse } from 'next/server';
import { usersService } from '@/lib/appwrite/services';

export async function GET() {
  try {
    const users = await usersService.getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
