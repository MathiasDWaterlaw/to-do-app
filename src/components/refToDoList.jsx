import Task from "./Task";

function ToDoList(props) {
    return (
        <div className="list-container">
            {props.taskArray.map( (task, index) => <Task idProp={task.id} textProp= {task.text} indexProp={index} deleteFunction={props.mainDelete(index)}/> )}
        </div>
    ); 
}

export default ToDoList;