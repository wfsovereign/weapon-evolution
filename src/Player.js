/**
 * Created by wfsovereign on 15-1-14.
 */

var _ = require('../node_modules/underscore.js');
var status = require('./Status.js');


function Player(name, hp, ap) {
    this.name = name;
    this.HP = hp;
    this.AP = ap;
    this.status = {
        debuff: {
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
        get_current_debuff_damage_type: function () {
            return this.debuff.damage_type
        },
        get_current_debuff_damage_value: function () {
            return this.debuff.damage_value
        },
        get_current_debuff_duration: function () {
            return this.debuff.duration
        },
        set_debuff: function (weapon_specific) {
            this.debuff.effective_time += weapon_specific.specific.effective_time;
            this.debuff.damage_value += weapon_specific.specific.damage_value;
            this.debuff.duration += weapon_specific.specific.duration;
            this.debuff.damage_type = weapon_specific.specific.damage_type;
            this.debuff.before_attack_description = weapon_specific.specific.before_attack_description;
        },
        set_current_damage_type_empty_at_not_duration: function () {
            if (this.debuff.duration == 0) {
                this.debuff.damage_type = ''
            }
        }
    };
}

Player.prototype.attack = function (player2) {
    var string_of_attack = this.get_string_before_attack();
    if (this.status.get_current_debuff_damage_type() == "击晕伤害") {
        this.status.set_current_damage_type_empty_at_not_duration();
        return string_of_attack
    }
    if (_(string_of_attack).indexOf('\n') == -1 && string_of_attack != '') {
        this.get_be_attack_HP(player2,1);
        return string_of_attack += player2.name + "\n"
    }
    if (this.HP > 0) {
        string_of_attack += this.get_career() + this.name + this.get_string_of_use_attack_mode() + "攻击了" +
        player2.get_career() + player2.name + "," +this.get_string_of_attack_process(player2) +
        player2.name + "剩余生命：" + player2.HP + "\n"
    }
    return string_of_attack
};

Player.prototype.get_be_attack_HP = function (player,attack_multiple) {
    player.HP -= player.get_be_attack_point_damage(this.get_AP()) * attack_multiple;
};

Player.prototype.is_alive = function () {
    return this.HP > 0
};

Player.prototype.get_string_before_attack = function () {
    var string_before_attack = '';
    string_before_attack += this.trigger_delayed_harm_effect();
    if (this.status.get && this.status.get_current_debuff_duration() >= 0) {
        string_before_attack += this.name + "剩余生命：" + this.HP + "\n";
    }
    return string_before_attack
};

Player.prototype.trigger_delayed_harm_effect = function () {
    var string_of_dalayed_harm = '';
    if (this.status.get_current_debuff_duration() > 0) {
        this.HP -= this.status.debuff.damage_value;
        this.status.debuff.duration--;
        if (this.status.debuff.before_attack_description() != '') {
            string_of_dalayed_harm += this.name + this.status.debuff.before_attack_description();
        }
    }
    return string_of_dalayed_harm
};


module.exports = Player;