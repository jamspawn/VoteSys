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