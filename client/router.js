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

	this.route('/panel/newProspect/:multi',{
		name : 'addProspect',
		data: function(){
			//var s = Meteor.subscribe('');
			return Prospectos.findOne({'cedula':this.params.multi});
		}
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
			var s = Meteor.subscribe('areas');
			var ss = Meteor.subscribe('colaboradoresDatos');
			ap = Areas.findOne({'codigo':this.params.cc});
			//cargo = "Lider "+ap.tipo;
			if(ap.tipo == 'Zona'){
				cp = Meteor.users.findOne({"profile.tipo":'Lider Zona', "profile.zona":ap.codigo});
			}
			else if(ap.tipo == 'Comuna'){
				cp = Meteor.users.findOne({"profile.tipo":'Lider Comuna', 'profile.comu':ap.codigo});
			}
			else if(ap.tipo == 'Cuadrante'){
				cp = Meteor.users.findOne({"profile.tipo":'Lider Cuadrante', 'profile.cuad':ap.codigo});
			}

			var info ={
				a :ap,
				b :cp
			}
			return info;
		}
	});

	this.route('/panel/filterprospects/:filtername/:filtervalue',{
		name: 'filterProspectsList',
		data: function(){
			//var param = this.params.filter.toString();
			//var p = 0;
			//var m = 1;
			//var p = Prospectos.find({cuadrante:this.params.filtervalue});
			//var m = Prospectos.find({cuadrante:this.params.filtervalue,'esMulti':true});
			fil = this.params.filtername;
			if (fil == 'mult'){
				p = Prospectos.find({'asoMulti':this.params.filtervalue});
				m = Prospectos.find({'esMulti':true});
			}
			else if(fil == 'zona'){
				p = Prospectos.find({'zona':this.params.filtervalue});
				m = Prospectos.find({'zona':this.params.filtervalue,'esMulti':true});
			}
			else if (fil == 'comu'){
				p = Prospectos.find({'comuna':this.params.filtervalue});
				m = Prospectos.find({'comuna':this.params.filtervalue,'esMulti':true});
			}
			else if (fil == 'cuad'){
				p = Prospectos.find({'cuadrante':this.params.filtervalue});
				m = Prospectos.find({'cuadrante':this.params.filtervalue,'esMulti':true});
			}
			
			//var s = Meteor.subscribe('areas');
			//var ss = Meteor.subscribe('colaboradoresDatos');
			//var ap = Areas.findOne({'codigo':this.params.cc});
			//var cargo = "Lider "+ap.tipo;
			/*if(ap.tipo == 'Zona'){
				var cp = Meteor.users.findOne({"profile.tipo":'Lider Zona', "profile.zona":ap.codigo});
			}
			else if(ap.tipo == 'Comuna'){
				var cp = Meteor.users.findOne({"profile.tipo":'Lider Comuna', 'profile.comu':ap.codigo});
			}
			else if(ap.tipo == 'Cuadrante'){
				var cp = Meteor.users.findOne({"profile.tipo":'Lider Cuadrante', 'profile.cuad':ap.codigo});
			}*/

			templateData = {
				a : p,
				b : m
				
			}
			return templateData;
		}
	})

})

