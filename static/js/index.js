let chunks = []

const botao_mic = document.getElementById('botao_mic')
const arquivo = document.getElementById('fileInput_rec');
const player = document.getElementById('gravacao');

window.onload = function() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleStart);
}

function checkFile(){
    if($('#fileInput').val().length == 0){
        $('button').attr('disabled', true)
    }
    else{
        $('button').attr('disabled', false);
        var fileName = $('#fileInput').val().split("\\").pop();
        $('#fileInput').siblings(".custom-file-label").addClass("selected").html(fileName);
    }
}

const handleStart = function(stream) {
    const mediaRecorder = new MediaRecorder(stream)

    botao_mic.onmousedown = function() {
        mediaRecorder.start();
        console.log('gravando')
    }
    botao_mic.onmouseup = function() {
        mediaRecorder.stop();
        console.log('parando')

        stream.getTracks() // get all tracks from the MediaStream
            .forEach( track => track.stop() )
    }

    mediaRecorder.ondataavailable = function(e) {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }

      const blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=MS_PCM' });
      const audioURL = window.URL.createObjectURL(blob)
      player.src = audioURL
      document.getElementById('buttonConvert_record').disabled=false


      filename = audioURL.split('/').pop()
      filename = filename.split('-').join('')
      const file = new File([blob], filename + ".wav", {type: "audio/wav"})

      list = new DataTransfer
      list.items.add(file)

      arquivo.files = list.files
    }

};