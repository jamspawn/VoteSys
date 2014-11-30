Template.adminPanel.rendered = function(){
	//var roles = Meteor.roles.find().count();
	//Roles.addUsersToRoles(Meteor.user()._id, ['admin','techsup']);
	//var m = Meteor.call('probandoMetodos','task', function(error, result){console.log(error,result)});
	var userid = Meteor.user()._id;
	var username = Meteor.user().username;
	console.log(username+' -> '+userid);
	/*if (username == 'Techsupp'){
		var roles = ['admin', 'techsup'];
		Meteor.call('updateRoles',[userid,roles], function(error, result){console.log(error, result)});
	}*/
	//if(Meteor.user)

	//alert(Meteor.user()._id);

}