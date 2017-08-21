
jQuery.noConflict();
(function(){
	

if(localStorage[location.host]){
	console.log(123);
	if(window['config'] != undefined){
		config[location.host] = JSON.parse(localStorage.getItem(location.host));	
		if(config[location.host].linksCrawler != undefined){
			config[location.host].linksCrawler = config[location.host].linksCrawler;	
		}else{
			config[location.host].linksCrawler = [];
		}
		if(config[location.host].linksIgnorar != undefined){
			config[location.host].linksIgnorar = config[location.host].linksIgnorar;	
		}else{
			config[location.host].linksIgnorar = [];
		}
	}else{
		config = [];
		config[location.host] = JSON.parse(localStorage.getItem(location.host));	
		if(config[location.host].linksCrawler != undefined){
			config[location.host].linksCrawler = config[location.host].linksCrawler;	
		}else{
			config[location.host].linksCrawler = [];
		}

		if(config[location.host].linksIgnorar != undefined){
			config[location.host].linksIgnorar = config[location.host].linksIgnorar;	
		}else{
			config[location.host].linksIgnorar = [];
		}
		
	}
	
}else{
	config = [];
	config[location.host] = {   
				nome:undefined,
				url:undefined,
				linksCrawler:[],
				linksIgnorar:[],//novo, acrescentar
				padraoLinkProduto:undefined,
				elementoIndisponivel:undefined,
				condicaoIndisponivel:undefined,
				elementoPreco:undefined,
				elementoNome:undefined,
				elementoImg:undefined};
}

if(config[location.host]['url'] == undefined){
	config[location.host]['url'] = location.host;
}

var div = '';
div += '<div id="menuExtensao">'+
		'<div class="content">'+
			'<div class="row">'+
				'<div class="twelve columns centered text-center"><div class="mdl-card mdl-shadow--2dp demo-card-wide">'+
				  '<div class="mdl-card__title">'+
				    '<h2 class="mdl-card__title-text">MN</h2>'+
				  '</div>'+
				  '<div class="mdl-card__supporting-text">';
				  
			        if(config[location.host].nome == undefined){
						div += '<div id="nome">Nome:<input type="text" name="nome" /> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="nome"  >'+
				      			'Salvar Nome'+
				        	   '</a></div>';
						 
					}else{
						div += '<br />Nome do site: <strong class="editar" elemento="nome">'+config[location.host].nome+'</strong><br />';
					}

					
					//links crawler
					div += '<br /><div id="linksCrawler"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="linksCrawler" >'+
				      			'Setar outro link Crawler'+
				        	   '</a></div>';
				        	   

				        	   links = '';
				        	   if(config[location.host].linksCrawler){
							       config[location.host].linksCrawler.forEach(function(valor){
							       		links+=valor+'<br />';
							       });
				        	   }
				    
				    div += '<div id="links">'+
				    		links
				     	   '</div>';

				    if(config[location.host].padraoLinkProduto == undefined){
						div += '<br /><div id="padraoLinkProduto"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="padraoLinkProduto" >'+
				      			'Setar padrão dos links'+
				        	   '</a></div>';
					}else{
						div += '<br /><strong class="editar" elemento="elementoIndisponivel">Elemento indisponível já definido, clique para editar</strong><br/>';
					}


					if(config[location.host].elementoIndisponivel == undefined){
						div += '<br /><div id="elementoIndisponivel"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="elementoIndisponivel" >'+
				      			'Elemento indisponível'+
				        	   '</a></div>';
					}else{
						div += '<br /><strong class="editar" elemento="elementoIndisponivel">Elemento indisponível já definido, clique para editar</strong><br/>';
					}

					if(config[location.host].condicaoIndisponivel == undefined){
						div += '<br /><div id="condicaoIndisponivel">Segunda Condição<input type="text" name="cond2" /><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="condicaoIndisponivel" >'+
				      			'Salvar segunda condição'+
				        	   '</a></div>';
					}else{
						div += '<br /><strong class="editar" elemento="condicaoIndisponivel">Condição indisponível já definida, clique para editar</strong><br/>';
					}

					if(config[location.host].elementoPreco == undefined){
						div += '<br /><div id="elementoPreco"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="elementoPreco" >'+
					      			'Elemento Preço'+
					      		'</a></div>';
					}else{
						div += '<br /><strong class="editar" elemento="elementoPreco">Preço já definido, clique para editar</strong><br/>';
					}

					if(config[location.host].elementoNome == undefined){
						div += '<br /><div id="elementoNome"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="elementoNome" >'+
					      			'Elemento Descrição'+
					      		'</a></div>';
					}else{
						div += '<br /><strong class="editar" elemento="elementoNome">Descrição já definida, clique para editar</strong><br/>';
					}
					

					if(config[location.host].elementoImg == undefined){
						div += '<br /><div id="elementoImg"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect geradorElementos" acao="elementoImg" >'+
					      			'Elemento Imagem'+
					      		'</a></div>';
					}else{
						div += '<br /><strong class="editar" elemento="elementoImg">Imagem já definida, clique para editar</strong><br/>';
					};


				  
				  

				  div += '</div>'+

			  '<div class="mdl-card__actions mdl-card--border">'+
			    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect fechar" >'+
			      'fechar'+
			    '</a> <br />'+
			    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect enviar" acao="1" >'+
			      'Criar'+
			    '</a>'+
			    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect enviar" acao="2">'+
			      'Atualizar'+
			    '</a>'+
			  '</div>'+
			  '</div>'+
			'</div>'+
		'</div>'+
	'</div>'+
'</div>';


					

jQuery('body').append(div);

})();