/**
 * Created by wfsovereign on 15-1-14.
 */
var Player = require("./Player.js");
function Soldier(name,HP,AP,weapon,armor){
    Player.call(this,name,HP,AP);
    this.weapon = weapon;
    this.armor = armor;
    this.career = "战士"
}


Soldier.prototype.constructor = Soldier;
Soldier.prototype = Object.create(Player.prototype);




module.exports = Soldier;