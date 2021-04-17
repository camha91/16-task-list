import React, { Component } from "react";
import { Container } from "./Components/Container.js";
import { ThemeProvider } from "styled-components";
import { Dropdown } from "./Components/Dropdown.js";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "./Components/Heading.js";
import { TextField } from "./Components/TextField.js";
import { Button } from "./Components/Button.js";
import { Table, Thead, Tbody, Tr, Td, Th } from "./Components/Table.js";

import { connect } from "react-redux";
import {
  addTaskAction,
  changeThemeAction,
  completeTaskAction,
  deleteTaskAction,
  editTaskAction,
  updateTaskAction,
} from "../redux/actions/TaskListActions.js";
import { arrTheme } from "../Themes/ThemeManager";

class TaskList extends Component {
  state = { taskName: "", disabled: true };

  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
                }}
                className="ml-2"
              >
                <i className="fa fa-edit"></i>
              </Button>

              <Button
                onClick={() => {
                  this.props.dispatch(completeTaskAction(task.id));
                }}
                className="ml-2"
              >
                <i className="fa fa-check"></i>
              </Button>

              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className="ml-2"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th style={{ verticalAlign: "middle" }}>{task.taskName}</Th>
            <Th className="text-right">
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
                className="ml-2"
              >
                <i className="fa fa-trash"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };

  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.props.themeTaskList}>
        <Container className="w-50 mt-5">
          <Dropdown
            onChange={(e) => {
              const { value } = e.target;

              // Dispatch value to reducer
              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3>Task To Do</Heading3>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState({
                taskName: e.target.value,
              });
            }}
            label="Task name"
            className="w-50"
          />
          <Button
            onClick={() => {
              // Get data from user input
              const { taskName } = this.state;

              // Create 1 task object
              const newTask = {
                id: Date.now(),
                taskName,
                done: false,
              };

              // Dispatch action to redux to add task
              this.props.dispatch(addTaskAction(newTask));
            }}
            className="ml-2"
          >
            <i className="fa fa-plus">Add Task</i>
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => {
                this.props.dispatch(updateTaskAction(this.state.taskName));
              }}
              className="ml-2"
            >
              <i className="fa fa-upload">Update Task</i>
            </Button>
          ) : (
            <Button
              onClick={() => {
                const { taskName } = this.state;
                this.setState(
                  {
                    disabled: true,
                    taskName: "",
                  },
                  () => {
                    this.props.dispatch(updateTaskAction(taskName));
                  }
                );
              }}
              className="ml-2"
            >
              <i className="fa fa-upload">Update Task</i>
            </Button>
          )}

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

  componentDidUpdate(prevProps, prevState) {
    // Compore if prevProps (prev taskEdit differ from current taskEdit then setState will be used)
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => {
  return {
    themeTaskList: state.TaskListReducer.themeTaskList,
    taskList: state.TaskListReducer.taskList,
    taskEdit: state.TaskListReducer.taskEdit,
  };
};

export default connect(mapStateToProps)(TaskList);
