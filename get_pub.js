//"Written by Slobodan Zivkovic slobacartoonac@gmail.com"
//get_pub.js
//this module is publicing object

module.exports=
{
	get_pub:function()
	{
		var ret={
		el:[],
		//adds function to object to subscribers list
		add:function(toadd)//:function
		{
			this.el.push(toadd);
			console.log('subs num: '+this.el.length);
		},
		//removes function from subscribers list
		rem:function(torem)//:function
		{
			this.el=this.el.filter(function(elem){return elem!=torem});
			console.log('subs num: '+this.el.length);
		},
		//publishes atguments to subscribers list
		pub:function(arg)//:function arguments
		{
			this.el.forEach(function(element) {
				element(arg);
			}, this);
		},
		//returns subcriber number
		getSubsNum:function(){return this.el.length;}
		}
		
		return ret;
	}
}
