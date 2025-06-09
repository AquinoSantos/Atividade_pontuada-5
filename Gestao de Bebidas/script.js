// Lista para armazenar as bebidas do estoque
let estoqueBebidas = [];

/**
 * Função para cadastrar uma nova bebida no estoque.
 * Recebe os valores dos campos de input diretamente.
 */
function cadastrarBebida(nome, tipo, quantidadeStr, precoStr) {
    // Converte e valida os valores
    const qtd = parseInt(quantidadeStr);
    const preco = parseFloat(precoStr);

    if (!nome || !tipo || isNaN(qtd) || qtd < 0 || isNaN(preco) || preco < 0) {
    
        return;
    }

    // Verifica se a bebida já existe no estoque 
    const bebidaExistente = estoqueBebidas.find(b => b.nome.toLowerCase() === nome.toLowerCase());

    if (bebidaExistente) {
        
        return;
    }

    const novaBebida = {
        nome: nome,
        tipo: tipo,
        quantidade: qtd,
        preco: preco
    };

    estoqueBebidas.push(novaBebida);
    console.log(`Bebida "${nome}" cadastrada com sucesso!`);
    limparCamposCadastro(); // Chamada para limpar os inputs
    listarBebidas(); // Atualiza a lista na tela
}

/**
 * Função para listar todas as bebidas no estoque.
 */
function listarBebidas() {
    const tbody = document.querySelector('#tabelaEstoque tbody');
    tbody.innerHTML = ''; // Limpa a tabela

    if (estoqueBebidas.length === 0) {
        const row = tbody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 4;
        cell.textContent = 'Nenhuma bebida cadastrada no estoque.';
        cell.style.textAlign = 'center';
        return;
    }

    estoqueBebidas.forEach(bebida => {
        const row = tbody.insertRow();
        row.insertCell().textContent = bebida.nome;
        row.insertCell().textContent = bebida.tipo;
        row.insertCell().textContent = bebida.quantidade;
        row.insertCell().textContent = `R$ ${bebida.preco.toFixed(2)}`;
    });
}

/**
 * Função para buscar uma bebida por nome.
 * Recebe o valor do campo de busca diretamente.
 */
function buscarBebida(nomeBusca) {
    const resultadoBuscaDiv = document.getElementById('resultadoBusca');

    if (!nomeBusca) {
        mostrarMensagem(resultadoBuscaDiv, 'Por favor, digite o nome da bebida para buscar.', 'alerta');
        return;
    }

    // Busca a bebida (ignora maiúsculas/minúsculas)
    const bebidaEncontrada = estoqueBebidas.find(b =>
        b.nome.toLowerCase().includes(nomeBusca.toLowerCase())
    );

    if (bebidaEncontrada) {
        mostrarMensagem(resultadoBuscaDiv, `Bebida encontrada: ${bebidaEncontrada.nome} (Tipo: ${bebidaEncontrada.tipo}, Quantidade: ${bebidaEncontrada.quantidade}, Preço: R$ ${bebidaEncontrada.preco.toFixed(2)})`, 'sucesso');
    } else {
        mostrarMensagem(resultadoBuscaDiv, `Nenhuma bebida encontrada com o nome "${nomeBusca}".`, 'aviso');
    }
}

/**
 * Função para atualizar a quantidade de uma bebida existente.
 * Recebe o nome e a nova quantidade diretamente.
 */
function atualizarQuantidade(nomeParaAtualizar, novaQuantidadeStr) {
    const novaQuantidade = parseInt(novaQuantidadeStr);

    if (!nomeParaAtualizar || isNaN(novaQuantidade) || novaQuantidade < 0) {
        alert('Por favor, preencha o nome da bebida e a nova quantidade corretamente.');
        return;
    }

    // Encontra o índice da bebida (ignora maiúsculas/minúsculas)
    const indiceBebida = estoqueBebidas.findIndex(b =>
        b.nome.toLowerCase() === nomeParaAtualizar.toLowerCase()
    );

    if (indiceBebida !== -1) {
        estoqueBebidas[indiceBebida].quantidade = novaQuantidade;
        alert(`Quantidade de "${nomeParaAtualizar}" atualizada para ${novaQuantidade}.`);
        limparCamposAtualizacao(); // Limpa os inputs
        listarBebidas(); // Atualiza a lista na tela
    } else {
        alert(`Bebida "${nomeParaAtualizar}" não encontrada no estoque.`);
    }
}

/**
 * Função auxiliar para limpar os campos do formulário de cadastro.
 */
function limparCamposCadastro() {
    document.getElementById('nomeBebidaInput').value = '';
    document.getElementById('tipoBebidaInput').value = '';
    document.getElementById('quantidadeBebidaInput').value = '0';
    document.getElementById('precoBebidaInput').value = '0.00';
}

/**
 * Função auxiliar para limpar os campos do formulário de atualização.
 */
function limparCamposAtualizacao() {
    document.getElementById('nomeAtualizarInput').value = '';
    document.getElementById('novaQuantidadeInput').value = '0';
}

/**
 * Função auxiliar para exibir mensagens com diferentes estilos.
 */
function mostrarMensagem(elemento, texto, tipo) {
    elemento.style.display = 'block';
    elemento.textContent = texto;
    // Define cores de fundo e texto baseadas no tipo da mensagem
    if (tipo === 'sucesso') {
        elemento.style.backgroundColor = '#d4edda';
        elemento.style.color = '#155724';
        elemento.style.borderColor = '#c3e6cb';
    } else if (tipo === 'alerta') {
        elemento.style.backgroundColor = '#f8d7da';
        elemento.style.color = '#721c24';
        elemento.style.borderColor = '#f5c6cb';
    } else if (tipo === 'aviso') {
        elemento.style.backgroundColor = '#fff3cd';
        elemento.style.color = '#856404';
        elemento.style.borderColor = '#ffeeba';
    }
}

// Inicializa a listagem de bebidas ao carregar a página
document.addEventListener('DOMContentLoaded', listarBebidas);