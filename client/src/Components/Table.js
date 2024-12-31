import React from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaTrashAlt } from 'react-icons/fa'; // Import React Icons

const Table = ({
  filteredMembers,
  handleDelete,
  handleEdit,
  currentPage,
  pageLimit,
}) => {
  const columns = [
    {
      name: 'ID',
      selector: row => row._id,
      sortable: true,
    },
    {
      name: 'Member Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Member Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Age',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <div>
          <Button
            variant="danger"
            onClick={() => handleDelete(row._id)}
            style={{ borderRadius: '50%' }}
          >
            <FaTrashAlt color="white" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredMembers.slice(
        (currentPage - 1) * pageLimit,
        currentPage * pageLimit
      )} // Pagination logic
    />
  );
};

export default Table;
