const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreElement = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex, score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  score = 0 
  scoreElement.innerText = `Score: ${score}`  
  scoreElement.classList.remove('hide')  
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === "true"
  if (correct) {
    score++  
    scoreElement.innerText = `Score: ${score}`  
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    showFinalScore() 
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function showFinalScore() {
  scoreElement.innerText = `Final Score: ${score}/${shuffledQuestions.length}`
}

const questions = [
  {
    question: 'Who is spngebobs best friend?',
    answers: [
      { text: 'squidward', correct: false },
      { text: 'sandy', correct: false },
      { text: 'patrick', correct: true }
    ]
  },
  {
    question: 'Who is the current US president?',
    answers: [
      { text: 'joe biden', correct: true },
      { text: 'donald trump', correct: false },
      { text: 'george bush', correct: false }
    ]
  },
  {
    question: 'how old do you have to be to drive?',
    answers: [
      { text: '17', correct: false },
      { text: '18', correct: true },
      { text: '16', correct: false }
    ]
  },
  {
    question: 'what countrys flag color is blue white and red ?',
    answers: [
      { text: 'cuba', correct: false },
      { text: 'Zurich', correct: false },
      { text: 'france', correct: true }
    ]
  },
  {
    question: 'Which of the following is NOT a vegetable ?',
    answers: [
      { text: 'grape', correct: true },
      { text: 'peas', correct: false },
      { text: 'onion', correct: false }
    ]
  },
  {
    question: 'What is the currency called in mexico?',
    answers: [
      { text: 'pesos', correct: true },
      { text: 'dollar', correct: false },
      { text: 'pounds', correct: false }
    ]
  },
  {
    question: 'who invented the light bulb?',
    answers: [
      { text: 'bill frankiln ', correct: false },
      { text: 'thomas edison', correct: true },
      { text: 'albert einstiem', correct: false }
    ]
  },
  {
    question: 'What is the most famous food in italy?',
    answers: [
      { text: 'pizza', correct: true },
      { text: 'pasta', correct: false },
      { text: 'lasagna', correct: false }
    ]
  },
  {
    question: 'What is the capital of spain ?',
    answers: [
      { text: 'barcelona', correct: false },
      { text: 'madrid', correct: true },
      { text: 'Mexico city', correct: false }
    ]
  }
]