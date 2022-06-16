//The target game fps
var targetFPS = 30;

//The list of rendering data to be rendered
var renderingList = [];

function drawBlock(block, ctx) {
    block.applyData(ctx);
}

function drawText(text, ctx) {
    block.applyData(ctx);
}

var lastFrameTime = 0;

function renderLoop(ctx, canvas) {
    //Wait until its time for the next frame
    setTimeout(function() {
        //Clear the canvas of the previous frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        preRender();

        //Calculate the delta time
        var currentFrameTime = Date.now()- lastFrameTime;

        for (let i = 0; i < renderingList.length; i++) {
            //The current rendering data
            const renderData = renderingList[i];
            
            if (renderData.id == 0) {
                //The block id is 0, so it is a block
                drawBlock(renderData, ctx);
            } else if (renderData.id == 1) {
                //The block id is 1, so it is a text
                drawText(renderData, ctx);
            }

            objectRendered(renderData, currentFrameTime);
        }

        afterRender();

        //Set the time for this frame
        lastFrameTime = Date.now();

        //Call the render loop again
        renderLoop(ctx, canvas);
    }, (1 / targetFPS) * 1000)
}