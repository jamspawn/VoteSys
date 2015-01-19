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
	});

	this.route('/panel/listprospects/detail:cc',{
		name: 'prospectDetail',
		data: function(){
			var s = Meteor.subscribe('prospectos');
			return Prospectos.findOne({'cedula':this.params.cc});
		}
	});

	this.route('/panel/listcolaborators/detail:cc',{
		name: 'colaboratorDetail',
		data: function(){
			var s = Meteor.subscribe('colaboradoresDatos');
			return Meteor.users.findOne({'profile.cc':this.params.cc});
		}
	});

	this.route('/panel/listareas/detail:cc',{
		name: 'areaDetail',
		data: function(){
			//var s = Meteor.subscribe('areas');
			//var ss = Meteor.subscribe('colaboradoresDatos');
			var ap = Areas.findOne({'codigo':this.params.cc});
			var cargo = "Lider "+ap.tipo;
			if(ap.tipo == 'Zona'){
				var cp = Meteor.users.findOne({"profile.tipo":'Lider Zona', "profile.zona":ap.codigo});
			}
			else if(ap.tipo == 'Comuna'){
				var cp = Meteor.users.findOne({"profile.tipo":'Lider Comuna', 'profile.comu':ap.codigo});
			}
			else if(ap.tipo == 'Cuadrante'){
				var cp = Meteor.users.findOne({"profile.tipo":'Lider Cuadrante', 'profile.cuad':ap.codigo});
			}

			var info ={
				a :ap,
				b :cp
			}
			return info;
		}
	})

})

