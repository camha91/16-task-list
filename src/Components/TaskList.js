import React, { Component } from "react";
import { Container } from "./Container.js";
import { ThemeProvider } from "styled-components";
import { TaskListDarkTheme } from "../Themes/TaskListDarkTheme";
import { TaskListLightTheme } from "../Themes/TaskListLightTheme";
import { TaskListDefaultTheme } from "../Themes/TaskListDefaultTheme";
import { Dropdown } from "./Dropdown.js";
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from "./Heading.js";
import { TextField } from "./TextField.js";
import { Button } from "./Button.js";
import { Table, Thead, Tbody, Tr, Td, Th } from "./Table.js";

import { connect } from "react-redux";

class TaskList extends Component {
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-2">
                <i className="fa fa-edit"></i>
              </Button>
              <Button className="ml-2">
                <i className="fa fa-check"></i>
              </Button>
              <Button className="ml-2">
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button className="ml-2">
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  render() {
    return (
      <ThemeProvider onChange={() => {}} theme={this.props.themeTaskList}>
        <Container className="w-50">
          <Dropdown>
            <option>Dark Theme</option>
            <option>Light Theme</option>
            <option>Default Theme</option>
          </Dropdown>
          <Heading3>Task To Do</Heading3>
          <TextField label="Task name" className="w-50" />
          <Button className="ml-2">
            <i className="fa fa-plus">Add Task</i>
          </Button>
          <Button className="ml-2">
            <i className="fa fa-upload">Update Task</i>
          </Button>
          <br />
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>

          <Heading3>Task Completed</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    themeTaskList: state.TaskListReducer.themeTaskList,
    taskList: state.TaskListReducer.taskList,
  };
};

export default connect(mapStateToProps)(TaskList);
