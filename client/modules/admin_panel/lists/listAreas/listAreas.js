Template.listAreas.helpers({
	'areas' : function(){
		var a = Areas.find();
		return a;
	}
})


Template.listAreas.events({

})

Template.listAreas.rendered = function(){
	Meteor.subscribe('areas');
}