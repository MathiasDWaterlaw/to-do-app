import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function MainPage() {
  const localData = JSON.parse(localStorage.getItem("localData"));
  const [taskList, setTaskList] = React.useState(localData ? localData : []);
  const [modalState, setModalState] = React.useState(false);
  const [userInput, setUserInput] = React.useState("");
  const [characterLimit, setLimit] = React.useState(false);
  const [dragState, setDragState] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem("localData", JSON.stringify(taskList));
  }, [taskList]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
    userInput.length >= 40 ? setLimit(true) : setLimit(false);
  };

  // adding ad removing tasks functions
  const addTask = () => {
    if (userInput !== "" && userInput.length <= 40) {
      const date = new Date().getTime();
      const generatedId =
        String(taskList.length + 1) + "-" + String(userInput.length + date);
      const newTask = { id: generatedId, text: userInput, check: false };

      setTaskList((taskList) => [...taskList, newTask]);
      setUserInput("");
      setModalState(!modalState);
    } else if (userInput === "") {
      setModalState(!modalState);
    }
  };

  const removeTask = (index) => {
    const updatedTask = taskList.filter((_, i) => index !== i);
    setTaskList(updatedTask);
  };

  // function that handle the checkbox status
  const handleCheck = (index) => {
    const updatedTask = taskList.map((task, i) => {
      return index === i ? { ...task, check: !task.check } : task;
    });

    setTaskList(updatedTask);
  };

  // drag and drop sorting function:
  let dragItem = React.useRef(null);
  let dragOverItem = React.useRef(null);

  const handleSorting = () => {
    const _taskList = [...taskList];
    const draggedTask = _taskList.splice(dragItem.current, 1);

    _taskList.splice(dragOverItem.current, 0, ...draggedTask);
    setTaskList(_taskList);

    dragItem = null;
    dragOverItem = null;
  };

  return (
    <div className='container'>
      <main>
        <div className='list-container'>
          {taskList.map((task, index) => (
            <div
              className='task-container'
              key={task.id}
              draggable={dragState}
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSorting}
            >
              <input
                type='checkbox'
                onChange={() => {
                  handleCheck(index);
                }}
                checked={task.check}
              />
              <label>{index + 1 + " - " + task.text}</label>

              <button className='delete-btn' onClick={() => removeTask(index)}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
                  {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                  <path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
                </svg>
              </button>

              <button
                className='dnd-btn'
                onMouseDown={() => setDragState(true)}
                onMouseLeave={() => setDragState(false)}
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                  {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                  <path d='M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z' />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          className='open-modal-btn'
          onClick={() => setModalState(!modalState)}
        >
          +
        </button>
      </main>

      <Modal
        isOpen={modalState}
        className='modal'
        aria={{
          labelledby: "heading",
          describedby: "user_input_section",
        }}
      >
        <div className='modal-content'>
          <h3 id='heading'>Add a new thing to do...</h3>

          <div id='user_input_section' className='user-input-section'>
            <input
              type='text'
              id='input-text'
              placeholder='Add here...'
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            {characterLimit && (
              <label htmlFor='input-text' className='char-limit'>
                40 character limit!
              </label>
            )}
            <div className='space'></div>

            <div className='button-container'>
              <button
                className='close-modal-btn btn'
                onClick={() => setModalState(!modalState)}
              >
                Close
              </button>

              <button className='add-task-btn btn' onClick={addTask}>
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MainPage;
