Template.zone_lead_inputs.helpers({
	zonas : function(){
		var areas = Areas.find({tipo:'Zona'});
		return areas;
	}
})

Template.zone_lead_inputs.rendered = function(){
	Meteor.subscribe('areas');
}