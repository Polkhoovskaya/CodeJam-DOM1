
const keyArr = [
    ['Backquote', 'ё', '`', '', '~'],
    ['Digit1', '1', '1', '!'],
    ['Digit2', '2','2', '"', '@'],
    ['Digit3', '3', '3', '№', '#'],
    ['Digit4', '4', '4', ';', '$'],
    ['Digit5', '5', '5', '%'],
    ['Digit6', '6', '6', ':', '^'],
    ['Digit7', '7', '7', '?', '&'],
    ['Digit8', '8', '8', '*'],
    ['Digit9', '9', '9', '('],
    ['Digit0', '0', '0', ')'],
    ['Minus', '-', '-', '_'],
    ['Equal', '=', '=', '+'],
    ['Backspace',  'Backspace', 'Backspace'],

    ['Tab', 'Tab', 'Tab'],
    ['KeyQ', 'й', 'q'],
    ['KeyW', 'ц', 'w'],
    ['KeyE', 'у', 'e'],
    ['KeyR', 'к', 'r'],
    ['KeyT', 'е', 't'],
    ['KeyY', 'н', 'y'],
    ['KeyU', 'г', 'u'],
    ['KeyI', 'ш', 'i'],
    ['KeyO', 'щ', 'o'],
    ['KeyP', 'з', 'p'],
    ['BracketLeft', 'х', '[', '', '{'],
    ['BracketRight', 'ъ', ']', '', '}'],
    ['Delete', 'Del', 'Del'],

    ['CapsLock', 'CapsLock', 'CapsLock'],
    ['KeyA', 'ф', 'a'],
    ['KeyS', 'ы', 's'],
    ['KeyD', 'в', 'd'],
    ['KeyF', 'а', 'f'],
    ['KeyG', 'п', 'g'],
    ['KeyH', 'р', 'h'],
    ['KeyJ', 'о', 'j'],
    ['KeyK', 'л', 'k'],
    ['KeyL', 'д', 'l'],
    ['Semicolon', 'ж', ';', '', ':'],
    ['Quote', 'э', "'", '', '"'],
    ['Backslash', '\\', '\\', '/', '|'],
    ['Enter', 'Enter', 'Enter'],

    ['ShiftLeft', 'Shift', 'Shift'],
    ['IntlBackslash', '\\', '\\', '/', '|'],
    ['KeyZ', 'я', 'z'],
    ['KeyX', 'ч', 'x'],
    ['KeyC', 'с', 'c'],
    ['KeyV', 'м', 'v'],
    ['KeyB', 'и', 'b'],
    ['KeyN', 'т', 'n'],
    ['KeyM', 'ь', 'm'],
    ['Comma', 'б', ',', '', '<'],
    ['Period', 'ю', '.', '', '>'],
    ['Slash', '.', '/', ',', '?'],

    ['ControlLeft', 'Ctrl', 'Ctrl'],
    ['MetaLeft', 'Win', 'Win'],
    ['AltLeft', 'Alt', 'Alt'],
    ['Space', 'Space', 'Space'],
    ['AltRight', 'Alt', 'Alt'],
    ['ControlRight', 'Ctrl', 'Ctrl']

];  

let pressed = false;
let en = false;
let prevButtonClick;


