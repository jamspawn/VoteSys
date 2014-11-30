Template.logoutbtn.events({
	'click #logoutbutton' : function(e){
		Meteor.logout(function(){
			alert('has cerrado sesion');
			Router.go('login');
		});
	}
})