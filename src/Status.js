/**
 * Created by wfsovereign on 15-1-23.
 */

var Status = {
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
    get_current_debuff_damage_type:function (){
        return this.debuff.damage_type
    },
    get_current_debuff_damage_value:function (){
        return this.debuff.damage_value
    },
    get_current_debuff_duration:function (){
        return this.debuff.duration
    },
    set_debuff:function (weapon_specific){
        this.debuff.effective_time += weapon_specific.specific.effective_time;
        this.debuff.damage_value += weapon_specific.specific.damage_value;
        this.debuff.duration += weapon_specific.specific.duration;
        this.debuff.damage_type = weapon_specific.specific.damage_type;
        this.debuff.before_attack_description = weapon_specific.specific.before_attack_description;
    },
    set_current_damage_type_empty_at_not_duration:function (){
        if(this.debuff.duration == 0 ){
            this.debuff.damage_type = ''
        }
    }
};


module.exports = Status;
