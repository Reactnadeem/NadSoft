import React from 'react';
import Swal from 'sweetalert2';

const ConfirmDeleteModal = ({ id, handleDelete, closeModal }) => {
  const deleteMember = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this member, this action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
    }).then(result => {
      if (result.isConfirmed) {
        handleDelete(id); // Call the delete function passed from Table
      }
      closeModal(); // Close the modal
    });
  };

  // Trigger the delete confirmation when the modal component is rendered
  React.useEffect(() => {
    if (id) {
      deleteMember();
    }
  }, [id]);

  return null; // Don't render anything, just trigger the Swal alert
};

export default ConfirmDeleteModal;
