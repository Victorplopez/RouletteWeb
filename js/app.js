let currentDroppable = null;
const chip1 = document.getElementById("chip1");

/*
chip1.onmousedown = function(event) { // (1) start the process

    // (2) prepare to moving: make absolute and on top by z-index
    chip1.style.position = 'absolute';
    chip1.style.zIndex = 1000;
    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    document.body.append(chip1);
    // ...and put that absolutely positioned chip1 under the cursor

    moveAt(event.pageX, event.pageY);

    // centers the chip1 at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        chip1.style.left = pageX - chip1.offsetWidth / 2 + 'px';
        chip1.style.top = pageY - chip1.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // (3) move the chip1 on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (4) drop the chip1, remove unneeded handlers
    chip1.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        chip1.onmouseup = null;
    };

};


 */


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

