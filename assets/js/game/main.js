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

    //Figure out the scaling required to fit the game resolution into the screen
    gameDividedScalingX = canvas.width / gameDimensionX;
    gameDividedScalingY = canvas.width / gameDimensionX;

    //Start the game rendering loop
    renderLoop(ctx, canvas);
}