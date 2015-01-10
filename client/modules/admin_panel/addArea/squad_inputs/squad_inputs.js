Template.squad_inputs.helpers({
	zonas : function(){
		var areas = Areas.find({tipo:'Zona'});
		return areas;
	}
})

Template.squad_inputs.events({
	'change #aczone' : function(e){
		//alert($('#'+e.currentTarget.id).val());
		var z = $('#'+e.currentTarget.id).val();
		var comunas = Areas.find({tipo:'Comuna', zona:z},{codigo:1,_id:0,descripcion:0}).fetch();
		$('#accomu').find('option').remove();
		$('#accomu').append('<option disabled selected> -- Selecciona una comuna -- </option>');
		console.log(JSON.stringify(comunas));
		for(var i=0; i<comunas.length; i++){
			$('#accomu').append('<option value="'+comunas[i].codigo+'">'+comunas[i].descripcion+' - '+comunas[i].codigo+'</option>');
		}
	}
})