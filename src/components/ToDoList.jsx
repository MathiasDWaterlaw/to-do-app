import React from "react";

export default function ToDoList() {

    const [itemsList, setItemList] = React.useState([]);
    const [newItem, setNewItem] = React.useState('');

    const handleInputChange = (event) => {
        setNewItem(event.target.value);
    }

    const addItem = () => {
        if ( newItem.trim() !== '' ) {
            setItemList(itemsList => [...itemsList, newItem]);
            setNewItem('')
        }
    }

    const removeItem = (index) => {
        const updateItems = itemsList.filter((_, i) => index !== i);
        setItemList(updateItems);
    }

    const clearAll = () => {
        setItemList([]);
    }


    return(
        <div className="to-do-list">
            <h1>To Do App</h1>
            <div className="add-section">

                <input type="text" 
                placeholder="Add a thing to do..." 
                value={newItem} 
                onChange={handleInputChange}
                onKeyDown={(event) => {
                    if ( event.key === 'Enter' ) {
                        addItem()
                    }
                }}/>

                <button className="add-btn" onClick={addItem}>Add</button>
                <button className="clear-btn" onClick={clearAll}>Clear</button>
            </div>

            <div className="items-section">
                {
                    itemsList.map((item, index) => {
                        return (
                            <div className="item-container">
                                <input type="checkbox" id={index} className="item-check" />
                                <label htmlFor={index} className="item-text">{`${index + 1} - ${item}`}</label>
                                <button className="remove-btn" onClick={() => {removeItem(index)}}>Remove</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}