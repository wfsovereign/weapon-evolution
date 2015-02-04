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

Player.prototype.attack = function (player2) {
    var attacking_info = this.get_string_before_attack();
    if (this.status.get_current_deBuff_damage_type() == "击晕伤害") {
        this.status.set_current_damage_type_empty_at_not_duration();
        return attacking_info
    }
    if (_(attacking_info).indexOf('\n') == -1 && attacking_info != '') {
        return attacking_info += player2.name + "\n"
    }
    if (this.HP > 0) {
        attacking_info += this.get_career() + this.name + this.get_string_of_use_attack_mode() + "攻击了" +
        player2.get_career() + player2.name + "," + this.get_string_of_attack_process(player2) +
        player2.name + "剩余生命：" + player2.HP + "\n"
    }
    return attacking_info
};

Player.prototype.get_AP = function () {
    return this.AP
};

Player.prototype.get_be_attack_point_damage = function (ap) {
    return ap
};

Player.prototype.get_string_of_use_attack_mode = function () {
    return ''
};

Player.prototype.get_string_of_weapon_harm_specific = function () {
    return ''
};

Player.prototype.get_string_of_attack_process = function (player2) {
    var attack_multiple = 1;
    this.get_be_attack_HP(player2, attack_multiple);
    return  player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
};

Player.prototype.get_be_attack_HP = function (player, attack_multiple) {
    player.HP -= player.get_be_attack_point_damage(this.get_AP()) * attack_multiple;
};

Player.prototype.is_alive = function () {
    return this.HP > 0
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
        this.status.debuff.duration = this.status.debuff.duration - 1 ;
        if (this.status.debuff.before_attack_description() != '') {
            dalayed_harm_info += this.name + this.status.debuff.before_attack_description();
        }
    }
    return dalayed_harm_info
};


module.exports = Player;