function createBlock(x, y, width, height, texId, animation) {
    //Check if any variable is undefined and set it to 0 if so
    if (isNaN(x))
        x = 0;
    if (isNaN(y))
        y = 0;
    if (isNaN(width))
        width = 1;
    if (isNaN(height))
        height = 1;
    if (isNaN(texId))
        texId = 0;
    if (isNaN(animation))
        animation = null;

    //Return block object data
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        texId: texId,
        id: 0,
        animation: animation,

        //Apply the block rendering settings to the current rendering context
        applyData: function(ctx) {
            ctx.drawImage(
                this.texId,
                this.x,
                this.y,
                this.width * gameDividedScalingX,
                this.height * gameDividedScalingY
                );
        }
    }
}

function createText(x, y, text, font, color, size) {
    //Check if any variable is undefined and set it to 0 if so
    if (isNaN(x))
        x = 0;
    if (isNaN(y))
        y = 0;
    if (isNaN(text))
        text = "";
    if (isNaN(font))
        font = "Arial";
    if (isNaN(color))
        color = "black";
    if (isNaN(size))
        size = 1;

    //Return text object data
    return {
        x: x,
        y: y,
        text: text,
        font: font,
        color: color,
        size: size,
        id: 1,

        //Apply the text rendering settings to the current rendering context
        applyData: function(ctx) {
            ctx.font = this.size + "px " + this.font;
            ctx.fillStyle = this.color;
        }
    }
}

function getDataImageFromTextureId(id) {
    //Check if any variable is undefined and set it to 0 if so
    if (isNaN(id))
        id = 0;

    //Return the image data of the texture
    return textures[id];
}

function getTextureIdFromTextureName(filename) {
    //Loop through the textures list
    for (let i = 0; i < textures.length; i++) {
        const texture = textures[i];
        
        //If the texture name matches the filename, then return the texture id
        if (texture.filename == filename) {
            return i;
        }
    }

    //If the texture was not found, then return 0
    return 0;
}

function createTexture(filename, flocation) {
    //If the file name or the file location is not defined, then stop the function
    if (isNaN(filename))
        return;
    if (isNaN(flocation))
        return;

    //Create the img html element
    var img = document.createElement("IMG");
    img.src = "../../../../" + flocation;

    //Create the image object
    var imgObject = {
        filename: filename,
        flocation: "../../../../" + flocation,
        img: img
    }

    //Add the image object to the list of textures
    textures.push(imgObject);
}

//Debugging functions
function printTextures() {
    //Loop through the textures list
    for (let i = 0; i < textures.length; i++) {
        const texture = textures[i];
        
        //Print the texture data
        console.log("Texture " + i + ": " + texture.filename + " (" + texture.flocation + ")");
    }
}