import { NextResponse } from 'next/server';
import { coursesService } from '@/lib/appwrite/services';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const course = await coursesService.getCourseById(params.id);
    return NextResponse.json(course);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch course' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
