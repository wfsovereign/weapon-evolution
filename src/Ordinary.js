/**
 * Created by wfsovereign on 15-1-14.
 */

var Player = require("./Player.js");

function Ordinary(name,hp,ap){
    Player.call(this,name,hp,ap);
    this.career = this._get_career();
}


Ordinary.prototype = Object.create(Player.prototype);
Ordinary.prototype.constructor = Ordinary;

Ordinary.CAREER = "普通人";
Ordinary.prototype._get_career = function(){
    return Ordinary.CAREER
};

Ordinary.prototype.get_be_attack_point_damage = function(AP){
    return AP
};
Ordinary.prototype.get_string_of_use_attack_mode = function(){
    return ''
};

module.exports = Ordinary;