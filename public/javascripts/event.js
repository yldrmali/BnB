var clear=document.querySelector('.input-field>i.material-icons.right');
var inputText=document.querySelector('input#file-input');
var inputFile=document.querySelector('input.file-path');


clear.addEventListener('click',()=>{
    inputText.value="";
    inputFile.value="";
    inputText.classList.remove("valid");
    inputFile.classList.remove("valid");
})


