/**
 * Created by wfsovereign on 15-2-2.
 */


function Weapon(name,ap,specific,triggerProbability){
    this.name = name;
    this.AP = ap;
    this.specific = specific;
    this.trigger_probability = triggerProbability;
}

Weapon.prototype.use_method = function () {
    return "用" + this.name
};

module.exports = Weapon;