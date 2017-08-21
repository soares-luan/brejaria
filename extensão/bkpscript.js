	// config['www.mundodomalte.com.br'] = 
	// {	nome:'Mundo do Malte',
	// 	url:'http://www.mundodomalte.com.br/',
	// 	urlBusca:'http://www.mundodomalte.com.br/beta/woocommerce-search/keyword/palavraCoringa/',
	// 	elementoLinkBusca:'div.rs_content a',
	// 	elementoIndisponivel:'.out-of-stock',
	// 	elementoPreco:['ins > .amount','.price .amount'],
	// 	elementoDescricao:'div.summary > h1.product_title',
	// 	elementoImg:'div#content img.attachment-shop_single'
	// };


jQuery.noConflict();	

	if(localStorage[location.host]){
		if(window['config'] != undefined){
			config[location.host] = JSON.parse(localStorage.getItem(location.host));	
		}else{
			config = [];
			config[location.host] = JSON.parse(localStorage.getItem(location.host));	
		}
		
	}else{
		config = [];
		config[location.host] = {   nome:undefined,
									url:undefined,
									urlBusca:undefined,
									elementoLinkBusca:undefined,
									elementoIndisponivel:undefined,
									elementoPreco:undefined,
									elementoNome:undefined,
									elementoImg:undefined};
	}
			var funcaoClick = function(){

				//esse esqueminha aqui é para circular os elementos que o mouse estiver em cima.
				jQuery("*").not("body, html").hover(function(e) {
				   jQuery(this).css("border", "1px solid #000"); 
				   e.stopPropagation();
				}, function(e) {
				   jQuery(this).css("border", "0px"); 
				   e.stopPropagation();
				});

				jQuery(document).on('click',function(e)	{
					e.preventDefault();
					jQuery(document).off('click');

					//tiro os efeitos de borda que coloquei
					jQuery("*").not("body, html").hover(function(e) {
					   jQuery(this).css("border", ""); 
					   e.stopPropagation();
					}, function(e) {
					   jQuery(this).css("border", ""); 
					   e.stopPropagation();
					});

					//acho todos os elementos acima desse
					var pais = [];
					var entry = jQuery(event.target).prop('tagName').toLowerCase();
				    if (jQuery(event.target).attr('class')) {
				        entry += "." + jQuery(event.target).attr('class').replace(/ /g, '.');
				    };
				    pais.push(entry);
				    jQuery(event.target).parentsUntil('body').each(function() {
				        var entry = jQuery(this).prop('tagName').toLowerCase();
				        if (jQuery(this).attr('class')) {
				            entry += "." + jQuery(this).attr('class').replace(/ /g, '.');
				        }
				        pais.push(entry);
				    });
				    pais.reverse();
				    caminhoCompleto = pais.join(" ");
				    console.log(caminhoCompleto);
				    
				    try{
				    	jQuery(caminhoCompleto);
				    }catch(err){
				    	var div = '';
						div += '<div id="opcao">'+
								'<div class="content">'+
									'<div class="row">'+
										'<div class="twelve columns centered text-center"><div class="mdl-card mdl-shadow--2dp demo-card-wide">'+
										  '<div class="mdl-card__title">'+
										    '<h2 class="mdl-card__title-text">Configurando</h2>'+
										  '</div>'+
										  '<div class="mdl-card__supporting-text">';
										  
							var opcoes = [ 'elementoLinkBusca',
											'elementoIndisponivel',
											'elementoPreco',
											'elementoDescricao',
											'elementoImg'];
											var select = '<select name="opcaoEscolhida" class="">';
											var options = opcoes.forEach(function(valor){
												select += '<option value="'+valor+'">'+valor+'</option>';
											});
											select+= '</select><br />';
											div += select;
											div += 'Caminho para chegar no elemento<input type="text" name="caminho" /><br />';	  
										  
										  div += '</div>'+
									  '<div class="mdl-card__actions mdl-card--border">'+
									    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect salvarConfiguracao" >'+
									      'Salvar'+
									    '</a>'+
									  '</div>'+
									  '</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
					
							jQuery('body').append(div);
							submeteValoresQuandoErro();
				    	return false;
				    }


				    var div = '';
					div += '<div id="opcao">'+
							'<div class="content">'+
								'<div class="row">'+
									'<div class="twelve columns centered text-center"><div class="mdl-card mdl-shadow--2dp demo-card-wide">'+
									  '<div class="mdl-card__title">'+
									    '<h2 class="mdl-card__title-text">Configurando</h2>'+
									  '</div>'+
									  '<div class="mdl-card__supporting-text">';
					
					div += "Elemento: ";
					//só faço isso aqui para poder pegar o elemento jquery em formato html
					div += jQuery('<div>').append(jQuery(caminhoCompleto).clone()).html(); 
					div += '<br />';

					if(config[location.host].nome == undefined){
						div += '<input type="text" name="nome" /> <button class="salvarConfiguracao">Salvar Nome</button>';
						 
					}else{
						div += '<br />Nome do site: <strong class="editar" elemento="nome">'+config[location.host].nome+'</strong><br />';
					}

					if(config[location.host].urlBusca == undefined){
						div += '<button class="salvarConfiguracao" elemento="urlBusca">Está na página de busca?</button>';
						 
					}else{
						div += '<br />Link da URL de Busca já está configurado<br />';
					}

					// urlBusca
					// elementoLinkBusca

					if(config[location.host].elementoPreco == undefined){
						div += '<input type="radio" name="tipo" value="valor">Valor';
					}else{
						div += '<br /><strong class="editar" elemento="elementoPreco">Preço já definido, clique para editar</strong><br/>';
					}

					if(config[location.host].elementoLinkBusca == undefined){
						div += '<input type="radio" name="tipo" value="linkBusca">Link de Busca';
					}else{
						div += '<br /><strong class="editar" elemento="elementoLinkBusca">Link de busca já definido, clique para editar</strong><br/>';
					}

					if(config[location.host].elementoDescricao == undefined){
						div += '<input type="radio" name="tipo" value="descricao">Descricao';
					}else{
						div += '<br /><strong class="editar" elemento="elementoDescricao">Descrição já definida, clique para editar</strong><br/>';
					}

					if(config[location.host].elementoImg == undefined){
						div += '<input type="radio" name="tipo" value="imagem">Imagem';
					}else{
						div += '<br /><strong class="editar" elemento="elementoImg">Imagem já definida, clique para editar</strong><br/>';
					}

					div += '</div>'+
									  '<div class="mdl-card__actions mdl-card--border">'+
									    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect salvarConfiguracao" >'+
									      'Selecione uma opção'+
									    '</a>'+
									  '</div>'+
									  '</div>'+
									'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
					
					jQuery(caminhoCompleto).parent().before(div);
					jQuery('#opcao').data('caminho',caminhoCompleto);
					submeteValores();
				});
			}

			

			funcaoClick(); // chamo a função de click

				var submeteValoresQuandoErro = function(){
						jQuery(document).on('click','.salvarConfiguracao',function(e){
							e.preventDefault();
							jQuery(document).off('click');
							console.log('salvou');

							if(!config[location.host]){
								config[location.host] = {};
							}
							var opcao = jQuery('select[name=opcaoEscolhida] option:selected').val();
							var caminho = jQuery('input[name=caminho]').val();
							if(opcao == 'elementoLinkBusca'){
								config[location.host].elementoLinkBusca = caminho;	
							}

							var convertidoString = JSON.stringify(config[location.host]);
							localStorage.setItem(location.host, convertidoString);
							
							
							jQuery('#opcao').remove();
							jQuery(document).off('click');
							funcaoClick();	 //coloco a função de click para funcionar
						});

				}

				var submeteValores = function(){

					jQuery(document).on('click','.salvarConfiguracao',function(e){
						e.preventDefault();
							jQuery(document).off('click');
							if(!config[location.host]){
								config[location.host] = {};
							}
							if(jQuery("input[name='nome']") && jQuery("input[name='nome']").val() != '' && jQuery("input[name='nome']").val() != undefined){
								config[location.host].nome=jQuery("input[name='nome']").val();	
							}
							
							config[location.host].url= location.host;

							tipo = jQuery('input:radio[name="tipo"]');
									
							tipo.each(function(indice,value){
								if(jQuery(value).is(':checked')){
									if(jQuery(value).val() == 'valor'){
										config[location.host].elementoPreco = jQuery('#opcao').data('caminho');
									}else if(jQuery(value).val() == 'descricao'){
										config[location.host].elementoDescricao = jQuery('#opcao').data('caminho');
									}else if(jQuery(value).val() == 'linkBusca'){
										config[location.host].elementoLinkBusca = jQuery('#opcao').data('caminho');
									}else if(jQuery(value).val() == 'imagem'){
										config[location.host].elementoImg = jQuery('#opcao').data('caminho');
									}
								}										
							});

							if(jQuery(this).attr('elemento')){
								if(jQuery(this).attr('elemento') == 'urlBusca'){
									config[location.host].urlBusca = location.href.replace('backer','palavraCoringa');
								}
							}

							var convertidoString = JSON.stringify(config[location.host]);
							localStorage.setItem(location.host, convertidoString);
							
							
							jQuery('#opcao').remove();
							funcaoClick();	 //coloco a função de click para funcionar
						});
	}
