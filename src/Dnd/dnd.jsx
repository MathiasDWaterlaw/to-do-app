import React from "react";

// handle drag start
export function handleDragStart(event, index) {
    console.log('drag is started', index);
    return index;
}
// handle drag enter
export function handleDragEnter(event, index) {
    console.log('drag is entered', index);
}
// handle drag end
export function handleDragEnd(event, index, array) {
    const startPosition = handleDragStart;
    const finalPosition = index;
    console.log('drag is ended', index);

}

// bisogna scrivere queste funzion i all'interno dell'main page
// e grag start deve usare un useState per settare la posizione corrente dell'indice.
// drag end invece si deve occupare di far scambiare di posto gli elementi dell'array.
// credo che tutta la parte di animazione vada gestita con css.