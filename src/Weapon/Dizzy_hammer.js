/**
 * Created by wfsovereign on 15-1-21.
 */


var Weapon = require('../weapon.js');
var dizzy_effect = require('./Specific/Dizzy_effect.js');

var Dizzy_hammer = new Weapon("晕锤",2,dizzy_effect,0.25);


module.exports = Dizzy_hammer;