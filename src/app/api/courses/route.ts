import { NextResponse } from 'next/server';
import { coursesService } from '@/lib/appwrite/services';

export async function GET() {
  try {
    const courses = await coursesService.getCourses();
    return NextResponse.json(courses);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch courses' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ['title','description','institution_id','creator_id'];
    for (const key of required) {
      if (!body[key]) {
        return new Response(JSON.stringify({ error: `${key} is required` }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    const course = await coursesService.createCourse(body);
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create course' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
