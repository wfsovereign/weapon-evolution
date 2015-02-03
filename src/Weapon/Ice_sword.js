/**
 * Created by wfsovereign on 15-1-20.
 */


var Weapon = require('../weapon.js');
var frozen_harm = require('./Specific/Frozen_harm.js');

var Ice_sword = new Weapon("寒冰剑",2,frozen_harm,0.45);



module.exports = Ice_sword;