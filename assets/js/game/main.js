//The target game resolution
var gameDimensionX = 480;
var gameDimensionY = 360;

//The amount of multiplication required to reach a similar screen at another resolution
var gameDividedScalingX;
var gameDividedScalingY;

var camx = 40;
var camy = 260;

var extensionPlusX = 0;
var extensionMinusX = 0;

var playerBlock;

window.onload = function() {
    //Get the canvas and the rendering context
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    //Figure out the scaling required to fit the game resolution into the screen
    gameDividedScalingX = canvas.width / gameDimensionX;
    gameDividedScalingY = canvas.width / gameDimensionX;

    //Initialize the game functions
    initTextures();
    initAnimations();
    initInput(canvas);

    //Give the noise generator a seed
    //noise.seed(Math.random());

    for (let i = 0; i < 6; i++) {
        var height = Math.floor(noise.simplex2(i, 0) * 2) * 80;
    
        generateTerrainCollumn(i * 80, height + (80 * 2), 40);

        extensionPlusX += 80;
    }

    playerBlock = createBlock(240 - 40, 180 - 40, 80, 80, 0, null);
    playerBlock.affectedByCamera = false;
    renderingList.push(playerBlock);

    //Start the game rendering loop
    renderLoop(ctx, canvas);
}

var HasHitBlock = false;

var velY = 0;
var hasMovedOutOfBlock = false;

var HasMovedDir = false;

function preRender(dt) {
    if (findKeyFromCharacter("a") == true) {
        camx += 0.3 * dt;
        HasMovedDir = 0.3;
    }
    if (findKeyFromCharacter("d") == true) {
        camx -= 0.3 * dt;
        HasMovedDir = -0.3;
    }

    var r = 173 + (camy / 15) + 20;
    var g = 216 + (camy / 15) + 20;
    var b = 230 + (camy / 15) + 20;

    r = clamp(r, 0, 173);
    g = clamp(g, 0, 216);
    b = clamp(b, 0, 230);

    document.getElementById("canvas").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";

    if (IsVisibleXY(extensionPlusX, 0, 80, 80, canvas) == true) {
        removeData(playerBlock);
        var height = Math.floor(noise.simplex2(extensionPlusX / 80, 0) * 2) * 80;
        generateTerrainCollumn(extensionPlusX, height + (80 * 2), 40);
        console.log("Generated collumn at x: " + extensionPlusX);
        extensionPlusX += 80;
        renderingList.push(playerBlock);
    }
    if (IsVisibleXY(extensionMinusX, 0, 80, 80, canvas) == true) {
        removeData(playerBlock);
        var height = Math.floor(noise.simplex2(extensionMinusX / 80, 0) * 2) * 80;
        generateTerrainCollumn(extensionMinusX, height + (80 * 2), 40);
        console.log("Generated collumn at x: " + extensionMinusX);
        extensionMinusX -= 80;
        renderingList.push(playerBlock);
    }

    if (!HasHitBlock) {
        camy += velY * dt;
        velY += 0.0005 * -dt;
    }

    if (HasHitBlock) {
        velY = 0;

        if (!hasMovedOutOfBlock) {
            //moveUntilOutOfBlock();
        }

        /*for (let u = 0; u < 200000; u++) {
            for (let j = 0; j < blocksToRecalculateAfter.length; j++) {
                const object = blocksToRecalculateAfter[j];
                
                HasHitBlock = rectIntersect(playerBlock.x + 2.5, playerBlock.y + 2.5, playerBlock.width - 5, playerBlock.height - 5, object.x + camx, object.y + camy, object.width, object.height) == true;
    
                camy += 0.0001;
    
                if (!HasHitBlock) {
                    camy -= 0.0001;
                    break;
                }
            }
        }*/
    }

    if (findKeyFromKeycode(32) && hasMovedOutOfBlock) {
        velY = 0.35;
        
        hasMovedOutOfBlock = false;
    }
    
    blocksToRecalculateAfter = [];

    HasHitBlock = false;
}

var blocksToRecalculateAfter = [];

function afterRender(dt) {
    
}

function objectPreRender(object, dt, ctx) {
    var collision = rectIntersect(playerBlock.x + 2.5, playerBlock.y + 2.5 - 0.0002, playerBlock.width - 5, playerBlock.height - 5, object.x + camx, object.y + camy, object.width, object.height) == true;
    if (collision && object != playerBlock) {
        HasHitBlock = true;

        hasMovedOutOfBlock = false;
        blocksToRecalculateAfter.push(object);
    }

    if (HasMovedDir != 0 && object != playerBlock) {
        if (HasMovedDir == 0.3) {
            collision = rectIntersect(playerBlock.x, playerBlock.y - 2.5, playerBlock.width, playerBlock.height + 5, object.x + camx, object.y + camy, object.width, object.height) == true;

            console.log(collision);

            if (collision) {
                camx -= 0.3 * dt;
            }
        }

        HasMovedDir = 0;
    }
}

function objectRendered(object, dt, ctx) {
    //Step the animation if it has one and is a block
    if (object.id == 0 && object.animation != null)
        object.animation.stepFrame(dt);

    if (object != playerBlock)
    {
        if (rectIntersect(playerBlock.x, playerBlock.y, playerBlock.width, playerBlock.height, object.x + camx, object.y + camy, object.width, object.height)) {
            ctx.strokeStyle = "green";
        }
        else
        {
            ctx.strokeStyle = "red";
        }
        
        ctx.strokeRect(object.x + camx, object.y + camy, object.width, object.height);

        ctx.strokeStyle = "blue";
        ctx.strokeRect(playerBlock.x - 5, playerBlock.y + 10, playerBlock.width + 10, playerBlock.height - 20);
    }
}