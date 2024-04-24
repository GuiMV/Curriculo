let scale = 1; //Zoom
let isIntervalRunning = true;
let useCustomZoom = false; // Variável de controle para alternar entre as funções de zoom
const mercurio = document.querySelector('.Mercurio');
    let aMercurio = 0; // Angulo
    const roMercurio = 92; // Raio da órbita
    let intervalIDMercurio = setInterval(updateMercurioPosition, 8.8); //Atualização dos planetas
const venus = document.querySelector('.Venus');
    let aVenus = 0;
    const roVenus = 142;
    let intervalIDVenus = setInterval(updateVenusPosition, 24.3); //Atualização dos planetas


// Função de zoom padrão
function defaultZoom(event) {
    const zoomStep = 0.1;
    let scale = parseFloat(document.querySelector("main").style.transform.replace("scale(", "").replace(")", "")) || 1;

    if (event.deltaY < 0) {
        // Scroll para cima, aumenta o zoom
        scale += zoomStep;
    } else {
        // Scroll para baixo, diminui o zoom
        scale -= zoomStep;
    }

    scale = Math.max(0.7, Math.min(4, scale));
    document.querySelector("main").style.transform = `scale(${scale})`;
}
// // Função de zoom padrão
// document.addEventListener("wheel", function(event) {
//     const zoomStep = 0.1;
//     if (event.deltaY < 0) {
//         // Scroll para cima, aumenta o zoom
//         scale += zoomStep;
//     } else {
//         // Scroll para baixo, diminui o zoom
//         scale -= zoomStep;
//     }

//     scale = Math.max(0.7, Math.min(4, scale));
//     document.querySelector("main").style.transform = `scale(${scale})`;
// });


// Função de zoom personalizada
function customZoom(event) {
    const zoomStep = 0.1;
    const main = document.querySelector("main");

    let scale = parseFloat(main.style.transform.replace("scale(", "").replace(")", "")) || 1;
    let scaleIncrement = zoomStep * (event.deltaY < 0 ? 0.5 : -0.5);
    let newScale = Math.max(0.7, Math.min(4, scale + scaleIncrement));

    const boundingRect = main.getBoundingClientRect();
    const offsetX = (event.clientX - boundingRect.left) / boundingRect.width;
    const offsetY = (event.clientY - boundingRect.top) / boundingRect.height;

    main.style.transition = "transform 0.2s ease-in-out";
    main.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
    main.style.transform = `scale(${newScale})`;

    event.preventDefault();
}
// document.addEventListener("wheel", function(event) {
//     const zoomStep = 0.1;
//     const main = document.querySelector("main");

//     let scaleIncrement = zoomStep * (event.deltaY < 0 ? 0.5 : -0.5);
//     let newScale = Math.max(0.7, Math.min(4, scale + scaleIncrement));

//     const boundingRect = main.getBoundingClientRect();
//     const offsetX = (event.clientX - boundingRect.left) / boundingRect.width;
//     const offsetY = (event.clientY - boundingRect.top) / boundingRect.height;

//     main.style.transition = "transform 0.2s ease-in-out";
//     main.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
//     main.style.transform = `scale(${newScale})`;

//     scale = newScale;

//     event.preventDefault();
// });

// Adiciona um event listener para a tecla "Z"
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyZ') {
        useCustomZoom = !useCustomZoom; // Alterna entre as funções de zoom
    }
});

// Adiciona o event listener de acordo com a função de zoom selecionada
document.addEventListener("wheel", function(event) {
    if (useCustomZoom) {
        customZoom(event);
    } else {
        defaultZoom(event);
    }
});





//     // Calcula a nova escala
//     let newScale = scale + scaleIncrement;
//     newScale = Math.max(0.7, Math.min(4, newScale));

//     // Calcula o deslocamento do ponto de origem para manter o cursor no mesmo local
//     const originX = offsetX * (scale - newScale);
//     const originY = offsetY * (scale - newScale);

//     // Aplica a nova transformação de escala e origem
//     main.style.transformOrigin = `${originX * 100}% ${originY * 100}%`;
//     main.style.transform = `scale(${newScale})`;

//     // Atualiza a escala atual
//     scale = newScale;

//     // Evita o comportamento padrão do evento de rolagem
//     event.preventDefault();
// });


  
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