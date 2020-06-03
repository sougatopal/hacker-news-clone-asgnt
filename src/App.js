import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import { fetchNews, hide, upVote } from "./actions";
import Header from "../src/components/Header";
import Newsrow from "../src/components/Newsrow";
import { manageHideArray, managePointObj } from "./utils";
import Linegraph from "./components/Linegraph";
import Footer from "../src/components/Footer";

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
  paginationFn(side) {
    console.log(side);
    let curPage = this.props.curPages;
    if (side === "next") {
      this.props.fetchNews(curPage + 1);
    }
    if (side === "prev") {
      this.props.fetchNews(curPage - 1);
    }
  }
  upVote(obj) {
    this.props.upVote(obj);
  }

  hide(obj) {
    this.props.hide(obj);
  }
  render() {
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
                upVote={this.upVote}
              />
            );
          })}
        </div>
        <Footer
          curPages={curPages}
          paginationFn={this.paginationFn}
          totPage={totPage}
        />

        <div className="chart-container">
          {this.props.linegraphData && this.props.linegraphData.length > 0 && (
            <Linegraph linegraphData={this.props.linegraphData} />
          )}
        </div>
      </div>
    );
  }
}

function filterforVotes(arr) {
  let pointJson = managePointObj();
  for (let i = 0; i < arr.length; i++) {
    if (pointJson[arr[i].objectID]) {
      arr[i].points = pointJson[arr[i].objectID];
    }
  }
  return arr;
}

function filterforHiddenValues(arr) {
  let hiddenArr = manageHideArray();
  let arrtobeReturned = arr.filter(elem => {
    return !hiddenArr.includes(elem.objectID);
  });
  return arrtobeReturned;
}
function makeLineGraphData(hits) {
  let lineJson = [];
  hits.forEach(elem => {
    lineJson.push({
      ID: elem.objectID,
      vote: elem.points
    });
  });
  return lineJson;
}
const mapStateToProps = state => {
  return {
    hits: filterforVotes(filterforHiddenValues(state.data.hits)),
    curPages: state.data.curPages,
    totPage: state.data.totPage,
    linegraphData: makeLineGraphData(state.data.hits)
  };
};

export default connect(
  mapStateToProps,
  { fetchNews, hide, upVote }
)(App);
