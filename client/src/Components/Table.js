import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { FaTrashAlt } from 'react-icons/fa';
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Import the confirmation modal

const Table = ({
  filteredMembers,
  handleDelete,
  handleEdit,
  currentPage,
  pageLimit,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpenDeleteModal = id => {
    setDeleteId(id);
    setShowDeleteModal(true); // Show the confirmation modal
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null); // Clear the deleteId when closing the modal
  };

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
            onClick={() => handleOpenDeleteModal(row._id)} // Show delete modal
            style={{ borderRadius: '50%' }}
          >
            <FaTrashAlt color="white" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredMembers.slice(
          (currentPage - 1) * pageLimit,
          currentPage * pageLimit
        )}
      />
      {showDeleteModal && (
        <ConfirmDeleteModal
          id={deleteId}
          handleDelete={handleDelete} // Pass the delete function
          closeModal={handleCloseDeleteModal} // Close modal after action
        />
      )}
    </div>
  );
};

export default Table;
