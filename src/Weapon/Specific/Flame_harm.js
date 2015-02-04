/**
 * Created by wfsovereign on 15-1-20.
 */

var WeaponSpecific = require('../../Weapon_specific.js');

var Flame_harm = new WeaponSpecific(2, 2, 2, "火焰伤害", "着火了","delayed_harm");
Flame_harm.before_attack_description = function () {
    return "受到" + this.damage_value + "点" + this.damage_type + ","
};


module.exports = Flame_harm;