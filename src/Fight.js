/**
 * Created by wfsovereign on 15-1-14.
 */

    /*
    白盒测试，只关心这一层，下一层的is_alive and attack 我不会关心。
    分析一个问题应该首先找到那个不变的点，然后站在这个不变的点上去看其他的事情。
    在这个项目里，攻击这个事情就是不变的，其他的武器、防具等等都是围绕攻击来展开的，
    所以，攻击这个点就不会改变.
    */

function fight(player1,player2){
    var fight_result = "";
    while(player1.is_alive() && player2.is_alive()){
        fight_result += player1.attack(player2);
        if(!player2.is_alive() || !player1.is_alive()){
            break;
        }
        fight_result += player2.attack(player1);
    }
    if(!player1.is_alive()){
        fight_result += player1.name;
    }else{
        fight_result += player2.name;
    }
    return fight_result + "被打败了.";
}

module.exports = fight;
