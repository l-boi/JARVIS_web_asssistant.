
const designArea = document.getElementById('design-area');
const log = document.getElementById('log');
let parts = [];

function addPart(type) {
    const part = document.createElement('img');
    part.src = type + '.png';
    part.className = 'part';
    part.style.top = '100px';
    part.style.left = '100px';
    part.draggable = true;
    part.dataset.type = type;
    part.dataset.voltage = '0';
    part.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', null);
        window.draggedPart = part;
    };
    part.ondragend = (e) => {
        part.style.left = e.pageX - 50 + 'px';
        part.style.top = e.pageY - 50 + 'px';
    };
    designArea.appendChild(part);
    parts.push(part);
    speak('Added ' + type);
}

// Voice recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.onresult = (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.toLowerCase();
    log.textContent = "Heard: " + transcript;
    handleCommand(transcript);
};
recognition.start();

function handleCommand(command) {
    if(command.includes('add')) {
        if(command.includes('coil')) addPart('coil');
        else if(command.includes('ring')) addPart('ring');
        else if(command.includes('core')) addPart('core');
        else if(command.includes('casing')) addPart('casing');
        else if(command.includes('shield')) addPart('shield');
    }
    else if(command.includes('delete')) {
        const type = getTypeFromCommand(command);
        deletePart(type);
    }
    else if(command.includes('rotate')) {
        const type = getTypeFromCommand(command);
        rotatePart(type);
    }
    else if(command.includes('set voltage')) {
        const value = command.match(/\d+/);
        const type = getTypeFromCommand(command);
        setVoltage(type, value ? value[0] : null);
    }
    else if(command.includes('what') && command.includes('voltage')) {
        const type = getTypeFromCommand(command);
        tellVoltage(type);
    }
}

function getTypeFromCommand(command) {
    if(command.includes('coil')) return 'coil';
    if(command.includes('ring')) return 'ring';
    if(command.includes('core')) return 'core';
    if(command.includes('casing')) return 'casing';
    if(command.includes('shield')) return 'shield';
    return null;
}

function deletePart(type) {
    const part = parts.find(p => p.dataset.type === type);
    if(part) {
        designArea.removeChild(part);
        parts = parts.filter(p => p !== part);
        speak('Deleted ' + type);
    } else {
        speak('No ' + type + ' found');
    }
}

function rotatePart(type) {
    const part = parts.find(p => p.dataset.type === type);
    if(part) {
        let angle = parseInt(part.dataset.angle || '0') + 45;
        part.style.transform = 'rotate(' + angle + 'deg)';
        part.dataset.angle = angle;
        speak('Rotated ' + type);
    } else {
        speak('No ' + type + ' found');
    }
}

function setVoltage(type, voltage) {
    const part = parts.find(p => p.dataset.type === type);
    if(part && voltage) {
        part.dataset.voltage = voltage;
        speak('Voltage of ' + type + ' set to ' + voltage + ' volts');
    } else {
        speak('Could not set voltage');
    }
}

function tellVoltage(type) {
    const part = parts.find(p => p.dataset.type === type);
    if(part) {
        speak('Voltage of ' + type + ' is ' + part.dataset.voltage + ' volts');
    } else {
        speak('No ' + type + ' found');
    }
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-US';
    window.speechSynthesis.speak(msg);
}
