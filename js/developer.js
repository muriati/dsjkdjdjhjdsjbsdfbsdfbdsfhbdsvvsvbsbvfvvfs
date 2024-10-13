/* Developer Tools */
document.addEventListener("DOMContentLoaded", function(){
    const contPrimeiroPasso = document.getElementById('contPrimeiroPasso');
    const contSegundoPasso = document.getElementById('contSegundoPasso');
    const contTerceiroPasso = document.getElementById('contTerceiroPasso');
    
    switch(curStep){
        case 1:
        contPrimeiroPasso.classList.remove('ocultar');
        contPrimeiroPasso.classList.remove('mostrar');
        contPrimeiroPasso.classList.add('mostrar');
        
        contSegundoPasso.classList.remove('mostrar');
        contSegundoPasso.classList.remove('ocultar');
        contSegundoPasso.classList.add('ocultar');
        
        contTerceiroPasso.classList.remove('mostrar');
        contTerceiroPasso.classList.remove('ocultar');
        contTerceiroPasso.classList.add('ocultar');
        break;
        
        case 2:
        contSegundoPasso.classList.remove('ocultar');
        contSegundoPasso.classList.remove('mostrar');
        contSegundoPasso.classList.add('mostrar');
        
        contPrimeiroPasso.classList.remove('mostrar');
        contPrimeiroPasso.classList.remove('ocultar');
        contPrimeiroPasso.classList.add('ocultar');
        
        contTerceiroPasso.classList.remove('mostrar');
        contTerceiroPasso.classList.remove('ocultar');
        contTerceiroPasso.classList.add('ocultar');
        break;
        
        case 3:
        contTerceiroPasso.classList.remove('ocultar');
        contTerceiroPasso.classList.remove('mostrar');
        contTerceiroPasso.classList.add('mostrar');
        
        contPrimeiroPasso.classList.remove('mostrar');
        contPrimeiroPasso.classList.remove('ocultar');
        contPrimeiroPasso.classList.add('ocultar');
        
        contSegundoPasso.classList.remove('mostrar');
        contSegundoPasso.classList.remove('ocultar');
        contSegundoPasso.classList.add('ocultar');
        
        startBar();
        startComentsTimer();
        startStatus();
        break;
    }
});
/****/