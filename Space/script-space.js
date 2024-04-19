// JavaScript para controlar o zoom com o scroll do mouse
let scale = 1;
document.addEventListener("wheel", function(event) {
    const zoomStep = 0.1;
    if (event.deltaY < 0) {
        // Scroll para cima, aumenta o zoom
        scale += zoomStep;
    } else {
        // Scroll para baixo, diminui o zoom
        scale -= zoomStep;
    }

    scale = Math.max(0.1, Math.min(5, scale));
    document.querySelector("main").style.transform = `scale(${scale})`;
});
  
// // Event listener para detectar a tecla ESPAÇO
// document.addEventListener('keydown', function(event) {
//     if (event.code === 'Space') {
//         var animacaoAtiva = document.body.dataset.animacaoAtiva === 'true';
//         if (animacaoAtiva) {
//         desativarAnimacao();
//         document.body.dataset.animacaoAtiva = 'false';
//         } else {
//         ativarAnimacao();
//         document.body.dataset.animacaoAtiva = 'true';
//         }
//     }
// });
  
document.getElementById("sol").addEventListener("click", function(event) {
    var descricaosol = document.getElementById("descricao-sol");
    var targetElement = event.target;
    if (!targetElement.classList.contains("Mercurio")) {
        descricaosol.classList.toggle("mostrar");
    }
});

// Obtenha o elemento de Mercúrio
const mercurio = document.querySelector('.Mercurio');

// Variáveis para a posição atual de Mercúrio
let angle = 0;
const radius = 200; // Raio da órbita

// Função para atualizar a posição de Mercúrio
function updateMercurioPosition() {
    // Calcula a posição x e y de Mercúrio na órbita circular
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // Define a posição de Mercúrio
    mercurio.style.transform = `translate(${x}px, ${y}px)`;

    // Incrementa o ângulo para o próximo quadro
    angle += 0.005; // Ajuste conforme necessário para a velocidade da órbita
}

// Atualiza a posição de Mercúrio em intervalos regulares
setInterval(updateMercurioPosition, 20);