function Provider(data){
    this.data=data?data:{};
    this.providers={};
}
Provider.prototype.register=function(give, take ,callback){
    this.providers[give]=
    {
        take:take,
        callback:callback
    }
};
Provider.prototype.provide=function(take,callback){
    var _this=this;
    var required = take.filter( function( el ){
        return typeof _this.data[el] == "undefined";
    });
    this.takeOne(required,callback)
};
Provider.prototype.takeOne=function(take,callback){
    var _this=this;
    if(take.length==0)
        return callback(null,this.data);

    var one=take.shift();
    if(!this.providers[one])
        return callback("No provider for "+one);
    var needed=this.providers[one].take.filter(function(el){
            return typeof _this.data[el] == "undefined";
    });
    if(needed.length)
    {
        take=take.concat(needed.filter(function(el){
            return take.indexOf(el)==-1;
        }));
        take.push(one);
        setImmediate(function(){_this.takeOne(take,callback)});
    }
    else
    {
        this.providers[one].callback(_this.data,function(err, ret){
            if(err)
                callback(err);
            else{
                _this.data[one]=ret;
                setImmediate(function(){_this.takeOne(take,callback)});
            }
        });
    }
}



var prov=new Provider({mica:1});
prov.register("user",["user_id"],function(data,callback){
    callback(null,{user_id:data["user_id"],ime:"pera"});
});
prov.register("user_id",[],function(data,callback){
    callback(null,5);
});
prov.register("pera",["mica","sica"],function(data,callback){
    callback(null,5);
});
prov.register("sica",[],function(data,callback){
    callback(null,5);
});


//middleware
prov.provide(["user","pera"],function(err,data){
    console.log(err,data);
});

module.exports={getProvider: function(data){return new Provider(data)}};
