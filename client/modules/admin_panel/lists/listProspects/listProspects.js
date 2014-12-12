Template.listProspects.helpers({
	'prospectos' : function(){
		var p = Prospectos.find();
		return p;
	}
})


Template.listProspects.events({

})

Template.listProspects.rendered = function(){
	Meteor.subscribe('prospectos');
}