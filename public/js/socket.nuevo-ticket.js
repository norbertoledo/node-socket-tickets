// Rutina para manejar nuevos tickets

// Comando para establecer la conexion
let socket = io();

var label = document.querySelector('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('Conectado al servidor')
});

socket.on('disconnect', function(){
    console.log('Desconectado del servidor')
});

socket.on('estadoActual', function(res){
    label.innerHTML= `Ticket ${res.actual}`;
})


// jQuery
//$('button').on('click', function(){

    document.querySelector('button').addEventListener('click', function(){

    // emit('referencia', data, callback)
    socket.emit('proximoTicket', null, function(proximoTicket){
        label.innerHTML = proximoTicket;
    });
});