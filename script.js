
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

micBtn.addEventListener('click', () => {
    recognition.start();
    output.textContent = "Listening...";
});

recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.toLowerCase();
    output.textContent = "You said: " + transcript;
    if (transcript.includes("open projects")) {
        window.location.href = "projects.html";
    } else {
        speak("I'm sorry sir, I didn't catch that.");
    }
};

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}
