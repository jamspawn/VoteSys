Template.listAreas.helpers({
	'areas' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			sa.stop();
		}
		else if(tipo == "Lider Comuna"){
			var a = Areas.find({'comuna':comu});
		}
		else if(tipo == "Lider Zona"){
			var a = Areas.find({'zona':zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var a = Areas.find();
		}
		return a;
	}
})


Template.listAreas.events({
	'click .areadetail' : function(e){
		Router.go('areaDetail', {cc:$(e.currentTarget).attr('cc')});
	}
})

Template.listAreas.rendered = function(){
	sa = Meteor.subscribe('areas');
	sc = Meteor.subscribe('colaboradoresDatos');
}