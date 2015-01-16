Template.rawreferlist.helpers({
	'multipliers' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:true, cuadrante:cuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Prospectos.find({esMulti:true, comuna:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Prospectos.find({esMulti:true, zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Prospectos.find({esMulti:true});
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
}

Template.rawreferlist.events({
	'click .multili' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('multili','referul');
		$('#'+sulid).toggle(400);
	}
})