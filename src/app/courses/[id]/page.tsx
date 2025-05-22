// filepath: /home/nathfavour/Documents/code/nounlogic/nounlogic/src/app/courses/[id]/page.tsx
import CourseDetailClient from "./pageClient";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return <CourseDetailClient id={params.id} />;
}