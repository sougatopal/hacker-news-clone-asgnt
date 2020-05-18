import React from "react";
import "./styles.css";
import { urlTrimmer, timeDifference } from "./utils";

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
    this.countUpvote = this.countUpvote.bind(this);
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
        let hits = res.hits;
        let curPages = res.page;
        let totPage = res.nbPages - 1;
        this.setState({ hits, curPages, totPage });
      });
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
  countUpvote() {}
  hide() {}
  getDaysAgo(dt) {
    let cDate = new Date();
    let prevDate = new Date(dt);
    return timeDifference(cDate, prevDate);
  }
  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="com-col">comments</div>
          <div className="vote-col">Vote counts</div>
          <div className="upvote-col">UpVotes</div>
          <div className="news-col">News Details</div>
        </header>
        <div className="news-wrapper-container">
          {this.state.hits.map((elem, index) => {
            return (
              <div key={elem.objectID} className="news-wrapper">
                <div className="com-col">{elem.num_comments}</div>
                <div className="vote-col">{elem.points}</div>
                <div className="upvote-col" />
                <div className="news-col">
                  <span className="news-text">{elem.title} </span>
                  <a href={elem.url} rel="noopener noreferrer" target="_blank">
                    {urlTrimmer(elem.url)}
                  </a>{" "}
                  by <span className="author-text">{elem.author}</span>{" "}
                  {this.getDaysAgo(elem.created_at)} [
                  <button className="hide-bt" onClick={this.hide}>
                    hide
                  </button>
                  ]
                </div>
              </div>
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
