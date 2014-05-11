//extensions RPG Maker for Craftyjs

//var for RPG Maker resources
var WIDTH = 32;
var HEIGHT = 32;
var Z_CHAR = 10;
var MOVE_DURATION = 1000;

//stores all animations
var ANIMATIONS = [];

/**
 * Create sprites for an image, prefixed by a skin name
 * @param skin
 * @param image
 */
function createSpritesPosition(skin, image){

    var positions = {};
    //front
    positions[skin+"_f"] = [1, 0];//x, y in sprite
    //left
    positions[skin+"_l"] = [1, 1];
    //right
    positions[skin+"_r"] = [1, 2];
    //back
    positions[skin+"_b"] = [1, 3];

    Crafty.sprite(WIDTH, HEIGHT, image, positions, 0, 0);
}

/**
 * Create animations, prefixed by a skin name
 * @param key
 */
function createAnimations(skin){

    //animations based on the currently loaded sprite

    //front
    ANIMATIONS[skin+"_walk_f"] = [[0, 0], [2, 0]];//x, y in pixels
    //left
    ANIMATIONS[skin+"_walk_l"] = [[0, 1], [2, 1]];
    //right
    ANIMATIONS[skin+"_walk_r"] = [[0, 2], [2, 2]];
    //back
    ANIMATIONS[skin+"_walk_b"] = [[0, 3], [2, 3]];
}

Crafty.c("character", {
    init : function(){
        this.addComponent('2D, Canvas, SpriteAnimation, Tween')
            .attr({x:0, y:0, w:WIDTH, h:HEIGHT, z:Z_CHAR});

        this.origin("center");

        //manage skins
        this._skin = null;
    },

    /**
     * Enable keyboard commands. Expect Crafty.keys for each param
     * @param l left
     * @param r right
     * @param b back
     * @param f front
     * @returns {*}
     */
    keyboard : function(l, r, b, f){
        this.unbind('KeyDown');

        this.bind('KeyDown', function(e) {
            if(!this.isPlaying()){
                if(e.key == l) {
                    this.moveIt("l", MOVE_DURATION);
                } else if (e.key == r) {
                    this.moveIt("r", MOVE_DURATION);
                } else if (e.key == b) {
                    this.moveIt("b", MOVE_DURATION);
                } else if (e.key == f) {
                    this.moveIt("f", MOVE_DURATION);
                }
            }
        });

        return this;
    },

    /**
     * Set a skin for the character
     * @param skin
     * @returns {*}
     */
    skin : function(skin){
        this._skin = skin;

        //load animations for this skin
        //100millis per image
        this.reel("walk_f", MOVE_DURATION, ANIMATIONS[skin+"_walk_f"])
            .reel("walk_b", MOVE_DURATION, ANIMATIONS[skin+"_walk_b"])
            .reel("walk_l", MOVE_DURATION, ANIMATIONS[skin+"_walk_l"])
            .reel("walk_r", MOVE_DURATION, ANIMATIONS[skin+"_walk_r"]);

        return this;
    },

    /**
     * Make the character stand
     * @param o
     * @returns {*}
     */
    stand : function(o){
        if(!o){
            o = this._orientation;
        }else{
            this._orientation = o;
        }

        //remove previous display
        for (comp in this.__c) {
            if(comp.indexOf("skin") == 0){
                this.removeComponent(comp);
            }
        }

        this.addComponent(this._skin+"_"+o);

        return this;
    },

    /**
     * Make the character move
     * @param o
     * @param duration in ms
     * @param callback an optional callback
     * @returns {*}
     */
    moveIt : function(o, duration, callback){

        var tween = {};

        if(o == "l"){
            tween.x = this.x-WIDTH;
        }else if(o == "r"){
            tween.x = this.x+WIDTH;
        }else if(o == "f"){
            tween.y = this.y+WIDTH;
        }else if(o == "b"){
            tween.y = this.y-WIDTH;
        }

        this.animate("walk_"+o)
            .bind("AnimationEnd", function(){
                this.stand(o);
                this.unbind("AnimationEnd");
            })
            .tween(tween, duration)
            .bind("TweenEnd", function(){
                this.unbind("TweenEnd");
                this.stand(o);
                if(callback){
                    callback.call(this);
                }
            })
    }

});