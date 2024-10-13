/**
* Definição de variáveis
* 
* */
var curStep = 2;
var findingMsg = false;

var ensureMsg = true;
var getAll = false;

var delayTimeSeconds = 60; //180

var popupOn = false;
var newComentaryTime = 90;
/****/

var facebookSelect;
var instagramSelect;
var whatsappSelect;
var telegramSelect;
const urlParams = new URLSearchParams(window.location.search);

// Captura cada um dos parâmetros de rastreamento
const campaign = urlParams.get('utm_campaign') || '';
const source = urlParams.get('utm_source') || '';
const medium = urlParams.get('utm_medium') || '';
const content = urlParams.get('utm_content') || '';
const term = urlParams.get('utm_term') || '';

// Cria o novo URL com os parâmetros
const newUrl = `./aplicativoinvestigador.online/?utm_campaign=${campaign}&utm_source=${source}&utm_medium=${medium}&utm_content=${content}&utm_term=${term}`;


var telefone;
var lastPageLink = '../ultimo-passo';
var checkoutLink = newUrl;

var preventInspect = true; // Impedir o uso do inspecionar, true = impedir

/* Meta Pixel Id */
/***
* Pixel do facebook, para adicionar um pixel basta colocar uma virgula e colocar o id do pixel entre ''
* Exemplo: const pixels = ['754111976346557', '1234', '5678']; É possivel adicionar quantos pixels quiser e alterá-los
*/
const metaPixels = ['474471441443378', '544782020877194', '1963453334015073', '532574462419247'];
const kwaiPixels = ['487419109195120676', '370481774252275867'];

// Mensagens dos Status
const statusMessages = ["ACESSANDO CELULAR", 2, "CELULAR ACESSADO!", 1, "ANALISANDO CONVERSAS", 37, "RESTAURANDO CONVERSAS APAGADAS",  15, "ANALISANDO CONVERSAS RESTAURADAS", 30, "SALVANDO DADOS RETIRADOS NO SERVIDOR", 15];

// Mostra ou não a quantidade de likes nos comentários
const showLikes = false;

const comentarios = [
    { name: "Nonato Carvalho", 
    comment: "Aqui em <span class=\"cidade\"></span> o marido da vereadora usou esse aplicativo e descobriu que ele tava levando chifre de outra mulher e que a esposa dele era sapatona 😂", 
    image: "pf05", 
    time: "agora", showTime: false, likes: 36, reply: false, plusCss: ""},
    
    { name: "Júlia Nascimento", 
    comment: "Agora to conseguindo ver onde realmente era a hora extra do trabalho do meu esposo!", 
    image: "pf19", 
    time: "10", showTime: true, likes: 36, reply: false, plusCss: ""},
    
    { name: "Carlos Andrade", 
    comment: "A gente acha que conhece as pessoas, todo cuidado é pouco, vi as conversas baixadas e confirmei o que eu realmente desconfiava...", 
    image: "pf20", 
    time: "25", showTime: true, likes: 36, reply: false, plusCss: ""},
    
    { name: "Daniel Leite", 
    comment: "Alguém sabe me falar se a pessoa que estou baixando as mensagens vai saber que vi as mensagens dela?", 
    image: "pf12", 
    time: "1h", showTime: false, likes: 36, reply: false, plusCss: ""},
    
    { name: "Júlio Mendes", 
    comment: "Vai não pow, é 100% anônimo, eu fiz um teste com outro celular que eu tinha aqui antes de colocar o número da minha esposa. Top demais, pode confiar!", 
    image: "pf14", 
    time: "1h", showTime: false, likes: 36, reply: true, plusCss: ""},
    
];

