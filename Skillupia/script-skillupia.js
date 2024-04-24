// var novonome = '';
// var novasenha = '';
// var novotipo;

function logar(){
    alert('Aguarde as próximas atualizações...');
    // var nome = document.getElementById("nome").value;
    // var senha = document.getElementById("senha").value;
    
    // var localnovonome = localStorage.getItem("novonome");
    // var localnovasenha = localStorage.getItem("novasenha");
    // var localnovotipo = localStorage.getItem("novotipo");

    // if ((!localnovonome || !localnovasenha) && (!localStorage.getItem("novousuario") || !localStorage.getItem("novasenha"))) {
    //     alert('Não há usuários cadastrados. Por favor, crie uma conta.');
    //     return;
    // }

    // if (!localnovotipo) {
    //     alert('Erro: o tipo de usuário não foi definido corretamente.');
    //     return;
    // }

    // if (nome == localnovonome && senha == localnovasenha && localnovotipo == "Professor"){
    //     localStorage.setItem("novonome", nome);
    //     window.location.replace("home_professor.html");
    // }
    // else if (nome == localnovonome && senha == localnovasenha && localnovotipo == "Aluno"){
    //     window.location.replace("home_aluno.html");
    // }
    // else{
    //     alert('Usuário ou senha Incorretos!');
    // }
}

function nova_conta() {
    alert('Aguarde as próximas atualizações...');
    // var divlogin = document.getElementById("divlogin");
    // var divnovologin = document.getElementById("divnovologin");

    // divlogin.style.display = "none";            
    // divnovologin.style.display = "block";
}

// function criar_conta(){
//     // captura os valores preenchidos nos campos de entrada da divnovologin
//     var novoNome = document.getElementById("novo_nome").value;
//     var novaSenha = document.getElementById("nova_senha").value;
//     var tipoInputs = document.querySelectorAll('input[name="tipo"]');
    
//     // verifica se algum tipo foi selecionado
//     var novoTipo = "";
//     for (var i = 0; i < tipoInputs.length; i++) {
//         if (tipoInputs[i].checked) {
//         novoTipo = tipoInputs[i].value;
//         break;
//         }
//     }
//     // exibe mensagem de erro se nenhum tipo foi selecionado
//     if (novoTipo == "") {
//         alert("Por favor selecione um tipo de usuário");
//         return;
//     }
//     // verifica se o nome tem pelo menos 3 caracteres
//     if (novoNome.length < 3) {
//         alert("Por favor insira um nome com pelo menos 3 caracteres");
//         return;
//     }
//     // verifica se a senha tem pelo menos 4 caracteres
//     if (novaSenha.length < 4) {
//         alert("Por favor insira uma senha com pelo menos 4 caracteres");
//         return;
//     }
//     // define os valores capturados como novousuario e novasenha
//     localStorage.setItem("novonome", novoNome);
//     localStorage.setItem("novasenha", novaSenha);
//     localStorage.setItem("novotipo", novoTipo);
//     // volta para a div de login e preenche com os dados criados
//     var divlogin = document.getElementById("divlogin");
//     var nomeInput = document.getElementById("nome");
//     var senhaInput = document.getElementById("senha");
//     var tipoInput = document.querySelector('input[name="tipo"][value="' + novoTipo + '"]');
    
//     nomeInput.value = novoNome;
//     senhaInput.value = novaSenha;
//     tipoInput.checked = true;
//     tipousuario = novoTipo;

//     window.location.replace("login.html");            
// }

// function voltar(){
//     window.location.replace("login.html");
// }