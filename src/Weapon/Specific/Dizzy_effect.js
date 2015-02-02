/**
 * Created by wfsovereign on 15-1-21.
 */

var WeaponSpecific = require('../../weapon_specific.js');
var dizzy_effect = new WeaponSpecific(2,0,2,"击晕伤害","晕倒了","delayed_harm");
dizzy_effect.before_attack_description = function (){
    var result = '';
    if(this.duration >= 0 ){
        result += "晕倒了，无法攻击，眩晕还剩：" + this.duration + "轮\n"
    }
    return result
};

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

module.exports = dizzy_effect;


