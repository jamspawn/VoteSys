Template.firstTimeAcces.rendered = function(){
	alert('Bienvenido, es la primea vez que entras')
}

Template.firstTimeAcces.events({


	'submit #updateUser' : function(e){
		e.preventDefault();
		var data = {
			name : $('#uname').val(),
			lname : $('#ulname').val(),
			addr : $('#uaddres').val(),
			phon : $('#uphone').val(),
			mobi : $('#umobile').val(),
			user : $('#username').val(),
			pass : $('#upass').val()
		};
		if($('#upass').val() != $('#ucpass').val()){
			alert('Las contraseñas son diferentes');
		}
		else{
			
			var ius = Meteor.users.find({_id:Meteor.userId()}).fetch();
			console.log(JSON.stringify(ius));
			if(ius[0].profile.updated == false){
				console.log(ius[0].profile.updated);
				
			  	
				//to method

			  	

				//to method

				Meteor.call('updateUser',data, function(error, result){
					error,result
				})

				Meteor.logout(function(){
					alert('Proceso realizado con exito, \n Ingresa nuevamente con tu nueva informacion');
					Router.go('login');
				});
			}
			else{
				alert('El usuario ya esta actualizado');
			}
		}
	}
})