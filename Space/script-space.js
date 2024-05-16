let scale = 1;
let isIntervalRunning = true;
let useCustomZoom = false;
const mainElement = document.querySelector("main");
const throttledZoom = throttle(zoom, 200);

const planets = {                                         
    Sol: { element: document.querySelector('.Sol'), angle: 0, radius: 0, interval: 0, updatePosition: updatePlanetPosition},
    Mercurio: { element: document.querySelector('.Mercurio'), angle: 57, radius: 57, interval: 8.8, updatePosition: updatePlanetPosition},
    Venus: { element: document.querySelector('.Venus'), angle: 108, radius: 108, interval: 22.5, updatePosition: updatePlanetPosition},
    Terra: { element: document.querySelector('.Terra'), angle: 149, radius: 149, interval: 36.5, updatePosition: updatePlanetPosition},
    Marte: { element: document.querySelector('.Marte'), angle: 227, radius: 227, interval: 68.7, updatePosition: updatePlanetPosition},
    Cinturao:  { element: document.querySelector('.Cinturao'), angle: 285, radius: 285, interval: 150, updatePosition: updatePlanetPosition},
    Ceres:  { element: document.querySelector('.Ceres'), angle: 280, radius: 280, interval: 170, updatePosition: updatePlanetPosition},
    Vesta:  { element: document.querySelector('.Vesta'), angle: 264, radius: 275, interval: 132.5, updatePosition: updatePlanetPosition},
    Jupter:  { element: document.querySelector('.Jupter'), angle: 340, radius: 350, interval: 84, updatePosition: updatePlanetPosition},
    Saturno:  { element: document.querySelector('.Saturno'), angle: 428, radius: 427, interval: 116, updatePosition: updatePlanetPosition},
    Urano:  { element: document.querySelector('.Urano'), angle: 487, radius: 487, interval: 168, updatePosition: updatePlanetPosition},
    Netuno:  { element: document.querySelector('.Netuno'), angle: 575, radius: 584, interval: 330, updatePosition: updatePlanetPosition},
    Plutao:  { element: document.querySelector('.Plutao'), angle: 650, radius: 651, interval: 498, updatePosition: updatePlanetPosition}
};                                       

const moon = {
    Lua: { element: document.querySelector('.Lua'), angle: 0, radius: 10, interval: 7, updatePosition: updatePlanetPosition},
    Fobos: { element: document.querySelector('.Fobos'), angle: 6, radius: 6, interval: 7, updatePosition: updatePlanetPosition},
    Deimos: { element: document.querySelector('.Deimos'), angle: 15, radius: 15, interval: 7, updatePosition: updatePlanetPosition},
    Io: { element: document.querySelector('.Io'), angle: 21, radius: 21, interval: 17.34, updatePosition: updatePlanetPosition},
    Europa: { element: document.querySelector('.Europa'), angle: 41, radius: 26, interval: 13.74, updatePosition: updatePlanetPosition},
    Ganimedes: { element: document.querySelector('.Ganimedes'), angle: 33, radius: 33, interval: 10.88, updatePosition: updatePlanetPosition},
    Calisto: { element: document.querySelector('.Calisto'), angle: 15, radius: 40, interval: 8.2, updatePosition: updatePlanetPosition}
};

