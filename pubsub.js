//"Written by Slobodan Zivkovic slobacartoonac@gmail.com"
//pubsub.js

//simple public and subscribe ment for client
function PubSub()
{

    this.events = {}
        
}
PubSub.prototype.add = function (event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    //console.log('subs:' + event + ' ' + this.events[event]);
}
PubSub.prototype.rem = function (event, torem) {
    if (!this.events[event]) return;
    var el = this.events[event];
    this.events[event] = el.filter(function (elem) { return elem != torem });
    //console.log('subs num: ' + this.el.length);
}
PubSub.prototype.pub= function(event, arg) {
    if (!this.events[event]) return;
    var el = this.events[event];
    el.forEach(function (element) {
        element(arg);
    }, this);
}
PubSub.prototype.getSubsNum= function(event) 
{ 
    if (!this.events[event]) return 0; 
    else return this.events[event].length; 
}
module.exports=PubSub;
		