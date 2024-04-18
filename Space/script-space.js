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