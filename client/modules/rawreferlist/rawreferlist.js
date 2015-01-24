Template.rawreferlist.helpers({

	'multipliers' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:true, cuadrante:cuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Prospectos.find({esMulti:true, comuna:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Prospectos.find({esMulti:true, zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Prospectos.find({esMulti:true});
		}
		
		return p;
	}, 

	'zone' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Areas.find({tipo:'Zona',codigo:zone});
		}
		else if(tipo == "Lider Comuna"){
			var p = Areas.find({tipo:'Zona',codigo:zone});
		}
		else if(tipo == "Lider Zona"){
			var p = Areas.find({tipo:'Zona',codigo:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Areas.find({tipo:'Zona'});
		}
		
		return p;
	},

	'comune' : function(pzone){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Areas.find({tipo:'Comuna',codigo:comu});
		}
		else if(tipo == "Lider Comuna"){
			var p = Areas.find({tipo:'Comuna',codigo:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Areas.find({tipo:'Comuna',zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Areas.find({tipo:'Comuna',zona:pzone});
		}
		
		return p;
	},

	'quadrant' : function(comune){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Areas.find({tipo:'Cuadrante',codigo:cuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Areas.find({tipo:'Cuadrante',comuna:comune});
		}
		else if(tipo == "Lider Zona"){
			var p = Areas.find({tipo:'Cuadrante',comuna:comune});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Areas.find({tipo:'Cuadrante',comuna:comune});
		}
		
		return p;
	},

	'cuadleaders' : function(pcuad){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Meteor.users.find({'profile.cuad':pcuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Meteor.users.find({'profile.cuad':pcuad});
		}
		else if(tipo == "Lider Zona"){
			var p = Meteor.users.find({'profile.cuad':pcuad});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Meteor.users.find({'profile.cuad':pcuad});
		}
		
		return p;
	},

	'multipliers' : function(cl){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var cp = iusr[0].profile.cc;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:true, creadoPor:cp});
		}
		else if(tipo == "Lider Comuna"){
			var p = Prospectos.find({esMulti:true, creadoPor:cl});
		}
		else if(tipo == "Lider Zona"){
			var p = Prospectos.find({esMulti:true, creadoPor:cl});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Prospectos.find({esMulti:true, creadoPor:cl});
		}
		
		return p;
	},

	'refers' : function(mult){
		if (mult == 'na'){
			mult = false;
		}
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult, cuadrante:cuad});
		}
		else if(tipo == "Lider Comuna"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult, comuna:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult, zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Prospectos.find({esMulti:false, asoMulti:mult});
		}
		return p;
	}
})

Template.rawreferlist.rendered = function(){
	listraw = Meteor.subscribe('prospectos');
	listrawar = Meteor.subscribe('areas');
	listrawcol = Meteor.subscribe('colaboradoresDatos');
	//colaboradoresDatos
}

Template.rawreferlist.events({
	'click .listcontainer a' : function(e){
		e.preventDefault();
	},
	'click .multili' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('multili','referul');
		$('#'+sulid).toggle(400);
	},
	'click .referul' : function(e){
		e.stopPropagation();
	},
	'click .zoneli' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('zoneli','comuneul');
		$('#'+sulid).toggle(400);
	},
	'click .comuneul' : function(e){
		e.stopPropagation();
	},
	'click .comuneli' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('comuneli','cuadul');
		$('#'+sulid).toggle(400);
	},
	'click .cuadul' : function(e){
		e.stopPropagation();
	},
	'click .cuadli' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('cuadli','cuadlul');
		$('#'+sulid).toggle(400);
	},
	'click .cuadlul' : function(e){
		e.stopPropagation();
	},
	'click .cuadlli' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('cuadlli','multiul');
		$('#'+sulid).toggle(400);
	},
	'click .multiul' : function(e){
		e.stopPropagation();
	},

	/*options buttons*/

		'click .areadetail' : function(e){
			e.stopPropagation();
			//window.open(Router.url('areaDetail', {cc:$(e.currentTarget).attr('cc')}));
			Router.go('areaDetail', {cc:$(e.currentTarget).attr('cc')});
		},
		'click .prfilter' : function(e){
			e.stopPropagation();
			var code = $(e.currentTarget).attr('cc');
			var t = $(e.currentTarget).attr('tipo');
			if(t == "Zona"){
				var tipo='zona';
			}
			else if(t == "Comuna"){
				var tipo='comu';
			}
			else if(t == "Cuadrante"){
				var tipo='cuad';
			}
			window.open(Router.url('filterProspectsList', {filtername:tipo,filtervalue:code}));
			//Router.go('filterProspectsList', {filtername:tipo,filtervalue:code});
		},

		'click .coldetail' : function(e){
			e.stopPropagation();
			window.open(Router.url('colaboratorDetail', {cc:$(e.currentTarget).attr('cc')}));
		},
		'click .colprfilter' : function(e){
			e.stopPropagation();
			//var code = $(e.currentTarget).attr('cc');
			var t = $(e.currentTarget).attr('tipo');
			if(t == "Lider Zona"){
				var tipo='zona';
				var code = $(e.currentTarget).attr('zona');
			}
			else if(t == "Lider Comuna"){
				var tipo='comu';
				var code = $(e.currentTarget).attr('comu');
			}
			else if(t == "Lider Cuadrante"){
				var tipo='cuad';
				var code = $(e.currentTarget).attr('cuad');
			}
			//filterstring = 'area'+tipo+code;
			/*alert(filterstring.substring(0,4));
			alert(filterstring.substring(4,8));
			alert(filterstring.substring(8));*/
			window.open(Router.url('filterProspectsList', {filtername:tipo,filtervalue:code}));
		},

		/*mult and prosp special options*/

			'click .btn-success' : function(e){
				e.stopPropagation();
				var TEMP_accesCode = makepass();
				data = {
					cc : $(e.currentTarget).attr('cc'),
					afk : $(e.currentTarget).attr('ism'),
					keyp : TEMP_accesCode,
					isMultiplicator : true
				}		
			},

			'click #mtpropsclear' : function(e){
				e.stopPropagation();
				data = '';
			},

			'click #mtprosp' : function(e){
				e.stopPropagation();
				//alert('here')
				if(data.afk != true){
					Meteor.call('addColaborator', data, function(error,result){
						error,result
					})
					alert('proceso completado');
				}
				else{
					alert('Este prospecto ya es un multiplicador');
				}
				$('#mtpropsclear').click();
			},

			'click .prdetail' : function(e){
				e.stopPropagation();
				window.open(Router.url('prospectDetail', {cc:$(e.currentTarget).attr('cc')}));

			},
		/*mult and prosp special options*/

	/*options buttons*/
})

function makepass()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}