

let socket = io();

var labelTituloEscritorio = document.querySelector('h1');
var labelNumeroTicket = document.querySelector('small');


var searchParams = new URLSearchParams( window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);

labelTituloEscritorio.innerHTML = `Escritorio ${escritorio}`;

//$('button').on('click', function(){
document.querySelector('button').addEventListener('click', function(){

    socket.emit('atenderTicket', {escritorio: escritorio}, function(res){

        if(res === 'No hay mas tickets'){
            labelNumeroTicket.innerHTML = res;
            alert(res);
            
            return;
        }
        labelNumeroTicket.innerHTML = `Ticket ${res.numero}`;
    });

});



