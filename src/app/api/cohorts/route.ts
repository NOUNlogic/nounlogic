import { NextResponse } from 'next/server';
import { cohortsService } from '@/lib/appwrite/services';

export async function GET() {
  try {
    const cohorts = await cohortsService.listCohorts();
    return NextResponse.json(cohorts);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch cohorts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCohort = await cohortsService.createCohort(body);
    return NextResponse.json(newCohort);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create cohort' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
