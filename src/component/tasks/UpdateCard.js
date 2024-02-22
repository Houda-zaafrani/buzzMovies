import React from "react";
import { Alert, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateT } from "../../redux/slices/taskSlice";
import "./updateCard.css";

import { motion } from "framer-motion";

const UpdateCard = ({ onClose, task }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updateT({ ...data, _id: task._id }));
  };

  return (
    <div>
      <Modal show={true} onHide={onClose} className="container-modal">
        <Modal.Header closeButton className="headerModal">
          <Modal.Title className="delete-title">Edit task</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="bodyModal">
            <div className="input-modal-update">
              <div className="input-title-update">
                <label>Title</label>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Title"
                  defaultValue={task.title}
                  {...register("title", { required: true, maxLength: 80 })}
                />
              </div>

              <div className="input-title-update">
                <label>Description</label>
                <input
                  type="text"
                  className="inputs"
                  placeholder="Description"
                  defaultValue={task.desc}
                  {...register("desc", { required: true, maxLength: 100 })}
                />

                {(errors.desc || errors.title) && (
                  <Alert variant="danger" className="required-alert alertHome">
                    Description is required
                  </Alert>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="footer-update">
            <div className="close-update">
              <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="close-delete"
                onClick={onClose}
              >
                Close
              </motion.button>
              <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.1 }}>
                <input value="Update" className="updateButton" type="submit" />
              </motion.div>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateCard;
