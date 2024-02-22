import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./taskCard.css";
import UpdateCard from "../UpdateCard";
import DeletTask from "../delete-task/DeletTask";
import "../UpdateCard";
import { Accordion } from "react-bootstrap";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const TaskCard = ({ task, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [showDeletModal, setShowDeletModal] = useState(false);

  const openDeletModal = () => {
    setShowDeletModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeletModal(false);
  };

  return (
    <div className="taskCard">
      <Accordion defaultActiveKey="0" className="container-task">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="date">
              <div>Task created at :</div>
              <div>{task.createAt}</div>
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <div className="t-items">
              <div>{task.title}</div>

              <div>{task.desc}</div>
            </div>

            <div className="container-awosome">
              <FontAwesomeIcon
                className="update-awsome"
                onClick={openModal}
                icon={faPenToSquare}
              />

              {showModal && <UpdateCard task={task} onClose={closeModal} />}
              <FontAwesomeIcon
                className="delete-awsome"
                icon={faTrash}
                onClick={openDeletModal}
              />
              {showDeletModal && (
                <DeletTask task={task} onClose={closeDeleteModal} />
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default TaskCard;
