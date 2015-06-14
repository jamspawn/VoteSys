Template.rawreferlist_backup.helpers({
	'leadzonecode' : function(areacode){
		var q1 = Meteor.users.find({'profile.tipo':'Lider Zona','profile.zona':areacode});

		if(q1.count()>0){
			q2 = q1.fetch()[0];
			q3 = q1.fetch()[0].profile.updated;
		}

		if(q1.count()>0){
			Session.set('currentMail', q2.profile.email);
			var r = q2.profile.cc;
		}
		else{
			var r = 'No asignado';
		}
		//var r = areacode.length;
		return r;
	},

	'leadcomunecode' : function(areacode){
		var q1 = Meteor.users.find({'profile.tipo':'Lider Comuna','profile.comu':areacode});

		if(q1.count()>0){
			q2 = q1.fetch()[0];
			q3 = q1.fetch()[0].profile.updated;
		}

		if(q1.count()>0){
			Session.set('currentMail', q2.profile.email);
			var r = q2.profile.cc;
		}
		else{
			var r = 'No asignado';
		}
		//var r = areacode.length;
		return r;
	},

	'mailvalue' : function(){
		return Session.get('currentMail');
	},

	/*'leadquadcode' : function(areacode){
		var q1 = Meteor.users.find({'profile.tipo':'Lider Comuna','profile.comuna':areacode});

		if(q1.count()>0){
			q2 = q1.fetch()[0];
			q3 = q1.fetch()[0].profile.updated;
		}

		if(q1.count()>0){
			if(q3 == true){
				var r = q2.profile.cc;
			}
			else {
				var r = 'No actualizado';
			}	
		}
		else{
			var r = 'No asignado';
		}
		//var r = areacode.length;
		return r;
	},*/

	'zonah' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Comuna"){
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

	'comunah' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		if(tipo == "Lider Comuna"){
			var p = Areas.find({tipo:'Comuna',codigo:comu});
		}
		else if(tipo == "Lider Zona"){
			var p = Areas.find({tipo:'Comuna',zona:zone});
		}
		else if(tipo == "techsup" || tipo == "admin"){
			var p = Areas.find({tipo:'Comuna',zona:Session.get('zonah')});
		}
		
		return p;
	},

	'quadrah' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var p = Areas.find({tipo:'Cuadrante',comuna:Session.get('comunah')});		
		return p;
	},

	'quadrahlead' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var cc = iusr[0].profile.cc;
		if(Session.get('quadrah')!=null){
			var p = Meteor.users.find({'profile.cuad':Session.get('quadrah')})
		}
		else{
			p = null;
		}
		return p;
	},

	'colabtag' : function(areacode){
		if(areacode.length == 2){
			var q1 = Meteor.users.find({'profile.tipo':'Lider Zona','profile.zona':areacode});
		}
		else if(areacode.length > 3 && areacode.length < 6){
			var q1 = Meteor.users.find({'profile.tipo':'Lider Comuna','profile.comu':areacode});
		}

		if(q1.count()>0){
			q2 = q1.fetch()[0];
			q3 = q1.fetch()[0].profile.updated;
		}

		if(q1.count()>0){
			if(q3 == true){
				var r = q2.profile.nombres+' '+q2.profile.apellidos+' - '+q2.profile.celular+' / '+q2.profile.telefono;
			}
			else {
				var r = 'No actualizado';
			}	
		}
		else{
			var r = 'No asignado';
		}
		//var r = areacode.length;
		return r;
	},

	'multipliah' : function(){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var p = Prospectos.find({esMulti:true, creadoPor:Session.get('cuadlead')});
		
		return p;
	},

	'prospectscount' : function(){
		var c = Prospectos.find().count();
		return c;
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
			var p = Areas.find({tipo:'Zona'}, {sort: {codigo:1}});
		}
		
		return p;
	},

	'zonecount' : function(p){
		var c = Prospectos.find({zona:p}).count();
		return c;
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

	'comunecount' : function(p){		
		var c = Prospectos.find({comuna:p}).count();
		return c;
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

	'quadrantcount' : function(p){		
		var c = Prospectos.find({cuadrante:p}).count();
		return c;
	},

	'cuadleaders' : function(pcuad){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var cc = iusr[0].profile.cc;
		if(tipo == "Lider Cuadrante"){
			var p = Meteor.users.find({'profile.cuad':pcuad,'profile.cc':cc});
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

	'cuadleaderscount' : function(p){		
		var c = Prospectos.find({creadoPor:p}).count();
		return c;
	},

	'multipliers' : function(cl){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var cp = iusr[0].profile.cc;
		if(tipo == "Lider Cuadrante"){
			var p = Prospectos.find({esMulti:true, creadoPor:cl});
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

	'multiplierscount' : function(p){		
		var c = Prospectos.find({asoMulti:p}).count();
		return c;
	},

	'refers' : function(mult){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var p = Prospectos.find({esMulti:false, asoMulti:mult});
		return p;
	},

	'narefers' : function(cp){
		var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
		var tipo = iusr[0].profile.tipo;
		var zone = iusr[0].profile.zona;
		var comu = iusr[0].profile.comu;
		var cuad = iusr[0].profile.cuad;
		var p = Prospectos.find({esMulti:false, asoMulti:false, creadoPor:cp});
		return p;
	}
})

Template.rawreferlist_backup.rendered = function(){
	Session.set('zonah', null);
	Session.set('comunah', null);
	Session.set('quadrah', null);
	Session.set('quadrahlead', null);
	Session.set('currentMail', null);
	listraw = Meteor.subscribe('prospectos');
	listrawar = Meteor.subscribe('areas');
	listrawcol = Meteor.subscribe('colaboradoresDatos');
}

Template.rawreferlist_backup.events({
	'click .listcontainer a' : function(e){
		e.preventDefault();
	},
	'click .multili' : function(e){
		var id = $(e.currentTarget).attr('id');
		var sulid = id.replace('multili','referul');
		if($(e.currentTarget).hasClass('notas')){
			if($("[id='"+sulid+"']").children().length == 0){
				loadRefers('na',id);
			}
		}else{
			if($("[id='"+sulid+"']").children().length == 0){
				loadRefers(id);
			}
		}
		$("[id='"+sulid+"']").toggle(400);
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
		console.log($("[id='"+sulid+"']").children().length);
		if($("[id='"+sulid+"']").children().length == 1){
			loadMultis(id);
		}

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
			'click #addrefer' : function(e){
				e.stopPropagation();
				var c = $(e.currentTarget).attr('cc');
				window.open(Router.url('addProspect',{multi:c}));
			},

			'click #tomulti' : function(e){
				//e.stopPropagation();
				//alert('make-me')
				$('#prosptomult').modal('show');
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

			'click #prosaso' : function(e){
				//alert('here')
				
				data.asm = $('#asimult').val();
				if(!data.asm){
					alert('seleccione un multiplicador de la lista')
				}
				else{
					Meteor.call('asoMult', data, function(error,result){
						error,result
					})
					//alert(JSON.stringify(data));
					alert('proceso completado');
					$('#prosasoclear').click();
				}
			},

			'click #prosasoclear' : function(e){
				data = '';
			},

			'click .asignmulbutn' : function(e){
				var cuadlead = $(e.currentTarget).parents('.cuadlli').attr('cc');
				//alert(cuadlead);
				Session.set('cuadlead',cuadlead);
				$('#prosasomult').modal('show');
				data = {
					cc : $(e.currentTarget).attr('cc'),
					//afk : $(e.currentTarget).attr('asm'),
					asm : false
				}
				//alert(JSON.stringify(data));		
			},

			'click .changecuadlead' : function(e){
				e.stopPropagation();
				data = '';
				Session.set('currentMulti', $(e.currentTarget).attr('cc'));
				$('#multcuadlead').modal('show');
			},

			'change #asizone' : function(e){
				Session.set('zonah', $(e.currentTarget).val());
				Session.set('comunah', null);
				Session.set('quadrah', null);
				Session.set('quadrahlead', null);
			},

			'change #asicomu' : function(e){
				Session.set('comunah', $(e.currentTarget).val());
				Session.set('quadrah', null);
				Session.set('quadrahlead', null);
			},

			'change #asiquad' : function(e){
				Session.set('quadrah', $(e.currentTarget).val());
				Session.set('quadrahlead', null);
			},

			'change #asiquadlead' : function(e){
				Session.set('quadrahlead', $(e.currentTarget).val());
			},

			'click #multcuadleadclear' : function(e){
				data = '';
			},

			'click #multquadgo' : function(e){
				//alert('here')
				data = {
					zona:Session.get('zonah'),
					comuna:Session.get('comunah'),
					cuadrante:Session.get('quadrah'),
					lider:Session.get('quadrahlead'),
					multi:Session.get('currentMulti')
				}
				//data.asm = $('#asimult').val();
				if(data.zona == null || data.comuna==null || data.cuadrante==null || data.lider==null || data.multi==null){
					alert('Falta informacion para realizar el traslado');
				}
				else{
					Meteor.call('trasMult', data, function(error,result){
						//error,result
						alert(result);
						$('#multcuadleadclear').click();
					})
					//alert(JSON.stringify(data));
					//alert('proceso completado');
					//$('#prosasoclear').click();
				}
			},
		/*mult and prosp special options*/

		/* Delete stuff */

			'click .areadelete' : function(e){
				e.stopPropagation();
				var code = $(e.currentTarget).attr('cc');
				var r = confirm("Esta apunto de eliminar esta area");
				if (r == true) {
				    Meteor.call('remoArea', code, function(error,result){
						//error,result
						alert(result);
						//$('#multcuadleadclear').click();
					})
				}
				
			},
			'click .coldelete' : function(e){
				e.stopPropagation();
				var code = $(e.currentTarget).attr('cc');
				var r = confirm("Esta apunto de eliminar este colaborador");
				if (r == true) {
				    Meteor.call('remoColab', code, function(error,result){
						//error,result
						alert(result);
						//$('#multcuadleadclear').click();
					})
				}
			},
			'click .refdelete' : function(e){
				e.stopPropagation();
				var code = $(e.currentTarget).attr('cc');
				var r = confirm("Esta apunto de eliminar este referido");
				if (r == true) {
				    Meteor.call('remoProsp', code, function(error,result){
						//error,result
						alert(result);
						//$('#multcuadleadclear').click();
					})
				}
			},
			'click .multdelete' : function(e){
				e.stopPropagation();
				codeToDrop = $(e.currentTarget).attr('cc');
				$('#dropmulti').modal('show');
			},

			'click #multidrop1' : function(e){
				Meteor.call('remoMultiandPros', codeToDrop, function(error,result){
					//error,result
					alert(result);
					//$('#multcuadleadclear').click();
				})
				$('#dropmulti').modal('hide');
			},
			'click #multidrop2' : function(e){
				Meteor.call('remoMulti', codeToDrop, function(error,result){
					//error,result
					alert(result);
					//$('#multcuadleadclear').click();
				})
				$('#dropmulti').modal('hide');
			},
			'click #multidrop3' : function(e){
				codeToDrop = '';
				$('#dropmulti').modal('hide');
			},


		/* Delete stuff */

		/* Reset stuff */

			'click .resetleader' : function(e){
				e.stopPropagation();
				data = {
					cc:$(e.currentTarget).attr('cc'),
					keyp:makepass()
				}
				$('#colabresete').modal('show');
			},

			'click #colreset' : function(e){
				e.preventDefault();
				data.email = $('#emailreset').val();
				if(data.cc == 'No asignado'){
					alert('aun no ha asignado un colaborador a esta area')
				}
				else{
					if(!data.email){
						alert('ingrese un correo porfavor');
					}
					else{
						if(validarEmail(data.email)!= 'correcto'){
							alert(validarEmail(data.email));
						}
						else{
							Meteor.call('resetUser', data, function(error,result){
								//error,result
								alert(result);
								//$('#multcuadleadclear').click();
							})
							$('#colabresete').modal('hide')
						}
						
					}
				}
					
			},

			'click #colresclear' : function(e){
				data = '';
			},

		/* Reset stuff */
		/* Relocate stuff */

			'click .cuadreub' : function(e){
				e.stopPropagation();
				Session.set('zonah', $(e.currentTarget).attr('cccc'));
				
				data = {
					code:$(e.currentTarget).attr('cc'),
					zona:$(e.currentTarget).attr('cccc'),
					comu:$(e.currentTarget).attr('ccc')
				}
				$('#reubcuad').modal('show');
				//$('#asocomu').val($(e.currentTarget).attr('ccc'));
			},

			'click #reub' : function(e){
				//alert(data.comu+' vs '+$('#asocomu').val());
				
					if(!$('#quadnew').val()){
						alert('INGRESE UN NUEVO CODIGO DE CUADRANTE');
					}
					else{
						data.comu = $('#asocomu').val();
						data.ncode = $('#quadnew').val();
						Meteor.call('reubCuad', data, function(error,result){
							//error,result
							var res= result;
							//alert(res);
							if(res=='done'){
								alert('Proceso completado');
								$('#reubcuad').modal('hide');
								data = "";
							}
							else{
								alert(res);
							}
							//$('#multcuadleadclear').click();
						})
						
					}
				
			},

			'click #reubclear' : function(e){
				Session.set('zonah', '');
				data = '';
			},

		/* Relocate stuff */

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

function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
        return("Error: La dirección de correo " + email + " es incorrecta.");
    }
    else{
    	return 'correcto'
    }
}

function loadRefers(idMul, idCol){
	var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
	var tipo = iusr[0].profile.tipo;
	
	console.log(idMul+' vs '+idCol);
	if(idMul == 'na'){
		var targetUl = idCol.replace('multilicl','referulcl');
		var p = Prospectos.find({esMulti:false, asoMulti:false, creadoPor:idCol.replace('multilicl','')}).fetch();
	}
	else{
		var targetUl = idMul.replace('multili','referul');
		var p = Prospectos.find({esMulti:false, asoMulti:idMul.replace('multili','')}).fetch();
	}
	console.log(p);

	for (var i = 0; i<p.length; i++){
		var cli = '';
		var cli = '<li class="referli">\
			<h5>'+p[i].cedula+' - '+p[i].nombres+' '+p[i].apellidos+'</h5>\
			<div class="optset">\
				<button title="Ver detalles" cc="'+p[i].cedula+'" type="button" class="btn btn-info prdetail">\
            		<span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>\
            	</button>';

        	if(p[i].esMulti != true){
            	cli = cli+'<button title="Convertir en multiplicador" id="tomulti" cc="'+p[i].cedula+'" ism="'+p[i].esMulti+'" type="button" data-toggle="modal" data-target="#prosptomult" class="btn btn-success prosptomult">\
            		<span class="glyphicon glyphicon-user" aria-hidden="true"></span>\
            	</button>';
            }
            /*cli = cli+'<button title="Editar" cc="'+p[i].cedula+'" type="button" class="btn btn-warning">
            		<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            	</button>';*/
            	
        	if(p[i].esMulti != true){
            	cli = cli+'<button title ="';
            	if(p[i].asoMulti == false){
            		cli = cli+'Asignar multiplicador';
            	}

            	else{
            		cli = cli+'Cambiar multilicador asignado : '+p[i].asoMulti;
            	}

            	cli = cli+'" cc="'+p[i].cedula+'" cp="t'+p[i].creadoPor+'" asm="'+p[i].asoMulti+'" type="button" data-toggle="modal" data-target="#prosasomult" class="btn btn-primary asignmulbutn">\
            		<span class="';

            	if(p[i].asoMulti == false){
            		cli = cli+'glyphicon glyphicon-flag';
            	}
            	else{
            		cli = cli+'glyphicon glyphicon-refresh';
            	}
            	cli = cli+ ' asigmult" aria-hidden="true"></span>\
            	</button>';
            }

            if(tipo =='Lider Cuadrante'){
            	cli = cli +'<button title="Eliminar" cc="'+p[i].cedula+'" type="button" class="btn btn-danger refdelete">\
            		<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
            	</button>';
            }
           cli = cli+'</div>\
			</li>';
		$("[id='"+targetUl+"']").append(cli);
		//$("[id='"+targetUl+"']").toggle(400);
	}
}

function loadMultis(idCol){
	var iusr = Meteor.users.find({_id:Meteor.userId()}).fetch();
	var tipo = iusr[0].profile.tipo;

	var targetUl = idCol.replace('cuadlli','multiul');
	var p = Prospectos.find({esMulti:true, creadoPor:idCol.replace('cuadlli','')}).fetch();

	for (var i = 0; i<p.length; i++){
		var cli = '';
		cli +='<li id="multili'+p[i].cedula+'" class="multili">\
			<h5><a href=""><i>Multiplicador '+p[i].cedula+' - '+p[i].nombres+' '+p[i].apellidos+'</i></a></h5>\
			<div class="optset">\
				<button title="Ver detalles" cc="'+p[i].cedula+'" type="button" class="btn btn-info prdetail">\
		    		<span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>\
		    	</button>';
		    	if(tipo !='Lider Cuadrante'){
		        	cli+='<button title ="Cambiar Colab. cuadrante" cc="'+p[i].cedula+'" com="'+p[i].comuna+'" qd="'+p[i].cuadrante+'" type="button" data-toggle="modal" data-target="#multcuadlead" class="btn btn-primary changecuadlead">\
		        		<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>\
		        	</button>';
		    	}
		    	
		    	if(tipo =='Lider Cuadrante'){
		        	cli+='<button id="addrefer" title="Asignar referido" type="button" cc="'+p[i].cedula+'" value="mprosp" class="btn btn-success">\
		        		<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>\
		        	</button>\
		            <button title="Eliminar" cc="'+p[i].cedula+'" type="button" class="btn btn-danger multdelete">\
		        		<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\
		        	</button>';
		        }
		    	
		    cli+='</div>\
			<ul id="referul'+p[i].cedula+'" class="referul">\
			</ul>\
		</li>';
		$("[id='"+targetUl+"']").append(cli);
	}
}

function loadCuadl(cuad){

}