import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';

const Search = ({ searchText, handleSearch, handleAddMember }) => {
  return (
    <Row className="mb-3">
      <Col md={6}>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchText}
          onChange={handleSearch}
        />
      </Col>
      <Col md={6} className="d-flex justify-content-end">
        <Button variant="success" onClick={handleAddMember}>
          Add New Member
        </Button>
      </Col>
    </Row>
  );
};

export default Search;
