document.getElementById("projetos-botao").addEventListener("click", function() {
    var tituloProjetos = document.getElementById("titulo-projetos");
    var listaProjetos = document.getElementById("lista-projetos");
    tituloProjetos.style.display = (tituloProjetos.style.display === "none") ? "block" : "none";
    listaProjetos.style.display = (listaProjetos.style.display === "none") ? "block" : "none";
    this.classList.toggle("expandir");
});