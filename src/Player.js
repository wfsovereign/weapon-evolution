/**
 * Created by wfsovereign on 15-1-14.
 */
function Player(name,HP,AP){
    this.name = name;
    this.HP = HP;
    this.AP = AP;
}
Player.prototype.attack = function (player2){
    return player1.name + "攻击了" + player2.name + "," + player2.name + "受到了" +
    player1.AP + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
};

module.exports = Player;
