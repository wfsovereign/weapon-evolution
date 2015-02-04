/**
 * Created by wfsovereign on 15-1-20.
 */


var WeaponSpecific = require('../../Weapon_specific.js');

var Frozen_harm = new WeaponSpecific(1,0,3,"冰冻伤害","冻僵了","delayed_harm");
Frozen_harm.before_attack_description = function(){
    var result = '';
    if(this.duration == 0 || this.duration % 3 ==0){
        result += "冻得直哆嗦，没有击中"
    }
    return result
};

module.exports = Frozen_harm;


