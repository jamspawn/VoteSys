Template.addArea.events({
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
		var ins = Meteor.call('addNewArea', area, function(error, result){
			error,result;
		})

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