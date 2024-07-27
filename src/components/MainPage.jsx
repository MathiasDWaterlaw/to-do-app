import React from "react";
import Modal from "react-modal";

Modal.setAppElement('#root')

function MainPage() {
    
    const localData = JSON.parse(localStorage.getItem('localData'));

    const [modalState, setModalState] = React.useState(false);
    const [taskList, setTaskList] = React.useState(localData ? localData : []);
    const [userInput, setUserInput] = React.useState('');
    const [checkState, setCheckState] = React.useState(false);
    const [characterLimit, setLimit] = React.useState(false);

    React.useEffect(() => {
        localStorage.setItem('localData', JSON.stringify(taskList));
    }, [taskList, checkState]);

    const handleInputChange = (event) => {

        setUserInput(event.target.value);
        userInput.length >= 40? setLimit(true) : setLimit(false);
    }

    const toggleModal = () => {
        setModalState(!modalState);
    }

    // adding ad removing function
    const addTask = () => {

        if ( userInput !== '' && userInput.length <= 40 ) {
            const date = new Date().getTime();
            const generatedId = String(taskList.length + 1) + '-' + String(userInput.length + date);
            const newTask = {id:generatedId, text:userInput};

            setTaskList(taskList => [...taskList, newTask]);
            setUserInput('');
            toggleModal();

        } else if ( userInput === '' ) {
            toggleModal();
        }   
    }

    const removeTask = (index) => {
        const updatedTask = taskList.filter((_, i) => index !== i);
        setTaskList(updatedTask);
    }

    const handleInputCheck = (event) => {
        setCheckState(!event.target.checked);
    }

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
    }
 
    return (
        <div className="container">
            <main>

                <div className="list-container">
                    {taskList.map( (task, index) => 
                        <div 
                            className="task-container"
                            key={task.id}
                            draggable='true'
                            onDragStart={() => dragItem.current = index}
                            onDragEnter={() => dragOverItem.current = index}
                            onDragEnd={handleSorting}
                        >
                            <input
                                type='checkbox'
                                onChange={(event) => {
                                    setCheckState(!event.target.checked)
                                    task.check = checkState;
                                    // console.log(taskList)
                                    // setCheckState(false);
                                }}
                                defaultChecked={task.check}
                            />
                            <label>{ (index + 1) + ' - ' + task.text }</label>

                            <button
                                className="delete-btn"
                                onClick={() => removeTask(index)}
                            >X</button>

                            <button
                                className="dnd-btn"
                            >::</button>
                        </div> 
                    )}
                </div>

                <button className="open-modal-btn" onClick={toggleModal}>+</button>
            </main>

            <Modal isOpen={modalState}
                className='modal'
                aria={{
                    labelledby: "heading",
                    describedby: "user_input_section"}}>

                <div className="modal-content">

                    <h3 id="heading">Add a new thing to do...</h3>

                    <div id='user_input_section' className="user-input-section"
                    >
                        <input type="text" 
                            id="input-text"
                            placeholder="Add here..."
                            value={userInput}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if ( e.key === 'Enter' ) {
                                    addTask();
                                }
                            }}
                        />

                        {characterLimit && <label htmlFor="input-text" className="char-limit">40 character limit!</label>}

                        <div className="button-container">

                            <button 
                                className="add-task-btn btn" 
                                onClick={addTask}
                            >Add</button>

                            <button 
                                className="close-modal-btn btn"
                                onClick={toggleModal}
                            >Close</button>

                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default MainPage;