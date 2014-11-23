Router.configure({
	layoutTemplate:'layout'
});

Router.map(function(){
	this.route('/',{
		name : 'login'
	})

	this.route('/prospectos',{
		name : 'prospectos'
	})
})