const descricoes = {
    DescSol: {
        descricao: `
            <h1>Sol: Estrela</h1>                
            <h2>A nossa Estrela-Natal e o centro do Sistema Solar. Seus "ventos" causam fenômenos planetários como auroras e tempestades geomagnéticas.</h2>
            <h3><br>Diâmetro ~ 1.392.700 km<br>Idade ~ 4,6 Bi anos</h3> 
        `       
    },
    DescMercurio: {
        descricao: `
            <h1>Mercúrio: Planeta Rochoso</h1>                
            <h2>O menor planeta do Sistema Solar, bem como o mais próximo do Sol. Pode ser incrivelmente quente (450°) e extremamente frio (-170°).</h2>
            <h3>Diâmetro ~ 4.879,4 km<br>Período de Translação ~ 88 Dias<br>Distância ~ 57.909.227 km<br>Gravidade ~ 3,7 m/s²</h3>
        `
    },
    DescVenus: {
        descricao: `
            <h1>Vênus: Planeta Rochoso</h1>                
            <h2>Possui a maior temperatura e é um dos objetos mais brilhantes do céu noturno, além de ser um dos poucos a girarem no sentido horário.</h2>
            <h3>Diâmetro ~ 12.104 km<br>Período de Translação ~ 225 Dias<br>Distância ~ 108.209.475 km<br>Gravidade ~ 8,9 m/s²</h3>
        `
    },
    DescTerra: {
        descricao: `
            <h1>Terra: Planeta Rochoso</h1>                
            <h2>O único no Sistema Solar conhecido por ser propício para a vida.  Possui uma Atmosfera Oxigenada e é 70% coberto por água.</h2>
            <h3>Diâmetro ~ 12.742 km<br>Período de Translação ~ 365 Dias<br>Distância ~ 149.600.000 km<br>Gravidade ~ 9,8 m/s²</h3>
        `
    },
    DescLua: {
        descricao: `
            <h1>Lua: Satélite Natural</h1>                
            <h2>O quinto maior Satelite Natural do Sistema Solar. Se formou a partir dos detritos de uma colisão. Ela controla as marés do oceano.</h2>
            <h3>Diâmetro ~ 3.474,8km<br>Distância ~ 384.400 km<br>Gravidade ~ 1,62 m/s²</h3>
        `
    },
    DescMarte: {
        descricao: `
            <h1>Marte: Planeta Rochoso</h1>                
            <h2>Recebe o nome de planeta vermelho devida cor coraia do óxido de ferro em sua superfície.</h2>
            <h3>Diâmetro ~ 6.779 km<br>Período de Translação ~ 687 Dias<br>Distância ~ 227.940.000 km<br>Gravidade ~ 3,71 m/s²</h3>
        `
    },
    DescFobos: {
        descricao: `
            <h1>Fobos: Satélite Natural</h1>                
            <h2>A maior das duas luas de Marte. Nasce duas vezes por dia e, futuramente, pode ser dilacerada pela gravidade do planeta.</h2>
            <h3>Diâmetro ~ 22,533km<br>Distância ~ 9.000 km<br>Gravidade ~ 0,0057 m/s²</h3>
        `
    },
    DescDeimos: {
        descricao: `
            <h1>Deimos: Satélite Natural</h1>                
            <h2>Uma das menores luas do Sistema Solar. Assim como Fobos, credita-se ser um asteróide que foi pego pela órbita de Marte.</h2>
            <h3>Diâmetro ~ 12,4km<br>Distância ~ 23.436 km<br>Gravidade ~ 0,003 m/s²</h3>
        `
    },
    DescCinturao: {
        descricao: `
            <h1>Cinturão de Asteroides</h1>                
            <h2>Um campo de asteroides composto em sua maioria por corpos rochosos do tipo C. Muitos são considerados fragmentos de Vesta.</h2>
            <h3>Tipo de Carbono (C) são os mais comuns;<br>Tipo de Silicato (S), segundo mais comum;<br>Geralmente originam os Asteróides.</h3>
        `
    },
    DescCeres: {
        descricao: `
            <h1>Ceres: Planeta Anão</h1>                
            <h2>É o maior objeto no Cinturão de Asteroides e o primeiro a ser indentificado. Possui Criovulcões que jorrão água, entre eles, Ahuna Mons, a maior montanha de Ceres.<br><br></h2>
            <h3><br>Diâmetro ~ 914 km<br>Período de Translação ~ 1.682 Dias<br>Distância ~ 414.000.000 km</h3>
        `
    },
    DescVesta: {
        descricao: `
            <h1>Vesta: Protoplaneta Rochoso</h1>                
            <h2>O segundo maior objeto do Cinturão. Não se desenvolveu tanto quanto os outros planetas rochosos devida gravidade de Júpter.</h2>
            <h3>Diâmetro ~ 530km<br>Ano = 1.325 Dias<br>Distância ~ 353.050.973 km</h3>
        `
    },
    DescJupter: {
        descricao: `
            <h1>Júpiter: Gigante Gasoso</h1>                
            <h2>O maior planeta do Sistema Solar. Sua massa impede a fusão dos objetos no Cinturão. Possui grandes tempestades em sua atmosfera.</h2>
            <h3>Diâmetro ~ 139.820 km<br>Período de Translação ~ 12 Anos<br>Distância ~ 778.340.821 km<br>Gravidade ~ 24,79 m/s²</h3>
        `              
    },
    DescIo: {
        descricao: `
        <h1>Io: Satélite Natural</h1>
        <h2>É uma lua rochosa e gelada. Possui vulcões de enxofre ativos e montanhas mais altas do que as da Terra.</h2>
        <h3>Diâmetro ~ 3.643,2 km<br>Distância ~ 421.600 km<br>Gravidade ~ 1,796 m/s²</h3>
        `
    },
    DescEuropa: {
        descricao: `
        <h1>Europa: Satélite Natural</h1>
        <h2>Sua superfície lisa é evidência de um oceano abaixo de sua superfície. Pode haver vida microscópica devida fina atmosfera de oxigênio.</h2>
        <h3>Diâmetro ~ 3.121,6 km<br>Distância ~ 670,900 km<br>Gravidade ~ 1,315 m/s²</h3>
        `
    },
    DescGanimedes: {
        descricao: `
        <h1>Ganimedes: Satélite Natural</h1>
        <h2></h2>
        <h3>Diâmetro ~ 5.268,2 km<br>Distância ~ 1.070.000 km<br>Gravidade ~ 1,428 m/s²</h3>
        `
    },
    DescCalisto: {
        descricao: `
        <h1>Calisto: Satélite Natural</h1>
        <h2></h2>
        <h3>Diâmetro ~ 4.820,6 km<br>Distância ~ 1.880.000 km<br>Gravidade ~ 1,236 m/s²</h3>
        `
    },
    DescSaturno: {
        descricao: `
            <h1>Saturno: Gigante Gasoso</h1>                
            <h2>Conhecido por seus impressionantes anéis, Saturno é o segundo maior planeta do Sistema Solar.</h2>
            <h3>Diâmetro ~ 116.460 km<br>Período de Translação ~ 29 Anos<br>Distância ~ 1.426.666.422 km</h3>
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
            <h2>Plutão é considerado um objeto do Cinturão de Kuiper, descoberto em 1930. É composto principalmente de gelo e rocha.</h2>
            <h3>Diâmetro ~ 2.376,6 km<br>Período de Translação ~ 249 Anos<br>Distância ~ 5.922.000.000 km</h3>
        `
    }
}

