import * as React from "react";
import "./searchInput.scss";
import search from "../../assets/search.svg";
import close from "../../assets/close.svg";

export class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }
  state = {
    showSearch: false,
    searchString: this.props.searchString,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleSearch = (elem) => {
    this.setState({ searchString: elem.target.value }, () =>
      this.props.handleSearch(this.state.searchString)
    );
  };

  handleCancelSearch = () => {
    this.setState({ showSearch: false, searchString: "" }, () =>
      this.props.handleCancelSearch()
    );
  };

  enableSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { id } = this.props;
    this.setState({ showSearch: true }, () => {
      if (id) {
        document.getElementById(id).focus();
      }
    });
  };

  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.handleCancelSearch();
    }
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef?.current?.contains(event.target)) {
      this.handleCancelSearch();
    }
  };
  render() {
    const { showSearch, searchString } = this.state;
    const { searchPlaceholder, id } = this.props;
    return (
      <section className="searchbar-section">
        {showSearch ? (
          <div className="input-group" ref={this.wrapperRef}>
            <input
              type="text"
              className="search-input"
              id={id}
              placeholder={searchPlaceholder}
              value={searchString}
              onChange={this.handleSearch}
              onKeyDown={this.onKeyDown}
              autoFocus
            />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                <img
                  className="close-icon"
                  src={close}
                  alt="close"
                  onClick={this.handleCancelSearch}
                />
              </span>
            </div>
          </div>
        ) : (
          <img
            className="search-icon"
            src={search}
            alt="search"
            onClick={this.enableSearch}
          />
        )}
        {searchString.length ? (
          <div className="search-input-list">{this.props.children}</div>
        ) : (
          ""
        )}
      </section>
    );
  }
}
