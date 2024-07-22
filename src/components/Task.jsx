export default function Task(props) {
    return (
        <div key={props.idProp} className="task-container">
            <input type="checkbox"/>
            <label >{`${props.indexProp + 1} - ${props.textProp}`}</label>
            {props.deleteButton}
        </div>
    );
}
// il checkbox dovrebbe mantenere il suo stato anche se un altro task viene cancellato. quindi bisogna scrivere una funzione che regola lo use state del checkbox.