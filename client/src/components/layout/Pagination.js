/** @format */

import React from 'react';

const Pagination = ({
  entriesPerPage,
  totalEntries,
  currentPage,
  changePage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className='pagination'>
      {pageNumbers.map((number) => (
        <li key={number} className='page-item'>
          <button
            className={
              number === currentPage ? 'page-link active' : 'page-link'
            }
            onClick={() => changePage(number)}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
