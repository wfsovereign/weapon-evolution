/**
 * Created by wfsovereign on 15-1-20.
 */

var frozen_harm = require('./Specific/Frozen_harm.js');

var Ice_sword = {
    name: "寒冰剑",
    AP: 2,
    specific:frozen_harm,
    trigger_probability: 0.45,
    use_method: function () {
        return "用" + this.name
    }
};


module.exports = Ice_sword;