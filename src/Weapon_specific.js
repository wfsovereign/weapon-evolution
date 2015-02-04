/**
 * Created by wfsovereign on 15-2-2.
 */


function WeaponSpecific(effective_time,damage_value,duration,damage_type,attacking_description,property){
    this.effective_time = effective_time;
    this.damage_value = damage_value;
    this.duration = duration;
    this.damage_type = damage_type;
    //this.trigger_probability = triggerProbability;
    this.attacking_description = attacking_description;
    this.property = property;
}

WeaponSpecific.prototype.trigger_specific = function () {
    var random_value = parseInt(Math.random() * 10) / 10;
    return random_value < this.trigger_probability
};

module.exports = WeaponSpecific;