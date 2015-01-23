/**
 * Created by wfsovereign on 15-1-24.
 */
var thump = require('./Specific/Thump.js');

var Sharp_sword = {
    name: "利剑",
    AP: 2,
    specific:thump,
    trigger_probability: 0.45,
    use_method: function () {
        return "用" + this.name
    }
};


module.exports = Sharp_sword;