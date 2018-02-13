var db=db?db:{};
var instances=
{

}
var names=
{

}

function exportDB()
{
	return JSON.stringify(db);
}
function importDB(datastring)
{
	var data=JSON.parse(datastring);
	Object.keys(data).forEach(function(data_id){
		var props={id:data_id};
		Object.keys(data[data_id]).forEach(function(prop){
			props[prop]=data[data_id][prop];
		})
		if(data_id.indexOf('@')===-1)
			new GRModel(props);
		else
			new GRConection(props.type,props.from,props.to, data_id);
	})
}

function GRModel(data)
{
	var props={};
	var _this=this;
	this.links={};
	this._mem_links={};
	if(!data.id) data.id=Math.random().toString()
	if(!db[data.id]) db[data.id]=data;
	this.setProp=function(prop,value)
	{
		if(typeof _this[prop] === 'undefined')
			Object.defineProperty(_this, prop,
			{
				get(){
				var value=db[data.id][prop];
				if(value)
					return value.indexOf('@') !==-1? instances[value].to:value;
				},
				set(val){
					if(val.constructor.name==="GRModel"){
						var con=new GRConection(prop,data.id,val.id);
						return db[data.id][prop]=con.id;
					}
					else
						return db[data.id][prop]=val
					}
			}
		);
		if(typeof value !== 'undefined')
			_this[prop]=value
	}
	this.target=function(type,link){
		if(!_this._mem_links[type])
			_this._mem_links[type]=[];
		if(_this._mem_links[type].indexOf(type)===-1)
			_this._mem_links[type].push(link);
		if(!_this.links[type])
			Object.defineProperty(_this.links, type,
			{
				get(){
					return _this._mem_links[type].map(
						function(el_link){
							return instances[el_link].from;
						});
				}
			})
	};
	Object.keys(data).forEach(function(prop){
		_this.setProp(prop,db[data.id][prop])
	});
	Object.defineProperties(this,props);
	instances[data.id]=this;
	if(data.name)
		names[data.name]=this;
}

function GRConection(type,from,to,id)
{
	var props={};
	var _this=this;
	var data={type:type,from:from,to:to};

	if(!data.id) data.id=id?id:'@'+Math.random().toString()
	if(!db[data.id]) db[data.id]=data;
	Object.keys(data).forEach(function(prop){
		props[prop]={
			get(){
				return (prop==='to'||prop==='from')?instances[db[data.id][prop]]:db[data.id][prop];
			},
			set(val){
					return db[data.id][prop]=val}
		}
	});
	Object.defineProperties(this,props);
	instances[data.id]=this;
	instances[to].target(type,data.id);
}

//TESTS//
/*
var mesureDistance = new GRModel({type: "Mesure", name:"Distance"})
var mesureDuration = new GRModel({type: "Mesure", name:"Duration"})
var mesureProgress = new GRModel({type: "Mesure", name:"Progress"})

var vezbanje=new GRModel({type: "Type",name: "Vezbanje"})
new GRModel({type: "Subtype",name: "Trcanje1111",category: vezbanje })
var trcanje=new GRModel({type: "Subtype",category: vezbanje })
var item = new GRModel({type: "Item", name:new Date().toLocaleString()})
console.log("create")
var val1 = new GRModel({type: "Value", name:"Put", mesure: mesureDistance,subType: trcanje})
var val2 = new GRModel({type: "Value", name:"Vreme", mesure: mesureDuration, subType: trcanje})
console.log("done")



console.log(vezbanje.links.category[0].category.name);
console.log(val1.mesure.name);
console.log(val2.mesure.name);

var data = exportDB();
console.log(data);
console.log("instances", Object.keys(instances).length);

instances={};
db={};
names={};

importDB(data);

console.log(names["Vezbanje"].links.category[1].category.name);
console.log(names["Put"].mesure.name);
console.log(names["Vreme"].mesure.name);
data = exportDB();
console.log("instances", Object.keys(instances).length);
console.log(data);
*/

module.exports=
{
	GRModel:GRModel,
	importDB:importDB,
	exportDB:exportDB,
	getName:function(val)
	{
		return names["Vezbanje"];
	},
	clearDB:function(){
		instances={};
		db={};
		names={};
	}
}