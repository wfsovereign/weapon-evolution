/**
 * Created by wfsovereign on 15-1-17.
 */

var WeaponSpecific = require('../../Weapon_specific.js');

var Toxicity_harm = new WeaponSpecific(2,2,2,"毒性伤害","中毒了","delayed_harm");
Toxicity_harm.before_attack_description = function(){
    return "受到" + this.damage_value + "点" + this.damage_type + ","
};

module.exports = Toxicity_harm;




