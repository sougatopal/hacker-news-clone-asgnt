import React from "react";

export default function Footer(props) {
  const { curPages, totPage, paginationFn } = props;
  return (
    <footer className="footer">
      {curPages !== 0 ? (
        <button className="pagination-bt" onClick={e => paginationFn("prev")}>
          prev
        </button>
      ) : (
        ""
      )}
      |
      {curPages !== totPage ? (
        <button className="pagination-bt" onClick={e => paginationFn("next")}>
          next
        </button>
      ) : (
        ""
      )}
    </footer>
  );
}
