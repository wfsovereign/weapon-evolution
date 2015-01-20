/**
 * Created by wfsovereign on 15-1-14.
 */



var Player = require("./Player.js");


function Soldier(name,hp,ap,weapon,armor) {
    Player.call(this,name,hp,ap);
    this.weapon = weapon || {
        name: "虚拟武器",
        AP: 0,
        specific:{
            effective_time:0,
            damage_value:0,
            duration:0,
            damage_type:"",
            attacking_description:"",
            before_attack_description:function (){
                return ""
            },
            property:""
        },
        trigger_probability: 0,
        use_method: function () {
            return ""
        }
    };
    this.armor = armor || {name:"虚拟武器",DR:0};
}


Soldier.prototype.constructor = Soldier;
Soldier.prototype = Object.create(Player.prototype);

Soldier.CAREER = "战士";
Soldier.prototype.get_career = function () {
    return Soldier.CAREER
};

Soldier.prototype.get_AP = function () {
    return this.AP + this.weapon.AP
};

Soldier.prototype.get_be_attack_point_damage = function (AP) {
    return AP - this.armor.DR
};

Soldier.prototype.get_string_of_use_attack_mode = function () {
    return this.weapon.use_method()
};

Soldier.prototype.get_string_of_weapon_specific = function (player) {
    var weapon_random_value = parseInt(Math.random()*10)/10,string_of_weapon_specific='';

    if(weapon_random_value < this.weapon.trigger_probability){
        player.condition.debuff.effective_time += this.weapon.specific.effective_time;
        player.condition.debuff.damage_value += this.weapon.specific.damage_value;
        player.condition.debuff.duration += this.weapon.specific.duration;
        player.condition.debuff.damage_type = this.weapon.specific.damage_type;
        player.condition.debuff.before_attack_description = this.weapon.specific.before_attack_description;
        string_of_weapon_specific += player.name + this.weapon.specific.attacking_description + ","
    }
    return string_of_weapon_specific
};

module.exports = Soldier;