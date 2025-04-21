let clickCount = 0;
let clickHistory = JSON.parse(localStorage.getItem('clickHistory')) || {}; // Загружаем сохранённые данные

const clickButton = document.getElementById('clickButton');
const clickCountElement = document.getElementById('clickCount');
const lastClickTimeElement = document.getElementById('lastClickTime');
const saveButton = document.getElementById('saveButton');
const viewHistoryButton = document.getElementById('viewHistoryButton');
const historyPage = document.getElementById('historyPage');
const historyList = document.getElementById('historyList');
const logPage = document.getElementById('logPage');
const logList = document.getElementById('logList');
const backToMainButton = document.getElementById('backToMainButton');
const backToHistoryButton = document.getElementById('backToHistoryButton');

clickButton.addEventListener('click', function() {
    clickCount++;
    const currentTime = new Date().toLocaleTimeString();
    lastClickTimeElement.textContent = currentTime;
    clickCountElement.textContent = clickCount;
    
    const today = new Date().toLocaleDateString();
    if (!clickHistory[today]) {
        clickHistory[today] = [];
    }
    clickHistory[today].push({ 
        time: currentTime,
        date: today,
        log: `${currentTime}: +1 установка`
    });
    localStorage.setItem('clickHistory', JSON.stringify(clickHistory));
});

saveButton.addEventListener('click', function() {
    const today = new Date().toLocaleDateString();
    const dailyClicks = clickHistory[today];
    if (dailyClicks && dailyClicks.length > 0) {
        alert(`Данные об установках за сегодня (${today}) сохранены!`);

        clickCount = 0;
        clickCountElement.textContent = clickCount;
    } else {
        alert('Сегодня ещё не было установок!');
    }
});

viewHistoryButton.addEventListener('click', function() {
    historyPage.style.display = 'block';
    document.getElementById('mainPage').style.display = 'none';
    loadHistory();
});

function showLogPage(date) {
    logPage.style.display = 'block';
    historyPage.style.display = 'none';
    loadLog(date);
}

function loadHistory() {
    historyList.innerHTML = '';
    for (let date in clickHistory) {
        const li = document.createElement('li');
        li.textContent = `${date}: ${clickHistory[date].length} уст.`;
        li.addEventListener('click', function() {
            showLogPage(date);
        });
        historyList.appendChild(li);
    }
}

function loadLog(date) {
    logList.innerHTML = '';
    const logs = clickHistory[date];
    logs.forEach(log => {
        const li = document.createElement('li');
        li.textContent = log.log;
        logList.appendChild(li);
    });
}

backToMainButton.addEventListener('click', function() {
    historyPage.style.display = 'none';
    document.getElementById('mainPage').style.display = 'block';
});

backToHistoryButton.addEventListener('click', function() {
    logPage.style.display = 'none';
    historyPage.style.display = 'block';
});

function init() {
    document.getElementById('mainPage').style.display = 'block';
    historyPage.style.display = 'none';
    logPage.style.display = 'none';
}

init();