Router.configure({
	layoutTemplate:'layout'
});

Router.map(function(){
	this.route('/',{
		name : 'login'
	});

	this.route('/prospectos',{
		name : 'prospectos'
	});

	this.route('/panel',{
		name : 'adminPanel'
	});

	this.route('/panel/newarea',{
		name : 'addArea'
	});

	this.route('/panel/newcolaborator',{
		name : 'addColaborator'
	});

	this.route('/panel/newProspect',{
		name : 'addProspect'
	});

	this.route('/panel/newMultiplicator',{
		name : 'addMultiplicator'
	});

	this.route('/panel/Welcome',{
		name : 'firstTimeAcces'
	});

	this.route('/panel/listprospects',{
		name : 'listProspects'
	});

	this.route('/panel/listmultiplicators',{
		name : 'listMultiplicators'
	});

	this.route('/panel/listareass',{
		name : 'listAreas'
	});

	this.route('/panel/listcolaborators',{
		name : 'listColaborators'
	})
})

