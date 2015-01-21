/**
 * Created by wfsovereign on 15-1-21.
 */


var Dizzy_effect = {
    effective_time:2,
    damage_value:0,
    duration:2,
    damage_type:"击晕伤害",
    attacking_description:"晕倒了",
    before_attack_description:function(){
        var result = '';
        if(this.duration >= 0 ){
            result += "晕倒了，无法攻击，眩晕还剩：" + this.duration + "轮\n"
        }

        return result
    },
    property:"delayed_harm"
};

module.exports = Dizzy_effect;