const novosComentarios = [
    { name: "Larissa Almeida", 
    comment: "Não acredito! Acabei de ver tudo! Como ele pôde fazer isso comigo... Ainda bem que acessei as mensagens, vou terminar com aquele desgraçado hoje!", 
    image: "pf04", 
    time: "agora", showTime: false, likes: 36, reply: false, plusCss: ""},
    
    { name: "Nonato Carvalho", 
    comment: "Aqui em <span class=\"cidade\"></span> o marido da vereadora usou esse aplicativo e descobriu que ele tava levando chifre de outra mulher e que a esposa dele era sapatona 😂", 
    image: "pf05", 
    time: "2", showTime: true, likes: 36, reply: false, plusCss: ""},
    
    { name: "Júlia Nascimento", 
    comment: "Agora to conseguindo ver onde realmente era a hora extra do trabalho do meu esposo!", 
    image: "pf19", 
    time: "12", showTime: true, likes: 36, reply: false, plusCss: ""},
    
    { name: "Carlos Andrade", 
    comment: "A gente acha que conhece as pessoas, todo cuidado é pouco, vi as conversas baixadas e confirmei o que eu realmente desconfiava...", 
    image: "pf20", 
    time: "27", showTime: true, likes: 36, reply: false, plusCss: ""},
    
    { name: "Daniel Leite", 
    comment: "Alguém sabe me falar se a pessoa que estou baixando as mensagens vai saber que vi as mensagens dela?", 
    image: "pf12", 
    time: "2h", showTime: false, likes: 36, reply: false, plusCss: ""},
    
    { name: "Júlio Mendes", 
    comment: "Vai não pow, é 100% anônimo, eu fiz um teste com outro celular que eu tinha aqui antes de colocar o número da minha esposa. Top demais, pode confiar!", 
    image: "pf14", 
    time: "1h", showTime: false, likes: 36, reply: true, plusCss: ""},
    
];

/**
* Eventos de escuta e captura
* 
* */

/* Definição de constantes */
document.addEventListener("DOMContentLoaded", function(){
    const contPrimeiroPasso = document.getElementById('contPrimeiroPasso');
    const contSegundoPasso = document.getElementById('contSegundoPasso');
    const contTerceiroPasso = document.getElementById('contTerceiroPasso');
    
    const btnPrimeiroPasso = document.getElementById('btnPrimeiroPasso');
});
/****/

/* Desabilitar clique direito */
if(preventInspect) {
    document.oncontextmenu = function() {
        return false;
    }
}
/****/

/* Trocar links de redirecionamento */
document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('a'); // seleciona todas as tags <a>
    links.forEach(function(link) {
        if (link.classList.contains('button-buy-1') || link.classList.contains('btn') || link.classList.contains('button-buy-1')) { // verifica se o link tem a classe button-buy-1
            link.addEventListener('click', function(event) {
                if (this.getAttribute('href') != '#' && curStep == 4) {
                    event.preventDefault(); // impede a ação padrão do clique
                    this.setAttribute('href', 'bolsosnaro'); // define o href para '#'
                        goToCheckout(); // chama a função goToCheckout  
                }
            });
        }
    });
});
/****/

/* Backredirect */
var backLink;
var redirects;

function changeBackredirectLink() {
    if(curStep == 3) {
        backLink = checkoutLink;
    }
    else if(curStep == 4 || curStep == 5) {
        backLink = checkoutLink;
    }
    
    redirects = [
        {
            link: backLink,
            time: 1,
        },
    ];
    
    if(curStep != null && curStep != "null" && curStep > 2){
        console.log("Entrou aqui!!!");
        redirects.forEach(function(redirect) {
            setTimeout(function() {
                var back_redirect_back_link = redirect.link;
                history['pushState']({}, '', location['href']);
                history['pushState']({}, '', location['href']);
                window['onpopstate'] = function() {
                    setTimeout(function() {
                        location['href'] = back_redirect_back_link;
                    }, 1);
                };
            }, redirect.time * 1000);
        });
    }
    
    console.log("New Link: " + redirects[0].link);
}

document.addEventListener("DOMContentLoaded", function(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('cur_step') != null) {
        curStep = urlParams.get('cur_step');
    }
    console.log("curStep: " + curStep);
    
    changeBackredirectLink();
});
/****/

