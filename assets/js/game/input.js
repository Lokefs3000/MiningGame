var keys = [];

var mousex = 0;
var mousey = 0;

function initInput(canvas) {
    //Listen to when the user presses a key
    document.addEventListener("keydown", function(event) {
        //If the key is not already pressed, then add it to the list of pressed keys
        if (!findKeyFromKeycode(event.keyCode)) {
            keys.push([event.keyCode, true, false, event.key]);
        }
    }, false);

    //Listen to when the user releases a key
    document.addEventListener("keyup", function(event) {
        //If the key is already pressed, then remove it from the list of pressed keys
        if (findKeyFromKeycode(event.keyCode)) {
            keys.splice(findKeyIndexFromKeycode(event.keyCode), 1);
        }
    }, false);

    //Listen to when the user moves the mouse
    canvas.addEventListener("mousemove", function(event) {
        //Update the mouse position
        mousex = event.clientX - canvas.offsetLeft;
        mousey = event.clientY - canvas.offsetTop;
    }, false);
}

function findKeyFromKeycode(keycode) {
    //Loop through the list of keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        //If the keycode matches the keycode, then return the key
        if (key[0] == keycode) {
            return true;
        }
    }

    return false;
}

function findKeyIndexFromKeycode(keycode) {
    //Loop through the list of keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        //If the keycode matches the keycode, then return the key
        if (key[0] == keycode) {
            return i;
        }
    }

    return -1;
}

function findKeyFromCharacter(char) {
    //Loop through the list of keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        //If the character matches the character, then return the key
        if (key[3] == char) {
            return true;
        }
    }

    return false;
}

function findKeyDownFromKeycode(keycode) {
    //Loop through the list of keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        //If the keycode matches the keycode, then return the key
        if (key[0] == keycode && key[1]) {
            key[1] = false;
            return true;
        }
    }

    return false;
}

function findKeyUpFromKeycode(keycode) {
    //Loop through the list of keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        //If the keycode matches the keycode, then return the key
        if (key[0] == keycode && !key[2]) {
            key[2] = true;
            return true;
        }
    }

    return false;
}

function findKeyDownFromCharacter(char) {
    //Loop through the list of keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        //If the character matches the character, then return the key
        if (key[3] == char && key[1]) {
            key[1] = false;
            return true;
        }
    }

    return false;
}

function findKeyUpFromCharacter(char) {
    //Loop through the list of keys
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        //If the character matches the character, then return the key
        if (key[3] == char && !key[2]) {
            key[2] = true;
            return true;
        }
    }

    return false;
}