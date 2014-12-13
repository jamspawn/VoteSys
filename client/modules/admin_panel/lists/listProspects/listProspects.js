Template.listProspects.helpers({
	'prospectos' : function(){
		var p = Prospectos.find();
		return p;
	}
})


Template.listProspects.events({
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
	}

})

Template.listProspects.rendered = function(){
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