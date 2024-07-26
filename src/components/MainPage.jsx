import React from "react";
import Modal from "react-modal";
import Task from "./Task";
import {
    handleDragStart, 
    handleDragEnter, 
    handleDragEnd } from '../Dnd/dnd'

Modal.setAppElement('#root')

function MainPage() {
    
    const localData = JSON.parse(localStorage.getItem('localData'));

    const [modalState, setModalState] = React.useState(false);
    const [taskList, setTaskList] = React.useState(localData ? localData : []);
    const [userInput, setUserInput] = React.useState('');

    React.useEffect(() => {
        localStorage.setItem('localData', JSON.stringify(taskList));
    }, [taskList]);


    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }

    const toggleModal = () => {
        setModalState(!modalState);
    }

    // adding ad removing function
    const addTask = () => {
        
        if ( userInput !== '' && userInput.length <= 40 ) {
            const date = new Date().getTime();
            const generatedId = String(taskList.length + 1) + '-' + String(userInput.length + date);
            const newTask = {id:generatedId, text:userInput, checked: false};

            setTaskList(taskList => [...taskList, newTask]);
            setUserInput('');
        } 
        
        toggleModal();
    }

    const removeTask = (index) => {
        const updatedTask = taskList.filter((_, i) => index !== i);
        setTaskList(updatedTask);
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
            <header>
                <h1>Things i need to do:</h1>
            </header>

            <main>

                <div className="list-container">
                    {taskList.map( (task, index) => 
                        <Task 
                            id={task.id} 
                            text= {task.text} 
                            index={index} 
                            deleteButton={
                                <button 
                                    className="delete-btn" 
                                    onClick={() => removeTask(index)}>X</button>
                            }
                            dragButton = {
                                <button 
                                className="dnd-btn"
                                >::</button>
                            }
                            dragStart={() => {dragItem.current = index;}}
                            dragEnter={() => {dragOverItem.current = index;}}
                            dragEnd={handleSorting}
                        /> 
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
                    <div id='user_input_section' className="user-input-section">
                        <input type="text" 
                            placeholder="Add here..."
                            value={userInput}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if ( e.key === 'Enter' ) {
                                    addTask();
                                }
                            }}
                        />

                        <div className="button-container">
                            <button className="add-task-btn btn" 
                                onClick={addTask}>Add</button>
                            <button className="close-modal-btn btn"
                                    onClick={toggleModal}>Close</button>
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default MainPage;