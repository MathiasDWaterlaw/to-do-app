import React from "react";
import Modal from "react-modal";
import Task from "./Task";

Modal.setAppElement('#root')

function MainPage() {
    const [modalState, setModalState] = React.useState(false);
    const [taskList, setTaskList] = React.useState([]);
    const [userInput, setUserInput] = React.useState('');

    const showModal = () => {
        setModalState(true);
    }

    const closeModal = () => {
        setModalState(false);
    }

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }

    const addTask = () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const time = new Date().getTime();
        const generatedKey = String(taskList.length ) + '-' + String(randomNumber + taskList.length) + '-' + time;
        
        if ( userInput !== '' && userInput.length <= 40 ) {

            setTaskList(taskList => [...taskList, {id:generatedKey, text:userInput}]);
            setUserInput('');
        } 

        closeModal();
    }

    const removeTask = (index) => {
        const updateTask = taskList.filter((_, i) => index !== i);
        setTaskList(updateTask);
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
                        idProp={task.id} 
                        textProp= {task.text} 
                        indexProp={index} 
                        deleteButton={
                            <button 
                                className="delete-btn" 
                                onClick={() => removeTask(index)}>X</button>
                        }
                    /> )}
                </div>

                <button className="open-modal-btn" onClick={showModal}>+</button>
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
                                    onClick={closeModal}>Close</button>
                        </div>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default MainPage;