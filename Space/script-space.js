let scale = 1;
let isIntervalRunning = true;
let useCustomZoom = false;
const mainElement = document.querySelector("main");
const throttledZoom = throttle(zoom, 200);

const planets = {                                             // + 70 
    Sol: { element: document.querySelector('.Sol'), angle: 0, radius: 0, interval: 0, updatePosition: updatePlanetPosition},
    Mercurio: { element: document.querySelector('.Mercurio'), angle: 57, radius: 57, interval: 8.8, updatePosition: updatePlanetPosition},
    Venus: { element: document.querySelector('.Venus'), angle: 108, radius: 108, interval: 22.5, updatePosition: updatePlanetPosition},
    Terra: { element: document.querySelector('.Terra'), angle: 149, radius: 149, interval: 36.5, updatePosition: updatePlanetPosition},
    Marte: { element: document.querySelector('.Marte'), angle: 227, radius: 227, interval: 68.7, updatePosition: updatePlanetPosition},
    Jupter:  { element: document.querySelector('.Jupter'), angle: 340, radius: 340, interval: 219, updatePosition: updatePlanetPosition},
    Saturno:  { element: document.querySelector('.Saturno'), angle: 720, radius: 426, interval: 537.5, updatePosition: updatePlanetPosition},
    Urano:  { element: document.querySelector('.Urano'), angle: 575, radius: 466, interval: 767, updatePosition: updatePlanetPosition},
    Netuno:  { element: document.querySelector('.Netuno'), angle: 537, radius: 537, interval: 785, updatePosition: updatePlanetPosition},
    Plutao:  { element: document.querySelector('.Plutao'), angle: 0, radius: 596, interval: 900, updatePosition: updatePlanetPosition}
    /* Cinturao:  { element: document.querySelector('.Cinturao'), angle: 33, radius: 285, interval: 65, updatePosition: updatePlanetPosition},
    Ceres:  { element: document.querySelector('.Ceres'), angle: 52, radius: 484, interval: 168.2, updatePosition: updatePlanetPosition},
    Vesta:  { element: document.querySelector('.Vesta'), angle: 34, radius: 366, interval: 132.5, updatePosition: updatePlanetPosition},
    */
};                                                                  // 778.330.000

const moon = {
    // Lua: { element: document.querySelector('.Lua'), angle: 0, radius: 3, interval: 7, updatePosition: updatePlanetPosition},
    // Fobos: { element: document.querySelector('.Fobos'), angle: 0, radius: 9, interval: 3.5, updatePosition: updatePlanetPosition},
    // Deimos: { element: document.querySelector('.Deimos'), angle: 0, radius: 23, interval: 7, updatePosition: updatePlanetPosition}
};

