
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
var sharp_sword = require('../src/Weapon/Sharp_sword');

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

describe("3`职业划分攻击", function(){
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
    it("should output correct text and use toxic sword , 战士攻击普通人", function(){
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
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use toxic sword , 普通人攻击战士", function(){
        var Zs = new soldier("张三",26,8,toxic_sword,armor);
        var Ls = new ordinary("李四",24,9);
        var resultText =
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四中毒了,李四剩余生命：14\n"+
            "李四受到2点毒性伤害,李四剩余生命：12\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：2\n"+
            "李四受到2点毒性伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use toxic sword , 战士攻击战士", function(){
        var Zs = new soldier("张三",26,8,toxic_sword,armor);
        var Ls = new soldier("李四",24,9,toxic_sword,armor);
        var resultText =
            "战士张三用优质毒剑攻击了战士李四,李四受到了5点伤害,李四中毒了,李四剩余生命：19\n"+
            "李四受到2点毒性伤害,李四剩余生命：17\n"+
            "战士李四用优质毒剑攻击了战士张三,张三受到了6点伤害,张三中毒了,张三剩余生命：20\n"+
            "张三受到2点毒性伤害,张三剩余生命：18\n"+
            "战士张三用优质毒剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：12\n"+
            "李四受到2点毒性伤害,李四剩余生命：10\n"+
            "战士李四用优质毒剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：12\n"+
            "张三受到2点毒性伤害,张三剩余生命：10\n"+
            "战士张三用优质毒剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：5\n"+
            "战士李四用优质毒剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：4\n"+
            "战士张三用优质毒剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.9,0.8], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        var j=0;
        spyOn(Ls,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.9,0.6,0.6], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[j] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            j++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use flame sword , 战士攻击普通人", function(){
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
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use flame sword , 普通人攻击战士", function(){
        var Zs = new soldier("张三",26,8,flame_sword,armor);
        var Ls = new ordinary("李四",24,9);
        var resultText =
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四着火了,李四剩余生命：14\n"+
            "李四受到2点火焰伤害,李四剩余生命：12\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：2\n"+
            "李四受到2点火焰伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use flame sword , 战士攻击战士", function(){
        var Zs = new soldier("张三",26,8,flame_sword,armor);
        var Ls = new soldier("李四",24,9,flame_sword,armor);
        var resultText =
            "战士李四用火焰剑攻击了战士张三,张三受到了6点伤害,张三着火了,张三剩余生命：20\n"+
            "张三受到2点火焰伤害,张三剩余生命：18\n"+
            "战士张三用火焰剑攻击了战士李四,李四受到了5点伤害,李四着火了,李四剩余生命：19\n"+
            "李四受到2点火焰伤害,李四剩余生命：17\n"+
            "战士李四用火焰剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：12\n"+
            "张三受到2点火焰伤害,张三剩余生命：10\n"+
            "战士张三用火焰剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：12\n"+
            "李四受到2点火焰伤害,李四剩余生命：10\n"+
            "战士李四用火焰剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：4\n"+
            "战士张三用火焰剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：5\n"+
            "战士李四用火焰剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：-2\n"+
            "张三被打败了.";
        var j=0;
        spyOn(Ls,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.7,0.8,0.5], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[j] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            j++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use ice sword , 战士攻击普通人", function(){
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
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use ice sword , 普通人攻击战士", function(){
        var Zs = new soldier("张三",26,8,ice_sword,armor);
        var Ls = new ordinary("李四",40,9);
        var resultText =
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四冻僵了,李四剩余生命：30\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：20\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：14\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n"+
            "李四冻得直哆嗦，没有击中张三\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use ice sword , 战士攻击战士", function(){
        var Zs = new soldier("张三",26,8,ice_sword,armor);
        var Ls = new soldier("李四",25,9,ice_sword,armor);
        var resultText =
            "战士李四用寒冰剑攻击了战士张三,张三受到了6点伤害,张三冻僵了,张三剩余生命：20\n"+
            "战士张三用寒冰剑攻击了战士李四,李四受到了5点伤害,李四冻僵了,李四剩余生命：20\n"+
            "战士李四用寒冰剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：14\n"+
            "战士张三用寒冰剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：15\n"+
            "战士李四用寒冰剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：8\n"+
            "张三冻得直哆嗦，没有击中李四\n"+
            "李四冻得直哆嗦，没有击中张三\n"+
            "战士张三用寒冰剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：10\n"+
            "战士李四用寒冰剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：2\n"+
            "战士张三用寒冰剑攻击了战士李四,李四受到了5点伤害,李四剩余生命：5\n"+
            "战士李四用寒冰剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：-4\n"+
            "张三被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        var j=0;
        spyOn(Ls,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[j] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            j++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use dizzy hammer , 战士攻击普通人", function(){
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
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use dizzy hammer , 普通人攻击战士", function(){
        var Zs = new soldier("张三",26,8,dizzy_hammer,armor);
        var Ls = new ordinary("李四",40,9);
        var resultText =
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四晕倒了,李四剩余生命：30\n"+
            "李四晕倒了，无法攻击，眩晕还剩：1轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：20\n"+
            "李四晕倒了，无法攻击，眩晕还剩：0轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use dizzy hammer , 战士攻击战士", function(){
        var Zs = new soldier("张三",26,8,dizzy_hammer,armor);
        var Ls = new soldier("李四",25,9,dizzy_hammer,armor);
        var resultText =
            "战士李四用晕锤攻击了战士张三,张三受到了6点伤害,张三晕倒了,张三剩余生命：20\n"+
            "张三晕倒了，无法攻击，眩晕还剩：1轮\n"+
            "战士李四用晕锤攻击了战士张三,张三受到了6点伤害,张三剩余生命：14\n"+
            "张三晕倒了，无法攻击，眩晕还剩：0轮\n"+
            "战士李四用晕锤攻击了战士张三,张三受到了6点伤害,张三剩余生命：8\n"+
            "战士张三用晕锤攻击了战士李四,李四受到了5点伤害,李四晕倒了,李四剩余生命：20\n"+
            "李四晕倒了，无法攻击，眩晕还剩：1轮\n"+
            "战士张三用晕锤攻击了战士李四,李四受到了5点伤害,李四剩余生命：15\n"+
            "李四晕倒了，无法攻击，眩晕还剩：0轮\n"+
            "战士张三用晕锤攻击了战士李四,李四受到了5点伤害,李四剩余生命：10\n"+
            "战士李四用晕锤攻击了战士张三,张三受到了6点伤害,张三剩余生命：2\n"+
            "战士张三用晕锤攻击了战士李四,李四受到了5点伤害,李四剩余生命：5\n"+
            "战士李四用晕锤攻击了战士张三,张三受到了6点伤害,张三剩余生命：-4\n"+
            "张三被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        var j=0;
        spyOn(Ls,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.5,0.6,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[j] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            j++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use sharp sword,带利剑战士攻击普通人", function(){
        var Zs = new soldier("张三",26,8,sharp_sword,armor);
        var Ls = new ordinary("李四",40,9);
        var resultText =
            "战士张三用利剑攻击了普通人李四,张三发动了全力一击,李四受到了30点伤害,李四剩余生命：10\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用利剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i = 0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function(player2){
            var weapon_random_value = [0.2,0.6], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP() * attack_multiple) + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use sharp sword,普通人攻击带利剑的战士", function(){
        var Zs = new soldier("张三",26,8,sharp_sword,armor);
        var Ls = new ordinary("李四",40,9);
        var resultText =
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用利剑攻击了普通人李四,张三发动了全力一击,李四受到了30点伤害,李四剩余生命：10\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用利剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i = 0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function(player2){
            var weapon_random_value = [0.2,0.6], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP() * attack_multiple) + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use sharp sword,带利剑战士攻击带利剑战士", function(){
        var Zs = new soldier("张三",26,8,sharp_sword,armor);
        var Ls = new soldier("李四",40,9,sharp_sword,armor);
        var resultText =
            "战士李四用利剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：20\n"+
            "战士张三用利剑攻击了战士李四,张三发动了全力一击,李四受到了15点伤害,李四剩余生命：25\n"+
            "战士李四用利剑攻击了战士张三,李四发动了全力一击,张三受到了18点伤害,张三剩余生命：2\n"+
            "战士张三用利剑攻击了战士李四,张三发动了全力一击,李四受到了15点伤害,李四剩余生命：10\n"+
            "战士李四用利剑攻击了战士张三,李四发动了全力一击,张三受到了18点伤害,张三剩余生命：-16\n"+
            "张三被打败了.";
        var i = 0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function(player2){
            var weapon_random_value = [0.2,0.4], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        var j = 0;
        spyOn(Ls,'get_string_of_attack_process').andCallFake(function(player2){
            var weapon_random_value = [0.7,0.3,0.4], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[j] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            j++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });

    it("should output correct text and use sharp sword,带利剑战士攻击无武器战士", function(){
        var Zs = new soldier("张三",26,8,null,armor);
        var Ls = new soldier("李四",40,9,sharp_sword,armor);
        var resultText =
            "战士李四用利剑攻击了战士张三,张三受到了6点伤害,张三剩余生命：20\n"+
            "战士张三攻击了战士李四,李四受到了3点伤害,李四剩余生命：37\n"+
            "战士李四用利剑攻击了战士张三,李四发动了全力一击,张三受到了18点伤害,张三剩余生命：2\n"+
            "战士张三攻击了战士李四,李四受到了3点伤害,李四剩余生命：34\n"+
            "战士李四用利剑攻击了战士张三,李四发动了全力一击,张三受到了18点伤害,张三剩余生命：-16\n"+
            "张三被打败了.";
        var i = 0;
        spyOn(Ls,'get_string_of_attack_process').andCallFake(function(player2){
            var weapon_random_value = [0.5,0.4,0.3], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Ls,Zs)).toEqual(resultText);
    });
    
});

describe("4-6`特效累加 ", function(){
    it("should output correct text and use dizzy hammer", function(){
        var Zs = new soldier("张三",26,8,dizzy_hammer,armor);
        var Ls = new ordinary("李四",60,9);
        var resultText =
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四晕倒了,李四剩余生命：50\n"+
            "李四晕倒了，无法攻击，眩晕还剩：1轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四晕倒了,李四剩余生命：40\n"+
            "李四晕倒了，无法攻击，眩晕还剩：2轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：30\n"+
            "李四晕倒了，无法攻击，眩晕还剩：1轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：20\n"+
            "李四晕倒了，无法攻击，眩晕还剩：0轮\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用晕锤攻击了普通人李四,李四受到了10点伤害,李四剩余生命：0\n"+
            "李四被打败了.";
        var i = 0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function(player2){
            var weapon_random_value = [0.2,0.4,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use toxic sword ", function(){
        var Zs = new soldier("张三",26,8,toxic_sword,armor);
        var Ls = new ordinary("李四",60,9);
        var resultText =
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四中毒了,李四剩余生命：50\n"+
            "李四受到2点毒性伤害,李四剩余生命：48\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四中毒了,李四剩余生命：38\n"+
            "李四受到4点毒性伤害,李四剩余生命：34\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：24\n"+
            "李四受到4点毒性伤害,李四剩余生命：20\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：14\n"+
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n"+
            "李四受到4点毒性伤害,李四剩余生命：6\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：10\n"+
            "战士张三用优质毒剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：-4\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.3,0.5,0.5], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use flame sword ", function(){
        var Zs = new soldier("张三",26,8,flame_sword,armor);
        var Ls = new ordinary("李四",60,9);
        var resultText =
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四着火了,李四剩余生命：50\n"+
            "李四受到2点火焰伤害,李四剩余生命：48\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：22\n"+
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四着火了,李四剩余生命：38\n"+
            "李四受到4点火焰伤害,李四剩余生命：34\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：18\n"+
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：24\n"+
            "李四受到4点火焰伤害,李四剩余生命：20\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：14\n"+
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n"+
            "李四受到4点火焰伤害,李四剩余生命：6\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：10\n"+
            "战士张三用火焰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：-4\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.3,0.5,0.5], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });

    it("should output correct text and use ice sword", function(){
        var Zs = new soldier("张三",36,8,ice_sword,armor);
        var Ls = new ordinary("李四",65,9);
        var resultText =
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四冻僵了,李四剩余生命：55\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：32\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四冻僵了,李四剩余生命：45\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：28\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：35\n"+
            "李四冻得直哆嗦，没有击中张三\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：25\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：24\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：15\n"+
            "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：20\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：5\n"+
            "李四冻得直哆嗦，没有击中张三\n"+
            "战士张三用寒冰剑攻击了普通人李四,李四受到了10点伤害,李四剩余生命：-5\n"+
            "李四被打败了.";
        var i=0;
        spyOn(Zs,'get_string_of_attack_process').andCallFake(function (player2){
            var weapon_random_value = [0.2,0.4,0.6,0.5,0.6,0.9], attack_multiple = 1, string_of_attack_process = '';
            if (weapon_random_value[i] < 0.45) {
                if (this.weapon.specific.property == "instantaneous_harm") {
                    string_of_attack_process += this.name + this.weapon.specific.attacking_description;
                    attack_multiple = attack_multiple * 3;
                }
                string_of_attack_process += player2.name + "受到了" +
                player2.get_be_attack_point_damage(this.get_AP()) * attack_multiple + "点伤害," +
                this.get_string_of_weapon_harm_specific(player2);
            } else {
                string_of_attack_process += player2.name + "受到了" + player2.get_be_attack_point_damage(this.get_AP()) + "点伤害,"
            }
            i++;
            this.get_be_attack_HP(player2, attack_multiple);
            return string_of_attack_process
        });
        expect(fight(Zs,Ls)).toEqual(resultText);
    });




});
