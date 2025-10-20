let disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || [];

function salvarDisciplinas() {
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
}

function adicionarDisciplina() {
    const input = document.getElementById('novaDisciplina');
    const nome = input.value.trim();
    if (nome === "") return;

    disciplinas.push({ nome: nome, historico: [] });
    input.value = "";
    atualizarLista();
    salvarDisciplinas();
}

function adicionarHistorico(index) {
    const anotacao = prompt("O que você estudou esta semana?");
    if (anotacao && anotacao.trim() !== "") {
        disciplinas[index].historico.push({ texto: anotacao.trim(), data: new Date().toLocaleDateString() });
        atualizarLista();
        salvarDisciplinas();
    }
}

function removerDisciplina(index) {
    if (confirm(`Deseja remover a disciplina "${disciplinas[index].nome}"?`)) {
        disciplinas.splice(index, 1);
        atualizarLista();
        salvarDisciplinas();
    }
}

function atualizarLista() {
    const ul = document.getElementById('listaDisciplinas');
    ul.innerHTML = "";

    disciplinas.forEach((disciplina, index) => {
        const li = document.createElement('li');
        li.className = 'disciplina';
        const resumo = disciplina.historico.length > 0 ? ` (${disciplina.historico.length} anotações)` : '';
        li.innerHTML = `<strong>📘 ${disciplina.nome}</strong>${resumo} 
                        <button onclick="adicionarHistorico(${index})">Adicionar estudo</button>
                        <button onclick="removerDisciplina(${index})" style="background:red; margin-left:5px;">Remover</button>`;

        if (disciplina.historico.length > 0) {
            const ulHist = document.createElement('ul');
            ulHist.className = 'historico';
            disciplina.historico.forEach(item => {
                const liHist = document.createElement('li');
                liHist.textContent = `[${item.data}] ${item.texto}`;
                ulHist.appendChild(liHist);
            });
            li.appendChild(ulHist);
        }

        ul.appendChild(li);
    });
}

// Inicializa lista ao carregar
atualizarLista();
