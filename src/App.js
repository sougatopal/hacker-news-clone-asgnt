import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
  }
  componentDidMount() {
    const api = "https://hn.algolia.com/api/v1/search?tags=front_page";
    fetch(api)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let hits = res.hits;
        this.setState({ hits });
      });
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
              <div key={index} className="news-wrapper">
                <div className="com-col">{elem.num_comments}</div>
                <div className="vote-col">{elem.points}</div>
                <div className="upvote-col">{elem.points}</div>
                <div className="news-col">{elem.title}</div>
              </div>
            );
          })}
        </div>
        <footer className="footer">pagination</footer>
      </div>
    );
  }
}
