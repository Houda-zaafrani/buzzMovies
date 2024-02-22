import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, getUserTasks } from "../redux/slices/taskSlice";
import { useForm } from "react-hook-form";
import ListTasks from "../component/tasks/list-tast/ListTasks";
import { Alert, Toast } from "react-bootstrap";
import "./home.css";

const Home = ({ isTogled, toggleButton }) => {
  const dispatch = useDispatch();

  const {
    errors: error,
    taskList,
    isLoading,
  } = useSelector((state) => state.task);

  const { isAuth} = useSelector((store) => store.user);
  

   useEffect(() => {
       dispatch(getUserTasks());
   }, [isAuth]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
        console.log(data);
    dispatch(createTask(data));
    reset();
  };

  return (
    <div className={`home  ${isTogled ? "dark-home" : ""}`}>
      <Toast className="listTasks">
        <Toast.Header className="toast-header">
          <strong className="me-auto">Todo App</strong>
        </Toast.Header>

        <Toast.Body className="container-toast">
          <>
            <form
              className="form-container-home"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="inputbox-home">
                {/* part title */}
                <label className="label-home">Task</label>

                <input
                  className="email-input"
                  type="text"
                  placeholder="Add your title"
                  {...register("title", { required: true, maxLength: 80 })}
                />
               
              </div>

              <div className="inputbox-home">
                {/* part description */}
                <label className="label-home">Description</label>

                <input
                  className="email-input"
                  type="text"
                  placeholder="Add your description"
                  {...register("desc", { required: true, maxLength: 100 })}
                />
                  {(errors.title || errors.des) && (
                  <Alert variant="danger" className="required-alert alertHome">
                    Title and description are required
                  </Alert>
                )}
              </div>
              <div className="addTask">
                <button className="button" type="submit">
                  <span className="button__text">Add Task</span>
                  <span className="button__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="currentColor"
                      height="24"
                      fill="none"
                      className="svg"
                    >
                      <line y2="19" y1="5" x2="12" x1="12"></line>
                      <line y2="12" y1="12" x2="19" x1="5"></line>
                    </svg>
                  </span>{" "}
                </button>
              </div>
            </form>
          </>
          <div className="separation-home"></div>

          <>
            {taskList && (
              <div className="container-list">
                <>
                  <h1>List of tasks </h1>
                </>
                {isLoading && <div className="loader"></div>}

                <div className="listes-des-model">
                  <ListTasks
                    tasks={taskList}
                    toggleButton={toggleButton}
                    isTogled={isTogled}
                  />
                </div>
              </div>
            )}
          </>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default Home;
