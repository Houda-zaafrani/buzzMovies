import React from "react";
import TaskCard from "../task-card/TaskCard";
import "./listTask.css";
import { Spinner, Toast } from "react-bootstrap";

function ListTasks({ tasks }) {
  return (
    <div className="listTas">
      {Array.isArray(tasks) ? (
        tasks.map((task, id = task._id) => <TaskCard key={id} task={task} />)
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}

export default ListTasks;
