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
        disciplinas[index].historico.push({
            texto: anotacao.trim(),
            data: new Date().toLocaleDateString(),
            anotacoes: ""
        });
        atualizarLista();
        salvarDisciplinas();
    }
}

function atualizarAnotacoes(discIndex, histIndex, valor) {
    disciplinas[discIndex].historico[histIndex].anotacoes = valor;
    salvarDisciplinas();
}

function removerDisciplina(index) {
    if (confirm(`Deseja remover a disciplina "${disciplinas[index].nome}"?`)) {
        disciplinas.splice(index, 1);
        atualizarLista();
        salvarDisciplinas();
    }
}

function removerHistorico(discIndex, histIndex) {
    if (confirm("Deseja remover este tópico de estudo?")) {
        disciplinas[discIndex].historico.splice(histIndex, 1);
        atualizarLista();
        salvarDisciplinas();
    }
}

function toggleAnotacao(discIndex, histIndex) {
    const div = document.getElementById(`anotacao-${discIndex}-${histIndex}`);
    if(div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}

function atualizarLista() {
    const ul = document.getElementById('listaDisciplinas');
    ul.innerHTML = "";

    disciplinas.forEach((disciplina, index) => {
        const li = document.createElement('li');
        li.className = 'disciplina';
        const resumo = disciplina.historico.length > 0 ? ` (${disciplina.historico.length} tópicos)` : '';
        li.innerHTML = `<strong>📘 ${disciplina.nome}</strong> ${resumo} 
                        <button onclick="adicionarHistorico(${index})">Adicionar estudo</button>
                        <button onclick="removerDisciplina(${index})">Remover</button>`;

        if (disciplina.historico.length > 0) {
            const ulHist = document.createElement('ul');
            ulHist.className = 'historico';

            disciplina.historico.forEach((item, hIndex) => {
                const liHist = document.createElement('li');
                liHist.innerHTML = `[${item.data}] ${item.texto} 
                                    <span class="btn-olho" onclick="toggleAnotacao(${index}, ${hIndex})">👁️</span>
                                    <span class="btn-lixeira" onclick="removerHistorico(${index}, ${hIndex})">🗑️</span>
                                    <div class="anotacao-container" id="anotacao-${index}-${hIndex}" style="display:none;">
                                        <textarea placeholder="Escreva suas anotações..." 
                                                  oninput="atualizarAnotacoes(${index}, ${hIndex}, this.value)">${item.anotacoes}</textarea>
                                    </div>`;
                ulHist.appendChild(liHist);
            });

            li.appendChild(ulHist);
        }

        ul.appendChild(li);
    });
}

// Inicializa lista ao carregar
window.onload = function() {
    atualizarLista();
};
