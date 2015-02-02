/**
 * Created by wfsovereign on 15-1-24.
 */

var WeaponSpecific = require('../../weapon_specific.js');

var Thump = new WeaponSpecific(1,0,1,"暴击","发动了全力一击,","instantaneous_harm");
Thump.before_attack_description = function (){
    return ''
};

/*var Thump = {
    effective_time:1,
    damage_value:0,
    duration:1,
    damage_type:"暴击",
    attacking_description:"发动了全力一击,",
    before_attack_description:function(){
        return ""
    },
    property:"instantaneous_harm"
};*/

module.exports = Thump;

