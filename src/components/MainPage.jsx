import React from "react";
import Modal from "react-modal";
import Task from "./Task";

Modal.setAppElement('#root')

function MainPage() {
    const [modalState, setModalState] = React.useState(false);
    const [taskList, setTaskList] = React.useState([
        {id:1, text: 'uno'}, {is:2, text:'due'}, {id:3, text:'tre'}
    ]);
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
        const date = new Date().getDate();
        const generatedId = String(taskList.length + 1) + '-' + String(userInput.length + date);
        
        if ( userInput !== '' && userInput.length <= 40 ) {

            setTaskList(taskList => [...taskList, {id:generatedId, text:userInput}]);
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
                        id={task.id} 
                        text= {task.text} 
                        index={index} 
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