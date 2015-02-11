Template.firstTimeAcces.rendered = function(){
	alert('Bienvenido, es la primea vez que entras')
	var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
	mult = iusr[0].profile.tipo;
	console.log(JSON.stringify(iusr));
	if(mult  == 'Multiplicador'){
		$('.control-group').each(function(){
			var t = $(this).find('label').attr('for');
			if(t != 'username' && t != 'ucpass' && t != 'usend' && t != 'upass' ){
				$(this).remove();
			}
		});
	}
}

Template.firstTimeAcces.events({


	'submit #updateUser' : function(e){
		e.preventDefault();
		if(mult == 'Multiplicador'){
			var data = {
				isMultiplicator : true,
				user : $('#username').val(),
				pass : $('#upass').val()
			};
		}
		else{
			var data = {
				name : $('#uname').val(),
				lname : $('#ulname').val(),
				addr : $('#uaddres').val(),
				phon : $('#uphone').val(),
				mobi : $('#umobile').val(),
				user : $('#username').val(),
				pass : $('#upass').val()
			};
		}
		if($('#upass').val() != $('#ucpass').val()){
			alert('Las contraseñas son diferentes');
		}
		else{
			
			var ius = Meteor.users.find({_id:Meteor.userId()}).fetch();
			console.log(JSON.stringify(ius));
			if(ius[0].profile.updated == false){
				
				
			  	
				//to method

			  	

				//to method

				Meteor.call('updateUser',data, function(error, result){
					if(result == "existent"){
						alert('no se ha podido completar, el nombre de usuario ingresado ya existe');
					}
					else if(result == "done"){
						Meteor.logout(function(){
							//console.log(ius[0].profile.updated);
							alert('Proceso realizado con exito, \n Ingresa nuevamente con tu nueva informacion');
							Router.go('login');
						});
					}
				})

				
			}
			else{
				alert('El usuario ya esta actualizado');
			}
		}
	}
})