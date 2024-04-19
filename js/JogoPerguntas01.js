// Criando variável pra armazenar referências a elementos HMTL
// const foi usado pois os valores dentro são constantes, ou seja, não serão alterados posteriormente

const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

// Importando questões de outro arquivo 
import questions from "./JogoPerguntas02.js"; 

// Questões atuais e Questões Corretas no Início do jogo
let currentIndex = 0; 
let questionsCorrect = 0; 

// O botão abaixo vai :
// Ser de onclick, ou seja o usuário terá que clicar nele pra contecer algo
// Esse botão tem estilo flex, ou seja ele é manipulável
// Depois de clicado esse botão fica ocultado da página
// Depois ele vai mostrar na tela Questões atuais e corretas sendo 0
// Chamar a função loadQuestion
// Resumindo : O código reinicia o questionário toda vez que o usuário clica no botão
btnRestart.onclick = () => {
  content.style.display = "flex"; 
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

// Função : Próxima Questão
// Se resposta for Verdadeira, logo Questões Corretas somam mais 1
// data-correct no caso é do array questions.js
// Em seguida faz :
// Se a questão atual é menor que o tamanho das questão - 1
// Caso sim, ele soma mais 1 ao Número de Questões Atuais e chama a função loadQuestion()
// Exemplo¹ : Questão 5 de 10, logo 5 < 10 - 1 >>> 5 < 10 ? Sim
// Exemplo² : Questão 9 de 10, logo 9 < 10 - 1 >>> 9 < 9 ? Sim
// Exemplo² : Questão 10 de 10, logo 10 < 10 - 1 >>> 10 < 9 ? Não
// Senão chama a função finish()
function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
  }

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}

// A função abaixo :
// Vai pegar o número de questão atual somar 1 e dividir pelo número de questões
// Vai guardar na constante item o número de questões atual
// 

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();