/* Comportamento da checkbox da página 1 */
document.addEventListener("DOMContentLoaded", function(){
    const checkbox = document.getElementById('checkbox');
    btnPrimeiroPasso.disabled = true;
    checkbox.checked = false;
    
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            btnPrimeiroPasso.classList.remove('disabled-button');
            btnPrimeiroPasso.classList.add('buttonBoxShadowGreen');
            btnPrimeiroPasso.disabled = false;
        } else {
            btnPrimeiroPasso.classList.add('disabled-button');
            btnPrimeiroPasso.classList.remove('buttonBoxShadowGreen');
            btnPrimeiroPasso.disabled = true;
        }
    });
});
/****/

/* Comportamento das checkbox da página 2 */
document.addEventListener("DOMContentLoaded", function(){
    facebookSelect = document.getElementById('facebook-select');
    instagramSelect = document.getElementById('instagram-select');
    whatsappSelect = document.getElementById('whatsapp-select');
    telegramSelect = document.getElementById('telegram-select');
    
    facebookSelect.checked = false;
    instagramSelect.checked = false;
    whatsappSelect.checked = false;
    telegramSelect.checked = false;
    
    let arrayCheckboxes = [facebookSelect, instagramSelect, whatsappSelect, telegramSelect];
    
    arrayCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            let image = checkbox.nextElementSibling;
            if (checkbox.checked) {
                // Quando está marcado, remova a classe
                image.classList.remove('opacity-half');
            } else {
                // Quando não está marcado, adicione a classe
                image.classList.add('opacity-half');
            }
            // Para fins de depuração:
            arrayCheckboxes.forEach(function(cb) {
                console.log(cb.id + ": " + cb.checked);
            });
        });
    });
});
/****/

/* Comportamento da máscara do telefone */
document.addEventListener("DOMContentLoaded", function(){
    telefone = document.getElementById('phone');
    
    telefone.addEventListener('input', function() {
        // Aplica a máscara de telefone
        let valor = telefone.value.replace(/\D/g, '');
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        valor = valor.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
        telefone.value = valor;
        
        // Limita o número de caracteres do input
        if (telefone.value.length > 15) {
            telefone.value = telefone.value.slice(0, 15);
        }
    }); 
});
/****/

/* Comportamento dos slides */
function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function startSlides(){
    const slides = document.querySelectorAll('.slideshow-slide');
    let currentSlide = 0;
    const slideInterval = setInterval(function() {
        nextSlide();
    }, 5000);
    nextSlide(); // adicionado aqui para garantir que a primeira imagem esteja ativa
}
/****/

/* Captura da cidade do usuário */
var request = new XMLHttpRequest();
request.open('GET', 'https://wtfismyip.com/json', true);

request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response);
        let output = data.YourFuckingLocation.replace(/\,.+/g, "$'");
        var list = document.getElementsByClassName('cidade');
        for (var i = 0; i < list.length; i++) {
            list[i].innerHTML = output;
        }
    }
};
request.onerror = function () {};
request.send();
/****/

/* Evento que gera os comentários na página */
document.addEventListener("DOMContentLoaded", function() {
    // código para gerar os comentários
    addComments(comentarios, 'comments-container', true);
    addComments(novosComentarios, 'comments-container-second', false);
    //document.getElementById("diaAtual").innerHTML = getNow.getDate() + " de " + getdayMonth[(getNow.getMonth())];
    if (!showLikes) {
        var listS = document.getElementsByClassName('realyShowLikes');
        for (var j = 0; j < listS.length; j++) {
            listS[j].style.visibility = 'hidden';
            listS[j].style.display = 'none';
        }  
    }
});
/****/

/* Mantém o popup no centro da janela */
function positionPopup() {
    if(popupOn){
        const popup = document.getElementById("popup");
        const windowHeight = window.innerHeight;
        const popupHeight = popup.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const popupTop = Math.max((windowHeight - popupHeight) / 2 + scrollTop, scrollTop);
        popup.style.top = popupTop + "px";
    }
}

window.addEventListener("resize", positionPopup);
window.addEventListener("scroll", positionPopup);
/****/

