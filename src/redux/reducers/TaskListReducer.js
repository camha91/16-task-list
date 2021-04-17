import { TaskListDarkTheme } from "../../Themes/TaskListDarkTheme";
import {
  add_task,
  change_theme,
  complete_task,
  delete_task,
  edit_task,
  update_task,
} from "../types/TaskListTypes";
import { arrTheme } from "../../Themes/ThemeManager";

const initialState = {
  themeTaskList: TaskListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "task 1", done: true },
    { id: "task-2", taskName: "task 2", done: false },
    { id: "task-3", taskName: "task 3", done: true },
    { id: "task-4", taskName: "task 4", done: false },
  ],
  taskEdit: { id: "-1", taskName: "", done: false },
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
    case complete_task: {
      const taskListUpdate = [...state.taskList];
      const index = taskListUpdate.findIndex(
        (task) => task.id === action.taskId
      );

      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      return { ...state, taskList: taskListUpdate };
    }
    case delete_task: {
      // let taskListUpdate = [...state.taskList];
      // Method 1: Delete using splice function
      // const index = taskListUpdate.findIndex(
      //   (task) => task.id === action.taskId
      // );
      // if (index !== -1) {
      //   taskListUpdate.splice(index, 1);
      // }

      // Method 2: Delete using filter function
      // Get the new list without the task that match the action.taskId
      // taskListUpdate = taskListUpdate.filter(
      //   (task) => task.id !== action.taskId
      // );

      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }
    case edit_task: {
      return { ...state, taskEdit: action.task };
    }
    case update_task: {
      // Edit taskName of taskEdit
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      // Find the id in taskList that match with the id from user to edit

      const taskListUpdate = [...state.taskList];
      const index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );

      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }

      state.taskList = taskListUpdate;
      state.taskEdit = { id: "-1", taskName: "", done: false };

      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default TaskListReducer;
