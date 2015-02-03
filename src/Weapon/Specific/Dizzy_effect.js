/**
 * Created by wfsovereign on 15-1-21.
 */

var WeaponSpecific = require('../../weapon_specific.js');

var Dizzy_effect = new WeaponSpecific(2,0,2,"击晕伤害","晕倒了","delayed_harm");
Dizzy_effect.before_attack_description = function (){
    var result = '';
    if(this.duration >= 0 ){
        result += "晕倒了，无法攻击，眩晕还剩：" + this.duration + "轮\n"
    }
    return result
};


module.exports = Dizzy_effect;


