import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const MemberForm = ({
  currentMember,
  setCurrentMember,
  handleAddSave,
  handleSave,
  isEditing,
  isAdding,
  closeModal,
}) => {
  return (
    <Modal show={isAdding || isEditing} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'Edit Member' : 'Add New Member'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={currentMember?.name || ''}
              onChange={e =>
                setCurrentMember({ ...currentMember, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={currentMember?.email || ''}
              onChange={e =>
                setCurrentMember({
                  ...currentMember,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              value={currentMember?.age || ''}
              onChange={e =>
                setCurrentMember({ ...currentMember, age: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formParentId">
            <Form.Label>Parent ID</Form.Label>
            <Form.Control
              type="number"
              value={currentMember?.parent_id || ''}
              onChange={e =>
                setCurrentMember({
                  ...currentMember,
                  parent_id: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button
          variant="success"
          onClick={isEditing ? handleSave : handleAddSave}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberForm;
