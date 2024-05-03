let scale = 1;
let isIntervalRunning = true;
let useCustomZoom = false;
const mainElement = document.querySelector("main");
const throttledZoom = throttle(zoom, 200);

const planets = {
    Sol: { element: document.querySelector('.Sol'), angle: 0, radius: 0, interval: 0, updatePosition: updatePlanetPosition},
    Mercurio: { element: document.querySelector('.Mercurio'), angle: 0, radius: 105, interval: 8.8, updatePosition: updatePlanetPosition},
    Venus: { element: document.querySelector('.Venus'), angle: 0, radius: 156, interval: 24.3, updatePosition: updatePlanetPosition},
    Terra: { element: document.querySelector('.Terra'), angle: 0, radius: 197, interval: 36.5, updatePosition: updatePlanetPosition},
    Marte: { element: document.querySelector('.Marte'), angle: 0, radius: 275, interval: 68.7, updatePosition: updatePlanetPosition},
    Ceres:  { element: document.querySelector('.Ceres'), angle: 0, radius: 462, interval: 168.2, updatePosition: updatePlanetPosition},
    Vesta:  { element: document.querySelector('.Vesta'), angle: 0, radius: 353, interval: 132.5, updatePosition: updatePlanetPosition}
};

const moon = {
    Lua: { element: document.querySelector('.Lua'), angle: 0, radius: 19.2, interval: 7, updatePosition: updatePlanetPosition},
    Fobos: { element: document.querySelector('.Fobos'), angle: 0, radius: 9, interval: 3.5, updatePosition: updatePlanetPosition},
    Deimos: { element: document.querySelector('.Deimos'), angle: 0, radius: 23, interval: 7, updatePosition: updatePlanetPosition}
};

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

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

// Atualiza a posição dos Planetas
function updatePlanetPosition(celestialBody) {
    const { element, angle, radius} = celestialBody;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    element.style.transform = `translate(${x}px, ${y}px)`;
    celestialBody.angle -= (0.00365 * 36) / celestialBody.interval;
}

function togglePlanetUpdateInterval() {
    isIntervalRunning = !isIntervalRunning;
    for (const celestialBody of Object.values({...planets, ...moon})) {
        isIntervalRunning ? celestialBody.intervalID = setInterval(() => updatePlanetPosition(celestialBody), celestialBody.interval)
                          : clearInterval(celestialBody.intervalID);
    }
}

// Função para dar Zoom
function zoom(event, isCustomZoom) {
    const zoomStep = 0.1;
    const boundingRect = mainElement.getBoundingClientRect();
    const offsetX = (event.clientX - boundingRect.left) / boundingRect.width;
    const offsetY = (event.clientY - boundingRect.top) / boundingRect.height;
    scale += (isCustomZoom ? zoomStep * (event.deltaY < 0 ? 0.5 : -0.5) : (event.deltaY < 0 ? zoomStep : -zoomStep));
    scale = Math.max(0.9, Math.min(4, scale));
    mainElement.style.transition = "transform 0.2s ease-in-out";
    mainElement.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
    mainElement.style.transform = `scale(${scale})`;
    event.preventDefault();
}

// Função para exibir a descrição do planeta
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
}

// Função para gerar pontos aleatórios dentro do cinturão de asteroides
function AnelDeAsteroides() {
    var numAsteroides = 300;
    var raioExterno = 470;
    var raioInterno = 350;
    var centroX = 0;
    var centroY = 0;
    var container = document.getElementById('asteroide');

    var asteroideCentralExistente = document.querySelector('.asteroide-central');
    if (asteroideCentralExistente) {
        container.removeChild(asteroideCentralExistente);
    }

    for (var i = 0; i < numAsteroides; i++) {
        var angulo = (i / numAsteroides) * Math.PI * 2;
        var x = centroX + raioExterno * Math.cos(angulo);
        var y = centroY + raioExterno * Math.sin(angulo);

        // Ajuste do raio interno
        var proporcaoRaioInterno = Math.random(); // Proporção aleatória entre 0 e 1
        var raio = raioInterno + (raioExterno - raioInterno) * proporcaoRaioInterno;

        x = centroX + raio * Math.cos(angulo);
        y = centroY + raio * Math.sin(angulo);

        var asteroide = document.createElement('div');
        asteroide.className = 'Asteroide';
        asteroide.style.left = x + 'px';
        asteroide.style.top = y + 'px';
        container.appendChild(asteroide);
    }
}

document.addEventListener("wheel", event => throttledZoom(event, useCustomZoom));

window.onload = AnelDeAsteroides;


// Exibir descrições dos planetas e lua
showCelestialBodyDescription("Sol", "descricao-sol");
showCelestialBodyDescription("Mercurio", "descricao-mercurio");
showCelestialBodyDescription("Venus", "descricao-venus");
showCelestialBodyDescription("Terra", "descricao-terra");
showCelestialBodyDescription("Lua", "descricao-lua");
showCelestialBodyDescription("Marte", "descricao-marte");
showCelestialBodyDescription("Fobos", "descricao-fobos");
showCelestialBodyDescription("Deimos", "descricao-deimos");
showCelestialBodyDescription("Ceres", "descricao-ceres");
showCelestialBodyDescription("Vesta", "descricao-vesta");

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        togglePlanetUpdateInterval();
    } else if (event.code === 'KeyZ') {
        useCustomZoom = !useCustomZoom;
    }
});
