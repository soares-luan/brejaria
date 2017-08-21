setTimeout(function(){
	//carrego o jquery na página, para caso não o tenha
	var b = document.createElement('script');

	b.src = chrome.extension.getURL('jquery.js');
	b.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(b);
},0);


setTimeout(function(){

		//carrego meu script
	var c = document.createElement('script');
	// TODO: add "script.js" to web_accessible_resources in manifest.json
	c.src = chrome.extension.getURL('script.js');
	c.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(c);

},0);

setTimeout(function(){
	var b = document.createElement('script');

	b.src = chrome.extension.getURL('funcoes.js');
	b.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(b);
},0);


setTimeout(function(){
	var link = document.createElement('link');
		link.rel  = 'stylesheet';
	    link.type = 'text/css';
	    link.href = chrome.extension.getURL('material.css');
	    link.media = 'all';

	(document.head||document.documentElement).appendChild(link);
},0);

setTimeout(function(){
	var b = document.createElement('script');

	b.src = chrome.extension.getURL('material.js');
	b.onload = function() {
	    this.parentNode.removeChild(this);
	};
	(document.head||document.documentElement).appendChild(b);
},0);
