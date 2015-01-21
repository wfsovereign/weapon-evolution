
var m = require('jsmockito').JsMockito;
var fight = require('../src/Fight.js');
var player = require('../src/Player.js');
var soldier = require('../src/Soldier.js');
var ordinary = require('../src/Ordinary.js');
var weapon = require('../src/Weapon/Weapon.js');
var armor = require('../src/Armor.js');

var toxic_sword = require('../src/Weapon/Toxic_sword.js');
var flame_sword = require('../src/Weapon/Flame_sword.js');
var ice_sword = require('../src/Weapon/Ice_sword.js');
var dizzy_hammer = require('../src/Weapon/Dizzy_hammer');

xdescribe("1`output result of who die", function(){
    it("should output 张三被打败了", function(){
        var Zs = new player("张三",10,8);
        var Ls = new player("李四",20,9);
        var console_fake = {
            info:'',
            log: function (text){
                this.info = text;
            }
        };
        fight(Zs,Ls,console_fake);
        expect(console_fake.info).toEqual("张三被打败了.");
    });
    it("should output 李四被打败了", function(){
        var Zs = new player("张三",10,15);
        var Ls = new player("李四",20,9);
        var console_fake = {
            info:'',
            log: function (text){
                this.info = text;
            }
        };
        fight(Zs,Ls,console_fake);
        expect(console_fake.info).toEqual('李四被打败了.');
    });
});

