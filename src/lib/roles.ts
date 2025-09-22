export const ROLES = {
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
  STUDENT: 'student',
};

export const PERMISSIONS = {
  // Course permissions
  CREATE_COURSE: 'course:create',
  UPDATE_COURSE: 'course:update',
  DELETE_COURSE: 'course:delete',

  // User permissions
  MANAGE_USERS: 'user:manage',
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.CREATE_COURSE,
    PERMISSIONS.UPDATE_COURSE,
    PERMISSIONS.DELETE_COURSE,
    PERMISSIONS.MANAGE_USERS,
  ],
  [ROLES.INSTRUCTOR]: [
    PERMISSIONS.CREATE_COURSE,
    PERMISSIONS.UPDATE_COURSE,
  ],
  [ROLES.STUDENT]: [],
};
