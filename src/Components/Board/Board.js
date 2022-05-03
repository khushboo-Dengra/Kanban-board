import React, { Component } from "react";
import Header from "../Header/Header";
import { SearchInput } from "../SearchInput/SearchInput";
import List from "../List/List";
import { SearchList } from "../SearchInput/SearchList/SearchList";
import "./board.scss";

export default class Board extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("lists")) {
      const rawLS = localStorage.getItem("lists");
      const parsedLS = JSON.parse(rawLS);
      this.state = { lists: parsedLS, searchString: "" };
    } else {
      this.state = {
        searchString: "",
        lists: [
          {
            title: "To Do",
            id: 0,
            cards: [
              {
                title: "Task 1 card 1",
                listNumber: 0,
                taskId: 0,
              },
              {
                title: "Task 1 card 2",
                listNumber: 0,
                taskId: 1,
              },
            ],
          },
          {
            title: "Development",
            id: 1,
            cards: [
              {
                title: "Task 2 card 1",
                listNumber: 1,
                taskId: 2,
              },
              {
                title: "Task 2 card 2",
                listNumber: 1,
                taskId: 3,
              },
            ],
          },
          {
            title: "Testing",
            id: 2,
            cards: [
              {
                title: "Task 3 card 1",
                listNumber: 2,
                taskId: 4,
              },
              {
                title: "Task 3 card 2",
                listNumber: 2,
                taskId: 5,
              },
            ],
          },
          {
            title: "Done",
            id: 3,
            cards: [
              {
                title: "Task 4 card 1",
                listNumber: 3,
                taskId: 6,
              },
              {
                title: "Task 4 card 2",
                listNumber: 3,
                taskId: 7,
              },
            ],
          },
        ],
      };

      localStorage.setItem("lists", JSON.stringify(this.state.lists));
    }
  }

  onDragStart = (e, fromList) => {
    const dragInfo = {
      taskId: e.currentTarget.id,
      fromList: fromList,
    };
    localStorage.setItem("dragInfo", JSON.stringify(dragInfo));
  };

  onDragOver = (e) => {
    e.preventDefault();
  };

  onDrop = (e, listNum) => {
    const droppedTask = localStorage.getItem("dragInfo");
    const rawLS = localStorage.getItem("lists");
    const parsedLS = JSON.parse(rawLS);
    const parsedDragInfo = JSON.parse(droppedTask);

    const cardsArray = parsedLS[parsedDragInfo.fromList].cards;
    let taskCard = cardsArray.find((card) => {
      return card.taskId == parsedDragInfo.taskId;
    });
    const indexOfCard = cardsArray.findIndex(
      (card) => card.taskId == parsedDragInfo.taskId
    );

    parsedLS[parsedDragInfo.fromList].cards.splice(indexOfCard, 1);
    parsedLS[listNum].cards.push({
      ...taskCard,
      listNumber: parseInt(listNum),
    });
    this.setState({
      lists: parsedLS,
    });
    localStorage.setItem("lists", JSON.stringify(parsedLS));
  };

  addTaskCard(title, listNumber) {
    const rawLS = localStorage.getItem("lists");
    const parsedLS = JSON.parse(rawLS);

    const newTask = {
      title,
      listNumber,
      taskId: new Date().valueOf(),
    };

    parsedLS[listNumber].cards.push(newTask);

    this.setState({
      lists: parsedLS,
    });
    localStorage.setItem("lists", JSON.stringify(parsedLS));
  }

  handleCancelSearch = () => {
    this.setState({ searchString: "" });
  };

  handleProjectSearch = (searchString) => {
    this.setState({ searchString });
  };

  findSearchedCards = (searchData, target, accum = []) => {
    target.forEach((f) => {
      if (f.cards) {
        this.findSearchedCards(searchData, f.cards, accum);
      }
      if (f.title.includes(searchData)) {
        accum.push(f);
      }
    });
    return accum;
  };

  renderLists = () => {
    return this.state.lists.map((list, index) => (
      <List
        key={index}
        {...list}
        onAdd={(title, listNumber) => this.addTaskCard(title, listNumber)}
        onDragStart={(e, fromList) => this.onDragStart(e, `${list.id}`)}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e, listNum) => {
          this.onDrop(e, `${list.id}`);
        }}
      />
    ));
  };
  renderHeader = () => {
    let { searchString, lists } = this.state;
    let searchedList = [];
    let searchedCards = [];

    if (searchString.length) {
      searchedList = lists.filter((item) =>
        item.title.toLowerCase().includes(searchString.toLowerCase())
      );
      searchedCards = this.findSearchedCards(searchString, lists);
    }
    return (
      <Header title={"Kanban Board"}>
        <SearchInput
          searchString={searchString}
          searchPlaceholder="Search"
          id="search-list"
          handleCancelSearch={this.handleCancelSearch}
          handleSearch={this.handleProjectSearch}
        >
          <SearchList lists={searchedList} cards={searchedCards} />
        </SearchInput>
      </Header>
    );
  };

  render() {
    return (
      <div className="board">
        {this.renderHeader()}
        <div className="lists-wrapper">{this.renderLists()}</div>
      </div>
    );
  }
}
