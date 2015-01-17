

var toxicity_harm = require('./Specific/Toxicity_harm');

var Toxic = {
    name: "优质毒剑",
    AP: 2,
    specific:toxicity_harm,
    trigger_probability: 0.6,
    use_method: function () {
        return "用" + this.name
    }
};


module.exports = Toxic;