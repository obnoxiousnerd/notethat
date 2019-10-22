const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
SpeechRecognition.isFinal = true
const recognition = new SpeechRecognition()
const talk = document.querySelector('#talk')
const stop = document.querySelector('#stop')
const editor = document.querySelector('#editor')
recognition.onresult = (res)=>{
   const transcript = res.results[0][0].transcript
   console.log(transcript);
   editor.value += transcript
   editor.value += ' ' 
}  
   talk.addEventListener('click',() => {
   recognition.addEventListener('end', recognition.start)
})
stop.addEventListener('click', ()=>{
   recognition.removeEventListener('end', recognition.start)
})
const bgcols = ["#F2FF49", "#FF4242", "#FB62F6", "#645DD7", "#B3FFFC"]
setInterval(()=>{
   const index = Math.floor(Math.random()*5)
   editor.style.cssText = "background-color : " +bgcols[index]
   document.body.style.cssText = "background-color : " +bgcols[index]
}, 10000)
function getFile(){
   var text = editor.value;
   text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
   var blob = new Blob([text], { type: "text/plain"});
   var anchor = document.createElement("a");
   anchor.download = "notes.txt";
   anchor.href = window.URL.createObjectURL(blob);
   anchor.target ="_blank";
   anchor.style.display = "none"; // just to be safe!
   document.body.appendChild(anchor);
   anchor.click();
   document.body.removeChild(anchor);
}