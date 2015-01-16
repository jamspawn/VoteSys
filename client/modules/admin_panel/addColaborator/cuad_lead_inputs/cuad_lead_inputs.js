Template.cuad_lead_inputs.helpers({
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

Template.cuad_lead_inputs.events({
	'change #czone' : function(e){
		var z = $('#'+e.currentTarget.id).val();

		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Comuna"){
			var comunas = Areas.find({tipo:'Comuna', codigo:comu, zona:z},{codigo:1,_id:0,descripcion:0}).fetch();
		}
		else if(tipo == "techsup" || tipo == "Lider Zona" || tipo == "admin"){
			var comunas = Areas.find({tipo:'Comuna', zona:z},{codigo:1,_id:0,descripcion:0}).fetch();
		}
		$('#ccomu').find('option').remove();
		$('#ccuad').find('option').remove();
		$('#ccomu').append('<option disabled selected> -- Selecciona una comuna -- </option>');
		$('#ccuad').append('<option disabled selected> -- Selecciona un cuadrante -- </option>');
		console.log(JSON.stringify(comunas));
		for(var i=0; i<comunas.length; i++){
			$('#ccomu').append('<option value="'+comunas[i].codigo+'">'+comunas[i].descripcion+' - '+comunas[i].codigo+'</option>');
		}
	},
	'change #ccomu' : function(e){
		var z = $('#'+e.currentTarget.id).val();
		var cuads = Areas.find({tipo:'Cuadrante', comuna:z},{codigo:1,_id:0,descripcion:0}).fetch();
		$('#ccuad').find('option').remove();
		$('#ccuad').append('<option disabled selected> -- Selecciona un cuadrante-- </option>');
		console.log(JSON.stringify(cuads));
		for(var i=0; i<cuads.length; i++){
			$('#ccuad').append('<option value="'+cuads[i].codigo+'">'+cuads[i].descripcion+' - '+cuads[i].codigo+'</option>');
		}
	}
})