/**
 * Created by wfsovereign on 15-1-20.
 */

var Flame_harm = {
    effective_time:2,
    damage_value:2,
    duration:2,
    damage_type:"火焰伤害",
    attacking_description:"着火了",
    before_attack_description:function(){
        return "受到" + this.damage_value + "点" + this.damage_type + ","
    },
    property:"delayed_harm"
};

module.exports = Flame_harm;