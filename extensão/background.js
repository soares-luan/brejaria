// o background é o responsável por chamar o content quando clicar na extensão
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
  	//ao clicar na extesnaõ, ele inicia meu script, que irá injetar os outros dois
    file: 'content.js'
  });
});