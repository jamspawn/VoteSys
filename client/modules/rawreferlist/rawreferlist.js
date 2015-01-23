Template.rawreferlist.helpers({
	'zone' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Areas.find({tipo:'Zona',codigo:zone});
		}
		else if(tipo == "Lider Comuna"){
			var p = Areas.find({tipo:'Zona',codigo:zone});
		}
		else if(tipo == "Lider Zona"){
			var p = Areas.find({tipo:'Zona',codigo:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Areas.find({tipo:'Zona'});
		}
		
		return p;
	},

	'comune' : function(pzone){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Areas.find({tipo:'Comuna',codigo:comu});
		}
		else if(tipo == "Lider Comuna"){
			var p = Areas.find({tipo:'Comuna',codigo:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Areas.find({tipo:'Comuna',zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Areas.find({tipo:'Comuna',zona:pzone});
		}
		
		return p;
	},

	'quadrant' : function(comune){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Areas.find({tipo:'Cuadrante',codigo:cuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Areas.find({tipo:'Cuadrante',comuna:comune});
		}
		else if(tipo == "Lider Zona"){
			var p = Areas.find({tipo:'Cuadrante',comuna:comune});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Areas.find({tipo:'Cuadrante',comuna:comune});
		}
		
		return p;
	},

	'cuadleaders' : function(pcuad){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Meteor.users.find({cuadrante:pcuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Meteor.users.find({cuadrante:pcuad});
		}
		else if(tipo == "Lider Zona"){
			var p = Meteor.users.find({cuadrante:pcuad});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Meteor.users.find({cuadrante:pcuad});
		}
		
		return p;
	},

	'multipliers' : function(cl){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var cp = iusr[0].profile.cc;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:true, creadoPor:cp});
		}
		else if(tipo == "Lider Comuna"){
			var p = Prospectos.find({esMulti:true, creadoPor:cl});
		}
		else if(tipo == "Lider Zona"){
			var p = Prospectos.find({esMulti:true, creadoPor:cl});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Prospectos.find({esMulti:true, creadoPor:cl});
		}
		
		return p;
	},

	'refers' : function(mult){
		if (mult == 'na'){
			mult = false;
		}
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult, cuadrante:cuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult, comuna:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult, zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult});
		}
		return p;
	}
})

Template.rawreferlist.rendered = function(){
	listraw = Meteor.subscribe('prospectos');
	listrawar = Meteor.subscribe('areas');
	listrawcol = Meteor.subscribe('colaboradoresDatos');
	//colaboradoresDatos
}

Template.rawreferlist.events({
	'click .multili' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('multili','referul');
		$('#'+sulid).toggle(400);
	},
	'click .referul' : function(e){
		e.stopPropagation();
	}
})