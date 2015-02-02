/**
 * Created by wfsovereign on 15-2-2.
 */


function WeaponSpecific(effective_time,damage_value,duration,damage_type,attacking_description,property){
    /*effective_time:2,
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
     property:"delayed_harm"*/
    this.effective_time = effective_time;
    this.damage_value = damage_value;
    this.duration = duration;
    this.damage_type = damage_type;
    this.attacking_description = attacking_description;
    this.property = property;
}


module.exports = WeaponSpecific;