/**
 * Created by wfsovereign on 15-1-23.
 */


function Status(){
    this.debuff = {
        effective_time: 0,
        damage_value: 0,
        duration: 0,
        damage_type: "",
        attacking_description: "",
        before_attack_description: function () {
            return ""
        },
        property: ""
    }
}

Status.prototype.get_current_deBuff_damage_type = function () {
    return this.debuff.damage_type
};

Status.prototype.get_current_deBuff_damage_value = function () {
    return this.debuff.damage_value
};

Status.prototype.get_current_deBuff_property = function () {
    return this.debuff.property
};
Status.prototype.get_current_deBuff_duration = function () {
    return this.debuff.duration
};

Status.prototype.set_current_damage_type_empty_at_not_duration = function () {
    if(this.debuff.duration == 0 ){
        this.debuff.damage_type = '';
        this.debuff.property = '';
    }
};

Status.prototype.set_deBuff = function (weapon_specific) {
    this.debuff.effective_time += weapon_specific.specific.effective_time;
    this.debuff.damage_value += weapon_specific.specific.damage_value;
    this.debuff.duration += weapon_specific.specific.duration;
    this.debuff.damage_type = weapon_specific.specific.damage_type;
    this.debuff.property = weapon_specific.specific.property;
    this.debuff.attacking_description = weapon_specific.attacking_description;
    this.debuff.before_attack_description = weapon_specific.specific.before_attack_description;
};

module.exports = Status;

