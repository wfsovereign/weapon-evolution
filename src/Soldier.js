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

//Soldier.prototype.attack = function(player2){
//
//    this.get_be_attack_HP(player2);
//    if(player2.career == "战士"){
//        return this.career + this.name + "用"+ this.weapon.name+ "攻击了" + player2.career +
//            player2.name + "," + player2.name + "受到了" +
//            (this.AP + this.weapon.AP- player2.armor.DR) + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
//    }else{
//        return this.career + this.name + "用"+ this.weapon.name+ "攻击了" + player2.career +
//            player2.name + "," + player2.name + "受到了" +
//            (this.AP+this.weapon.AP) + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
//    }
//};

Soldier.prototype.get_be_attack_HP = function(player){
    if( player.career == "战士"){
        player.HP -= (this.AP + this.weapon.AP -player.armor.DR);
    }else{
        player.HP -= this.AP + this.weapon.AP
    }
};

module.exports = Soldier;