var socket = io();


socket.on('estadoActual', function(data){

    //Reproducir audio
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();


    actualizarHTML(data.ultimosLlamados);

});

// on ultimosLlamados

let actualizarHTML = (ultimosLlamados)=>{

    for(var i = 0; i<ultimosLlamados.length; i++){
        document.querySelector(`#lblTicket${i+1}`).innerHTML=`Ticket ${ultimosLlamados[i].numero}`;
        document.querySelector(`#lblEscritorio${i+1}`).innerHTML=`Escritorio ${ultimosLlamados[i].escritorio}`;
    }

};