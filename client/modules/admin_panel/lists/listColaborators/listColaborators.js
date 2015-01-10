Template.listColaborators.helpers({
	'colaborators' : function(){
		var c = Meteor.users.find({_id: { $ne : Meteor.userId() } });
		return c;
	}
})


Template.listColaborators.events({

})

Template.listColaborators.rendered = function(){
	Meteor.subscribe('colaboradoresDatos');
}