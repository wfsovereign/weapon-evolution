/**
 * Created by wfsovereign on 15-1-14.
 */

var Player = require('./Player.js');


function Ordinary(name,hp,ap) {
    Player.call(this,name,hp,ap);
}


Ordinary.prototype.constructor = Ordinary;
Ordinary.prototype = Object.create(Player.prototype);

Ordinary.CAREER = "普通人";
Ordinary.prototype.get_career = function () {
    return  Ordinary.CAREER
};


Ordinary.prototype.get_string_of_attack_prelude = function () {
    return this.get_career() + this.name
};

module.exports = Ordinary;

