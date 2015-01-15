var m = require('jsmockito').JsMockito;
var fight = require('../src/Fight.js');
var player = require('../src/Player.js');
var soldier = require('../src/Soldier.js');
var ordinary = require('../src/Ordinary.js');
var weapon = require('../src/Weapon.js');
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

xdescribe("1`fight", function () {
    it("should output 李四被打败了", function () {
        var zhangs = new player("张三", 300, 8);
        var lis = new player("李四", 20, 9);
        var console_fake = {
            info: '',
            log: function (text) {
                this.info = text;
            }
        };
        fight(zhangs, lis, console_fake);
        expect(console_fake.info).toEqual("李四被打败了.")
    });
    it("should output 张三被打败了", function () {
        var zhangs = new player("张三", 10, 8);
        var lis = new player("李四", 20, 9);
        var console_fake = {
            info: '',
            log: function (text) {
                this.info = text;
            }
        };
        //var mocked_console = m.spy(console);
        fight(zhangs, lis, console_fake);

        expect(console_fake.info).toEqual("张三被打败了.")
    });

});

xdescribe("2`long sentence", function () {
    it("should output correct text", function () {
        var console_fake = {
            info: '',
            log: function (text) {
                this.info += text;
            }
        };
        var resultText = "张三攻击了李四,李四受到了8点伤害,李四剩余生命：12\n" +
            "李四攻击了张三,张三受到了9点伤害,张三剩余生命：1\n" +
            "张三攻击了李四,李四受到了8点伤害,李四剩余生命：4\n" +
            "李四攻击了张三,张三受到了9点伤害,张三剩余生命：-8\n" +
            "张三被打败了.";
        var zhangs = new player("张三", 10, 8);
        var lis = new player("李四", 20, 9);
        //var mocked_console = m.spy(console);
        fight(zhangs, lis, console_fake);
        expect(console_fake.info).toEqual(resultText);
    });
});

describe("3`职业划分攻击", function () {
    it("should output correct text,3---0`有武器的战士攻击普通人", function () {
        var resultText = "战士张三用优质木棒攻击了普通人李四,李四受到了10点伤害,李四剩余生命：10\n";
        var zhangs = new soldier("张三", 10, 8, weapon, {name: "锁子甲", DR: 5});
        var lis = new ordinary("李四", 20, 9);
        expect(zhangs.attack(lis)).toEqual(resultText);
    });

    it("should output correct text,3---1`普通人攻击没护甲的战士", function () {
        var resultText = "普通人李四攻击了战士张三,张三受到了9点伤害,张三剩余生命：1\n";
        var zhangs = new soldier("张三", 10, 8, weapon, {DR: 0});
        var lis = new ordinary("李四", 20, 9);
        expect(lis.attack(zhangs)).toEqual(resultText);
    });

    it("should output correct text,3---2`普通人攻击有护甲的战士", function () {
        var resultText = "普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命：6\n";
        var zhangs = new soldier("张三", 10, 8, weapon, {name: "锁子甲", DR: 5});
        var lis = new ordinary("李四", 20, 9);
        expect(lis.attack(zhangs)).toEqual(resultText);
    });

    it("should output correct text,3---3`普通人攻击普通人", function () {
        var resultText = "普通人李四攻击了普通人张三,张三受到了9点伤害,张三剩余生命：1\n";
        var zhangs = new ordinary("张三", 10, 8);
        var lis = new ordinary("李四", 20, 9);
        expect(lis.attack(zhangs)).toEqual(resultText);
    });

    it("should output correct text,3---4`有武器的战士攻击有护甲的战士", function () {
        var resultText = "战士李四用优质木棒攻击了战士张三,张三受到了4点伤害,张三剩余生命：6\n";
        var zhangs = new soldier("张三", 10, 8, weapon, {name: "锁子甲", DR: 7});
        var lis = new soldier("李四", 20, 9, weapon, {name: "锁子甲", DR: 5});
        expect(lis.attack(zhangs)).toEqual(resultText);
    });

    it("should output correct text,3---`5没武器的战士攻击有护甲的战士`", function () {
        var resultText = "战士李四攻击了战士张三,张三受到了2点伤害,张三剩余生命：8\n";
        var zhangs = new soldier("张三", 10, 8, weapon, {name: "锁子甲", DR: 7});
        var lis = new soldier("李四", 20, 9, {AP: 0}, {name: "锁子甲", DR: 5});
        expect(lis.attack(zhangs)).toEqual(resultText);
    });

    it("should output correct text,3---6`有武器的战士攻击没护甲的战士", function () {
        var resultText = "战士李四用优质木棒攻击了战士张三,张三受到了11点伤害,张三剩余生命：-1\n";
        var zhangs = new soldier("张三", 10, 8, weapon, {DR: 0});
        var lis = new soldier("李四", 20, 9, weapon, {name: "锁子甲", DR: 5});

        expect(lis.attack(zhangs)).toEqual(resultText);
    });

    it("should output correct text,3---7`没武器的战士攻击没护甲的战士", function () {
        var resultText = "战士李四攻击了战士张三,张三受到了9点伤害,张三剩余生命：1\n";
        var zhangs = new soldier("张三", 10, 8, weapon, {DR: 0});
        var lis = new soldier("李四", 20, 9, {AP: 0}, {name: "锁子甲", DR: 5});
        expect(lis.attack(zhangs)).toEqual(resultText);
    });

});