import React, { Component } from "react";
import "./TodoApp.css";
import { TodoList } from "./TodoList";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { Card } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import moment from "moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "", priority: 0, dueDate: moment() };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App">

        <br />
        <br />

        <form onSubmit={this.handleSubmit} className="todo-form">
          <h3>New TODO</h3>
          <Card>
            <CardContent>
              <label htmlFor="text" className="right-margin">
                Text:
              </label>

              <TextField
                id="text"
                onChange={this.handleTextChange}
                value={this.state.text}
              ></TextField>

              <br />
              <br />
              <label htmlFor="priority" className="right-margin">
                Priority:
              </label>

              <TextField
                id="priority"
                type="number"
                onChange={this.handlePriorityChange}
                value={this.state.priority}
              ></TextField>
              <br />
              <br />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  value={this.state.dueDate}
                  onChange={this.handleDateChange}
                  format="dd/MM/yyyy"
                />
              </MuiPickersUtilsProvider>

              <br />
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button size="large" color="secondary" type="submit">
                Add #{this.state.items.length + 1}
              </Button>
            </CardActions>
          </Card>
        </form>

        <br />
        <br />

        <TodoList todoList={this.state.items} />
      </div>
    );
  }
  

  handleTextChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  handlePriorityChange(e) {
    this.setState({
      priority: e.target.value,
    });
  }

  handleDateChange(date) {
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    console.log(date);
    this.setState({
      dueDate: new Date(date).toLocaleDateString("en-US",options),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (
      !this.state.text.length ||
      !this.state.priority.length ||
      !this.state.dueDate
    )
      return;

    const newItem = {
      text: this.state.text,
      priority: this.state.priority,
      dueDate: new Date(this.state.dueDate),
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: "",
      priority: "",
      dueDate: null,
    }));
  }
}

export default TodoApp;