const descricoes = {
    DescSol: {
        descricao: `
            <h1>Sol: Estrela</h1>                
            <h2>Centro do Sistema Solar, o ponto em torno do qual todos os objetos celestes orbitam.</h2>
            <h3>Diâmetro ~ 1.392.700 km<br>Idade ~ 4,6 Bi anos</h3> 
        `       
    },
    DescMercurio: {
        descricao: `
            <h1>Mercúrio: Planeta Rochoso</h1>                
            <h2>O menor planeta do Sistema Solar, bem como o mais próximo do Sol. Pode ser incrivelmente quente (450°) e extremamente frio (-170°).</h2>
            <h3>Diâmetro ~ 4.879,4 km<br>Período de Translação ~ 88 Dias<br>Distância ~ 57.909.227 km</h3>
        `
    },
    DescVenus: {
        descricao: `
            <h1>Vênus: Planeta Rochoso</h1>                
            <h2>O planeta com a maior temperatura e um dos objetos mais brilhantes do céu noturno.</h2>
            <h3>Diâmetro ~ 12.104 km<br>Período de Translação ~ 225 Dias<br>Distância ~ 108.209.475 km</h3>
        `
    },
    DescTerra: {
        descricao: `
            <h1>Terra: Planeta Rochoso</h1>                
            <h2>O único planeta no nosso Sistema Solar conhecido por ser propício para a vida.</h2>
            <h3>Diâmetro ~ 12.742 km<br>Período de Translação ~ 365 Dias<br>Distância ~ 149.600.000 km</h3>
        `
    },
    /*DescLua: {
        descricao: `
            <h1>Lua: Satélite Natural</h1>                
            <h2>O quinto maior Satelite Natural do Sistema Solar.</h2>
            <h3><br><br>Diâmetro ~ 3.474,8km<br>Fases principais: 4<br>Distância ~ 384.400 km</h3>
        `
    },*/
    DescMarte: {
        descricao: `
            <h1>Marte: Planeta Rochoso</h1>                
            <h2>Recebe o nome de planeta vermelho devida cor coraia do óxido de ferro em sua superfície.</h2>
            <h3>Diâmetro ~ 6.779 km<br>Período de Translação ~ 687 Dias<br>Distância ~ 227.940.000 km</h3>
        `
    },
    DescJupter: {
        descricao: `
            <h1>Júpiter: Gigante Gasoso</h1>                
            <h2>O maior planeta do Sistema Solar. Possui uma Grande Mancha Vermelha em sua atmosfera turbulenta.</h2>
            <h3>Diâmetro ~ 139.820 km<br>Período de Translação ~ 12 Anos<br>Distância ~ 778.340.821 km</h3>
        `              
    },
    DescSaturno: {
        descricao: `
            <h1>Saturno: Gigante Gasoso</h1>                
            <h2>Conhecido por seus impressionantes anéis, Saturno é o segundo maior planeta do Sistema Solar.</h2>
            <h3>Diâmetro ~ 11.6460 km<br>Período de Translação ~ 29 Anos<br>Distância ~ 1.426.666.422 km</h3>
        `
    },
    DescUrano: {
        descricao: `
            <h1>Urano: Gigante Gelado</h1>                
            <h2>Urano é um planeta gigante de gelo com uma composição atmosférica semelhante à de Netuno.</h2>
            <h3>Diâmetro ~ 50.724 km<br>Período de Translação ~ 84 Anos<br>Distância ~ 2.870.658.186 km</h3>
        `
    },
    DescNetuno: {
        descricao: `
            <h1>Netuno: Gigante Gelado</h1>                
            <h2>Netuno é o último dos gigantes gasosos do Sistema Solar, composto principalmente de hidrogênio e hélio.</h2>
            <h3>Diâmetro ~ 49.244 km<br>Período de Translação ~ 165 Anos<br>Distância ~ 4.498.396.441 km</h3>
        `
    },
    DescPlutao: {
        descricao: `
            <h1>Plutão: Planeta Anão</h1>                
            <h2></h2>
            <h3>Diâmetro ~ 2.376,6 km<br>Período de Translação ~ 249 Anos<br>Distância ~ 5.922.000.000 km</h3>
        `
    },
}

function mostrarDescricao(planeta) {
    const descricaoElement = document.getElementById('descricao');
    document.addEventListener("click", event => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains(planeta)) {
            descricaoElement.style.opacity = 1;
            alterarDescricao(planeta);
        } else {
            descricaoElement.style.opacity = 0;
        }
    });
}

function alterarDescricao(planeta) {
    const descricaoElement = document.getElementById('descricao');
    descricaoElement.innerHTML = descricoes["Desc" + planeta].descricao;
}

// Inicializa os intervalos de atualização para planetas e lua
for (const celestialBody of Object.values({...planets, ...moon})) {
    celestialBody.intervalID = setInterval(() => {
        celestialBody.updatePosition(celestialBody)
    }, celestialBody.interval);
}

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

/*function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}*/

// Atualiza a posição dos Planetas
function updatePlanetPosition(celestialBody) {
    const { element, angle, radius} = celestialBody;

    if (element && element.style) {
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        element.style.transform = `translate(${x}px, ${y}px)`;
    }
    celestialBody.angle -= (0.00365 * 36) / celestialBody.interval;
}

