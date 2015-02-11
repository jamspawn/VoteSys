Template.comune_inputs.helpers({
	zonas : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Zona" || tipo == "Lider Comuna"){
			var areas = Areas.find({tipo:'Zona', codigo: zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var areas = Areas.find({tipo:'Zona'});
		}
		return areas;
	}
})