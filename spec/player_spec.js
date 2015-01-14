var m = require('jsmockito').JsMockito;
var fight = require('../src/Fight.js');
var player = require ('../src/Player.js');

//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("fight", function(){
    it("should output 李四被打败了", function(){
        var zhangs = new player("张三",300,8);
        var lis = new player("李四",20,9);
        var console_fake = {
            info:'',
            log:function(text){
                this.info = text;
            }
        };
        fight(zhangs,lis,console_fake);
      expect(console_fake.info).toEqual("李四被打败了.")
    });
    it("should output 张三被打败了", function(){
        var zhangs = new player("张三",10,8);
        var lis = new player("李四",20,9);
        var console_fake = {
            info:'',
            log:function(text){
                this.info = text;
            }
        };
        //var mocked_console = m.spy(console);
        fight(zhangs,lis,console_fake);

       expect(console_fake.info).toEqual("张三被打败了.")
    });

});

describe("2", function(){
    it("should output correct text", function(){
        var console_fake = {
            info:'',
            log:function(text){
                this.info += text;
            }
        };
        var resultText = "张三攻击了李四,李四受到了8点伤害,李四剩余生命：12\n"+
        "李四攻击了张三,张三受到了9点伤害,张三剩余生命：1\n"+
        "张三攻击了李四,李四受到了8点伤害,李四剩余生命：4\n"+
        "李四攻击了张三,张三受到了9点伤害,张三剩余生命：-8\n"+
        "张三被打败了.";
        var zhangs = new player("张三",10,8);
        var lis = new   player("李四",20,9);
        //var mocked_console = m.spy(console);
        fight(zhangs,lis,console_fake);
        expect(console_fake.info).toEqual(resultText);
    });
        
    
         
            
});
