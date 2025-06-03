function login(){
    ussenha = document.getElementById("ussenha").value;
    senha = "12345";
    senhaera = document.getElementById("senhaer");

    if(ussenha == senha){
        window.location.href = "index.html";
    } else {
        senhaera.textContent = "Senha incorreta.";
        
    }
}
function mostrarSenha(){
    var inputPass = document.getElementById('ussenha');
    var btnShowPass = document.getElementById('btn-senha');

    if(inputPass.type === 'password'){
        inputPass.setAttribute('type','text');
        btnShowPass.classList.replace('bi-eye-fill','bi-eye-slash-fill');
    }else{
        inputPass.setAttribute('type','password');
        btnShowPass.classList.replace('bi-eye-slash-fill','bi-eye-fill');
    }
}    