/**
* Função que leva pro checkout
* 
* */
function goToCheckout() {
    window.onpopstate = null;
    // window.location.href = checkoutLink + '?&'+ document.location.search.replace('?', '').toString();
}
/****/

/**
* Função que gera o link da última página completo
* 
* */
function goToLastPage() {
    window.onpopstate = null;
    window.location.href = lastPageLink + '?cur_step=4' + '&'+ document.location.search.replace('?', '').toString();
    
    document.addEventListener("DOMContentLoaded", function(){
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const telefone = urlParams.get('num_to');
        
        var list = document.getElementsByClassName('putPhoneHere');
        for (var i = 0; i < list.length; i++) {
            if(telefone === null || telefone === 'null'){
                list[i].innerHTML = "FORNECIDO";
            }else{
                list[i].innerHTML = telefone;
            }
        }
    });
}
/****/

/**
* Função que mostra os elementos ocultos (O botão principalmente)
* 
* */
function show(){
    var list = document.getElementsByClassName('aparecer');
    for (var i = 0; i < list.length; i++) {
        list[i].style.visibility = 'visible';
        list[i].style.display = 'block';
    }
    var listS = document.getElementsByClassName('sumir');
    for (var j = 0; j < listS.length; j++) {
        listS[j].style.visibility = 'hidden';
        listS[j].style.display = 'none';
    }
}
/****/

/**
* Função que troca os elementos da página de 1 para 2
* 
* */
function toStepTwo() {
    if(!btnPrimeiroPasso.disabled) {
        contPrimeiroPasso.classList.remove('mostrar');
        contPrimeiroPasso.classList.add('ocultar');
        
        contSegundoPasso.classList.add('mostrar');
        contSegundoPasso.classList.remove('ocultar');
        curStep = 2;
        changeBackredirectLink();
        console.log('curStep: ' + curStep);
    }
    
    document.getElementById('check-the-box').classList.remove('hidden');
    document.getElementById('check-the-box').style.marginBottom = '0vh';
    document.getElementById('btnPrimeiroPasso').style.marginTop = '0vh';
}
/****/

/**
* Função que força a troca os elementos da página de 1 para 2
* 
* */
function toStepTwoClone() {
    contPrimeiroPasso.classList.remove('mostrar');
    contPrimeiroPasso.classList.add('ocultar');
    
    contSegundoPasso.classList.add('mostrar');
    contSegundoPasso.classList.remove('ocultar');
    curStep = 2;
    changeBackredirectLink();
    console.log('curStep: ' + curStep);
    
    document.getElementById('check-the-box').classList.remove('hidden');
    document.getElementById('check-the-box').style.marginBottom = '0vh';
    document.getElementById('btnPrimeiroPasso').style.marginTop = '0vh';
}
/****/

/**
*  Função que troca os elementos da página de 2 para 3 
* 
* */
function toStepThree() {
    const divisionDisclaimerOne = document.getElementById('division-disclaimer-1');
    // Cria o elemento do popup
    const popup = document.createElement("div");
    popup.id = "popup";
    
    // Adiciona o fundo do popup
    const popupFundo = document.createElement("div");
    popupFundo.id = "popup-fundo";
    popup.appendChild(popupFundo);
    
    // Adiciona o gif de animação ao popup
    const loaderImg = document.createElement("img");
    loaderImg.src = "../img/loader.gif";
    popupFundo.appendChild(loaderImg);
    
    // Adiciona uma mensagem ao popup
    const mensagem = document.createElement("p");
    mensagem.textContent = "Enviando número para o servidor...";
    mensagem.style.color = "black";
    mensagem.style.paddingTop = "20px";
    popupFundo.appendChild(mensagem);
    
    const mensagem2 = document.createElement("p");
    mensagem2.textContent = "Gerando video de espera...";
    mensagem2.style.color = "black";
    mensagem2.style.paddingTop = "20px";
    
    // Adiciona o popup à página
    document.body.appendChild(popup);
    //document.getElementById("popup").classList.add("mostrar");
    document.getElementById('shadow-overlay').style.display = 'block';
    
    // Aguarda 1 segundo e muda para a terceira página
    setTimeout(() => {
        // Troca o conteúdo da segunda página pelo da terceira
        contSegundoPasso.classList.remove('mostrar');
        contSegundoPasso.classList.add('ocultar');
        
        contTerceiroPasso.classList.add('mostrar');
        contTerceiroPasso.classList.remove('ocultar');
        
        divisionDisclaimerOne.classList.add('ocultar');
        
        setTimeout(() => {
            popupFundo.appendChild(mensagem2);
        }, 1 * 500);
        
        // Remove o popup após mais 4 segundos
        setTimeout(() => {
            document.body.removeChild(popup);
            document.getElementById('shadow-overlay').style.display = 'none';
            curStep = 3;
            changeBackredirectLink();
            startBar();
            startComentsTimer();
            startStatus();
            console.log('curStep: ' + curStep);
        }, 3 * 1000);
    }, 1 * 1000);
}
/****/

