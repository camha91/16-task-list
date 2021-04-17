import { TaskListDarkTheme } from "../../Themes/TaskListDarkTheme";
import { add_task, change_theme } from "../types/TaskListTypes";
import { arrTheme } from "../../Themes/ThemeManager";

const initialState = {
  themeTaskList: TaskListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "task 1", done: true },
    { id: "task-2", taskName: "task 2", done: false },
    { id: "task-3", taskName: "task 3", done: true },
    { id: "task-4", taskName: "task 4", done: false },
  ],
};

const TaskListReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      if (action.newTask.taskName.trim === "") {
        alert("Task name is required!");
        return { ...state };
      }

      const taskListUpdate = [...state.taskList];
      const index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );

      if (index !== -1) {
        alert("Task name is already exist!");
        return { ...state };
      }

      state.taskList = [...taskListUpdate, action.newTask];

      return { ...state };
    }
    case change_theme: {
      const theme = arrTheme.find((theme) => theme.id == action.themeId);

      if (theme) {
        state.themeTaskList = { ...theme.theme };
      }

      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default TaskListReducer;
