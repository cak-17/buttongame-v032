const handleGameEvents = (io, socket) => {
    socket.on('game start', (liv, randomNumbersSize) => {

        /*
        CREAZIONE NUMERI CASUALI
        randomNumbers probabili che possono uscire da 1-10
        */

        const randomNumbersRange = 10;
        const randomNumbers = [];

        //crea un canale con il nome identificativo dell'utente
        socket.join(socket.id);

        //RIEMPI ARRAY CON CICLO CON I NUMERI CASUALI
        for (let i = 0; i < randomNumbersSize; i++) {
            randomNumbers.push(Math.floor(Math.random() * randomNumbersRange));
        }
        //INVIA DATI AL CANALE APPENA APERTO X UTENTE
        io.to(socket.id).emit("gameSet", randomNumbers);
        //io.emit('gameSet', numberData);
    })

    socket.on('gameOnline 1vs1', async (playersQueue) => {

        //CREAZIONE CANALE PER IL  1 vs 1
        //socket.join(s);
        //socket.join(socket.id);

        // Check if first user in queue is the same.
        if (playersQueue[0] === socket.data.username) {
            //io.to(socket.id).emit('gameSet', "Waiting for other players to join...");
            console.log("Non puoi giocare contro te stesso..è buttonGame... nn una sega.")
            return
        }

        playersQueue.push(socket.data.username);
        console.log(playersQueue);


        if (playersQueue.length === 2) {
            //FAI ENTRARE UTENTE SECONDO NEL CANALE DEL 1vs1
            socket.join(playersQueue[0]);
            io.to(playersQueue[0]).emit('gameSet', "trovati i player x la partita.. [" + playersQueue + "]");
            playersQueue = [];
        } else {

            io.to(socket.id).emit('gameSet', "sei in attesa x la partita...\n" + socket.data.username);
            //APRI UN CANALE PER IL 1vs1
            socket.join(socket.data.username);
            // io.emit('gameSet', "sei in attesa x la partita...\n"+socket.data.username); 

        }
    })
}

module.exports = handleGameEvents;