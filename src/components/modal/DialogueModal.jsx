import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./DialogueModal.scss";

export default function DialogueModal({
  show,
  handleClose,
  handleConfirm,
  deleteItem,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {deleteItem && (
          <div className="cnfrm-container">
            <div className="cnfrm-container__img">
              <img src={deleteItem?.image} />
            </div>
            <div className="cnfrm-container__content">
              <div className="cnfrm-container__title">{deleteItem?.title}</div>
            </div>
          </div>
        )}
        <strong
          className={`d-flex justify-content-center ${
            deleteItem?.title ? "mt-3" : ""
          }`}
        >
          Are you sure want to delete this product?
        </strong>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center gap-3">
        <Button variant="dark" onClick={handleClose} className="w-25">
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm} className="w-25">
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
