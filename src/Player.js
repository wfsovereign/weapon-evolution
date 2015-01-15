/**
 * Created by wfsovereign on 15-1-14.
 */
function Player(name, HP, AP) {
    this.name = name;
    this.HP = HP;
    this.AP = AP;

}
Player.prototype.attack = function (player2) {
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
    player.HP -= ((this.AP + this.weapon.AP) - player.armor.DR);
};
module.exports = Player;
