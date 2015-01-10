Template.com_lead_inputs.helpers({
	zonas : function(){
		var areas = Areas.find({tipo:'Zona'});
		return areas;
	}
})

Template.com_lead_inputs.events({
	'change #czone' : function(e){
		var z = $('#'+e.currentTarget.id).val();
		var comunas = Areas.find({tipo:'Comuna', zona:z},{codigo:1,_id:0,descripcion:0}).fetch();
		$('#ccomu').find('option').remove();
		$('#ccomu').append('<option disabled selected> -- Selecciona una comuna -- </option>');
		console.log(JSON.stringify(comunas));
		for(var i=0; i<comunas.length; i++){
			$('#ccomu').append('<option value="'+comunas[i].codigo+'">'+comunas[i].descripcion+' - '+comunas[i].codigo+'</option>');
		}
	}
})