xdescribe("2`output correct long sentence", function(){
    it("should output correct text", function(){
        var resultText = '--*--\n'+'--*--\n'+'--*--\n'+ "李四被打败了.";
        var Zs = new soldier("张三",26,8,weapon,armor);
        var Ls = new ordinary("李四",20,9);
        var a =0,b=0;
        spyOn(Zs,'is_alive').andCallFake(function () {
            a++;
            return a!=4
        });
        spyOn(Ls,'is_alive').andCallFake(function () {
            b++;
            return b!=4
        });
        spyOn(Zs,'attack').andReturn("--*--\n");
        spyOn(Ls,'attack').andReturn("--*--\n");
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text", function(){
        var resultText = '--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+
            '--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+
            '--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+'--*--\n'+"张三被打败了.";
        var Zs = new soldier("张三",26,8,weapon,armor);
        var Ls = new ordinary("李四",100,9);
        var a =0,b= 0;
        spyOn(Zs,'is_alive').andCallFake(function () {
            a++;
            return a!=10
        });
        spyOn(Ls,'is_alive').andCallFake(function () {
            b++;
            return b!=18
        });
        spyOn(Zs,'attack').andReturn("--*--\n");
        spyOn(Ls,'attack').andReturn("--*--\n");
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

});

xdescribe("3`职业划分攻击", function(){
    it("should output correct text,3`0 有武器的战士攻击普通人", function(){
        var resultText = "战士张三用优质木棒攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n";
        var zhangs = new soldier("张三", 10, 8, weapon, armor);
        var lis = new ordinary("李四", 20, 9);
        expect(zhangs.attack(lis)).toEqual(resultText);
    });

    it("should output correct text,3`1 没武器的战士攻击普通人 ", function(){
        var resultText = "战士张三攻击了普通人李四,李四受到了8点伤害,李四剩余生命：12\n";
        var Zs = new soldier("张三", 10, 8, null, armor);
        var Ls = new ordinary("李四", 20, 9);
        expect(Zs.attack(Ls)).toEqual(resultText);
    });

    it("should output correct text,3`2 普通人攻击没有护甲的战士", function(){
        var resultText = "普通人李四攻击了战士张三,张三受到了9点伤害,张三剩余生命：1\n";
        var Zs = new soldier("张三",10,8,weapon,null);
        var Ls = new ordinary("李四",20,9);
        expect(Ls.attack(Zs)).toEqual(resultText);
    });

    it("should output correct text,3`3 普通人攻击有护甲的战士", function(){
        var resultText = "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：6\n";
        var Zs = new soldier("张三",10,8,weapon,armor);
        var Ls = new ordinary("李四",20,9);
        expect(Ls.attack(Zs)).toEqual(resultText);
    });

    it("should output correct text,3`4 普通人攻击普通人", function(){
        var resultText = "普通人李四攻击了普通人张三,张三受到了9点伤害,张三剩余生命：1\n";
        var Zs = new ordinary("张三",10,8);
        var Ls = new ordinary("李四",20,9);
        expect(Ls.attack(Zs)).toEqual(resultText);
    });

    it("should output correct text,3`5 有武器的战士攻击有护甲的战士", function(){
        var resultText = "战士李四用优质木棒攻击了战士张三,张三受到了6点伤害,张三剩余生命：20\n";
        var Zs = new soldier("张三",26,8,weapon,armor);
        var Ls = new soldier("李四",20,9,weapon,armor);
        expect(Ls.attack(Zs)).toEqual(resultText);
    });

    it("should output correct text,3`6 有武器的战士攻击没护甲的战士", function(){
        var resultText = "战士李四用优质木棒攻击了战士张三,张三受到了11点伤害,张三剩余生命：15\n";
        var Zs = new soldier("张三",26,8,weapon,null);
        var Ls = new soldier("李四",20,9,weapon,armor);
        expect(Ls.attack(Zs)).toEqual(resultText);
    });

    it("should output correct text,3`7 没武器的战士攻击有护甲的战士", function(){
        var resultText = "战士李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n";
        var Zs = new soldier("张三",26,8,weapon,armor);
        var Ls = new soldier("李四",20,9,null,armor);
        expect(Ls.attack(Zs)).toEqual(resultText);
    });

    it("should output correct text,3`8 没武器的战士攻击没护甲的战士", function(){
        var resultText = "战士李四攻击了战士张三,张三受到了9点伤害,张三剩余生命：17\n";
        var Zs = new soldier("张三",26,8,weapon,null);
        var Ls = new soldier("李四",20,9,null,armor);
        expect(Ls.attack(Zs)).toEqual(resultText);
    });

});

describe("4`武器特效", function(){
        it("should output correct text and use toxic sword", function(){
        var Zs = new soldier("张三",26,8,toxic_sword,armor);
        var Ls = new ordinary("李四",24,9);
        var resultText =
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四中毒了,李四剩余生命：14\n"+
            "李四受到2点毒性伤害,李四剩余生命：12\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：2\n"+
            "李四受到2点毒性伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_weapon_specific').andCallFake(function (player){
            var random_box = [0.4,0.7];
            var string_of_weapon_specific = "";
            if(random_box[i]<0.5){
                player.condition.debuff.before_attack_description = this.weapon.specific.before_attack_description;
                string_of_weapon_specific += player.name + this.weapon.specific.attacking_description + ","
            }
            i++;
            return string_of_weapon_specific;
        });
        Ls.condition.debuff.duration = 2;
        Ls.condition.debuff.effective_time  = 2;
        Ls.condition.debuff.damage_value = 2;
        Ls.condition.debuff.damage_type = '毒性伤害';
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use flame sword", function(){
        var Zs = new soldier("张三",26,8,flame_sword,armor);
        var Ls = new ordinary("李四",24,9);
        var resultText =
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四着火了,李四剩余生命：14\n"+
            "李四受到2点火焰伤害,李四剩余生命：12\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：2\n"+
            "李四受到2点火焰伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_weapon_specific').andCallFake(function (player){
            var random_box = [0.4,0.7];
            var string_of_weapon_specific = "";
            if(random_box[i]<0.5){
                player.condition.debuff.before_attack_description = this.weapon.specific.before_attack_description;
                string_of_weapon_specific += player.name + this.weapon.specific.attacking_description + ","
            }
            i++;
            return string_of_weapon_specific;
        });
        Ls.condition.debuff.duration = 2;
        Ls.condition.debuff.effective_time  = 2;
        Ls.condition.debuff.damage_value = 2;
        Ls.condition.debuff.damage_type = '火焰伤害';
        expect(fight(Zs,Ls)).toEqual(resultText);

    });

    it("should output correct text and use ice sword", function(){
        var Zs = new soldier("张三",26,8,ice_sword,armor);
        var Ls = new ordinary("李四",40,9);
        var resultText =
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四冻僵了,李四剩余生命：30\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：20\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n"+
            "李四冻得直哆嗦，没有击中张三\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_weapon_specific').andCallFake(function (player){
            var random_box = [0.4,0.7,0.5,0.6];
            var string_of_weapon_specific = "";
            if(random_box[i]<0.5){
                player.condition.debuff.before_attack_description = this.weapon.specific.before_attack_description;
                string_of_weapon_specific += player.name + this.weapon.specific.attacking_description + ","
            }
            i++;
            return string_of_weapon_specific;
        });
        Ls.condition.debuff.duration = 3;
        Ls.condition.debuff.damage_type = "冰冻伤害";
        Ls.condition.debuff.effective_time = 1;
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use dizzy hammer", function(){
        var Zs = new soldier("张三",26,8,dizzy_hammer,armor);
        var Ls = new ordinary("李四",40,9);
        var resultText =
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四晕倒了,李四剩余生命：30\n"+
            "李四晕倒了，无法攻击，眩晕还剩：1轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：20\n"+
            "李四晕倒了，无法攻击，眩晕还剩：0轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_weapon_specific').andCallFake(function (player){
            var random_box = [0.4,0.7,0.5,0.6];
            var string_of_weapon_specific = "";
            if(random_box[i]<0.5){
                player.condition.debuff.before_attack_description = this.weapon.specific.before_attack_description;
                string_of_weapon_specific += player.name + this.weapon.specific.attacking_description + ","
            }
            i++;
            return string_of_weapon_specific;
        });
        Ls.condition.debuff.duration = 2;
        Ls.condition.debuff.damage_type = "击晕伤害";
        expect(fight(Zs,Ls)).toEqual(resultText);
    });


        
    
    
});
