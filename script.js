document.getElementById("projetos-botao").addEventListener("click", function() {
    var tituloProjetos = document.getElementById("titulo-projetos");
    var listaProjetos = document.getElementById("lista-projetos");
    tituloProjetos.style.display = (tituloProjetos.style.display === "none") ? "block" : "none";
    listaProjetos.style.display = (listaProjetos.style.display === "none") ? "block" : "none";
    this.classList.toggle("expandir");
});

// Função para obter a data da última atualização do repositório no GitHub
async function getUltimaAtualizacao() {
    const usuario = "GuiMV";
    const repositorio = "Curriculo";

    try {
        const resposta = await fetch(`https://api.github.com/repos/${usuario}/${repositorio}`);
        const dados = await resposta.json();
        
        const dataAtualizacao = new Date(dados.pushed_at);
        const dia = dataAtualizacao.getDate();
        const mes = dataAtualizacao.getMonth() + 1;
        const ano = dataAtualizacao.getFullYear();

        document.getElementById("ultima-atualizacao").innerText = `Atualizado em: ${dia}/${mes}/${ano}`;
    } catch (erro) {
        console.error("Erro ao obter a data da última atualização:", erro);
    }
}

// Chamar a função para obter a data da última atualização quando a página carregar
getUltimaAtualizacao();

// Atualizar a data da última atualização a cada 5 minutos
setInterval(getUltimaAtualizacao, 5 * 60 * 1000); // 5 minutos em milissegundos