function togglePlanetUpdateInterval() {
    isIntervalRunning = !isIntervalRunning;
    for (const celestialBody of Object.values({...planets, ...moon})) {
        isIntervalRunning ? celestialBody.intervalID = setInterval(() => updatePlanetPosition(celestialBody), celestialBody.interval)
                          : clearInterval(celestialBody.intervalID);
    }
}

// // Função para dar Zoom
function zoom(event, isCustomZoom) {
    const zoomStep = 0.5;
    const boundingRect = mainElement.getBoundingClientRect();
    const offsetX = (event.clientX - boundingRect.left) / boundingRect.width;
    const offsetY = (event.clientY - boundingRect.top) / boundingRect.height;
    scale += (isCustomZoom ? zoomStep * (event.deltaY < 0 ? 0.5 : -0.5) : (event.deltaY < 0 ? zoomStep : -zoomStep));
    scale = Math.max(1, Math.min(100, scale));
    mainElement.style.transition = "transform 0.2s ease-in-out";
    mainElement.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
    mainElement.style.transform = `scale(${scale})`;
}

/*Função para exibir a descrição do planeta
function showCelestialBodyDescription(celestialBodyName, descriptionElementId) {
    const descriptionElements = document.querySelectorAll('.descricao');

    document.addEventListener("click", event => {
        const clickedElement = event.target;
        const descriptionElement = document.getElementById(descriptionElementId);

        if (clickedElement.classList.contains(celestialBodyName)) {
            descriptionElements.forEach(element => {
                if (element.id !== descriptionElementId) {
                    element.classList.remove("mostrar");
                }
            });
            descriptionElement.classList.toggle("mostrar");
        } else {
            descriptionElement.classList.remove("mostrar");
        }
    });
}*/

// Função para gerar pontos aleatórios dentro do cinturão de asteroides
// function AnelDeAsteroides() {
//     var numAsteroides = 300;
//     var raioExterno = 320;
//     var raioInterno = 270;
//     var centroX = 0;
//     var centroY = 0;
//     var container = document.getElementById('asteroide');

//     var asteroideCentralExistente = document.querySelector('.asteroide-central');
//     if (asteroideCentralExistente) {
//         container.removeChild(asteroideCentralExistente);
//     }

//     for (var i = 0; i < numAsteroides; i++) {
//         var angulo = (i / numAsteroides) * Math.PI * 2;
//         var x = centroX + raioExterno * Math.cos(angulo);
//         var y = centroY + raioExterno * Math.sin(angulo);

//         // Ajuste do raio interno
//         var proporcaoRaioInterno = Math.random(); // Proporção aleatória entre 0 e 1
//         var raio = raioInterno + (raioExterno - raioInterno) * proporcaoRaioInterno;

//         x = centroX + raio * Math.cos(angulo);
//         y = centroY + raio * Math.sin(angulo);

//         var asteroide = document.createElement('div');
//         asteroide.className = 'Asteroide';
//         asteroide.style.left = x + 'px';
//         asteroide.style.top = y + 'px';
//         container.appendChild(asteroide);
//     }
// }

document.addEventListener("wheel", event => throttledZoom(event, useCustomZoom));

// window.onload = AnelDeAsteroides;

/*
Exibir descrições dos planetas e lua
showCelestialBodyDescription("Lua", "descricao-lua");
showCelestialBodyDescription("Fobos", "descricao-fobos");
showCelestialBodyDescription("Deimos", "descricao-deimos");
showCelestialBodyDescription("Cinturao", "descricao-cinturao");
showCelestialBodyDescription("Ceres", "descricao-ceres");
showCelestialBodyDescription("Vesta", "descricao-vesta");
showCelestialBodyDescription("Jupter", "descricao-jupter");*/

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        togglePlanetUpdateInterval();
    } else if (event.code === 'KeyZ') {
        useCustomZoom = !useCustomZoom;
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'z') {
        const defaultScale = 1;
        scale = defaultScale;
        mainElement.style.transition = "transform 0.2s ease-in-out";
        mainElement.style.transform = `scale(${scale})`;
    }
});