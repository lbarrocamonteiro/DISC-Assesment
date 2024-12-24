# Documentação do Projeto

## **Links úteis:**
- DISC Assesment Live: https://vitor-amoreira.github.io/DISC-Assesment/
- Repositório que guarda o código mais atualizado: https://github.com/Vitor-AMoreira/DISC-Assesment
- Base de dados em Google Sheets: https://docs.google.com/spreadsheets/d/1Xg4MmRyYQBK2jg90CW_IKY-EG3A71pj-3jo7ZSxeH8A/edit?gid=0#gid=0


## **index.html**
Este é o ficheiro principal da aplicação, onde a estrutura do conteúdo é definida:
- Contém as seções principais: introdução, questionário e relatório.
- Se conecta aos ficheiros CSS e JavaScript necessários.
- Utiliza formulários para capturar dados do utilizador (nome, apelido, e-mail) e para o preenchimento do questionário DISC.

---

## **style.css**
Define o estilo visual da aplicação:
- Configura o layout e o design, como cores, fontes e espaçamento.
- Estiliza os formulários, botões, gráficos e seções para torná-los responsivos e acessíveis.
- Adiciona estilos específicos para cada seção: introdução, questionário e relatório.

---

## **main.js**
Coordena a navegação e inicialização da aplicação:
- Exibe diferentes seções da aplicação (introdução, questionário e relatório) com base no progresso do utilizador, utilizando informações guardadas no navegador.
- Regista eventos como cliques e submissões de formulários para capturar os dados do utilizador e mudar entre páginas.

---

## **questions.js**
Gerencia o questionário:
- **`generateQuestions()`**: Gera dinamicamente as perguntas do teste DISC no ecrã.
- **`validateResponses()`**: Garante que o utilizador preencheu corretamente todas as perguntas antes de continuar.
- **`processResponses()`**: Calcula os resultados do teste DISC com base nas respostas do utilizador.

---

## **reports.js**
Responsável por criar e exibir o relatório final:
- **`generateReport()`**: Mostra os resultados do teste em gráficos e listas organizadas. Inclui os comportamentos naturais e adaptados do utilizador, além de motivações, desmotivadores e sugestões de desenvolvimento.


---

## **download.js**
Trata do download de relatórios:
- **`downloadPdf()`**: Cria um PDF com os resultados do teste e salva o ficheiro no dispositivo do utilizador.
- **`downloadExcel()`**: Gera um ficheiro Excel com os detalhes do relatório e salva no dispositivo.


---

## **tests.js**
Fornece ferramentas de teste para o desenvolvimento:
- **`testGenerateReport()`**: Cria dados aleatórios para testar a funcionalidade de geração de relatórios.
- **`resetLocalStorage()`**: Apaga todos os dados guardados no navegador para reiniciar a aplicação.

---

## **userData.js**
Cuida das informações do utilizador:
- **`saveUserData()`**: Guarda os dados pessoais do utilizador no navegador.
- **`loadUserDataIntoForm()`**: Preenche o formulário com os dados do utilizador guardados.

---

## **utils.js**
Auxilia com funções gerais:
- **`saveResponseInRealTime()`**: Salva automaticamente as respostas do utilizador enquanto ele preenche o questionário.
- **`getDevelopmentSuggestions()`**: Fornece sugestões de desenvolvimento com base no perfil DISC do utilizador.

---

## **charts.js**
Cria gráficos com os resultados do teste:
- **`createChart()`**: Gera gráficos de barras para os resultados naturais ou adaptados.
- **`createComparisonChart()`**: Gera um gráfico radar comparando os dois tipos de comportamento.

---

## **cloud_function.js**
Envia os resultados para um servidor remoto:
- **`submitForm()`**: Envia os dados do relatório para uma cloud function que os exporta para uma google sheets.

---

## **constants.js**
Contém textos e dados fixos:
- **`workEnvironmentTexts`**: Descrições dos ambientes de trabalho ideais.
- **`motivatorsByDimension`** e **`demotivatorsByDimension`**: Listas de motivações e desmotivadores para cada tipo de perfil DISC.
