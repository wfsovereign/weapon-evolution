/**
 * Created by wfsovereign on 15-1-14.
 */

function Fight(player1,player2,console){
    var result="";

    function add_every_times_result(player1,player2) {
        result += player1.name + "攻击了" + player2.name + "," + player2.name + "受到了" +
        player1.AP + "点伤害," + player2.name + "剩余生命：" + player2.HP+"\n";
    }

    while (player1.HP > 0 && player2.HP > 0){
        player2.HP -= player1.AP;
        result += player1.attack(player2);
        //add_every_times_result(player1,player2);
        if(player2.HP<=0){
            break;
        }
        player1.HP -= player2.AP;
        result += player2.attack(player1);
        //add_every_times_result(player2,player1);
    }
    //console.info(player1,player2);
    if(player1.HP<=0){
        result+=player1.name+"被打败了";
       // console.log(player1.name+"被打败了.");
    }else{
        result+=player2.name+"被打败了";
        //console.log(player2.name+"被打败了.");
    }
    console.log(result);
}



module.exports = Fight;