import React from "react";
import "./addTask.scss";

export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const title = this.textInput.value.trim();
    const listNumber = this.props.formNum;
    if (title && this.props.onAdd) {
      this.props.onAdd(title, listNumber);
    }
    this.textInput.value = "";
  }

  setEditing(editing) {
    this.setState({
      editing,
    });
  }

  render() {
    if (!this.state.editing) {
      return (
        <div className="open-add-button" onClick={() => this.setEditing(true)}>
          <div>Add a task!</div>
        </div>
      );
    }
    return (
      <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
        <input
          type="text"
          class="task-input"
          ref={(input) => (this.textInput = input)}
          aria-label="Add a task"
        />
        <div className="action-button">
          <button className="button add-button">Add </button>
          <button
            className="button cancel-button"
            onClick={() => this.setEditing(false)}
          >
            cancel
          </button>
        </div>
      </form>
    );
  }
}
