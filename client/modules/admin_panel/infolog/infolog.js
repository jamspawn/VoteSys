Template.infolog.helpers({
	'screendata' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()});
		return iusr
	}
})

Template.infolog.rendered = function(){
	
}