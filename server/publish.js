Meteor.publish(null, function (){ 
  return Meteor.roles.find({})
})

Meteor.publish('areas', function(){
  return Meteor.areas.find();
});