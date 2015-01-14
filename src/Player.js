/**
 * Created by wfsovereign on 15-1-14.
 */
function Player(name, HP, AP) {
    this.name = name;
    this.HP = HP;
    this.AP = AP;

}
Player.prototype.attack = function (player2) {
    /*if(player2.career == "普通人"){
     player2.HP -= this.AP;
     return this.career + this.name + "攻击了" + player2.career +
     player2.name + "," + player2.name + "受到了" +
     this.AP + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
     }else{
     player2.HP -= (this.AP - player2.armor.DR);
     return this.career + this.name + "攻击了" + player2.career +
     player2.name + "," + player2.name + "受到了" +
     this.AP + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
     }*/
    this.get_be_attack_HP(player2);
    var accord_weapon_return_use_info= function(weapon){
        if(weapon.AP == 0){
            return ""
        }else{
            return "用"+weapon.name
        }
    };

    if(player2.career == "战士"){
        return this.career + this.name + accord_weapon_return_use_info(this.weapon)+ "攻击了" + player2.career +
            player2.name + "," + player2.name + "受到了" +
            (this.AP + this.weapon.AP - player2.armor.DR) + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
    }else{
        return this.career + this.name + accord_weapon_return_use_info(this.weapon)+ "攻击了" + player2.career +
            player2.name + "," + player2.name + "受到了" +
            (this.AP + this.weapon.AP) + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
    }

};

Player.prototype.get_be_attack_HP = function(player){
    if( player.career == "战士"){
        player.HP -= (this.AP-player.armor.DR);
    }else{
        player.HP -= this.AP
    }
};
module.exports = Player;
