import { NextResponse } from 'next/server';
import { institutionsService } from '@/lib/appwrite/services';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const institution = await institutionsService.getInstitutionById(params.id);
    return NextResponse.json(institution);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch institution' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updatedInstitution = await institutionsService.updateInstitution(params.id, body);
    return NextResponse.json(updatedInstitution);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update institution' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await institutionsService.deleteInstitution(params.id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete institution' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
