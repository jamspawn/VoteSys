process.env.MAIL_URL="smtp://JuanPabloGalloTeam%40gmail.com:juanpablo12345@smtp.gmail.com:465/"; 

if ( Meteor.isServer ) {
    Meteor.startup(function () {
    	var existAdmin = Meteor.users.find().count();
    	if(existAdmin == 0){
    		Meteor.call('addAdmin');
    	}
        //Roles.setUserRoles(userId, 'admin')
    });
}