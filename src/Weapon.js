/**
 * Created by wfsovereign on 15-1-14.
 */

var Weapon = {
    name:"优质木棒",
    AP:2,
    str:function(){
        return "用" + this.name
    }
};

module.exports = Weapon;