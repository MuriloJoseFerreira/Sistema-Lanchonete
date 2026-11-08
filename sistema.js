var nomesProdutos = [];
var precosProdutos = [];

var totaisVendas = [];

function produtoJaCadastrado(nome) {
  for (var i = 0; i < nomesProdutos.length; i++) {
    if (nomesProdutos[i].toLowerCase() === nome.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function cadastrarProduto() {
  var nome = prompt("CADASTRAR PRODUTO\n\nDigite o nome do produto:");
  if (nome === null) { 
    return;
  }
  nome = nome.trim();

  if (nome === "") {
    alert("O nome do produto não pode estar vazio.");
    return;
  }

  if (produtoJaCadastrado(nome)) {
    alert("Já existe um produto cadastrado com o nome \"" + nome + "\".");
    return;
  }

  var textoPreco = prompt("Digite o preço de \"" + nome + "\" (ex: 12.50):");
  if (textoPreco === null) {
    return;
  }

  var preco = Number(textoPreco.replace(",", "."));

  if (textoPreco.trim() === "" || isNaN(preco) || preco <= 0) {
    alert("Preço inválido. O preço deve ser um número maior que zero.");
    return;
  }

  nomesProdutos.push(nome);
  precosProdutos.push(preco);

  alert("Produto \"" + nome + "\" cadastrado com sucesso!");
}

function listarProdutos() {
  if (nomesProdutos.length === 0) {
    alert("Não há produtos cadastrados.");
    return;
  }

  var texto = "PRODUTOS CADASTRADOS\n\n";
  for (var i = 0; i < nomesProdutos.length; i++) {

    texto += (i + 1) + " - " + nomesProdutos[i] +
             " - R$ " + precosProdutos[i].toFixed(2) + "\n";
  }
  alert(texto);
}

function calcularTotalVenda(preco, quantidade) {
  return preco * quantidade;
}

function calcularDesconto(total) {
  if (total > 50) {
    return total * 0.10;
  }
  return 0;
}

function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
  var valorFinal = subtotal - desconto;

  var resumo = "RESUMO DA VENDA\n\n" +
    "Produto: " + nome + "\n" +
    "Preço unitário: R$ " + preco.toFixed(2) + "\n" +
    "Quantidade: " + quantidade + "\n" +
    "Subtotal: R$ " + subtotal.toFixed(2) + "\n" +
    "Desconto: R$ " + desconto.toFixed(2) + "\n" +
    "Valor final a pagar: R$ " + valorFinal.toFixed(2);

  alert(resumo);
}

function obterTotalVendasDia() {
  var soma = 0;
  for (var i = 0; i < totaisVendas.length; i++) {
    soma += totaisVendas[i];
  }
  return soma;
}

function exibirTotalVendasDia() {
  if (totaisVendas.length === 0) {
    alert("Não existem vendas registradas.");
    return;
  }

  alert("TOTAL DE VENDAS DO DIA\n\n" +
        "Vendas concluídas: " + totaisVendas.length + "\n" +
        "Total vendido: R$ " + obterTotalVendasDia().toFixed(2));
}

function exibirMenu() {
  var opcao = prompt(
    "=== LANCHONETE ===\n\n" +
    "1. Cadastrar produto\n" +
    "2. Listar produtos cadastrados\n" +
    "3. Realizar venda\n" +
    "4. Consultar total de vendas do dia\n" +
    "5. Encerrar o sistema\n\n" +
    "Escolha uma opção:"
  );
  return opcao;
}

function realizarVenda() {
  if (nomesProdutos.length === 0) {
    alert("Não há produtos cadastrados. Cadastre um produto antes de vender.");
    return;
  }

  listarProdutos();

  var textoCodigo = prompt("Digite o código do produto:");
  if (textoCodigo === null) {
    return;
  }
  var codigo = Number(textoCodigo);

  if (textoCodigo.trim() === "" || isNaN(codigo) || codigo % 1 !== 0 ||
      codigo < 1 || codigo > nomesProdutos.length) {
    alert("Produto inexistente. Venda cancelada.");
    return;
  }

  var indice = codigo - 1;
  var nome = nomesProdutos[indice];
  var preco = precosProdutos[indice];

  var textoQuantidade = prompt("Digite a quantidade de \"" + nome + "\":");
  if (textoQuantidade === null) {
    return;
  }
  var quantidade = Number(textoQuantidade);

  if (textoQuantidade.trim() === "" || isNaN(quantidade) ||
      quantidade <= 0 || quantidade % 1 !== 0) {
    alert("Quantidade inválida. Informe um número inteiro maior que zero.");
    return;
  }

  var subtotal = calcularTotalVenda(preco, quantidade);
  var desconto = calcularDesconto(subtotal);
  var valorFinal = subtotal - desconto;

  exibirResumoVenda(nome, preco, quantidade, subtotal, desconto);

  if (confirm("Confirmar a venda de R$ " + valorFinal.toFixed(2) + "?")) {
    totaisVendas.push(valorFinal);
    alert("Venda concluída com sucesso!");
  } else {
    alert("Venda cancelada.");
  }
}

function iniciarSistema() {
  var opcao;

  do {
    opcao = exibirMenu();

    if (opcao === null) { 
      opcao = "5";
    } else {
      opcao = opcao.trim();
    }

    if (opcao === "1") {
      cadastrarProduto();
    } else if (opcao === "2") {
      listarProdutos();
    } else if (opcao === "3") {
      realizarVenda();
    } else if (opcao === "4") {
      exibirTotalVendasDia();
    } else if (opcao === "5") {

      if (!confirm("Deseja realmente encerrar o sistema?")) {
        opcao = "";
      }
    } else {
      alert("Opção inválida. Escolha um número de 1 a 5.");
    }
  } while (opcao !== "5");

  alert("Sistema encerrado. Até logo!");
}
