Template.adminNav.events({
	'click .addbutton': function(e){
		var elemento = e.currentTarget.value;
		console.log(elemento);
		if(elemento == 'marea'){
			//alert('agregaras un area');
			window.open(Router.url('addArea'));
		}
		else if(elemento == 'mcolab'){
			//alert('agregaras un colaborador');
			window.open(Router.url('addColaborator'));
		}
		else if(elemento == 'mmult'){
			//alert('agregaras un colaborador');
			window.open(Router.url('addMultiplicator'));
		}
		else{
			//alert('agregaras un prospecto');
			window.open(Router.url('addProspect',{multi:false}));
		}
	},

	'click .listbutton': function(e){
		//e.preventDefault();
		var list = e.currentTarget.value;
		if(list == 'marea'){
			//alert('agregaras un area');
			window.open(Router.url('listAreas'));
		}
		else if(list == 'mcolab'){
			//alert('agregaras un colaborador');
			window.open(Router.url('listColaborators'));
		}
		else if(list == 'mmult'){
			//alert('agregaras un colaborador');
			window.open(Router.url('listMultiplicators'));
		}
		else{
			//alert('veamos prospectos');
			window.open(Router.url('listProspects'));
		}
	}
})