import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { appwriteAccount } from '@/lib/appwrite/client';
import { usersService } from '@/lib/appwrite/services';
import { ROLES } from '@/lib/roles';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/admin') || pathname.startsWith('/api/institutions')) {
    try {
      const jwt = request.cookies.get('jwt');
      if (!jwt) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const account = await appwriteAccount.get();
      const user = await usersService.getUserById(account.$id);

      if (!user.roles.includes(ROLES.ADMIN)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return NextResponse.next();
}
