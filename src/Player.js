/**
 * Created by wfsovereign on 15-1-14.
 */

var _ = require('../node_modules/underscore.js');
var Status = require('./Status.js');

function Player(name, hp, ap) {
    this.name = name;
    this.HP = hp;
    this.AP = ap;
    this.status = new Status();
}

Player.prototype.get_AP = function () {
    return this.AP
};

Player.prototype.get_be_attack_point_damage = function (ap, attack_multiple) {
    return ap * attack_multiple
};

Player.prototype.get_string_of_attack_prelude = function () {
    return this.name
};

//Player.prototype.get_string_of_weapon_harm_specific = function () {
//    return ''
//};

Player.prototype.is_alive = function () {
    return this.HP > 0
};

Player.prototype.attack = function (defender) {
    var attacking_info = this.get_string_before_attack();
    if (this.status.get_current_deBuff_damage_type() == "击晕伤害") {
        this.status.set_current_damage_type_empty_at_not_duration();
        return attacking_info
    }
    if (_(attacking_info).indexOf('\n') == -1 && attacking_info != '') {
        return attacking_info += defender.name + "\n"
    }
    if (this.is_alive()) {
        //var attacker = this;
        attacking_info += this.get_string_of_attack_prelude() + "攻击了" + /*defender.be_attacked(attacker)*/
        defender.get_career() + defender.name + "," + this.get_string_of_be_attacked_process_as_attacker(defender) +
        defender.name + "剩余生命：" + defender.HP + "\n"
    }
    return attacking_info
};

//

//
//Player.prototype.be_attacked = function (attacker) {
//    var attack_multiple = 1;
//    this.calculate_be_attacked_hp(attacker.get_AP(), attack_multiple);
//    return this.get_career() + this.name + "," + this.name + "受到了" + this.get_be_attack_point_damage(attacker.get_AP(),attack_multiple) + "点伤害," +
//        this.name + "剩余生命：" + this.HP + "\n"
//};
//
//Player.prototype.calculate_be_attacked_hp = function (ap, attack_multiple) {
//    this.HP -= this.get_be_attack_point_damage(ap,attack_multiple)
//};


//


Player.prototype.get_string_of_be_attacked_process_as_attacker = function (defender) {
    this.calculate_be_attacked_HP(defender, 1);
    return defender.name + "受到了" + defender.get_be_attack_point_damage(this.get_AP(),1) + "点伤害,"
};

Player.prototype.calculate_be_attacked_HP = function (defender, attack_multiple) {
    defender.HP -= defender.get_be_attack_point_damage(this.get_AP(),attack_multiple) ;
};

Player.prototype.get_string_before_attack = function () {
    var before_attack_info = this.trigger_delayed_harm_effect();
    if (this.status.get_current_deBuff_property() == "delayed_harm" &&
        this.status.get_current_deBuff_damage_value() > 0) {
        before_attack_info += this.name + "剩余生命：" + this.HP + "\n";
    }
    if (this.status.get_current_deBuff_duration() == 0 && this.status.get_current_deBuff_damage_type() != "击晕伤害") {
        this.status.set_current_damage_type_empty_at_not_duration();
    }
    return before_attack_info
};

Player.prototype.trigger_delayed_harm_effect = function () {
    var dalayed_harm_info = '';
    if (this.status.get_current_deBuff_duration() > 0) {
        this.HP -= this.status.debuff.damage_value;
        this.status.debuff.duration = this.status.debuff.duration - 1;
        if (this.status.debuff.before_attack_description() != '') {
            dalayed_harm_info += this.name + this.status.debuff.before_attack_description();
        }
    }
    return dalayed_harm_info
};


module.exports = Player;