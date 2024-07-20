// Global variables
let textElements = document.querySelectorAll(".terminal_promt");
let textInput = textElements[textElements.length - 1];

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
        if (
            [
                "ArrowLeft",
                "ArrowRight"
            ].includes(e.key)
        ) {
            //e.preventDefault(); // Evitar el comportamiento predeterminado
            console.log(`La tecla ${e.key} ha sido ejecutada.`); // Mensaje en consola
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
        console.log("error");
        updateTextInput()
    }

    // Eliminar la ultima letra
    if (e.key == "Backspace") {
        const text = textWritted.split("");
        text.pop();
        textField.innerHTML = text.join("");
        textWritted = text.join("");
    }

    // Añadir un espacio
    if (e.key == " ") {
        try {
            textField.innerHTML += "&nbsp;";
            textWritted += " ";
        } catch (e) {
            console.log("error");
            updateTextInput()
        }
    }

    // Añadir un enter
    if (e.key == "Enter") {
        function addNewLine() {
            const terminal_body = document.querySelector(".terminal_body");

            // Crear el elemento 'div' para el prompt del terminal
            const terminal_prompt = document.createElement("div");
            terminal_prompt.classList.add("terminal_promt");

            // Crear el elemento 'span' para el usuario y agregarle contenido
            const user = document.createElement("span");
            user.classList.add("terminal_user");
            user.innerHTML = "marc@admin:";

            // Crear el elemento 'span' para la ubicación y agregarle contenido
            const location = document.createElement("span");
            location.classList.add("terminal_location");
            location.innerHTML = "~";

            // Crear el elemento 'span' para el bling y agregarle contenido
            const bling = document.createElement("span");
            bling.classList.add("terminal_bling");
            bling.innerHTML = "%";

            // Crear el elemento 'span' para el cursor
            const cursor = document.createElement("span");
            cursor.classList.add("terminal_cursor");

            // Agregar los elementos 'user', 'location' y 'bling' al 'terminal_prompt'
            terminal_prompt.appendChild(user);
            terminal_prompt.appendChild(location);
            terminal_prompt.appendChild(bling);

            // Crear un nuevo span con clase 'text'
            const text = document.createElement("span");
            text.classList.add("text");

            // Seleccionar el último elemento con la clase 'text' si existe
            const textElements = document.querySelectorAll(".text");
            if (textElements.length > 0) {
                const lastTextInput = textElements[textElements.length - 1];
                // Eliminar la clase 'text' del último elemento 'text' existente
                lastTextInput.classList.remove("text");
                lastTextInput.classList.add("text-sended");
            }

            // Eliminar el cursor
            const cursorAntiguo = document.querySelector(".terminal_cursor")
            cursorAntiguo.remove()

            // Actualizar textInput para que apunte al nuevo elemento
            updateTextInput()

            // Añadir el nuevo span al terminal_prompt
            terminal_prompt.appendChild(text);
            terminal_prompt.appendChild(cursor);

            terminal_body.appendChild(terminal_prompt);
        }

        addNewLine();
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