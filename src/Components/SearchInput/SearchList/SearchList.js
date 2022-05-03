import * as React from "react";
import "./searchList.scss";

export const SearchList = (props) => {
  const { lists, cards } = props;
  console.log(lists, cards);
  return (
    <section className="searchlist-section">
      <div className="searchlist-list-list">
        <div className="searchList-title">List</div>
        {lists.length ? (
          lists.map((item) => {
            return (
              <div className="searched-list">
                <a href={`#${item.id}`}>{item.title}</a>
                <div className="list-card"></div>
              </div>
            );
          })
        ) : (
          <div className="no-result-found">No result Found!</div>
        )}
      </div>
      <div className="searchlist-list-card">
        <div className="searchList-title">Cards</div>
        {cards.length ? (
          <div className="searched-cards-wrapper">
            {cards.map((item) => {
              return (
                <div className="searched-cards">
                  <a href={`#${item.taskId}`}>{item.title}</a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-result-found">No result Found!</div>
        )}
      </div>
    </section>
  );
};
