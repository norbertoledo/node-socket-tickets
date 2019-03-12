const fs = require('fs');

class Ticket{

    constructor(numero, escritorio){

            this.numero = numero;
            this.escritorio = escritorio;
    }



}


class TicketControl {

    constructor(){

        this.cant_escritorios = 4;
        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.tickets = [];
        this.ultimosLlamados = [];

        let data = require('../data/data.json');

        // Si es igual, continuo leyendo los tickets del dia actual, sino es otro dia y hay que resetearlo
        if(data.hoy === this.hoy){

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosLlamados = data.ultimosLlamados;

        }else{

            this.reiniciarConteo();

        }

    }

    llamarProximoTicket(){

        this.ultimo++;

        let ticket = new Ticket(this.ultimo, null);

        this.tickets.push(ticket);

        this.grabarDatos();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket(){
        return this.ultimo;
    }

    getUltimosLlamados(){
        return this.ultimosLlamados;
    }


    // REcibo un numero de escritorio
    atenderTicket( escritorio ){

        // Verifico si no hay mas tickes en la cola
        if ( this.tickets.length === 0){
            return 'No hay mas tickets';
        }

        // Si hay en la cola, asigno el proximo
        let numeroTicket = this.tickets[0].numero;

        // Lo elimino del array de la cola
        this.tickets.shift();

        // Instancio el nuevo Ticket a atender
        let atenderA = new Ticket(numeroTicket, escritorio);




        // Lo agrego al array de los tickets que se estan atendiendo actualmente
        this.ultimosLlamados.unshift(atenderA);

        // Elimino el ultimo ticket que exceda la cantidad de escritorios
        // Quiere decir que ese cliente ya fue atendio y no está en ingun escritorio
        if(this.ultimosLlamados.length>this.cant_escritorios){
            this.ultimosLlamados.pop();
        }

        console.log('ultimosLlamados')
        console.log(this.ultimosLlamados);

        // Guardo los datos actualizados en el JSON
        this.grabarDatos();

        // Retorno el objeto Ticket que va a ser atendido de inmediato
        return atenderA;
    }



    reiniciarConteo(){

        this.ultimo = 0;
        this.tickets = [];
        this.ultimosLlamados = [];
        this.grabarDatos();

    }


    grabarDatos(){

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosLlamados: this.ultimosLlamados
        }

        let jsonDataString = JSON.stringify(jsonData);

        //Path relativo a la raiz
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}



module.exports = {
    TicketControl
}