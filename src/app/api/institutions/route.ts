import { NextResponse } from 'next/server';
import { institutionsService } from '@/lib/appwrite/services';

export async function GET() {
  try {
    const institutions = await institutionsService.getInstitutions();
    return NextResponse.json(institutions);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch institutions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
