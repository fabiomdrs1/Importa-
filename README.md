# Calculadora para Importadores

Aplicação web para simular o custo total de uma importação, convertendo valores em dólar para reais e aplicando os principais tributos incidentes (Imposto de Importação e ICMS).

## Funcionalidades

- Cadastro de múltiplos produtos (nome, valor unitário em US$ e quantidade)
- Inclusão de frete internacional e seguro
- Conversão automática para reais com base na cotação informada
- Cálculo do Valor Aduaneiro
- Cálculo do Imposto de Importação (II) sobre o Valor Aduaneiro
- Cálculo do ICMS com base de cálculo "por dentro" (gross-up), como ocorre na prática real de desembaraço aduaneiro
- Resumo final com o custo total estimado da importação

## Tecnologias

- HTML5
- CSS3
- JavaScript (Vanilla)

## Como usar

1. Clone o repositório
2. Abra o arquivo `index.html` no navegador
3. Preencha a cotação do dólar e as alíquotas de II e ICMS
4. Adicione os produtos da importação
5. Informe frete e seguro (se houver)
6. Clique em "Calcular custo de importação" para ver o resultado

## Aviso

Os cálculos são uma estimativa para fins de estudo/portfólio e não substituem uma consultoria aduaneira ou contábil.
