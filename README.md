craftyjs-rpgmaker
=================

Javascript game basis integrating Craftyjs (https://github.com/craftyjs/Crafty) and Rpg Maker assets

Why
=================

After developing several games around of Craftyjs and Rpg Maker assets (and other stuff like angularjs and a server side engine), I ll share some code here to help anyone interested in.
This project is a tutorial for everyone eager to start an HTML5/Javascript browser game.
It is based on Craftyjs and some assets as Rpg Maker format.

Understand it
================

Everything boot in index.html.
2 Javascript files : 
* js/sample.js : the code specific to the game
* js/crafty-ext.js : some extensions to craftyjs

In js/crafty-ext.js is present :
* Helper functions : createSpritesPosition and createAnimations to load sprites and animations
* Crafty component : "character" to create a new character.

Characters are created upon "skins" to help managing several renders.

How to use
================

Create your own assets and game logic, then create a Character with the line :

```
Crafty.e("character").skin("skin1").stand("f").keyboard(Crafty.keys.LEFT_ARROW,Crafty.keys.RIGHT_ARROW,Crafty.keys.UP_ARROW,Crafty.keys.DOWN_ARROW);
```

It will be rendered on the game canvas and react according to the keys defined.

Roadmap
================

Map definition and collision, maybe ;)
