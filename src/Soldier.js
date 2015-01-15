/**
 * Created by wfsovereign on 15-1-14.
 */

var Player = require("./Player.js");

function Soldier(name, HP, AP, weapon, armor) {
    Player.call(this, name, HP, AP);
    this.weapon = weapon;
    this.armor = armor || {name: "虚拟防具", DR: 0};
    this.career = this._get_career();
}


Soldier.prototype.constructor = Soldier;
Soldier.prototype = Object.create(Player.prototype);

Soldier.CAREER = "战士";
Soldier.prototype._get_career = function () {
    return Soldier.CAREER
};

Soldier.prototype.get_AP = function () {

    return this.AP + this.weapon.AP
};

Soldier.prototype.get_be_attack_point_damage = function (AP) {
    return AP - this.armor.DR
};

Soldier.prototype.get_string_of_use_attack_mode = function () {
    return this.weapon.str()
};

module.exports = Soldier;