import { NextResponse } from 'next/server';
import { usersService } from '@/lib/appwrite/services';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await usersService.getUserById(params.id);
    return NextResponse.json(user);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedUser = await usersService.updateUser(params.id, body);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await usersService.deleteUser(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
