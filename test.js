var p=require('./pubsub.js');
console.log(p);
var pu=new p();
pu.add("a",function(){console.log('yey!');});
pu.pub('a',{});