import './Task.css'

export default function Task(props) {
    return (
        <div 
            key={props.id} 
            className="task-container" 
            draggable = 'true'
            onDragStart={props.dragStart}
            onDragEnter={props.dragEnter}
            onDragEnd={props.dragEnd}
        >
            <input type="checkbox"/>
            <label >{`${props.index + 1} - ${props.text}`}</label>
            {props.deleteButton}
            {props.dragButton}
        </div>
    );
}
// il checkbox dovrebbe mantenere il suo stato anche se un altro task viene cancellato. quindi bisogna scrivere una funzione che regola lo use state del checkbox.