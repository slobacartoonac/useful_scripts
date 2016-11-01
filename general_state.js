//"Written by Slobodan Zivkovic slobacartoonac@gmail.com"
//general_state.js
//this module is finite state machine

module.exports={
	//conturctor returns automata
general_state:function ()
{
	//object that is returned
	var ret={};
	//initial default state
	ret.state='start';
	//list of transitions
	ret.transitions=
	{
		start:[]
	}
	//runs state machine actions for s_event
	ret.event=function(s_event)
	{
		var transition=ret.transitions[ret.state];
		for(var i=0; i<transition.length;i++)
			if(transition[i].e==s_event){
				//console.log(event+' : '+ret.state+' -> '+transition[i].s);
				ret.state=transition[i].s;
				if(transition[i].r!=null)
					transition[i].r();
				break;
				}
	};
	//set action vfunc for event when in state 
	ret.setFunction=function(vstate,vevent,vfunc)
	{
		var transition=ret.transitions[vstate];
		for(var i=0; i<transition.length;i++)
			if(transition[i].e==vevent){
				//console.log('Set function');
				transition[i].r=vfunc
				break;
				}
	};
	//set action on dstate state
	ret.setFunctionDest=function(dstate,vfunc)
	{
	for (var transname in ret.transitions) 
		if (ret.transitions.hasOwnProperty(transname)) {
			var transition=ret.transitions[transname];
			for(var i=0; i<transition.length;i++){
				if(transition[i].s==dstate){
					//console.log('Set function from '+transname+'-> '+dstate);
					transition[i].r=vfunc
					}
				}
		}
	};
	return ret;
}
}

//test example conect:[{e:'registar',s:'menu',r:null}],
/*
client=this.general_state();
	client.state='conect';
	client.transitions=
	{
		//e-event when trasite| s-state to transite to|r-function to call| 
		conect:[{e:'registar',s:'menu',r:null}],
		menu:[{e:'create',s:'create',r:null},{e:'join',s:'autent',r:null}],
		autent:[{e:'aprove',s:'ingroup',r:null},{e:'exit',s:'menu',r:null}],
		create:[{e:'aprove',s:'ingroup',r:null},{e:'exit',s:'menu',r:null}],
		ingroup:[{e:'ready',s:'ready',r:null},{e:'watch',s:'watch',r:null},{e:'forcestart',s:'watch',r:null},{e:'exit',s:'menu',r:null}],
		ready:[{e:'start',s:'ingame',r:null},{e:'forcestart',s:'ingame',r:null},{e:'exit',s:'ingroup',r:null}],
		ingame:[{e:'die',s:'watch',r:null},{e:'end',s:'posgame',r:null}],
		watch:[{e:'end',s:'posgame',r:null}],
		posgame:[{e:'finish',s:'ingroup',r:null},{e:'forcestart',s:'watch',r:null}]
	};
client.event('registar');
*/



