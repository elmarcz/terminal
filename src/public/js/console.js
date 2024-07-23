// Global variables
let textElements = document.querySelectorAll(".terminal_promt");
let textInput = textElements[textElements.length - 1];
let history = [];
let numberOnHistory = 0;

let textField = document.querySelector(".text");
var textWritted = "";
const characters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "ñ",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "!",
    "@",
    "·",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
    "\\",
    "|",
    "`",
    "~",
    "¿",
    "¡",
    "€",
    "£",
    "¥",
    "©",
    "®",
    "™",
];

// Global functions
function updateTextInput() {
    textElements = document.querySelectorAll(".terminal_promt");
    textInput = textElements[textElements.length - 1];

    textField = document.querySelector(".text");

    textWritted = "";
}

// --- EVENTS ---
// Se ha presionado una flecha
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft" || "ArrowRight":
                console.log(`La tecla ${e.key} ha sido ejecutada.`);
                break

            case "ArrowUp":
                // Moverse hacia arriba en el historial
                if (numberOnHistory < history.length - 1) {
                    numberOnHistory++;
                    updateTextInput();
                    textField.innerHTML = history[numberOnHistory] || ""; // Mostrar el comando anterior
                }
                break;

            case "ArrowDown":
                // Moverse hacia abajo en el historial
                if (numberOnHistory > 0) {
                    numberOnHistory--;
                    updateTextInput();
                    textField.innerHTML = history[numberOnHistory] || ""; // Mostrar el siguiente comando
                } else if (numberOnHistory === 0) {
                    // Si se está en el primer comando, restablecer el campo de texto
                    numberOnHistory = -1; // Restablecer el índice al estado inicial
                    updateTextInput();
                    textField.innerHTML = ""; // Limpiar la entrada si se está en el primer comando
                }
                break;
            default:
                break
        }
    });
});

