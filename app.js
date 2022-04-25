const startBtn = document.querySelector('#start')

const screens = document.querySelectorAll('.screen')

const timeList = document.querySelector('#time-list')

const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')

const newGame = document.querySelector('#new-game')

const colors = ['#83B799', '#E2CD6D', '#C2B28F', '#E4D8B4', '#E86F68', '#f87171',
'#fb923c', '#ea580c', '#65a30d', '#065f46', '#2563eb', '#6d28d9', '#86198f']

let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1><button class="new-game" id="new-game">Начать сначала</button>`
    const newGame = document.querySelector('#new-game')
    newGame.addEventListener('click', (event) => {
        location.reload(); 
        return false
    })

}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const backgroundColor = gettRondomColor()
    
    circle.classList.add('circle')
    circle.style.background = `${backgroundColor}`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)

}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function gettRondomColor () {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}