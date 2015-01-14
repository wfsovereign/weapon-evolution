/**
 * Created by wfsovereign on 15-1-14.
 */

var Player = require("./Player.js");

function Ordinary(name,hp,ap){
    Player.call(this,name,hp,ap);
    this.career = '普通人';
    this.weapon = {AP:0};
    this.armor = {DP:0}
}


Ordinary.prototype = Object.create(Player.prototype);
Ordinary.prototype.constructor = Ordinary;

//Ordinary.prototype.attack = function(player2){
//    this.get_be_attack_HP(player2);
//    console.info(player2,'222222');
//    return  this.career + this.name + "攻击了" + player2.career +
//        player2.name + "," + player2.name + "受到了" +
//        this.AP + "点伤害," + player2.name + "剩余生命：" + player2.HP + "\n";
//};


module.exports = Ordinary;