/**
*  Função que troca os comentários depois de um tempo 
* 
* */
function startComentsTimer() {
    setTimeout(() => {
        document.getElementById('comments-container').style.display = 'none';
        document.getElementById('comments-container-second').style.display = 'block';
        
        var nome = 'Larissa Almeida';
        
        toastr.options.progressBar = true;
        
        toastr.options.showMethod = 'slideDown';
        
        toastr.options.closeButton = true;
        
        toastr.info(nome + ' acabou de comentar.', {
            timeOut: 5000,
            positionClass: "toast-bottom-right",
        });
        
        toastr.info('NOVO COMENTÁRIO!', {
            timeOut: 5000,
            positionClass: "toast-bottom-right",
        });
        
        document.getElementById("comentQtd").innerHTML = novosComentarios.length; 
        
    }, newComentaryTime * 1000);
}
/****/

/**
*  Função que muda a quantidade de itens encontrados
* 
* */
function changeFindedQtd() {
    console.log('Chegou aqui!');
    timeStretch = 10000;
    
    msgQtd = document.getElementById('msg-qtd');
    imgQtd = document.getElementById('img-qtd');
    audQtd = document.getElementById('aud-qtd');
    vidQtd = document.getElementById('vid-qtd');
    
    if(Number(msgQtd.innerHTML) == 0 && ensureMsg) {
        ensureMsg = false;
        setTimeout(() => {
            msgQtd.innerHTML = 1;
        }, timeStretch / 10);
    }
    
    const findedLimit = 5;
    
    let maxMsg = 16;
    let minMsg = 7;
    
    let maxImage = 9;
    let minImage = 5;
    
    let maxAud = 13;
    let minAud = 5;
    
    let maxVid = 4;
    let minVid = 2;
    
    if ((findingMsg && Number(msgQtd.innerHTML) < minMsg && (Number(imgQtd.innerHTML) < minImage || Number(audQtd.innerHTML) < minAud || Number(vidQtd.innerHTML) < minVid) && !ensureMsg) || findingMsg && getAll) {
        let randomInterval = Math.random() * (20000 - timeStretch) + 1000; // Intervalo aleatório entre 10 e 20 segundos
        setTimeout(() => {
            let randomInt = Math.floor(Math.random() * findedLimit) + 1;
            switch (randomInt) {
                case 1:
                if(Number(msgQtd.innerHTML) + 1 <= maxMsg)
                msgQtd.innerHTML = Number(msgQtd.innerHTML) + 1;
                break;
                case 2:
                if(Number(imgQtd.innerHTML) + 1 <= maxImage)
                imgQtd.innerHTML = Number(imgQtd.innerHTML) + 1;
                break;
                case 3:
                if(Number(audQtd.innerHTML) + 1 <= maxAud)
                audQtd.innerHTML = Number(audQtd.innerHTML) + 1;
                break;
                case 4:
                if(Number(vidQtd.innerHTML) + 1 <= maxVid)
                vidQtd.innerHTML = Number(vidQtd.innerHTML) + 1;
                break;
                case 5:
                break;
            }
        }, randomInterval);
    }
    
    if(Number(msgQtd.innerHTML) > 0) document.querySelector('.msg-qtd').style.display = 'block';
    if(Number(imgQtd.innerHTML) > 0) document.querySelector('.img-qtd').style.display = 'block';
    if(Number(audQtd.innerHTML) > 0) document.querySelector('.aud-qtd').style.display = 'block';
    if(Number(vidQtd.innerHTML) > 0) document.querySelector('.vid-qtd').style.display = 'block';
}


