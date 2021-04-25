function checkFile(){
    if($('input[type=file]').val().length == 0){
        $('button').attr('disabled', true)
    }
    else{
        $('button').attr('disabled', false);
        var fileName = $('input[type=file]').val().split("\\").pop();
        $('input[type=file]').siblings(".custom-file-label").addClass("selected").html(fileName);
    }
}

function gravar(){
    console.log('gravando')
}