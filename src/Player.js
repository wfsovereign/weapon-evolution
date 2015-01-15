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

    return this.get_career() + this.name + this.get_string_of_use_attack_mode() + "攻击了" + player2.get_career() +
        player2.name + "," + player2.name + "受到了" +
        player2.get_be_attack_point_damage(this.get_AP()) + "点伤害," + player2.name + "剩余生命：" + player2.HP + "\n";


};

Player.prototype.get_be_attack_HP = function (player) {
    player.HP -= player.get_be_attack_point_damage(this.get_AP())
};

Player.prototype.is_alive = function () {
    return this.HP > 0;
};


module.exports = Player;
