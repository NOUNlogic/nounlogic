import { NextResponse } from 'next/server';
import { coursesService } from '@/lib/appwrite/services';

// Minimal Enrollment API
// POST: create a new enrollment { user_id, course_id }
// GET (optional early): list enrollments for a given user via ?user=ID

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, course_id } = body;

    if (!user_id || !course_id) {
      return new Response(JSON.stringify({ error: 'user_id and course_id are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const enrollment = await coursesService.createEnrollment({ user_id, course_id });
    return NextResponse.json(enrollment);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create enrollment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user');
    if (!userId) {
      return new Response(JSON.stringify({ error: 'user query param required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const enrollments = await coursesService.getUserEnrollments(userId);
    return NextResponse.json(enrollments);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch enrollments' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
