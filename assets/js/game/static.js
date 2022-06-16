var textures = [];
var animations = [];

function initTextures() {
    //Other textures
    createTexture("notex", "assets/images/other/other_notex.png");
    createTexture("hover", "assets/images/other/other_hover.png");
    //Tile textures
    createTexture("grassblock", "assets/images/tiles/tile_grassblock.png");
    createTexture("dirtblock", "assets/images/tiles/tile_dirtblock.png");
    createTexture("stoneblock", "assets/images/tiles/tile_stoneblock.png");
    createTexture("oaklogblock", "assets/images/tiles/tile_oaklogblock.png");
    createTexture("bedrockblock", "assets/images/tiles/tile_bedrockblock.png");
    //Detail textures
    createTexture("grass_a1", "assets/images/detail/detail_grass_a1.png");
    createTexture("grass_a2", "assets/images/detail/detail_grass_a2.png");
    createTexture("grass_a3", "assets/images/detail/detail_grass_a3.png");
    createTexture("grass_a4", "assets/images/detail/detail_grass_a4.png");
    createTexture("rose_red_a1", "assets/images/detail/detail_rose_red_a1.png");
    createTexture("rose_red_a2", "assets/images/detail/detail_rose_red_a2.png");
    createTexture("rose_red_a3", "assets/images/detail/detail_rose_red_a3.png");
    createTexture("rose_red_a4", "assets/images/detail/detail_rose_red_a4.png");
    createTexture("rose_red_a5", "assets/images/detail/detail_rose_red_a5.png");
    //UI textures
    createTexture("ui_button", "assets/images/ui/ui_buttonleft.png");
    createTexture("ui_button_hover", "assets/images/ui/ui_buttonleft_hover.png");
    createTexture("ui_button_pressed", "assets/images/ui/ui_buttonleft_pressed.png");
    createTexture("ui_button_disabled", "assets/images/ui/ui_buttonright.png");
    createTexture("ui_button_disabled_hover", "assets/images/ui/ui_buttonright_hover.png");
    createTexture("ui_button_disabled_pressed", "assets/images/ui/ui_buttonright_pressed.png");
    createTexture("ui_button_right", "assets/images/ui/ui_buttonmiddle.png");
    createTexture("ui_button_right_hover", "assets/images/ui/ui_buttonmiddle_hover.png");
    createTexture("ui_button_right_pressed", "assets/images/ui/ui_buttonmiddle_pressed.png");
}

function initAnimations() {
    //Detail animations
    createAnimation(
        "grass_sway",
        [
            getTextureIdFromTextureName("grass_a1"),
            getTextureIdFromTextureName("grass_a2"),
            getTextureIdFromTextureName("grass_a3"),
            getTextureIdFromTextureName("grass_a4")
        ],
        600
        );
    createAnimation(
        "rose_red_sway",
        [
            getTextureIdFromTextureName("rose_red_a1"),
            getTextureIdFromTextureName("rose_red_a2"),
            getTextureIdFromTextureName("rose_red_a3"),
            getTextureIdFromTextureName("rose_red_a2"),
            getTextureIdFromTextureName("rose_red_a1"),
            getTextureIdFromTextureName("rose_red_a4"),
            getTextureIdFromTextureName("rose_red_a5"),
            getTextureIdFromTextureName("rose_red_a4"),
            getTextureIdFromTextureName("rose_red_a1"),
        ],
        600
        );
}

function pushTexture(texture) {
    textures.push(texture);
}

function pushAnimation(animation) {
    animations.push(animation);
}