/**
 * Created by wfsovereign on 15-1-14.
 */



var Player = require("./Player.js");


function Soldier(name, hp, ap, weapon, armor) {
    Player.call(this, name, hp, ap);
    this.weapon = weapon || {
        name: "虚拟武器",
        AP: 0,
        specific: {
            effective_time: 0,
            damage_value: 0,
            duration: 0,
            damage_type: "",
            attacking_description: "",
            before_attack_description: function () {
                return ""
            },
            property: ""
        },
        trigger_probability: 0,
        use_method: function () {
            return ""
        }
    };
    this.armor = armor || {name: "虚拟武器", DR: 0};
}


Soldier.prototype.constructor = Soldier;
Soldier.prototype = Object.create(Player.prototype);

Soldier.CAREER = "战士";
Soldier.prototype.get_career = function () {
    return Soldier.CAREER
};

Soldier.prototype.get_AP = function () {
    return this.AP + this.weapon.AP
};

Soldier.prototype.get_be_attack_point_damage = function (AP) {
    return AP - this.armor.DR
};

Soldier.prototype.get_string_of_attack_prelude = function () {
    return this.get_career() + this.name + this.weapon.use_method()
};



Soldier.prototype.get_string_of_weapon_harm_specific = function (defender) {
    var weapon_specific_info = '';
    if (this.weapon.specific.property == 'delayed_harm') {
        defender.status.set_deBuff(this.weapon);
        weapon_specific_info += defender.name + this.weapon.specific.attacking_description + ","
    }
    return weapon_specific_info
};

Soldier.prototype.get_string_of_attack_process = function (defender) {
    var weapon_random_value = parseInt(Math.random() * 10) / 10, attack_multiple = 1, attack_process_info = '';
    if (weapon_random_value < this.weapon.trigger_probability) {
        if (this.weapon.specific.property == "instantaneous_harm") {
            attack_process_info += this.name + this.weapon.specific.attacking_description;
            attack_multiple = attack_multiple * 3;
        }
        attack_process_info += defender.name + "受到了" +
        defender.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
        this.get_string_of_weapon_harm_specific(defender);
    } else {
        attack_process_info += defender.name + "受到了" + defender.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
    }
    this.calculate_be_attacked_HP(defender, attack_multiple);
    return attack_process_info
};


module.exports = Soldier;