let currentDroppable = null;
const chip1 = document.getElementById("chip1");


chip1.onmousedown = function (event) {

    let shiftX = event.clientX - chip1.getBoundingClientRect().left;
    let shiftY = event.clientY - chip1.getBoundingClientRect().top;

    chip1.style.position = 'absolute';
    chip1.style.zIndex = 1000;
    document.body.append(chip1);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        chip1.style.left = pageX - shiftX + 'px';
        chip1.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        chip1.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        chip1.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable');
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) { // null when we were not over a droppable before this event
                leaveDroppable(currentDroppable);
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) { // null if we're not coming over a droppable now
                // (maybe just left the droppable)
                enterDroppable(currentDroppable);
            }
        }
    }

    document.addEventListener('mousemove', onMouseMove);

    chip1.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        chip1.onmouseup = null;
    };

};

function enterDroppable(elem) {
    elem.style.background = 'pink';
}

function leaveDroppable(elem) {
    elem.style.background = '';
}

chip1.ondragstart = function () {
    return false;
};

