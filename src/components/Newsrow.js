import React from "react";
import { urlTrimmer, timeDifference } from "../utils";

export default function Newsrow(props) {
  const { elem, hide, upVote } = props;
  return (
    <div key={elem.objectID} className="news-wrapper">
      <div className="com-col">
        {elem.num_comments}
        <span className="mobile-responsive-text"> comments</span>
      </div>
      <div className="vote-col">
        {elem.points} <span className="mobile-responsive-text"> Upvotes</span>
      </div>
      <div className="upvote-col" onClick={() => upVote(elem)} />
      <div className="news-col">
        <span className="news-text">{elem.title} </span>
        <a href={elem.url} rel="noopener noreferrer" target="_blank">
          {urlTrimmer(elem.url)}
        </a>{" "}
        by <span className="author-text">{elem.author}</span>{" "}
        {timeDifference(new Date(), new Date(elem.created_at))} [
        <button className="hide-bt" onClick={e => hide(elem)}>
          hide
        </button>
        ]
      </div>
    </div>
  );
}
