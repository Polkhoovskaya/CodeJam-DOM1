
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
let isEn = false;
let prevButtonClick;

class ButtonEvents {
    backspace = () => {
        keyboard.text.pop();
    }
    
    tab = () => {
        keyboard.text.push('    ');
    }
    
    enter = () => {
        keyboard.text.push('\ \n');
        
    }
    
    del = () => {
        keyboard.text.shift();
    }
    
    space = () => {
        keyboard.text.push(' ');
    }
    
    capsLock = () => {
    
        pressed = (!pressed) ? true : false;
    
        if (pressed) {
            keyArr.forEach((element, index) => {
    
                const mark = ["Backspace", "Del", "Enter", "Tab", "CapsLock", "Shift", "Ctrl", "Win", "Alt", "Space"].indexOf(element[1]) !== -1;
    
                if (element[1] ==='CapsLock') {
                    document.getElementsByClassName('keyboard__key')[index].classList.add('keyboard__key3');
                }
    
                 if (!mark) {
                    document.getElementsByClassName('keyboard__key')[index].classList.add('toUppercase');
                }       
            });   
    
        } else {
            keyArr.forEach((element, index) => {
    
                if (element[1] ==='CapsLock') {
                    document.getElementsByClassName('keyboard__key')[index].classList.remove('keyboard__key3');
                }
    
                document.getElementsByClassName('keyboard__key')[index].classList.remove('toUppercase');
             });
        }   
    }
    lang = () => {
        isEn = !isEn;

        if (isEn && (prevButtonClick === 'ShiftLeft' || prevButtonClick === 'ControlLeft')) {
            keyArr.forEach((element, index) => {
                if(element[4] && element[4] !== ''){
                    document.getElementsByClassName('keyboard__key')[index].innerHTML = `<p class="additionalSubols_en">${element[4]}</p> ${element[2]}`;
                } else {
                    document.getElementsByClassName('keyboard__key')[index].innerHTML = element[2];
                }
                if(element[3] && element[3] !== ''){
                    document.getElementsByClassName('keyboard__key')[index].innerHTML =  document.getElementsByClassName('keyboard__key')[index].innerHTML + `<p class="additionalSubols_ru">${element[3]}</p>`;
                }
            });
        } else if (prevButtonClick === 'ShiftLeft' || prevButtonClick === 'ControlLeft') {
            keyArr.forEach((element, index) => {
                if(element[4] && element[4] !== ''){
                    document.getElementsByClassName('keyboard__key')[index].innerHTML = `<p class="additionalSubols_en">${element[4]}</p> ${element[1]}`;
                } else {
                    document.getElementsByClassName('keyboard__key')[index].innerHTML = element[1];
                }
                if(element[3] && element[3] !== ''){
                    document.getElementsByClassName('keyboard__key')[index].innerHTML =  document.getElementsByClassName('keyboard__key')[index].innerHTML + `<p class="additionalSubols_ru">${element[3]}</p>`;
                }
            });
        }
    }
    
}


class Keyboard extends ButtonEvents {
    constructor() {
        super();
        this.textarea = null;
        this.keyboard_wrapper = null;
        this.keysContainer = null;
        this.keys = [];
        this.text = [];
    }

