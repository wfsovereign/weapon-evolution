/**
 * Created by wfsovereign on 15-1-14.
 */



function Player(name,hp,ap){
    this.name = name;
    this.HP = hp;
    this.AP = ap;
    this.condition = {
        debuff:{
            effective_time:0,
            damage_value:0,
            duration:0,
            damage_type:"",
            attacking_description:"",
            before_attack_description:function (){
                return ""
            },
            property:""
        }
    };

}

Player.prototype.attack = function (player2) {

    this.get_be_attack_HP(player2);
    return this.get_string_before_attack() + this.get_career() + this.name + this.get_string_of_use_attack_mode() + "攻击了"  + player2.get_career()+
        player2.name + "," + player2.name + "受到了" +
       player2.get_be_attack_point_damage(this.get_AP()) + "点伤害," + this.get_string_of_weapon_specific(player2) + player2.name + "剩余生命：" + player2.HP + "\n"
};

Player.prototype.get_be_attack_HP = function (player) {
    player.HP -= player.get_be_attack_point_damage(this.get_AP());
};

Player.prototype.is_alive = function () {
    return this.HP > 0
};

Player.prototype.get_string_before_attack = function () {
    console.log('===========');
    if(this.condition.debuff.duration > 0){
        this.HP -= this.condition.debuff.damage_value;
        this.condition.debuff.duration--;
        console.log("111111111111");
        return this.name + this.condition.debuff.before_attack_description() + "李四剩余生命：" + this.HP + "\n";
    }else{
        console.log('22222222222222222');
        return ''
    }

};



module.exports = Player;