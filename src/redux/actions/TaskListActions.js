import { add_task, delete_task, update_task } from "../types/TaskListTypes";

export const addTaskAction = (newTask) => ({
  type: add_task,
  newTask,
});
// export const updateTaskAction = (taskId) => ({
//   type: update_task,
//   taskId,
// });
// export const deleteTaskAction = (taskId) => ({
//   type: delete_task,
//   taskId,
// });
