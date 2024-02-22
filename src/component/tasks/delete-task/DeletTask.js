import React from "react";
import {Modal } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteT } from "../../../redux/slices/taskSlice";
import "./deleteTask.css";

import { motion } from "framer-motion";
const DeletTask = ({ onClose, task }) => {
  const dispatch = useDispatch();
  return (
    <Modal show={true} onHide={onClose} className="container-modal">
      <Modal.Header closeButton className="headerModal">
        <Modal.Title className="delete-title">Delete task</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <FontAwesomeIcon icon={faCircleExclamation} className="icone-delete-todo" />
        Are you sure to delete this task!!
      </Modal.Body>
      <Modal.Footer className="footer-update">
        <motion.button
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="close-delete"
          onClick={onClose}
        >
          Close
        </motion.button>
        <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.2 }}>
          <FontAwesomeIcon
            icon={faTrashCan}
            className="awsome-delete"
            onClick={() => dispatch(deleteT(task._id))}
          />
        </motion.div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletTask;
