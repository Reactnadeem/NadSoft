import Swal from 'sweetalert2';

const ConfirmDeleteModal = ({ id, handleDelete }) => {
  const deleteMember = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If You delete this Member Then this action can not be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'cancel',
      confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
    }).then(result => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  return deleteMember;
};

export default ConfirmDeleteModal;
