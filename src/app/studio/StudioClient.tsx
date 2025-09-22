'use client';

import React, { useState } from 'react';
import { withAuth } from '@/lib/appwrite/auth-context';
import { usePermissions } from '@/lib/appwrite/auth-context';
import { ROLES } from '@/lib/roles';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const initialModules = [
  { id: 'module-1', title: 'Module 1', lessons: [{ id: 'lesson-1-1', title: 'Lesson 1.1' }, { id: 'lesson-1-2', title: 'Lesson 1.2' }] },
  { id: 'module-2', title: 'Module 2', lessons: [{ id: 'lesson-2-1', title: 'Lesson 2.1' }] },
];

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const StudioClient = () => {
  const { hasRole } = usePermissions();
  const [modules, setModules] = useState(initialModules);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setModules((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  if (!hasRole(ROLES.INSTRUCTOR) && !hasRole(ROLES.ADMIN)) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div>
      <h1>Studio Dashboard</h1>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
          {modules.map(module => (
            <SortableItem key={module.id} id={module.id}>
              <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                <h3>{module.title}</h3>
                <ul>
                  {module.lessons.map(lesson => (
                    <li key={lesson.id}>{lesson.title}</li>
                  ))}
                </ul>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default withAuth(StudioClient);