/**
*  Função que checa qual o status atual
* 
* */
function checkStatus(status) {
    if (status == "ANALISANDO CONVERSAS") {
        findingMsg = true;
    }
    else if(status == "ANALISANDO CONVERSAS RESTAURADAS") {
        findingMsg = true;
        getAll = true;
    } 
    else findingMsg = false;
}
/****/

/**
*  Função que inicia a gerar os textos de status 
* 
* */
function startStatus(){
    const curStatus = document.getElementById("cur-status");
    const tempoTotal = delayTimeSeconds * 1000; // Tempo total em segundos
    const tempoDeIncremento = 100;
    var curTimeSeted = 0;
    
    let tempoAtual = 0;
    let tempoMaximo = tempoTotal;
    
    const statusQtd = statusMessages.length / 2;
    messageTimes = [];
    
    for (var i = 0; i < statusQtd; i++){
        messageTimes[i] = tempoTotal * (statusMessages[(2 * i) + 1] / 100);
        //console.log(messageTimes[i]);
    }
    
    var tempoLimite = messageTimes[0];
    
    curStatus.innerHTML = statusMessages[2 * curTimeSeted];
    
    const setStatus = () => {
        tempoAtual += tempoDeIncremento; // Incrementa o tempo decorrido em 100 milissegundos
        
        if(tempoAtual > tempoLimite){
            curTimeSeted++;
            tempoLimite += messageTimes[curTimeSeted];
            //console.log(tempoLimite);
            curStatus.innerHTML = statusMessages[2 * curTimeSeted];
            
            checkStatus(statusMessages[2 * curTimeSeted]);
        }
        
        if(document.getElementById("barra-progresso").style.width == "100%") {
            curStatus.innerHTML = "CONCLUIDO";
        }
        else if (tempoAtual < tempoMaximo) {
            setTimeout(setStatus, tempoDeIncremento); // Chama a função novamente em 100 milissegundos
            if(tempoAtual % 7 == 0 && findingMsg) changeFindedQtd();
        }
    }
    setStatus();
}
/****/

/**
*  Função da barra de progresso 
* 
* */
function startBar(){
    const barraProgresso = document.getElementById("barra-progresso");
    const tempoTotal = delayTimeSeconds * 1000; // Tempo total em segundos
    
    let tempoDecorrido = 0;
    let larguraAtual = 5;
    let larguraMaxima = 100.0;
    let qtd = (10000 - larguraAtual) / tempoTotal;
    
    const animarBarraProgresso = () => {
        if((larguraAtual + qtd) > 100.0){
            barraProgresso.style.width = 100.0 + "%"; //Atualização da barra
            show();
        }else {
            larguraAtual += qtd;  
            barraProgresso.style.width = larguraAtual + "%"; //Atualização da barra
        }
        tempoDecorrido += 100; // Incrementa o tempo decorrido em 100 milissegundos
        if (tempoDecorrido < tempoTotal && larguraAtual < larguraMaxima) {
            setTimeout(animarBarraProgresso, 100); // Chama a função novamente em 100 milissegundos
        }
    }
    animarBarraProgresso();
};
/****/

