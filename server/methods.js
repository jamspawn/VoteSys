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
		    {name:"Techsup",email:"alejandro@votesys.com", pass:"12345" , roles:['admin','techsup','jefe-zona','lider-comuna','coordinador-localidad','coordinador-junta','coordinador-multiplicador','multiplicador']},
		    {name:"Techsup2",email:"giovanni@votesys.com", pass:"12345" , roles:['admin','techsup','jefe-zona','lider-comuna','coordinador-localidad','coordinador-junta','coordinador-multiplicador','multiplicador']},
		    {name:"Ghost",email:"ghost@votesys.com" ,pass:"12345" , roles:['admin','techsup','jefe-zona','lider-comuna','coordinador-localidad','coordinador-junta','coordinador-multiplicador','multiplicador']},
		    {name:"TesUser",email:"test@votesys.com" ,pass:"12345" , roles:['jefe-zona','lider-comuna','coordinador-localidad','coordinador-junta','coordinador-multiplicador','multiplicador']}
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
  }
})