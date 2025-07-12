const micBtn = document.getElementById('mic');
const output = document.getElementById('output');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = "en-US";

micBtn.addEventListener('click', () => {
    recognition.start();
    output.innerHTML = "Listening...";
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.innerHTML = "You said: " + transcript;
    if (transcript.includes("open arc reactor project")) {
        output.innerHTML += "<br>Jarvis: Opening Arc Reactor project.";
        window.location.href = "arc-reactor.html";
    } else {
        output.innerHTML += "<br>Jarvis: I'm sorry sir, I didn't catch that.";
    }
};