function mostrarDescricao(planeta) {
    const descricaoElement = document.getElementById('descricao');
    document.addEventListener("click", event => {
        const clickedElement = event.target;
        // Verifica se o elemento clicado é descendente do planeta
        if (descricoes["Desc" + planeta] && (clickedElement.classList.contains(planeta) || clickedElement.closest("." + planeta))) {
            alterarDescricao(planeta);
            descricaoElement.style.opacity = 1; // Define a opacidade como 1 para exibir a descrição
        } else {
            descricaoElement.style.opacity = 0; // Se clicado fora da div com descrição, oculta a descrição
        }
    });
}

function mostrarDescricaoLua(lua) {
    const descricaoElement = document.getElementById('descricao');
    const luaElement = document.querySelector('.' + lua);
    luaElement.addEventListener("click", event => {
        event.stopPropagation(); // Impede a propagação do evento para os elementos pai
        alterarDescricao(lua);
        descricaoElement.style.opacity = 1; // Define a opacidade como 1 para exibir a descrição
    });
}

function alterarDescricao(planeta) {
    const descricaoElement = document.getElementById('descricao');
    const descricao = descricoes["Desc" + planeta];
    descricaoElement.innerHTML = descricao.descricao;
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

function AnelDeAsteroides() {
    var numAsteroides = 300;
    var raioExterno = 295;
    var raioInterno = 265;
    var centroX = 0;
    var centroY = 0;
    var container = document.getElementById('asteroide');

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