// Se ha presionado una tecla
document.addEventListener("keydown", (e) => {
    const result = characters.find(
        (char) => char == e.key.toLowerCase()
    );

    // Escribir la letra
    try {
        if (result && keysPressed.ctrl == false) {
            textField.innerHTML += e.key;
            textWritted += e.key;
        }
    } catch (e) {
        updateTextInput()
    }

    switch (e.key) {
        // Eliminar la ultima letra
        case "Backspace":
            const text = textWritted.split("");
            text.pop();
            textField.innerHTML = text.join("");
            textWritted = text.join("");
            break;

        // Añadir un espacio
        case " ":
            try {
                textField.innerHTML += "&nbsp;";
                textWritted += " ";
            } catch (e) {
                updateTextInput()
            }
            break;

        // Añadir un enter
        case "Enter":
            updateTextInput();
            if (textField.innerHTML == "") return;
            numberOnHistory = -1;

            function addNewLine() {
                const terminal_body = document.querySelector(".terminal_body");

                // Create the 'div' element for the terminal prompt
                const terminal_prompt = document.createElement("div");
                terminal_prompt.classList.add("terminal_promt");

                // Create the 'span' element for the user and add content
                const user = document.createElement("span");
                user.classList.add("terminal_user");
                user.innerHTML = "marc@admin:";

                // Create the 'span' element for the location and add content
                const location = document.createElement("span");
                location.classList.add("terminal_location");
                location.innerHTML = "~";

                // Create the 'span' element for the bling and add content
                const bling = document.createElement("span");
                bling.classList.add("terminal_bling");
                bling.innerHTML = "%";

                // Create the 'span' element for the cursor
                const cursor = document.createElement("span");
                cursor.classList.add("terminal_cursor");
                cursor.innerHTML = "|"; // Add a visible cursor representation

                // Add the user, location, and bling elements to the terminal_prompt
                terminal_prompt.appendChild(user);
                terminal_prompt.appendChild(location);
                terminal_prompt.appendChild(bling);

                // Create a new 'span' with class 'text'
                const text = document.createElement("span");
                text.classList.add("text");

                // Select the last element with the class 'text' if it exists
                const textElements = document.querySelectorAll(".text");
                if (textElements.length > 0) {
                    const lastTextInput = textElements[textElements.length - 1];
                    // Remove the 'text' class from the last existing 'text' element
                    lastTextInput.classList.remove("text");
                    lastTextInput.classList.add("text-sended");
                }

                // Remove the old cursor
                const cursorAntiguo = document.querySelector(".terminal_cursor");
                if (cursorAntiguo) {
                    cursorAntiguo.remove();
                }

                // Update text input to point to the new element
                updateTextInput();

                // Add the new 'text' span to the terminal_prompt
                terminal_prompt.appendChild(text);
                terminal_prompt.appendChild(cursor);

                terminal_body.appendChild(terminal_prompt);
            }
            function addNewLineResponse(txt) {
                const terminal_body = document.querySelector(".terminal_body");

                // Create the 'div' element for the terminal prompt
                const terminal_prompt = document.createElement("div");
                terminal_prompt.classList.add("terminal_promt");

                // Create the 'span' element for the user and add content
                const user = document.createElement("span");
                user.classList.add("terminal_user");
                user.innerHTML = "console:";

                // Add the user, location, and bling elements to the terminal_prompt
                terminal_prompt.appendChild(user);

                // Create a new 'span' with class 'text-sended' to display the response
                const text = document.createElement("span");
                text.classList.add("text-sended");
                text.innerHTML = txt;

                // Select the last element with the class 'text' if it exists
                const textElements = document.querySelectorAll(".text");
                if (textElements.length > 0) {
                    const lastTextInput = textElements[textElements.length - 1];
                    // Remove the 'text' class from the last existing 'text' element
                    lastTextInput.classList.remove("text");
                    lastTextInput.classList.add("text-sended");
                }

                // Remove the old cursor
                const cursorAntiguo = document.querySelector(".terminal_cursor");
                if (cursorAntiguo) {
                    cursorAntiguo.remove();
                }

                // Update text input to point to the new element
                updateTextInput();

                // Add the new 'text' span to the terminal_prompt
                terminal_prompt.appendChild(text);

                terminal_body.appendChild(terminal_prompt);
            }
            function response() {
                //Check if it is a command (Starts with "/")
                let checkCommand = textWritted.split("")
                if (checkCommand[0] == "/") {
                    // Send the command to the api
                    fetch("/api/message-sended", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ text: textWritted.toLowerCase() })
                    })
                        .then(response => response.json())
                        .then(data => {
                            addNewLineResponse(data.message);
                            addNewLine();
                        })
                        .catch(error => console.error("Error:", error));
                } else { addNewLine() }
            }

            if (!history.includes(textField.innerHTML)) {
                history.unshift(textField.innerHTML); //Add textWritted at the beggining of history    
            }

            response();
            break;

        default:
            break;
    }

    keysPressed.selected = false;
});


// --- SELECCIONES ---
const keysPressed = { ctrl: false, selected: false };

// Seleccionando
document.addEventListener("keydown", (e) => {
    if (e.key == "Control") {
        if ((keysPressed.ctrl = true)) {
            keysPressed.ctrl = false;
        } else {
            keysPressed.ctrl = true;
        }
    }

    if (keysPressed.ctrl == true && e.key.toLowerCase() == "q") {
        // Crea un rango de selección
        const range = document.createRange();
        range.selectNodeContents(textField); // Selecciona todo el contenido del span

        // Obtén el objeto de selección
        const selection = window.getSelection();
        selection.removeAllRanges(); // Elimina cualquier selección existente
        selection.addRange(range); // Añade el rango a la selección

        // Opcional: Resaltar el texto seleccionado (para visualización)
        textField.classList.add("highlight");

        console.log("Seleccionando");
        keysPressed.ctrl = false;
        keysPressed.selected = true;
    } else {
        keysPressed.ctrl = false;
    }
});

// Dejar de seleccionar
document.addEventListener("click", (e) => {
    if (keysPressed.ctrl == true) {
        console.log("Dejo de seleccionar");
        keysPressed.ctrl = false;
    }
});