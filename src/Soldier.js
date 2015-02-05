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

Soldier.prototype.get_be_attack_point_damage = function (AP,attack_multiple) {
    return (AP - this.armor.DR)*attack_multiple
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

//
//
//Soldier.prototype.be_attacked = function (attacker) {
//    //var attack_multiple = 1;
//    return  this.get_career() +this.name +","+ this.get_string_of_be_attacked(attacker)+ this.name + "剩余生命：" + this.HP + "\n"
//};
//
//Soldier.prototype.get_string_of_be_attacked = function (attacker) {
//    var weapon_random_value = parseInt(Math.random() * 10) / 10, attack_multiple = 1, attack_process_info = '';
//    if (weapon_random_value < this.weapon.trigger_probability) {
//        if (this.weapon.specific.property == "instantaneous_harm") {
//            attack_process_info += attacker.name + attacker.weapon.specific.attacking_description;
//            attack_multiple = attack_multiple * 3;
//        }
//        attack_process_info += attacker.name + "受到了" +
//        attacker.get_be_attack_point_damage(this.get_AP(),attack_multiple)  + "点伤害," +
//        this.get_string_of_weapon_harm_specific(attacker);
//    } else {
//        attack_process_info += attacker.name + "受到了" + attacker.get_be_attack_point_damage(this.get_AP(),attack_multiple) + "点伤害,"
//    }
//    this.calculate_be_attacked_HP(attacker.get_AP(), attack_multiple);
//    return attack_process_info
//};

//
function spyAttackProcess(a_player, weapon_random_value) {
    var i=0;
    spyOn(a_player, 'get_string_of_be_attacked_process_as_attacker').andCallFake(function (player2) {
        var attack_multiple = 1, string_of_attack_process = '';

        var trigger_probability = 0.45;
        var weapon_random_value = weapon_random_value[i];

        if (weapon_random_value < trigger_probability) {
            if (this.weapon.specific.property == "instantaneous_harm") {
                string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                attack_multiple = attack_multiple * 3;
            }
            string_of_attack_process += player2.name + "受到了" +
            player2.get_be_attack_point_damage(this.get_AP(), attack_multiple) + "点伤害," +
            this.get_string_of_weapon_harm_specific(player2);
        } else {
            string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP(), attack_multiple) + "点伤害,"
        }
        this.calculate_be_attacked_HP(player2, attack_multiple);

        i++;
        return string_of_attack_process
    });
}


Soldier.prototype.get_string_of_be_attacked_process_as_attacker = function (defender) {
    var weapon_random_value = parseInt(Math.random() * 10) / 10;
///

   ///
    return this.get_string_of_attack_process(weapon_random_value,defender)
};

Soldier.prototype.get_string_of_attack_process = function (weapon_random_value,defender) {
    var attack_process_info = '',attack_multiple = 1;
    if (weapon_random_value < this.weapon.trigger_probability) {
        if (this.weapon.specific.property == "instantaneous_harm") {
            attack_process_info += this.name + this.weapon.specific.attacking_description;
            attack_multiple = attack_multiple * 3;
        }
        attack_process_info += defender.name + "受到了" +
        defender.get_be_attack_point_damage(this.get_AP(),attack_multiple)  + "点伤害," +
        this.get_string_of_weapon_harm_specific(defender);
    } else {
        attack_process_info += defender.name + "受到了" + defender.get_be_attack_point_damage(this.get_AP(),attack_multiple) + "点伤害,"
    }
    this.calculate_be_attacked_HP(defender, attack_multiple);
    return attack_process_info
};




module.exports = Soldier;