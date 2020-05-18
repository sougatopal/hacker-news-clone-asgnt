import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import { fetchNews, hide, upVote } from "./actions";
import Header from "../src/components/Header";
import Newsrow from "../src/components/Newsrow";
import { timeDifference, manageHideArray, managePointObj } from "./utils";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.paginationFn = this.paginationFn.bind(this);
    this.upVote = this.upVote.bind(this);
    this.hide = this.hide.bind(this);
  }
  componentDidMount() {
    this.props.fetchNews();
  }

  filterforVotes(arr) {
    let pointJson = managePointObj();
    for (let i = 0; i < arr.length; i++) {
      if (pointJson[arr[i].objectID]) {
        arr[i].points = pointJson[arr[i].objectID];
      }
    }
    return arr;
  }

  filterforHiddenValues(arr) {
    let hiddenArr = manageHideArray();
    let arrtobeReturned = arr.filter(elem => {
      return !hiddenArr.includes(elem.objectID);
    });
    return arrtobeReturned;
  }
  paginationFn(side) {
    console.log(side);
    if (side === "next") {
      let curPage = this.props.curPages;
      this.props.fetchNews(curPage + 1);
    }
    if (side === "prev") {
      let curPage = this.props.curPages;
      this.props.fetchNews(curPage - 1);
    }
  }
  upVote(obj) {
    this.props.upVote(obj);
  }

  hide(obj) {
    this.props.hide(obj);
  }
  getDaysAgo(dt) {
    let cDate = new Date();
    let prevDate = new Date(dt);
    return timeDifference(cDate, prevDate);
  }
  render() {
    console.log("props", this.props);
    const { hits = [], curPages = 0, totPage = 0 } = this.props;
    return (
      <div className="App">
        <Header />
        <div className="news-wrapper-container">
          {hits.map((elem, index) => {
            return (
              <Newsrow
                key={elem.objectID}
                elem={elem}
                hide={this.hide}
                getDaysAgo={this.getDaysAgo}
                upVote={this.upVote}
              />
            );
          })}
        </div>
        <footer className="footer">
          {curPages !== 0 ? (
            <button
              className="pagination-bt"
              onClick={e => this.paginationFn("prev")}
            >
              prev
            </button>
          ) : (
            ""
          )}
          |
          {curPages !== totPage ? (
            <button
              className="pagination-bt"
              onClick={e => this.paginationFn("next")}
            >
              next
            </button>
          ) : (
            ""
          )}
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hits: state.data.hits,
    curPages: state.data.curPages,
    totPage: state.data.totPage
  };
};

export default connect(
  mapStateToProps,
  { fetchNews, hide, upVote }
)(App);
