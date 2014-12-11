Meteor.methods({
  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group Company to update permissions for
   */
  updateRoles: function () {
    /*var loggedInUser = Meteor.user()

    if (!loggedInUser) {
      throw new Meteor.Error(403, "Access denied")
    }

    Roles.addUsersToRoles(targetUserId, roles);*/

    var users = [
		    {name:"Techsup",email:"alejandro@votesys.com", pass:"12345" , roles:['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador']},
		    {name:"Techsup2",email:"giovanni@votesys.com", pass:"12345" , roles:['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador']},
		    {name:"Ghost",email:"ghost@votesys.com" ,pass:"12345" , roles:['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador']},
		    {name:"TesUser",email:"test@votesys.com" ,pass:"12345" , roles:['Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador']}
		];
		
		_.each(users, function (user) {
		  var id;

		  id = Accounts.createUser({
		  	username : user.name,
		    email: user.email,
		    password: user.pass,
		    profile: { 
		    	name: user.name,
		    	updated: false
		    }
		  });

		  if (user.roles.length > 0) {
		    // Need _id of existing user record so this call must come 
		    // after `Accounts.createUser` or `Accounts.onCreate`
		    Roles.addUsersToRoles(id, user.roles);
		  }
		});


    //return 'done';
  },

  probandoMetodos: function (hello){
  	return 'Esto se llama desde server '+hello;
  },

  añadiendoRol: function(user){
  	if (user.roles.length > 0) {
	    // Need _id of existing user record so this call must come 
	    // after `Accounts.createUser` or `Accounts.onCreate`
	    Roles.addUsersToRoles(id, user.roles);
	  }
  },

  addColaborator: function(user){
  	var loggedInUser = Meteor.user()

    if (!loggedInUser) {
      throw new Meteor.Error(403, "Access denied")
    }
    else{
    	var id = Accounts.createUser({
		  	username : user.cc,
		    email: user.email,
		    password: user.keyp,
		    profile: { 
		    	updated: false,
		    	keyp : user.keyp,
				tipo :user.tip,
				cc :user.cc,
				email :user.email,
				zona :user.zone,
				comu :user.comu,
				cuad :user.squa
		    }
		});

		Email.send({
			from: "JuanPabloGalloStaff@JPG.com",
			to: user.email,
			subject: "Acceso plataforma",
			text: "Por favor ingresa a votesys.meteor.com con los siguientes datos: \n usuario -> "+user.cc+"\n  password -> "+user.keyp+"\n Y actualiza tu información."
		});
    }
  },

  updateUser: function(data){
  	var uId = Meteor.userId()
	var userData = Meteor.users.find({_id:uId}).fetch();
  	var tempProfile = userData[0].profile;
  	var newProfile = {
  		nombres: data.name,
		apellidos: data.lname,
		direccion: data.addr,
		telefono: data.phon,
		celular: data.mobi
  	}

  	Meteor.users.update({_id:Meteor.userId()},{ $unset : {'profile.keyp':''}});
  	Meteor.users.update({_id:Meteor.userId()},{
  		$set : {
  			username:data.user,
	  		'profile.nombres':data.name,
	  		'profile.apellidos':data.lname,
	  		'profile.direccion':data.addr,
	  		'profile.telefono':data.phon,
	  		'profile.celular':data.mobi,
	  		'profile.updated':true
  		}
  	});
  	Accounts.setPassword(Meteor.userId(), data.pass);

  	if(tempProfile.tipo == 'Lider Zona'){
  		var roles = ['Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador'];
  	}
  	else if(tempProfile.tipo == 'Lider Comuna'){
  		var roles = ['Lider Comuna','Lider Cuadrante','Multiplicador'];
  	}
  	else if(tempProfile.tipo == 'Lider Cuadrante'){
  		var roles = ['Lider Cuadrante','Multiplicador'];
  	}
  	else{
  		var roles = ['Multiplicador'];
  	}  	

  	Roles.addUsersToRoles(uId, roles);

  	Email.send({
		from: "JuanPabloGalloStaff@JPG.com",
		to: tempProfile.email,
		subject: "Actualizacion de datos",
		text: "Actualizacion completada:\n Ahora puedes acceder al sistema con los siguientes datos \n usuario -> "+data.user+"\n  password -> "+data.pass+"\n Y actualiza tu información."
	});
  	//Meteor.users.update({_id:uId},{});
  },

  fixingTechsupp:function(userId){
  	var roles = ['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador'];
  	Roles.setUserRoles(userId, roles);
  }
})