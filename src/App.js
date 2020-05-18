import React from "react";
import "./styles.css";
import Header from "../src/components/Header";
import Newsrow from "../src/components/Newsrow";
import { timeDifference, manageHideArray, managePointObj } from "./utils";

const api = "https://hn.algolia.com/api/v1/search?tags=front_page";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      curPages: 0,
      totPage: 0
    };
    this.paginationFn = this.paginationFn.bind(this);
    this.fetchNews = this.fetchNews.bind(this);
    this.upVote = this.upVote.bind(this);
    this.hide = this.hide.bind(this);
  }
  componentDidMount() {
    this.fetchNews();
  }
  fetchNews(pageNo) {
    let url = pageNo ? api + "&page=" + pageNo : api;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let hits = this.filterforVotes(this.filterforHiddenValues(res.hits));
        let curPages = res.page;
        let totPage = res.nbPages - 1;
        this.setState({ hits, curPages, totPage });
      });
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
      let curPage = this.state.curPages;
      this.fetchNews(curPage + 1);
    }
    if (side === "prev") {
      let curPage = this.state.curPages;
      this.fetchNews(curPage - 1);
    }
  }
  upVote(obj) {
    let upVotedId = obj.objectID;
    let hits = [...this.state.hits];
    for (let i = 0; i < hits.length; i++) {
      if (hits[i].objectID === upVotedId) {
        hits[i].points++;
        managePointObj(upVotedId, hits[i].points);
        break;
      }
    }

    this.setState({ hits });
  }

  hide(obj) {
    console.log(obj.objectID);
    manageHideArray(obj.objectID);
    let hits = this.state.hits.filter(elem => elem.objectID !== obj.objectID);
    this.setState({ hits });
  }
  getDaysAgo(dt) {
    let cDate = new Date();
    let prevDate = new Date(dt);
    return timeDifference(cDate, prevDate);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="news-wrapper-container">
          {this.state.hits.map((elem, index) => {
            return (
              <Newsrow
                elem={elem}
                hide={this.hide}
                getDaysAgo={this.getDaysAgo}
                upVote={this.upVote}
              />
              // <div key={elem.objectID} className="news-wrapper">
              //   <div className="com-col">{elem.num_comments}</div>
              //   <div className="vote-col">{elem.points}</div>
              //   <div className="upvote-col" onClick={() => this.upVote(elem)} />
              //   <div className="news-col">
              //     <span className="news-text">{elem.title} </span>
              //     <a href={elem.url} rel="noopener noreferrer" target="_blank">
              //       {urlTrimmer(elem.url)}
              //     </a>{" "}
              //     by <span className="author-text">{elem.author}</span>{" "}
              //     {this.getDaysAgo(elem.created_at)} [
              //     <button className="hide-bt" onClick={e => this.hide(elem)}>
              //       hide
              //     </button>
              //     ]
              //   </div>
              // </div>
            );
          })}
        </div>
        <footer className="footer">
          {this.state.curPages !== 0 ? (
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
          {this.state.curPages !== this.state.totPage ? (
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
