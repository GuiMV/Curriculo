function logar(){
    alert('Aguarde as próximas atualizações...');
}
// //Sistema para Ler Registros e efetuar Login
// const loginForm = document.getElementById("login-form");
// const loginButton = document.getElementById("login-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");


// loginButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const username = loginForm.nome.value;
//     const password = loginForm.senha.value;

//     // Faz uma solicitação para obter os dados dos registros de usuário
//     fetch('/get-users')
//         .then(response => response.json())
//         .then(userRecords => {
//             let userFound = false;

//             for (const user of userRecords) {
//                 if (user.nome === username && user.senha === password) {
//                     userFound = true;
//                     break;
//                 }
//             }

//             if (userFound){
//                 alert("You have successfully logged in.");
//                 window.location.href = 'Interface';
//             } else {
//                 document.getElementById("login-error-msg-holder").style.display = "grid";
//             }
//         })
//         .catch(error => {
//             console.error('Erro:', error);
//         });
// });