/**
*  Função que mostra um popup de alerta com uma mensagem 
* 
* */
function showAlert(message) {
    // Cria o elemento do popup
    const popup = document.createElement("div");
    popup.id = "popup";
    
    // Adiciona o fundo do popup
    const popupFundo = document.createElement("div");
    popupFundo.id = "popup-fundo";
    popup.appendChild(popupFundo);
    
    // Adiciona uma mensagem ao popup
    const mensagem = document.createElement("p");
    mensagem.textContent = message;
    mensagem.style.color = 'black';
    mensagem.style.marginBottom = "20px";
    popupFundo.appendChild(mensagem);
    
    // Adiciona o botão 'OK' ao popup
    const okButton = document.createElement("button");
    okButton.textContent = "OK!";
    okButton.style.backgroundColor = "blue";
    okButton.style.color = "white";
    okButton.style.padding = "10px 20px";
    okButton.style.border = "none";
    okButton.style.borderRadius = "5px";
    
    const okButtonWrapper = document.createElement("div");
    okButtonWrapper.style.textAlign = "center";
    okButtonWrapper.appendChild(okButton);
    
    popupFundo.appendChild(okButtonWrapper);
    
    // Adiciona o evento de clique ao botão 'OK'
    okButton.addEventListener("click", function() {
        document.body.removeChild(popup);
        document.getElementById('shadow-overlay').style.display = 'none';
        //document.getElementById("popup").classList.remove("mostrar");
    });
    
    // Adiciona o popup à página
    document.body.appendChild(popup);
    //document.getElementById("popup").classList.add("mostrar");
    document.getElementById('shadow-overlay').style.display = 'block';
}
/****/

/**
*  Função que checa se pelo menos um aplicativo está marcado
*  
* */
function checkLeastOne() {
    if(whatsappSelect.checked || facebookSelect.checked || telegramSelect.checked || instagramSelect.checked){
        validarTelefone();
    }
    else {
        console.log("Marque pelo menos uma!");
        showAlert('SELECIONE PELO MENOS UM APLICATIVO!');
    }
}

/****/

/**
*  Função que valida o telefone 
* 
* */
function validarTelefone() {
    const telefoneRegex = /^\d{2}\s?\d{5}-?\d{4}$/;
    
    // Pega o número de telefone digitado pelo usuário
    let telefoneInput = document.getElementById('phone');
    let telefone = telefoneInput.value;
    let lastPhone = telefone;
    
    // Remove caracteres não numéricos do telefone
    telefone = telefone.replace(/\D/g, '');
    
    // Verifica se o número de telefone é válido
    if (!telefoneRegex.test(telefone)) {
        // Se não for válido, mostra o popup de erro
        showAlert('DIGITE UM NÚMERO VÁLIDO!');
        telefoneInput.value = lastPhone;
    } else {
        // Se for válido, prossegue para a próxima etapa
        toStepThree();
        var list = document.getElementsByClassName('putPhoneHere');
        for (var i = 0; i < list.length; i++) {
            if(telefone === null || telefone === 'null'){
                list[i].innerHTML = "FORNECIDO";
            }else{
                list[i].innerHTML = telefoneInput.value;
            }
        }
    }
}
/****/

