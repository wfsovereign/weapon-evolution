/**
 * Created by wfsovereign on 15-1-20.
 */


var Frozen_harm = {
    effective_time:1,
    damage_value:0,
    duration:3,
    damage_type:"冰冻伤害",
    attacking_description:"冻僵了",
    before_attack_description:function(){
        var result = '';
        console.log(this.duration,'=======');
        if(this.duration == 0 || this.duration % 3 ==0){
            result += "冻得直哆嗦，没有击中"
        }
        console.log(result,'----------');
        return result
    },
    property:"delayed_harm"
};

module.exports = Frozen_harm;


