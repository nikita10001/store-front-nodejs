import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.scss';
import { useSelector } from 'react-redux';
import { selectDevices } from '../../store/slices/deviceSlice';

const Pagination = ({ currentPage, onChagePage, totalCount }) => {
  return (
    <>
      {/* <Items currentItems={divices} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>>"
        onPageChange={(e) => onChagePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={Math.ceil((totalCount - 5) / 5)}
        forcePage={currentPage - 1}
        previousLabel="<<<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
