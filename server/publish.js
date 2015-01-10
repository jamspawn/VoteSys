if (Meteor.isServer) {

	Meteor.publish(null, function (){ 
	  return Meteor.roles.find({})
	})

	Meteor.publish('areas', function(){
		return Areas.find();
	});

	Meteor.publish('colaboradores', function(){
	  return Colaboradores.find();
	});

	Meteor.publish('prospectos', function(){
	  return Prospectos.find();
	});

	/*Meteor.publish('multiplicadores', function(){
	  return Prospectos.find({'multiplicador':'1'});
	});*/

	Meteor.publish('colaboradoresDatos',function(){
		return Meteor.users.find({'profile.cc':{$exists:true}},{fields:{profile:1}});
	})
}