/**
 * Scene loading resources...
 */
function loading(){
    Crafty.background("yellow");
    console.log("[Scene] loading");

    Crafty.load(["img/rpg_char.png", "img/rpg_char2.png"],
        function() {
            // Everything is loaded
            console.log("Resource loading complete ! ");

            createSpritesPosition("skin1", "img/rpg_char.png");
            createAnimations("skin1");

            createSpritesPosition("skin2", "img/rpg_char2.png");
            createAnimations("skin2");

            console.log("Crafty setup complete ! Displaying game now");

            Crafty.scene("game-scene");
        },
        function(e) {
            // Update progress
            // TODO : display a progress bar instead
            console.log(" Loaded: " + ~~e.percent + "%");
        },
        function(e) {
            // Error on loading
            var src = e.src || "";
            throw new Error("Error on loading asset: " + src.substr(src.lastIndexOf('/') + 1).toLowerCase());
        }
    );


}

function game(){
    Crafty.background("url(img/setting/grass.jpg)");

    //skin names must begin with skin...
    Crafty.e("character").skin("skin1").stand("f").keyboard(Crafty.keys.LEFT_ARROW,Crafty.keys.RIGHT_ARROW,Crafty.keys.UP_ARROW,Crafty.keys.DOWN_ARROW);

    Crafty.e("character").attr({x:64, y:64}).skin("skin2").stand("f").keyboard(Crafty.keys.LEFT_ARROW,Crafty.keys.RIGHT_ARROW,Crafty.keys.UP_ARROW,Crafty.keys.DOWN_ARROW);
}

$(document).ready(function(){

    //boot
    // Start crafty
    Crafty.init(600, 400);//width, height
    Crafty.canvas.init();

    //optimize resolution
    Crafty.canvas.context.webkitImageSmoothingEnabled = false;
    Crafty.canvas.context.mozImageSmoothingEnabled = false;
    Crafty.canvas.context.imageSmoothingEnabled = false;

    //prepare
    Crafty.scene("loading-scene", loading);
    Crafty.scene("game-scene", game);

    //play loading
    Crafty.scene("loading-scene");

});
