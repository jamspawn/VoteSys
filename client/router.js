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
	})
})

