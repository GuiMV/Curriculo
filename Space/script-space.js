let scale = 1; //Zoom
let isIntervalRunning = true;
const mercurio = document.querySelector('.Mercurio');
    let aMercurio = 0; // Angulo
    const roMercurio = 92; // Raio da órbita
    let intervalIDMercurio = setInterval(updateMercurioPosition, 8.8); //Atualização dos planetas
const venus = document.querySelector('.Venus');
    let aVenus = 0;
    const roVenus = 142;
    let intervalIDVenus = setInterval(updateVenusPosition, 24.3); //Atualização dos planetas



// JavaScript para controlar o zoom com o scroll do mouse
document.addEventListener("wheel", function(event) {
    const zoomStep = 0.1;
    if (event.deltaY < 0) {
        // Scroll para cima, aumenta o zoom
        scale += zoomStep;
    } else {
        // Scroll para baixo, diminui o zoom
        scale -= zoomStep;
    }

    scale = Math.max(0.7, Math.min(4, scale));
    document.querySelector("main").style.transform = `scale(${scale})`;
});
  
// Função para detectar a tecla ESPAÇO
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (isIntervalRunning) {
            clearInterval(intervalIDMercurio); // Pausa o intervalo de Mercúrio
            intervalIDMercurio = setInterval(updateMercurioPosition, 999);
            clearInterval(intervalIDVenus); // Pausa o intervalo de Vênus
            intervalIDVenus = setInterval(updateVenusPosition, 999);
            isIntervalRunning = false; // Atualiza a variável para indicar que o intervalo não está em execução
        } else {
            intervalIDMercurio = setInterval(updateMercurioPosition, 8.8); // Retoma o intervalo de Mercúrio
            intervalIDVenus = setInterval(updateVenusPosition, 24.3); // Retoma o intervalo de Vênus
            isIntervalRunning = true; // Atualiza a variável para indicar que o intervalo está em execução
        }
    }
});            
  


// Descrição do Sol
document.getElementById("sol").addEventListener("click", function(event) {
    var descricaosol = document.getElementById("descricao-sol");
    var targetElement = event.target;
    if (!targetElement.classList.contains("Mercurio") && !targetElement.classList.contains("Venus")) {
        descricaosol.classList.toggle("mostrar");
    }
});



// Função para atualizar a posição de Mercúrio
function updateMercurioPosition() {
    // Calcula a posição x e y de Mercúrio na órbita circular
    const x = roMercurio * Math.cos(aMercurio);
    const y = roMercurio * Math.sin(aMercurio);

    // Define a posição de Mercúrio
    mercurio.style.transform = `translate(${x}px, ${y}px)`;

    // Incrementa o ângulo para o próximo quadro
    aMercurio += 0.0088; // Ajuste conforme necessário para a velocidade da órbita
}

// Descrição de Mercúrio
document.getElementById("mercurio").addEventListener("click", function(event) {
    var descricaosol = document.getElementById("descricao-mercurio");
    var targetElement = event.target;
    if (targetElement.classList.contains("Mercurio")) {
        descricaosol.classList.toggle("mostrar");
    }
});



// Função para atualizar a posição de Vênus
function updateVenusPosition() {
    // Calcula a posição x e y de Mercúrio na órbita circular
    const x = roVenus * Math.cos(aVenus);
    const y = roVenus * Math.sin(aVenus);

    // Define a posição de Mercúrio
    venus.style.transform = `translate(${x}px, ${y}px)`;

    // Incrementa o ângulo para o próximo quadro
    aVenus += 0.0088; // Ajuste conforme necessário para a velocidade da órbita
}

// Descrição de Vênus
document.getElementById("venus").addEventListener("click", function(event) {
    var descricaosol = document.getElementById("descricao-venus");
    var targetElement = event.target;
    if (targetElement.classList.contains("Venus")) {
        descricaosol.classList.toggle("mostrar");
    }
});