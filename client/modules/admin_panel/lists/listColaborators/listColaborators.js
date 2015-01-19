Template.listColaborators.helpers({
	'colaborators' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			c = {
				nombres:"no autorizado para listas colaboradores"
			}
			scol.stop();
		}
		else if(tipo == "Lider Comuna"){
			var c = Meteor.users.find({_id: { $ne : Meteor.userId() }, 'profile.comu':comu});
		}
		else if(tipo == "Lider Zona"){
			var c = Meteor.users.find({_id: { $ne : Meteor.userId() }, 'profile.zona':zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var c = Meteor.users.find({_id: { $ne : Meteor.userId() } });
		}
		//var c = Meteor.users.find({_id: { $ne : Meteor.userId() } });
		return c;
	}
})


Template.listColaborators.events({
	'click .coldetail' : function(e){
		Router.go('colaboratorDetail', {cc:$(e.currentTarget).attr('cc')});
	}
})

Template.listColaborators.rendered = function(){
	Meteor.subscribe('colaboradoresDatos');
}