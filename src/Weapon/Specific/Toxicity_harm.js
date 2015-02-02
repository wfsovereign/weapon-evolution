/**
 * Created by wfsovereign on 15-1-17.
 */

var WeaponSpecific = require('../../weapon_specific.js');

var Toxicity_harm = new WeaponSpecific(2,2,2,"毒性伤害","中毒了","delayed_harm");
Toxicity_harm.before_attack_description = function(){
    return "受到" + this.damage_value + "点" + this.damage_type + ","
};

/*var Toxicity_harm = {
    effective_time:2,
    damage_value:2,
    duration:2,
    damage_type:"毒性伤害",
    attacking_description:"中毒了",
    before_attack_description:function(){
      return "受到" + this.damage_value + "点" + this.damage_type + ","
    },
    property:"delayed_harm"
};*/

module.exports = Toxicity_harm;