    _createTextArea() {
        this.textarea = document.createElement('textarea');
        this.textarea.classList.add('textarea');
        this.textarea.innerHTML = this.text.join('');
    }
    _createKeyboardWrapper() {
        this.keyboard_wrapper = document.createElement('div');
        this.keyboard_wrapper.classList.add('keyboard_wrapper');    
    }
    _createKeysContainer() {
        this.keysContainer = document.createElement('div');
        this.keysContainer.classList.add('keyboard__keys');
        this.keysContainer.appendChild(this._createButtons());
    }
    _addToDOM() {
        let main = document.createElement('main');
        main.classList.add('main');

        main.appendChild(this.textarea);
        this.keyboard_wrapper.appendChild(this.keysContainer);
        main.appendChild(this.keyboard_wrapper);

        document.body.appendChild(main);
    }
    createKeyboard() {
        this._createTextArea();
        this._createKeyboardWrapper();
        this._createKeysContainer();
        this._addToDOM();
    }
    _createButtons() {
        let fragment = document.createDocumentFragment();

        keyArr.forEach (key => {
            let button = document.createElement('button');

            let insertLineBreak = ["Backspace", "Del", "Enter", "."].indexOf(key[1]) !== -1;
            button.classList.add('keyboard__key');

            if(key[4] && key[4] !== '') {
                button.innerHTML = button.innerHTML + `<p class="additionalSubols_en">${key[4]}</p>`;
            }

            button.innerHTML = button.innerHTML + key[1];

            if(key[3] && key[3] !== '') {
                button.innerHTML = button.innerHTML + `<p class="additionalSubols_ru">${key[3]}</p>`;
            }
            

            switch (key[0]) {
                case 'Backspace': {
                    button.addEventListener('click', () => {
                        this.backspace();
                        this.textarea.value = this.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'Delete': {
                    button.addEventListener('click', () => {
                        this.del();
                        this.textarea.value = this.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'Tab': {
                    button.addEventListener('click', () => {
                        this.tab();
                        this.textarea.value = this.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'Space': {
                    button.addEventListener('click', () => {
                        this.space();
                         this.textarea.value = this.text.join(''); 
                     });
                     button.classList.add('keyboard__key_space');
                     break;
                }
                case 'Enter': {
                    button.addEventListener('click', () => {
                        this.enter();
                        this.textarea.value = this.text.join(''); 
                    });
                    button.classList.add('keyboard__key_long');
                    break;
                }
                case 'CapsLock': {
                    button.addEventListener('click', () => {
                        this.capsLock();
                        this.textarea.value = this.text.join(''); 
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
                    break;
                }
                default: {     
                   if (isEn === true) {
                        button.addEventListener('click', () => {
                            this.text.push(key[2]);
                            this.textarea.value = this.text.join(''); 
                        });
                    } else {
                        button.addEventListener('click', () => {
                            this.text.push(key[1]);
                            this.textarea.value = this.text.join(''); 
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

    }
}

const keyboard = new Keyboard();

document.onkeydown = (event) => {

    if (event.keyCode >= 48 &&  event.keyCode <= 57 ||
        event.keyCode >= 65 &&  event.keyCode <= 69 ||
        event.keyCode >= 70 &&  event.keyCode <= 90 ||
        event.keyCode >= 186 &&  event.keyCode <= 192 ||
        event.keyCode >= 219 &&  event.keyCode <= 222 ||
        event.keyCode === 226) {
            keyboard.text.push(event.key); 
    } else {
            switch (event.keyCode) {
                case  8: {
                    keyboard.backspace();
                    break;
                }
                case 9: {
                    keyboard.tab();
                    break;
                }
                case 46: {
                    keyboard.del();
                    break;
                } 
                case 13: {
                    keyboard.enter();
                    break;
                }
                case 32: {
                    keyboard.space();
                    break;
                } 
                case 20: {
                    keyboard.capsLock();
                    break;
                }
                case 18: {
                    keyboard.lang();
                    break;
                } 
                default: {
                    break;  
                }
            }
    }

    keyboard.textarea.value = keyboard.text.join(''); 
        
        keyArr.forEach((element, index) => {
            if (event.code === element[0]) {
                document.getElementsByClassName('keyboard__key')[index].classList.add('keyboard__key2');

                time = () => {
                    document.getElementsByClassName('keyboard__key')[index].classList.remove('keyboard__key2');
                   }
                   setTimeout(time, 100);
            }
           
        });
       prevButtonClick = event.code;
    }     


window.addEventListener("DOMContentLoaded", function () {
    keyboard.createKeyboard();
});



