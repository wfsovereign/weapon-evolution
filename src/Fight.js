/**
 * Created by wfsovereign on 15-1-14.
 */

function Fight(player1,player2,console){
    while (player1.HP > 0 && player2.HP > 0){
        console.log(player1.attack(player2));
        if(player2.HP<=0){
            break;
        }
        console.log(player2.attack(player1));
    }
    if(player1.HP<=0){
        console.log(player1.name+"被打败了.");
    }else{
        console.log(player2.name+"被打败了.");
    }

}
//Fight.one_times_fight = function(player1,player2,console){
//
//    console.log(player1.attack(player2));
//};


module.exports = Fight;