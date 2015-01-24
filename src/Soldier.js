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

Soldier.prototype.get_string_of_use_attack_mode = function () {
    return this.weapon.use_method()
};

Soldier.prototype.get_string_of_weapon_attack_specific = function (weapon_random_value, all_AP) {
    var string_of_weapon_attack_specific = '';
    if (this.weapon.specific.property == "instantaneous_harm") {
        string_of_weapon_attack_specific += this.name + this.weapon.specific.attacking_description;
        all_AP = all_AP * 3;
    }
    return string_of_weapon_attack_specific
};

Soldier.prototype.get_string_of_weapon_harm_specific = function (player) {
    var string_of_weapon_specific = '';
    if (this.weapon.specific.property == 'delayed_harm') {
        player.status.set_debuff(this.weapon);
        string_of_weapon_specific += player.name + this.weapon.specific.attacking_description + ","
    }
    return string_of_weapon_specific
};

Soldier.prototype.get_string_of_attack_process = function (player2) {
    var weapon_random_value = parseInt(Math.random() * 10) / 10, n = 1, string_of_attack_process = '';
    if (weapon_random_value < this.weapon.trigger_probability) {
        if (this.weapon.specific.property == "instantaneous_harm") {
            string_of_attack_process += this.name + this.weapon.specific.attacking_description;
            n = n * 3;
        }
        string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP() * 3) +
        "点伤害," + this.get_string_of_weapon_harm_specific(player2);
    } else {
        string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
    }
    this.get_be_attack_HP(player2, n);
    return string_of_attack_process
};


module.exports = Soldier;