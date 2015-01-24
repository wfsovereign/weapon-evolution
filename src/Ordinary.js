/**
 * Created by wfsovereign on 15-1-14.
 */

var Player = require('./Player.js');


function Ordinary(name,hp,ap) {
    Player.call(this,name,hp,ap);
}


Ordinary.prototype.constructor = Ordinary;
Ordinary.prototype = Object.create(Player.prototype);

Ordinary.CAREER = "普通人";
Ordinary.prototype.get_career = function () {
    return  Ordinary.CAREER
};
Ordinary.prototype.get_AP = function () {
    return this.AP
};

Ordinary.prototype.get_be_attack_point_damage = function (AP) {
    return AP
};
Ordinary.prototype.get_string_of_use_attack_mode = function () {
    return ''
};

Ordinary.prototype.get_string_of_weapon_harm_specific = function () {
    return ''
};

Ordinary.prototype.get_string_of_attack_process = function (player2) {
    var attack_multiple = 1;
    this.get_be_attack_HP(player2, attack_multiple);
    return  player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
};

module.exports = Ordinary;

