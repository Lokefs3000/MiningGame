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

    //Return block object data
    var block = {
        x: x,
        y: y,
        width: width,
        height: height,
        texId: texId,
        collision: true,
        solid: true,
        visible: true,
        id: 0,
        animation: animation,

        //Apply the block rendering settings to the current rendering context
        applyData: function(ctx) {
            //Set the texture to the current animation texture if it exists
            if (this.animation != null) {
                this.texId = this.animation.getCurrentTexture();
            }

            ctx.drawImage(
                getDataImageFromTextureId(this.texId).img,
                this.x,
                this.y,
                this.width * gameDividedScalingX,
                this.height * gameDividedScalingY
                );
        }
    }

    return block;
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
    if (filename == "")
        return;
    if (flocation == "")
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
    pushTexture(imgObject);
}

function createAnimation(name, frames, framelength) {
    if (frames.length == 0)
        return;
    if (framelength == 0)
        return;
    if (name == "")
        return;

    //Create the animation object
    var animation = {
        name: name,
        frames: frames,
        framelength: framelength,
        currentFrame: 0,
        currentFrameTime: 0,
        currentFrameIndex: 0,

        stepFrame(dt) {
            //Increase the current frame time
            this.currentFrameTime += dt;

            //If the current frame time is greater than the frame length, then step to the next frame
            if (this.currentFrameTime >= this.framelength) {
                //Reset the current frame time
                this.currentFrameTime = 0;

                //Increase the current frame index
                this.currentFrameIndex++;

                //If the current frame index is greater than the frame count, then reset the current frame index
                if (this.currentFrameIndex >= this.frames.length)
                    this.currentFrameIndex = 0;
            }
        },

        getCurrentTexture() {
            //Return the current frame texture id
            return this.frames[this.currentFrameIndex];
        }
    }

    //Add the animation object to the list of animations
    pushAnimation(animation);
}

function generateTerrainCollumn(x, y, height) {
    //Check if any variable is undefined and set it to 0 if so
    if (isNaN(x))
        x = 0;
    if (isNaN(y))
        y = 0;
    if (isNaN(height))
        height = 1;

    for (var i = 0; i < height; i++) {
        var id = 0;

        if (i == 0)
            id = getTextureIdFromTextureName("grassblock");
        else if (i < 4)
            id = getTextureIdFromTextureName("dirtblock");
        else if (i >= 4)
            id = getTextureIdFromTextureName("stoneblock");
        if (i == height - 1)
            id = getDataImageFromTextureId("bedrockblock");

        //Create the block and add it to the rendering list
        var newBlock = createBlock(x, y + (i * 80), 80, 80, id, null);
        renderingList.push(newBlock)
    }
}

function getAnimationFromName(name) {
    //Loop through the animations list
    for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];
        
        //If the animation name matches the name, then return the animation object
        if (animation.name == name) {
            return animation;
        }
    }

    //If the animation was not found, then return null
    return null;
}

//Debugging functions
function printTextures() {
    console.log("Printing textures...");

    //Loop through the textures list
    for (let i = 0; i < textures.length; i++) {
        const texture = textures[i];
        
        //Print the texture data
        console.log("Texture " + i + ": " + texture.filename + " (" + texture.flocation + ")");
    }
}

function printAnimations() {
    console.log("Printing animations...");

    //Loop through the animations list
    for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];
        
        //Print the animation data
        console.log("Animation " + i + ": " + animation.name + " (" + animation.framelength + ")");
    }
}