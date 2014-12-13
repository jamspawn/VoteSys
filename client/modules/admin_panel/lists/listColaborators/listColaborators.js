Template.listColaborators.helpers({
	'colaborators' : function(){
		var c = Meteor.users.find();
		return c;
	}
})


Template.listColaborators.events({

})

Template.listColaborators.rendered = function(){
	Meteor.subscribe('colaboradoresDatos');
}