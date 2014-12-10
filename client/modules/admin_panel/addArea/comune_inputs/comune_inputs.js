Template.comune_inputs.helpers({
	zonas : function(){
		var areas = Areas.find({tipo:'Zona'});
		return areas;
	}
})