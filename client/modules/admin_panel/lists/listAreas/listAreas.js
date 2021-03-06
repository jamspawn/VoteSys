Template.listAreas.helpers({
	'areas' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			sa.stop();
		}
		else if(tipo == "Lider Comuna"){
			var a = Areas.find({'comuna':comu});
		}
		else if(tipo == "Lider Zona"){
			var a = Areas.find({'zona':zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var a = Areas.find();
		}
		return a;
	}
})


Template.listAreas.events({
	'click .areadetail' : function(e){
		Router.go('areaDetail', {cc:$(e.currentTarget).attr('cc')});
	},
	'click .prfilter' : function(e){
		var code = $(e.currentTarget).attr('cc');
		var t = $(e.currentTarget).attr('tipo');
		if(t == "Zona"){
			var tipo='zona';
		}
		else if(t == "Comuna"){
			var tipo='comu';
		}
		else if(t == "Cuadrante"){
			var tipo='cuad';
		}
		//filterstring = 'area'+tipo+code;
		/*alert(filterstring.substring(0,4));
		alert(filterstring.substring(4,8));
		alert(filterstring.substring(8));*/
		Router.go('filterProspectsList', {filtername:tipo,filtervalue:code});
	}
})

Template.listAreas.rendered = function(){
	sa = Meteor.subscribe('areas');
	sc = Meteor.subscribe('colaboradoresDatos');
}