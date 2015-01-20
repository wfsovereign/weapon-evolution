/**
 * Created by wfsovereign on 15-1-20.
 */


var flame_harm = require('./Specific/Flame_harm.js');

var Flame_sword = {
    name: "火焰剑",
    AP: 2,
    specific:flame_harm,
    trigger_probability: 0.6,
    use_method: function () {
        return "用" + this.name
    }
};


module.exports = Flame_sword;