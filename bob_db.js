//"Written by Slobodan Zivkovic slobacartoonac@gmail.com"
//bob_db.js
//"dummy data base working on filesystem"

//use on small aplications for unecnripted saveing data
//Insipration was bad DB-s for node.js


var fs=require('fs');
module.exports=
{
	//returns database sitting on file
	create:function(file)
	{
		var ret={data: {},file:file,
		//add key value (any)
		add:function(key,value)
		{
			if(!this.data[key]) this.data[key]=value;
			else console.log("Key is exists allready");
		}
		//changes value
		,update:function(key,value)
		{
			if(this.data[key]) this.data[key]=value;
			else console.log("Key does not exitst");
		},
		//removes element
		remove:function(key)
		{
			if(this.data[key]) delete this.data[key];
			else console.log("Key not existing");
		},
		//returns element
		get:function(key)
		{
			if(this.data[key]) return this.data[key];
			else console.log("Key not existing");
		},
		//saves DB
		save:function()
		{
			fs.writeFileSync(this.file, JSON.stringify(this.data)); 
		},
		//loads DB
		load:function(){
		this.data=JSON.parse(fs.readFileSync(this.file))
		},
		//check if element existing
		taken:function(key)
		{
			return this.data.hasOwnProperty(key);
		},
		
		getAll:function()
		{
			var arr=[]
			for (var key in this.data) {
  				if (this.data.hasOwnProperty(key)) {
    				arr.push(this.data[key]);
  				}
			}
			return arr;
		}};
		return ret;
	}
}
/*
var db=module.exports.create('db.txt');
console.log(db.data);
db.add(1,'paja');
console.log(db.data);
db.add(1,'raja');
console.log(db.data);
db.add(2,'saja');
console.log(db.data);
db.update(1,'gica');
console.log(db.data);
db.update(3,'pica');
console.log(db.data);
db.remove(2);
console.log(db.data);
db.remove(4);
console.log(db.data);
db.get(1);
console.log(db.data);
db.get(5);
console.log(db.data);
db.save();
console.log(db.data);
db.load();
console.log(db.data);
console.log(db.taken(2));
console.log(db.taken(1));*/