const Keyboard = {
    elements: {
        textarea: null,
        keyboard_wrapper: null,
        keysContainer: null,
        keys: [],
        text: []
    },
    

    createKeyboard() {

        //Create textarea
        this.elements.textarea = document.createElement('textarea');
        this.elements.textarea.classList.add('textarea');
        this.elements.textarea.innerHTML = this.elements.text.join('');

        //Create keyboard_wrapper
        this.elements.keyboard_wrapper = document.createElement('div');
        this.elements.keyboard_wrapper.classList.add('keyboard_wrapper');      
        
        //Create keysContainer
        this.elements.keysContainer = document.createElement('div');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this.createButtons());

        //Add to DOM
        let main = document.createElement('main');
        main.classList.add('main');

        main.appendChild(this.elements.textarea);
        this.elements.keyboard_wrapper.appendChild(this.elements.keysContainer);
        main.appendChild(this.elements.keyboard_wrapper);

        document.body.appendChild(main);

    },
    createButtons() {
        const fragment = document.createDocumentFragment();

        keyArr.forEach (key => {
            let button = document.createElement('button');

            const insertLineBreak = ["Backspace", "Del", "Enter", "."].indexOf(key[1]) !== -1;
            button.classList.add('keyboard__key');
            button.innerHTML = key[1];

            
            switch (key[0]) {
                case 'Backspace': {
                    button.addEventListener('click', () => {
                        backspace();
                        Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'Delete': {
                    button.addEventListener('click', () => {
                        del();
                        Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'Tab': {
                    button.addEventListener('click', () => {
                        tab();
                        Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'Space': {
                    button.addEventListener('click', () => {
                        space();
                         Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                     });
                     button.classList.add('keyboard__key_space');
                     break;
                }
                case 'Enter': {
                    button.addEventListener('click', () => {
                        enter();
                        Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'CapsLock': {
                    button.addEventListener('click', () => {
                        capsLock();
                        Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'ControlLeft':
                case 'ControlRight':
                case 'AltLeft':
                case 'AltRight':
                case 'ShiftRight':
                case 'ShiftLeft':
                case 'MetaLeft': {
                    button.addEventListener('click', () => {
                        console.log(` ${key[0]} presed`);
                    });
                    break;
                }
                default: {     
                   if (en == true) {
                        button.addEventListener('click', () => {
                            Keyboard.elements.text.push(key[2]);
                            Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                        });
                    } else {
                        button.addEventListener('click', () => {
                            Keyboard.elements.text.push(key[1]);
                            Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
                        });
                    }     
                }
            }
       

          fragment.appendChild(button);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });
       
        return fragment;

    },
   
}

document.onkeydown = (event) => {

    if (event.keyCode >= 48 &&  event.keyCode <= 57 ||
        event.keyCode >= 65 &&  event.keyCode <= 69 ||
        event.keyCode >= 70 &&  event.keyCode <= 90 ||
        event.keyCode >= 186 &&  event.keyCode <= 192 ||
        event.keyCode >= 219 &&  event.keyCode <= 222 ||
        event.keyCode == 226) {
            Keyboard.elements.text.push(event.key); 
    } else {
            switch (event.keyCode) {
                case  8: {
                    backspace();
                    break;
                }
                case 9: {
                    tab();
                    break;
                }
                case 46: {
                    del();
                    break;
                } 
                case 13: {
                    enter();
                    break;
                }
                case 32: {
                    space();
                    break;
                } 
                case 20: {
                    capsLock();
                    break;
                }
                case 18: {
                    lang();
                    break;
                } 
                default: {
                    break;  
                }
            }
    }

    Keyboard.elements.textarea.value = Keyboard.elements.text.join(''); 
        
        keyArr.forEach((element, index) => {
            if (event.code == element[0]) {
                document.getElementsByClassName('keyboard__key')[index].classList.add('keyboard__key2');

                time = () => {
                    document.getElementsByClassName('keyboard__key')[index].classList.remove('keyboard__key2');
                   }
                   setTimeout(time, 100);
            }
           
        });
       prevButtonClick = event.code;
    }     
    
backspace = () => {
    Keyboard.elements.text.pop();
}

tab = () => {
    Keyboard.elements.text.push('    ');
}

enter = () => {
    Keyboard.elements.text.push('\ \n');
    
}

del = () => {
    Keyboard.elements.text.shift();
}

space = () => {
    Keyboard.elements.text.push(' ');
}

capsLock = () => {

    pressed = (!pressed) ? true : false;

    if (pressed) {
        keyArr.forEach((element, index) => {

            const mark = ["Backspace", "Del", "Enter", "Tab", "CapsLock", "Shift", "Ctrl", "Win", "Alt", "Space"].indexOf(element[1]) !== -1;

            if (element[1] =='CapsLock') {
                document.getElementsByClassName('keyboard__key')[index].classList.add('keyboard__key3');
            }

             if (!mark) {
                document.getElementsByClassName('keyboard__key')[index].classList.add('toUppercase');
            }       
        });   

    } else {
        keyArr.forEach((element, index) => {

            if (element[1] =='CapsLock') {
                document.getElementsByClassName('keyboard__key')[index].classList.remove('keyboard__key3');
            }

            document.getElementsByClassName('keyboard__key')[index].classList.remove('toUppercase');
         });
    }   
}

lang = () => {
    en = !en;

    if (en && (prevButtonClick == 'ShiftLeft' || prevButtonClick == 'ControlLeft')) {
        keyArr.forEach((element, index) => {
            document.getElementsByClassName('keyboard__key')[index].innerHTML = element[2];
        });
    } else {
        keyArr.forEach((element, index) => {
            document.getElementsByClassName('keyboard__key')[index].innerHTML = element[1];
        });
    }
}



window.addEventListener("DOMContentLoaded", function () {
    Keyboard.createKeyboard();
});







































































const Keyboard2 = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
     },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

 };

// window.addEventListener("DOMContentLoaded", function () {
//     Keyboard2.init();
// });
