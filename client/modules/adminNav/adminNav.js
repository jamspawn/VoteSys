Template.adminNav.events({
	'click button': function(e){
		var elemento = e.currentTarget.value;
		console.log(elemento);
		if(elemento == 'marea'){
			//alert('agregaras un area');
			Router.go('addArea');
		}
		else if(elemento == 'mcolab'){
			//alert('agregaras un colaborador');
			Router.go('addColaborator');
		}
		else{
			//alert('agregaras un prospecto');
			Router.go('addProspect');
		}
	},

	'click a': function(e){
		e.preventDefault();
		var list = $(e.currentTarget).parent().find('button').attr('value');
		if(list == 'marea'){
			//alert('agregaras un area');
			Router.go('listAreas');
		}
		else if(list == 'mcolab'){
			//alert('agregaras un colaborador');
			Router.go('listColaborators');
		}
		else{
			//alert('veamos prospectos');
			Router.go('listProspects');
		}
	}
})