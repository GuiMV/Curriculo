let scale = 1;
let isIntervalRunning = true;
let useCustomZoom = false;
const mainElement = document.querySelector("main");

const planets = {
    Sol: { element: document.querySelector('.Sol'), angle: 0, radius: 0, interval: 0, updatePosition: updatePlanetPosition},
    Mercurio: { element: document.querySelector('.Mercurio'), angle: 0, radius: 65, interval: 8.8, updatePosition: updatePlanetPosition}, //97.32 63.71
    Venus: { element: document.querySelector('.Venus'), angle: 0, radius: 115, interval: 24.3, updatePosition: updatePlanetPosition}, //137.75 119
    Terra: { element: document.querySelector('.Terra'), angle: 0, radius: 176, interval: 36.5, updatePosition: updatePlanetPosition}, //178.40
    Marte: { element: document.querySelector('.Marte'), angle: 0, radius: 230.6, interval: 68.7, updatePosition: updatePlanetPosition}	//227.94 260.94
};

const moon = {
    Lua: { element: document.querySelector('.Lua'), angle: 0, radius: 13.844, interval: 7, updatePosition: updatePlanetPosition},
    Fobos: { element: document.querySelector('.Fobos'), angle: 0, radius: 9, interval: 6, updatePosition: updatePlanetPosition},
    Deimos: { element: document.querySelector('.Deimos'), angle: 0, radius: 23, interval: 12, updatePosition: updatePlanetPosition}
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
    scale = Math.max(0.7, Math.min(4, scale));
    mainElement.style.transition = "transform 0.2s ease-in-out";
    mainElement.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
    mainElement.style.transform = `scale(${scale})`;
    event.preventDefault();
}

const throttledZoom = throttle(zoom, 200);
document.addEventListener("wheel", event => throttledZoom(event, useCustomZoom));

// Função para exibir a descrição do planeta
function showCelestialBodyDescription(celestialBodyName, descriptionElementId) {
    const descriptionElements = document.querySelectorAll('.descricao');

    document.addEventListener("click", event => {
        const clickedElement = event.target;
        const descriptionElement = document.getElementById(descriptionElementId);

        // Verifica se o corpo celeste clicado corresponde ao celestialBodyName
        if (clickedElement.classList.contains(celestialBodyName)) {
            // Fecha todas as outras descrições
            descriptionElements.forEach(element => {
                if (element.id !== descriptionElementId) {
                    element.classList.remove("mostrar");
                }
            });

            // Exibe ou oculta a descrição do planeta ou lua clicado
            descriptionElement.classList.toggle("mostrar");
        } else {
            // Fecha a descrição se o clique não estiver no corpo celeste
            descriptionElement.classList.remove("mostrar");
        }
    });
}

// Exibir descrições dos planetas e lua
showCelestialBodyDescription("Sol", "descricao-sol");
showCelestialBodyDescription("Mercurio", "descricao-mercurio");
showCelestialBodyDescription("Venus", "descricao-venus");
showCelestialBodyDescription("Terra", "descricao-terra");
showCelestialBodyDescription("Lua", "descricao-lua");
showCelestialBodyDescription("Marte", "descricao-marte");
showCelestialBodyDescription("Fobos", "descricao-fobos");
showCelestialBodyDescription("Deimos", "descricao-deimos");

document.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        togglePlanetUpdateInterval();
    } else if (event.code === 'KeyZ') {
        useCustomZoom = !useCustomZoom;
    }
});
