let produtos = [];

function adicionarProduto() {
  let nome = document.getElementById('txtnome');
  let valor = document.getElementById('txtvalor');
  let qtd = document.getElementById('txtqtd');

  if (nome.value.length == 0) {
    alert('[ERRO] Informe o nome do produto.');
    return;
  }

  if (valor.value.length == 0 || parseFloat(valor.value) <= 0) {
    alert('[ERRO] Informe um valor unitário válido.');
    return;
  }

  if (qtd.value.length == 0 || parseInt(qtd.value) <= 0) {
    alert('[ERRO] Informe uma quantidade válida.');
    return;
  }

  let item = {
    id: Date.now(),
    nome: nome.value,
    valor: parseFloat(valor.value),
    qtd: parseInt(qtd.value)
  };

  produtos.push(item);

  nome.value = '';
  valor.value = '';
  qtd.value = 1;
  nome.focus();

  renderizarTabela();
}

function removerProduto(id) {
  produtos = produtos.filter(function(p) {
    return p.id !== id;
  });
  renderizarTabela();
}

function renderizarTabela() {
  let corpo = document.getElementById('corpotabela');
  corpo.innerHTML = '';

  for (let i = 0; i < produtos.length; i++) {
    let p = produtos[i];
    let subtotal = p.valor * p.qtd;

    corpo.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>${p.qtd}</td>
        <td>US$ ${p.valor.toFixed(2)}</td>
        <td>US$ ${subtotal.toFixed(2)}</td>
        <td><button class="btn-remover" onclick="removerProduto(${p.id})">Remover</button></td>
      </tr>
    `;
  }
}

function calcular() {
  let cambio = document.getElementById('txtcambio');
  let aliqII = document.getElementById('txtii');
  let aliqICMS = document.getElementById('txticms');
  let frete = document.getElementById('txtfrete');
  let seguro = document.getElementById('txtseguro');
  let res = document.getElementById('res');

  if (cambio.value.length == 0 || parseFloat(cambio.value) <= 0) {
    alert('[ERRO] Informe a cotação do dólar.');
    return;
  }

  if (aliqII.value.length == 0) {
    alert('[ERRO] Informe a alíquota do II.');
    return;
  }

  if (aliqICMS.value.length == 0) {
    alert('[ERRO] Informe a alíquota do ICMS.');
    return;
  }

  if (produtos.length == 0) {
    alert('[ERRO] Adicione ao menos um produto antes de calcular.');
    return;
  }

  let taxaCambio = parseFloat(cambio.value);
  let percII = parseFloat(aliqII.value) / 100;
  let percICMS = parseFloat(aliqICMS.value) / 100;
  let valorFrete = frete.value.length == 0 ? 0 : parseFloat(frete.value);
  let valorSeguro = seguro.value.length == 0 ? 0 : parseFloat(seguro.value);

  let totalProdutosUSD = 0;
  for (let i = 0; i < produtos.length; i++) {
    totalProdutosUSD += produtos[i].valor * produtos[i].qtd;
  }

  let totalUSD = totalProdutosUSD + valorFrete + valorSeguro;
  let valorAduaneiro = totalUSD * taxaCambio;

  let valorII = valorAduaneiro * percII;

  let baseICMS = (valorAduaneiro + valorII) / (1 - percICMS);
  let valorICMS = baseICMS * percICMS;

  let custoTotal = valorAduaneiro + valorII + valorICMS;

  res.innerHTML = `
    <div class="resultado">
      <h2>Resultado da simulação</h2>
      <div class="linha-resultado">
        <span>Produtos (US$ ${totalProdutosUSD.toFixed(2)}) + Frete (US$ ${valorFrete.toFixed(2)}) + Seguro (US$ ${valorSeguro.toFixed(2)})</span>
        <span>US$ ${totalUSD.toFixed(2)}</span>
      </div>
      <div class="linha-resultado">
        <span>Valor Aduaneiro (convertido a R$ ${taxaCambio.toFixed(2)})</span>
        <span>R$ ${valorAduaneiro.toFixed(2)}</span>
      </div>
      <div class="linha-resultado">
        <span>Imposto de Importação (${(percII * 100).toFixed(2)}%)</span>
        <span>R$ ${valorII.toFixed(2)}</span>
      </div>
      <div class="linha-resultado">
        <span>ICMS (${(percICMS * 100).toFixed(2)}%, base R$ ${baseICMS.toFixed(2)})</span>
        <span>R$ ${valorICMS.toFixed(2)}</span>
      </div>
      <div class="linha-total">
        <span>Custo total estimado</span>
        <span>R$ ${custoTotal.toFixed(2)}</span>
      </div>
    </div>
  `;

  res.scrollIntoView({ behavior: 'smooth' });
}