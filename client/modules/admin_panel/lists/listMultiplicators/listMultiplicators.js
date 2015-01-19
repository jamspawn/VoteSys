Template.listMultiplicators.helpers({
	'multipliers' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:true, cuadrante:cuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Prospectos.find({esMulti:true, comuna:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Prospectos.find({esMulti:true, zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Prospectos.find({esMulti:true});
		}
		
		return p;
	}
})


Template.listMultiplicators.events({
	'click .btn-success' : function(e){
		var TEMP_accesCode = makepass();
		data = {
			cc : $(e.currentTarget).attr('cc'),
			afk : $(e.currentTarget).attr('ism'),
			keyp : TEMP_accesCode,
			isMultiplicator : true
		}		
	},

	'click #mtpropsclear' : function(e){
		data = '';
	},

	'click #mtprosp' : function(e){
		//alert('here')
		if(data.afk != true){
			Meteor.call('addColaborator', data, function(error,result){
				error,result
			})
			alert('proceso completado');
		}
		else{
			alert('Este prospecto ya es un multiplicador');
		}
		$('#mtpropsclear').click();
	},

	'click .prdetail' : function(e){
		Router.go('prospectDetail', {cc:$(e.currentTarget).attr('cc')});
	}

})

Template.listMultiplicators.rendered = function(){
	Meteor.subscribe('prospectos');
}

function makepass()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}