Template.pereiracambia.rendered = function(){
	//var haveuser = Meteor.users.find().count();
	//console.log(haveuser);
	/*if (haveuser == 0){
		var firstAdmin;
		firstAdmin = Accounts.createUser({
	        username: "Techsupp",
	        email:    "alejandro@vifuy.com",
	        password: "12345",
	        profile: {
	          name: "Soporte tecnico"
	        }
	    }, function (error) {
	        if (error) {
	          console.log("Cannot create user");
	        }
      	});

		Roles.addUsersToRoles(firstAdmin, ['admin','techsup']);
	}*/
	$('body').css('background','white')
	Meteor.call('updateRoles',function(error, result){error, result});
	$('#header').find('img').attr('src','imgs/pereiracambia.jpg');
}

Template.pereiracambia.events({
	'click #loginbutton' : function(e,template){
		e.preventDefault();
		Meteor.loginWithPassword(
			template.find("#inputUser").value,
			template.find("#inputPassword").value,
			function(error) {
				if (error) {
					alert('Acceso restringido');
				}
				else{
					console.log('Logging in succeeded');
	                Router.go('/Panel');
				}
		});	
	}
})