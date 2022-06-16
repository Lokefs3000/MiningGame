var targetFPS = 30;

var renderingList = [];

function drawBlock(block, ctx) {
    ctx.drawImage(block.texId, block.x, block.y);
}

function drawText(text, ctx) {

}

function renderLoop(ctx, canvas) {
    setTimeout(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < renderingList.length; i++) {
            const renderData = renderingList[i];
            
            if (renderData.id == 0) {
                drawBlock(renderData.block, ctx);
            } else if (renderData.id == 1) {
                drawText(renderData.text, ctx);
            }
        }

        renderLoop(ctx, canvas);
    })
}