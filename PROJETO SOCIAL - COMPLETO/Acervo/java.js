const livros = [
  { nome: 'Dom Casmurro', genero: 'Romance', autor: 'Machado de Assis', alugado: false },
  { nome: 'O Pequeno Príncipe', genero: 'Fábula', autor: 'Antoine de Saint-Exupéry', alugado: true },
  { nome: '1984', genero: 'Distopia', autor: 'George Orwell', alugado: true },
  { nome: 'Cem Anos de Solidão', genero: 'Realismo Mágico', autor: 'Gabriel García Márquez', alugado: false },
  { nome: 'O Senhor dos Anéis', genero: 'Fantasia', autor: 'J.R.R. Tolkien', alugado: true },
  { nome: 'A Revolução dos Bichos', genero: 'Sátira', autor: 'George Orwell', alugado: false },
  { nome: 'A Metamorfose', genero: 'Ficção Existencial', autor: 'Franz Kafka', alugado: false },
  { nome: 'O Morro dos Ventos Uivantes', genero: 'Romance Gótico', autor: 'Emily Brontë', alugado: true },
  { nome: 'O Hobbit', genero: 'Fantasia', autor: 'J.R.R. Tolkien', alugado: true },
  { nome: 'Crime e Castigo', genero: 'Romance Psicológico', autor: 'Fiódor Dostoiévski', alugado: true },
  { nome: 'Dom Quixote', genero: 'Clássico', autor: 'Miguel de Cervantes', alugado: true },
  { nome: 'A Guerra dos Mundos', genero: 'Ficção Científica', autor: 'H.G. Wells', alugado: false }
];

let livrosFiltrados = [...livros];
let livroEmEdicao = null;

function filtrarLivros() {
  const filtro = document.getElementById('filtro').value.toLowerCase();
  const filtroGenero = document.getElementById('filtroGenero').value.toLowerCase();

  livrosFiltrados = livros.filter(livro => {
    const camposCombinam =
      livro.nome.toLowerCase().includes(filtro) ||
      livro.genero.toLowerCase().includes(filtro) ||
      livro.autor.toLowerCase().includes(filtro);

    const generoValido = filtroGenero === "" || livro.genero.toLowerCase().includes(filtroGenero);

    return camposCombinam && generoValido;
  });

  renderizarTabela();
}

function renderizarTabela() {
  const tabelaBody = document.getElementById('tabela-body');
  tabelaBody.innerHTML = '';

  livrosFiltrados.forEach(livro => {
    const alugadoIcon = livro.alugado 
  ? '<img src="IMGS/check.png" alt="Alugado" class="alugado-icon">' 
  : '<img src="IMGS/error.png" alt="Não Alugado" class="alugado-icon">'; 

    const linha = `
      <tr>
        <td>${livro.nome}</td>
        <td>${livro.genero}</td>
        <td>${livro.autor}</td>
        <td class="col-alugado">${alugadoIcon}</td>
        <td>
          <img 
            class="edit-icon" 
            src="IMGS/editor-user.png" 
            title="Editar" 
            alt="Editar" 
            onclick="editarLivro('${livro.nome}')"
          >
        </td>
      </tr>
    `;
    tabelaBody.innerHTML += linha;
  });
}

function editarLivro(nome) {
  livroEmEdicao = livrosFiltrados.find(livro => livro.nome === nome);

  document.getElementById('edit-nome').value = livroEmEdicao.nome;
  document.getElementById('edit-genero').value = livroEmEdicao.genero;
  document.getElementById('edit-autor').value = livroEmEdicao.autor;

  document.getElementById('edit-card').style.display = 'flex';
}

function fecharCard() {
  document.getElementById('edit-card').style.display = 'none';
}

function salvarEdicoes() {
  const novoNome = document.getElementById('edit-nome').value;
  const novoGenero = document.getElementById('edit-genero').value;
  const novoAutor = document.getElementById('edit-autor').value;

  livroEmEdicao.nome = novoNome;
  livroEmEdicao.genero = novoGenero;
  livroEmEdicao.autor = novoAutor;

  renderizarTabela();
  fecharCard();
}

renderizarTabela();

//BARA LATERAL
// Seleciona todos os ícones do menu
const icons = document.querySelectorAll('.menu-icon');
const sidebar = document.querySelector('.barra_lateral');

let lastHoveredLI = null; // Armazena o último item com hover "travado"

// Percorre todos os ícones do menu
icons.forEach(icon => {
    const defaultSrc = icon.getAttribute('data-default'); // Ícone padrão
    const hoverSrc = icon.getAttribute('data-hover');     // Ícone ao passar o mouse
    const li = icon.closest('li');                        // Item da lista pai

    // Quando o mouse entra no item
    li.addEventListener('mouseenter', () => {
        // Troca o ícone para o "hover"
        icon.src = hoverSrc;

        // Remove o hover travado do item anterior (se houver)
        if (lastHoveredLI && lastHoveredLI !== li) {
            lastHoveredLI.classList.remove('hover-lock');
            const lastIcon = lastHoveredLI.querySelector('.menu-icon');
            if (lastIcon) {
                lastIcon.src = lastIcon.getAttribute('data-default');
            }
        }

        // Aplica o hover "travado" no item atual
        li.classList.add('hover-lock');
        lastHoveredLI = li;
    });

    // Ao sair do item, não faz nada — o efeito continua travado
    li.addEventListener('mouseleave', () => {
        // Intencionalmente vazio: mantém o ícone alterado
    });
});

// Quando o mouse entra na barra lateral (como um todo), reseta o estado
sidebar.addEventListener('mouseenter', () => {
    if (lastHoveredLI) {
        lastHoveredLI.classList.remove('hover-lock');
        const lastIcon = lastHoveredLI.querySelector('.menu-icon');
        if (lastIcon) {
            lastIcon.src = lastIcon.getAttribute('data-default');
        }
        lastHoveredLI = null;
    }
});
