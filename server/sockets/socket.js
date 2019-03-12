const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('proximoTicket', (data, callback)=>{

        let proximo = ticketControl.llamarProximoTicket(); 
        console.log(proximo);

        callback(proximo);
    });

    //emitir un evento 'estadoActual'
    // Llama y retorna el ultimo numero llamado
    client.emit('estadoActual',
        {
            actual: ticketControl.getUltimoTicket(),
            ultimosLlamados: ticketControl.getUltimosLlamados()
        }
    );


    client.on('atenderTicket', (data, callback)=>{

        if( !data.escritorio ){
            return callback(
                {
                    err: true,
                    mensaje: 'El escritorio es necesario'
                }
            )
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback(atenderTicket);

        // actualizar / notificar cambios en los ultimos4
        // emit ultimosLlamados

        client.broadcast.emit('estadoActual', 
            {
                actual: ticketControl.getUltimoTicket(),
                ultimosLlamados: ticketControl.getUltimosLlamados()
            }
        );

    });




});