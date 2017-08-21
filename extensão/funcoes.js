jQuery.noConflict();

jQuery("#menuExtensao").on('click','.geradorElementos',function(e){
	e.stopPropagation();

	if(jQuery(this).attr('acao') == 'urlBusca'){

		url = location.href.replace('backer','palavraCoringa');
		config[location.host][jQuery(this).attr('acao')] = url;
		var convertidoString = JSON.stringify(config[location.host]);
		localStorage.setItem(location.host, convertidoString);
		
	}else if(jQuery(this).attr('acao') == 'linksCrawler' || jQuery(this).attr('acao') == 'padraoLinkProduto' || jQuery(this).attr('acao') == 'elementoImg'){

		geraElementoComErro(jQuery(this));
		
	}else if(jQuery(this).attr('acao') == 'nome'){

		var nome = jQuery(this).parent().find('input').val();
		config[location.host][jQuery(this).attr('acao')] = nome;
		var convertidoString = JSON.stringify(config[location.host]);
		localStorage.setItem(location.host, convertidoString);
		
	}else if(jQuery(this).attr('acao') == 'condicaoIndisponivel'){

		var condicao2 = jQuery(this).parent().find('input').val();
		config[location.host][jQuery(this).attr('acao')] = [];
		config[location.host][jQuery(this).attr('acao')][0] = true;
		config[location.host][jQuery(this).attr('acao')][1] = condicao2;
		var convertidoString = JSON.stringify(config[location.host]);
		localStorage.setItem(location.host, convertidoString);

	}else{
		funcaoClick(jQuery(this));
	}
	

});

jQuery("#menuExtensao").on('click','.fechar',function(e){
	e.preventDefault();

	jQuery("#menuExtensao").remove();

});

jQuery("#menuExtensao").on('click','.enviar',function(e){
	e.preventDefault();
	var dados = config[location.host];
	console.log(jQuery(this).attr('acao'));
	dados.acao = jQuery(this).attr('acao') ;
		
	jQuery.ajaxPrefilter( function (options) {
	  if (options.crossDomain && jQuery.support.cors) {
	    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
	    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
	    //options.url = "http://cors.corsproxy.io/url=" + options.url;
	  }
	});


	jQuery.ajax({
        type:'post',
        data: dados,
        url: 'http://www.luansoares.com.br/sites',
        success: function(html)
        {   	
        	console.log(html);
        }
    });
});



var funcaoConfirmar = function(){
	jQuery('.confirmar').on('click',function(e)	{
		e.preventDefault();
		
		var caminho = jQuery(this).parent().find('.caminho').text();
		var acao = jQuery(this).parent().parent().attr('id');
		jQuery(this).parent().parent().css('background-color',"");
		jQuery(this).parent().remove();

		if(acao == 'linksCrawler'){
			if(!config[location.host][acao]){
				config[location.host][acao] = []
			}
			var existe = false;
			var array = config[location.host][acao];
			array.forEach(function(link){
				if(link == caminho){
					existe = true;
				}
			})
			if(!existe){
				config[location.host][acao].push(caminho);	
			}
		}else{
			config[location.host][acao] = caminho;	
		}
		
		var convertidoString = JSON.stringify(config[location.host]);
		localStorage.setItem(location.host, convertidoString);
		
	});
}

function geraElementoComErro(elementoAcao){
			var div = '<div class="elemento">';
			div += '<input type="text" class="inputCaminho" style=""><span class="caminho" style="display:none;"></span>';
			div += '<a class="confirmar">OK</a><br />';
			div += '</div>';
			jQuery(elementoAcao).before(div);
			jQuery(elementoAcao).parent().css('background-color',"#000");
			
			jQuery(".inputCaminho").on('input',function(){
				jQuery('.caminho').text(jQuery(this).val());
			});
			funcaoConfirmar();
}

var funcaoClick = function(elementoAcao){

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
		var caminho = jQuery(event.target).prop('tagName').toLowerCase();
	    if (jQuery(event.target).attr('class')) {
	        caminho += "." + jQuery(event.target).attr('class').replace(/ /g, '.');
	    };
	    pais.push(caminho);
	    jQuery(event.target).parentsUntil('body').each(function() {
	        var caminho = jQuery(this).prop('tagName').toLowerCase();
	        if (jQuery(this).attr('class')) {
	            caminho += "." + jQuery(this).attr('class').replace(/ /g, '.');
	        }
	        pais.push(caminho);
	    });
	    pais.reverse();
	    caminhoCompleto = pais.join(" ");

	     try{
	     	//só faço isso aqui para poder pegar o elemento jquery em formato html
	     	var div = '<div class="elemento">';
			div += jQuery('<div>').append(jQuery(caminhoCompleto).first().clone()).html(); 
			div += '<span class="caminho" style="display:none;">'+caminhoCompleto+'</span><br />';
			div += '<a class="confirmar">OK</a><br />';
			div += '</div>';
			 jQuery(elementoAcao).before(div);
			 jQuery(elementoAcao).parent().css('background-color',"#000");

			 funcaoConfirmar();
	    }catch(err){
	    	console.log(err);
	    	geraElementoComErro(elementoAcao);
	    	return false;
	    }

 });

};