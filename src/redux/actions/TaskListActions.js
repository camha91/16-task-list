import {
  add_task,
  change_theme,
  complete_task,
  delete_task,
  update_task,
} from "../types/TaskListTypes";

export const addTaskAction = (newTask) => ({
  type: add_task,
  newTask,
});

export const changeThemeAction = (themeId) => ({
  type: change_theme,
  themeId,
});

export const completeTaskAction = (taskId) => ({
  type: complete_task,
  taskId,
});

export const updateTaskAction = (taskId) => ({
  type: update_task,
  taskId,
});

export const deleteTaskAction = (taskId) => ({
  type: delete_task,
  taskId,
});
