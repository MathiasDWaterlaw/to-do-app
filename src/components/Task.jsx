import {handleDragStart, handleDragEnter, handleDragEnd } from '../Dnd/dnd'
import './Task.css'

export default function Task(props) {
    return (
        <div 
            key={props.id} 
            className="task-container" 
            draggable
            onDragStart={(e) => handleDragStart(e, props.index)}
            onDragEnter={(e) => handleDragEnter(e, props.index)}
            onDragEnd={(e) => handleDragEnd(e, props.index)}
        >
            <input type="checkbox"/>
            <label >{`${props.index + 1} - ${props.text}`}</label>
            {props.deleteButton}
        </div>
    );
}
// il checkbox dovrebbe mantenere il suo stato anche se un altro task viene cancellato. quindi bisogna scrivere una funzione che regola lo use state del checkbox.