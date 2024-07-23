const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "page.html"));
})

app.post('/api/message-sended', (req, res) => {
    const textWritted = req.body.text;

    const commandsPath = path.join(__dirname, 'public/js/commands');
    const command = textWritted.split(" ")[0].split("/")[1];
    let messageToSend = "";
    let finded = false;

    fs.readdir(commandsPath, (err, files) => {
        if (err) {
            console.error("Error leyendo la carpeta:", err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        for (const file of files) {
            const filePath = path.join(commandsPath, file);

            if (path.extname(file) === '.js') {
                const script = require(filePath);

                // Recorremos la lista de nombres para ver si alguno coincide
                for(let i = 0; i < script.name.length; i++){
                    if (script.name[i].toLowerCase() == command) {
                        messageToSend = script.description;
                        finded = true;
                        break;
                    }
                }
                
            }
        }

        if(finded == false){
            messageToSend = "It does not exist a command called: " + command + " type /help." 
        }

        res.json({ message: messageToSend });
    });
});

app.listen(3000, console.log("Server on port 3000"));