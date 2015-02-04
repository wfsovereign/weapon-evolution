/**
 * Created by wfsovereign on 15-1-20.
 */


var Weapon = require('../Weapon.js');
var flame_harm = require('./Specific/Flame_harm.js');

var Flame_sword = new Weapon("火焰剑",2,flame_harm,0.6);



module.exports = Flame_sword;