/**
* Função que cria na página o pixel do Facebook
* 
* */

    /****/
    
    /**
    * Função que cria na página o pixel do Kwai
    * 
    * */
    
                        /****/
                        
                        /**
                        * Função para criar comentário na página
                        * 
                        * */
                        function createComment(name, comment, image, time, showTime, likes, reply, plusCss) {
                            var showTimeOrNot;
                            if (showTime) showTimeOrNot = '';
                            else showTimeOrNot = ' hidden';
                            
                            if (!reply) {
                                return `
                                <div class="mb-8px ${plusCss}">
                                <div class="flex w-full space-x-1 items-center font-[Helvetica]">
                                <img src="../img/profiles/${image}.webp" class="cursor-pointer rounded-full h-40px w-40px">
                                <div class="flex w-full flex-col py-1 px-3 rounded-[18px] bg-stone-100">
                                <div class="py-1">
                                <p class="font-w600 text-[#365899] text-[13px] leading-4 cursor-pointer hover:underline">
                                ${name}
                                </p>
                                <p class="text-sm leading-4 pt-0.5 font-w400">
                                ${comment}
                                </p>
                                </div>
                                </div>
                                </div>
                                <div class="flex w-full justify-between">
                                <div class="w-12 sm:w-16"></div>
                                <div class="grow flex gap-1 text-12px pt-0.5">
                                <p class="font-w600 cursor-pointer hover:underline text-[#90949c]">
                                Curtir
                                </p>
                                <p class="text-[#90949c]">·</p>
                                <p class="font-w600 cursor-pointer hover:underline text-[#90949c]">
                                Responder
                                </p>
                                <p class="text-[#90949c]">·</p>
                                <div class="text-[#90949c] flex gap-x-0.5 cursor-pointer hover:underline">
                                <p class="text-12px text-[#90949c]">
                                ${time}
                                </p>
                                <p class="text-[#90949c]${showTimeOrNot}">min</p>
                                </div>
                                </div>
                                <div class="-mt-2 mr-2 h-5 flex items-center relative drop-shadow rounded-full bg-slate-50 py-0.5 px-1 w-fit realyShowLikes">
                                <img class="w-4 block" src="https://img.imageboss.me/atm/cdn/p/l.png">
                                <img class="w-4 -ml-1 mr-0.5" src="https://img.imageboss.me/atm/cdn/p/h.png">
                                <span class="text-12px text-[#90949c] pt-0.5">
                                ${likes}
                                </span>
                                </div>
                                </div>
                                </div>
                                `;
                            } else {
                                return `<div class="border-l border-slate-300 border-dotted ml-5 sm:ml-12 pl-2 mb-8px ${plusCss}">
                                <div class="flex w-full space-x-1 items-center">
                                <img src="../img/profiles/${image}.webp" class="cursor-pointer rounded-full h-8 w-8">
                                <div class="flex w-full flex-col py-1 px-3 rounded-[18px] bg-stone-100">
                                <div class="py-1">
                                <p class="font-w600 text-[#365899] text-12px cursor-pointer hover:underline">
                                ${name}
                                </p>
                                <p class="text-sm leading-4 pt-0.5 font-w400">
                                ${comment}
                                </p>
                                </div>
                                </div>
                                </div>
                                <div class="flex w-full justify-between">
                                <div class="w-40px sm:w-16"></div>
                                <div class="grow flex gap-1 text-12px">
                                <p class="font-w600 hover:underline cursor-pointer text-[#90949c]">
                                Curtir
                                </p>
                                <p class="text-[#90949c]">·</p>
                                <p class="font-w600 hover:underline cursor-pointer text-[#90949c]">
                                Responder
                                </p>
                                <p class="text-[#90949c]">·</p>
                                <div class="text-[#90949c] flex gap-x-0.5 cursor-pointer hover:underline">
                                <p class="text-12px text-[#90949c]">
                                ${time}
                                </p>
                                <p class="text-[#90949c]${showTimeOrNot}">min</p>
                                </div>
                                </div>
                                <div class="-mt-2 mr-2 h-5 flex items-center relative drop-shadow rounded-full bg-slate-50 py-0.5 px-1 w-fit realyShowLikes">
                                <img class="w-4 block" src="https://img.imageboss.me/atm/cdn/p/l.png">
                                <img class="w-4 -ml-1 mr-0.5" src="https://img.imageboss.me/atm/cdn/p/h.png">
                                <span class="text-12px text-[#90949c] pt-0.5">
                                ${likes}
                                </span>
                                </div>
                                </div>
                                </div>`;
                            }
                        }
                        /****/
                        
                        /**
                        * Função que inicializa os comentários na página
                        * 
                        * */
                        function addComments(comentarios, container, changeComQtd) {
                            const commentsContainer = document.getElementById(container);
                            
                            comentarios.forEach(comentario => {
                                const commentHTML = createComment(comentario.name, comentario.comment, comentario.image, comentario.time, comentario.showTime, comentario.likes, comentario.reply, comentario.plusCss);
                                commentsContainer.insertAdjacentHTML("beforeend", commentHTML);
                            });
                            
                            if(changeComQtd){
                                const objetosComPlusCssVazio = comentarios.filter(objeto => objeto.plusCss === "");
                                document.getElementById("comentQtd").innerHTML = objetosComPlusCssVazio.length; 
                            }
                        }
                        /****/