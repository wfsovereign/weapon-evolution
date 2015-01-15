/**
 * Created by wfsovereign on 15-1-14.
 */

function Fight(player1,player2,console){
    while (player1.is_alive() && player2.is_alive()){
        console.log(player1.attack(player2));
        if(!player2.is_alive()){
            break;
        }
        console.log(player2.attack(player1));
    }
    if(!player1.is_alive()){
        console.log(player1.name+"被打败了.");
    }else{
        console.log(player2.name+"被打败了.");
    }
}


module.exports = Fight;