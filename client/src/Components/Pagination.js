import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  setPageLimit,
  pageLimit,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <div>
        <label>Show</label>
        <select
          value={pageLimit}
          onChange={e => setPageLimit(parseInt(e.target.value))}
          className="form-control form-control-sm d-inline-block w-auto ml-2"
        >
          {[...Array(10).keys()].map(num => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
        <label className="ml-2">entries</label>
      </div>

      <div>
        <Button
          variant="outline-primary"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </Button>

        <Button
          variant="outline-primary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <span className="mx-2">{currentPage}</span>

        <Button
          variant="outline-primary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>

        <Button
          variant="outline-primary"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
