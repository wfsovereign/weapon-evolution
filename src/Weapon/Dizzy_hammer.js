/**
 * Created by wfsovereign on 15-1-21.
 */

var dizzy_effect = require('./Specific/Dizzy_effect.js');

var Dizzy_hammer = {
    name: "晕锤",
    AP: 2,
    specific:dizzy_effect,
    trigger_probability: 0.25,
    use_method: function () {
        return "用" + this.name
    }
};


module.exports = Dizzy_hammer;