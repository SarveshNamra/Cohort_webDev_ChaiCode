export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}

export const AvailableUserRole = Object.values(UserRolesEnum);

/* The AvailableUserRole is an array of strings.

1.  UserRolesEnum is an object where each key is a string (like ADMIN, PROJECT_ADMIN, MEMBER) 
    and each value is also a string (e.g., "admin", "project_admin", "member").

2.  Object.values(UserRolesEnum) returns an array of the values from the UserRolesEnum object, which are all strings. */

export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done",
};

export const AvailableTaskStatuses = Object.values(TaskStatusEnum);