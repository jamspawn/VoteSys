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
		    {name:"Techsup",email:"alejandro@votesys.com", pass:"12345" , roles:['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador'], group:'soporte'},
		    {name:"Techsup2",email:"giovanni@votesys.com", pass:"12345" , roles:['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador'], group:'soporte'},
		    {name:"Ghost",email:"ghost@votesys.com" ,pass:"12345" , roles:['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador'], group:'soporte'},
		    {name:"TesUser",email:"test@votesys.com" ,pass:"12345" , roles:['Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador'], group:'prueba'}
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
      if(!user.isMultiplicator){
        var id = Accounts.createUser({
          username : user.cc,
          //email: user.email,
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
      else{
        /*var origin = Prospectos.find({cedula:user.cc}).fetch()[0];
        var id = Accounts.createUser({
          username : user.cc,
          //email: user.email,
          password: user.keyp,
          profile: { 
            updated: false,
            keyp : user.keyp,
            tipo :'Multiplicador',
            cc :user.cc,
            email :origin.email,
            zona :origin.zona,
            comu :origin.comuna,
            cuad :origin.cuadrante,
            nombres:origin.nombres,
            apellidos :origin.apellidos,
            direccion :origin.direccion,
            telefono :origin.telefono,
            celular :origin.celular,
            creadoPor :origin.creadoPor
          }
        });*/

        Prospectos.update({cedula:user.cc},{$set : {esMulti:true}});

        //user.email = origin.email;
      }
      /*
      Email.send({
        from: "JuanPabloGalloStaff@JPG.com",
        to: user.email,
        subject: "Acceso plataforma",
        text: "Por favor ingresa a votesys.meteor.com con los siguientes datos: \n usuario -> "+user.cc+"\n  password -> "+user.keyp+"\n Y actualiza tu información."
      }); 
      */
    }
  },

  updateUser: function(data){
    var uId = Meteor.userId()
    var userData = Meteor.users.find({_id:uId}).fetch();
  	var tempProfile = userData[0].profile;

  	Meteor.users.update({_id:Meteor.userId()},{ $unset : {'profile.keyp':''}});
    if(!data.isMultiplicator){
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
    }
    else{
      Meteor.users.update({_id:Meteor.userId()},{
        $set : {
          username:data.user,
          'profile.updated':true
        }
      });
    }
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
  	var roles = ['admin','techsup','Lider Zona','Lider Comuna','Lider Cuadrante','Multiplicador','Test'];
  	Roles.setUserRoles(userId, roles);
  },

  addProspects: function(data){
    var user = Meteor.users.find({_id : Meteor.userId()}).fetch();

    data.zona = user[0].profile.zona;
    data.comu = user[0].profile.comu;
    data.cuad = user[0].profile.cuad;
    data.addedby = user[0].profile.cc;

    if(!data.mult){
      data.mult = false;
    }

    var exist = Prospectos.find({cedula:data.cc}).count();
    if(exist>0){
      throw new Meteor.Error(500, "Registrado con esta cedula");
    }
    else{
      Prospectos.insert({
        categoria: data.cate,
        nombres: data.name,
        apellidos: data.lname,
        cedula: data.cc,
        email: data.mail,
        esMulti: data.mult,
        direccion: data.addr,
        telefono: data.phon,
        celular: data.mobil,
        ocupacion: data.prof,
        matricula: data.matr,
        zona: data.zona,
        comuna: data.comu,
        cuadrante: data.cuad,
        creadoPor: data.addedby,
        longitud: data.longi,
        latitud: data.latit,
        notas: data.notas,
        asoMulti: false

      });

      return 'Creado con exito'
    }

  },

  asoMult: function(user){
    var loggedInUser = Meteor.user()
    if (!loggedInUser) {
      throw new Meteor.Error(403, "Access denied")
    }
    else{
      Prospectos.update({cedula:user.cc},{$set : {asoMulti:user.asm}});
    }
  }
})