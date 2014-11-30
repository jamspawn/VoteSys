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
		}
		else{
			//alert('agregaras un prospecto');
		}
	}
})