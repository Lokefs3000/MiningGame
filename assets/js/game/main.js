//The target game resolution
var gameDimensionX = 480;
var gameDimensionY = 360;

//The amount of multiplication required to reach a similar screen at another resolution
var gameDividedScalingX;
var gameDividedScalingY;

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

    //Give the noise generator a seed
    //noise.seed(Math.random());

    for (let i = 0; i < 6; i++) {
        var height = Math.floor(noise.simplex2(i, 0) * 2) * 80;
    
        generateTerrainCollumn(i * 80, height + (80 * 2), 10);
    }

    //Start the game rendering loop
    renderLoop(ctx, canvas);
}

function preRender() {

}

function afterRender() {
    
}

function objectRendered(object, dt) {
    //Step the animation if it has one and is a block
    if (object.id == 0 && object.animation != null)
        object.animation.stepFrame(dt);
}