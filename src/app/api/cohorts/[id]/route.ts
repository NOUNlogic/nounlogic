import { NextResponse } from 'next/server';
import { cohortsService } from '@/lib/appwrite/services';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const cohort = await cohortsService.getCohortById(params.id);
    return NextResponse.json(cohort);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch cohort' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedCohort = await cohortsService.updateCohort(params.id, body);
    return NextResponse.json(updatedCohort);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update cohort' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await cohortsService.deleteCohort(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete cohort' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
