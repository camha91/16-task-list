import React, { Component } from "react";
import { Container } from "./Container.js";
import { ThemeProvider } from "styled-components";
import { TaskListDarkTheme } from "../Themes/TaskListDarkTheme";
import { TaskListLightTheme } from "../Themes/TaskListLightTheme";
import { TaskListDefaultTheme } from "../Themes/TaskListDefaultTheme";

class TaskList extends Component {
  render() {
    return (
      <ThemeProvider theme={TaskListLightTheme}>
        <Container>Task List</Container>
      </ThemeProvider>
    );
  }
}

export default TaskList;
