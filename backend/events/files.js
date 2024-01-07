const path = require('path');

const handleFileEvents = (io, socket) => {
    // Enable file uploads middleware


    socket.on('file upload', async (fileData) => {
        if (!fileData) {
            console.error('No file received');
            return;
        }

        const file = await fileData.file;
        console.log(file)
        // if (!file) {
        //     console.error('Invalid file data received');
        //     return;
        // }

        // const fileName = file.name;
        // const filePath = path.join(__dirname, 'uploads', fileName);

        // try {
        //     // Save the file to the 'uploads' directory
        await file.mv(__dirname + 'uploads/file');

        //     // Broadcast a message to all clients with the file link
        io.emit('chat message', {
            username: 'System',
            msg: `File uploaded: ${file}`,
            isSystemMessage: true,
            timestamp: new Date().toISOString(),
        });
        // } catch (error) {
        //     console.error(error);
        // }
    });
};

module.exports = handleFileEvents;
