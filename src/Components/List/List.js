import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import AddTask from "../AddTask/AddTask";
import "./list.scss";

export default class List extends React.Component {
  render() {
    let { cards } = this.props;
    const taskCards = cards.map((card, index) => {
      return (
        <div key={index}>
          <TaskCard {...card} onDragStart={this.props.onDragStart} />
        </div>
      );
    });
    return (
      <div className="list">
        <div className="list-header">
          <div className="list-name">{this.props.title}</div>
        </div>
        <div onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
          {taskCards}
          <AddTask formNum={this.props.id} onAdd={this.props.onAdd} />
        </div>
      </div>
    );
  }
}
