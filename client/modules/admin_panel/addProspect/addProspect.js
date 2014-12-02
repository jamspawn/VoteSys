Template.addProspect.events({
	'click #atype li' : function(e){
		var valor = $('#'+e.currentTarget.id).find('a').html();
		$('#adescription').val(valor);
	},
	'submit #add-area' : function(e){
		e.preventDefault();
		var area = {
			desc : $('#adescription').val(),
			cod : $('#acode').val()
		}
		var loggedInUser = Meteor.user()

	    if (loggedInUser) {
	    	if (Roles.userIsInRole(loggedInUser, ['admin','techsup'])){
	    		var ae = Areas.find({descripcion:area.desc, codigo:area.cod}).count();
	    		if(ae == 0){
					Areas.insert({
						descripcion: area.desc,
						codigo: area.cod
					});
					alert(area.desc+' creada con exito');
				}
				else{
					alert('esta '+area.desc+' ya existe en el sistema');
				}
		    }
	      
	    }
	    else{
	    	throw new Meteor.Error(403, "Access denied")
	    }

		var es = Meteor.call('probandoMetodos', function(error, result){
			error,result;
		})

		console.log(ins+' '+es);

		if(ins == 1){
			alert('Area creada');
		}
		else if(ins == 2){
			alert('El area ya existe');
		}
	}

})

Template.addProspect.rendered = function(){
	Meteor.subscribe('colaboradores');
}