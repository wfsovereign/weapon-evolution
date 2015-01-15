/**
 * Created by wfsovereign on 15-1-14.
 */

var Player = require("./Player.js");

function Ordinary(name,hp,ap){
    Player.call(this,name,hp,ap);
    this.career = '普通人';
    this.weapon = {AP:0};
    this.armor = {DR:0}
}


Ordinary.prototype = Object.create(Player.prototype);
Ordinary.prototype.constructor = Ordinary;



module.exports = Ordinary;