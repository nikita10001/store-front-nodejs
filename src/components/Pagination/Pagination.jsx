import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.scss';

const Pagination = ({ currentPage, onChagePage, totalCount, limit }) => {
  return (
    <>
      {/* <Items currentItems={divices} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>>"
        onPageChange={(e) => onChagePage(e.selected + 1)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(totalCount / limit)}
        forcePage={currentPage - 1}
        previousLabel="<<<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-dots"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
