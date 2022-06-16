//The target game fps
var targetFPS = 30;

//The list of rendering data to be rendered
var renderingList = [];

function drawBlock(block, ctx) {
    ctx.drawImage(
        block.texId,
        block.x,
        block.y,
        block.width * gameDividedScalingX,
        block.height * gameDividedScalingY
        );
}

function drawText(text, ctx) {

}

function renderLoop(ctx, canvas) {
    //Wait till its time for the next frame
    setTimeout(function() {
        //Clear the canvas of the previous frame
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < renderingList.length; i++) {
            //The current rendering data
            const renderData = renderingList[i];
            
            if (renderData.id == 0) {
                //The block id is 0, so it is a block
                drawBlock(renderData.block, ctx);
            } else if (renderData.id == 1) {
                //The block id is 1, so it is a text
                drawText(renderData.text, ctx);
            }
        }

        //Call the render loop again
        renderLoop(ctx, canvas);
    }, (1 / targetFPS) * 1000)
}