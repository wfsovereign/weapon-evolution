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

Ordinary.prototype.get_string_of_weapon_attack_specific = function () {
    return ''
};

Ordinary.prototype.get_string_of_weapon_harm_specific = function (player) {
    return ''
};

module.exports = Ordinary;

