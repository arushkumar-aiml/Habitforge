let habits = JSON.parse(localStorage.getItem("habits")) || [];
let user = localStorage.getItem("user");

if (user) startApp();

function login() {
    user = document.getElementById("username").value;
    if (!user) return;

    localStorage.setItem("user", user);
    startApp();
}

function startApp() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
    document.getElementById("userDisplay").innerText = user;
    displayHabits();
    updateChart();
    updateLeaderboard();
}

function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
    let input = document.getElementById("habitInput");
    if (!input.value) return;

    habits.push({
        name: input.value,
        streak: 0,
        lastDone: null,
        history: []
    });

    input.value = "";
    saveHabits();
    displayHabits();
    updateChart();
}

function markDone(index) {
    let today = new Date().toDateString();
    let habit = habits[index];

    if (habit.lastDone !== today) {
        habit.streak++;
        habit.lastDone = today;
        habit.history.push(today);
    }

    saveHabits();
    displayHabits();
    updateChart();
    updateLeaderboard();
}

function getBadge(streak) {
    if (streak >= 30) return "🏆 Master";
    if (streak >= 15) return "🥇 Pro";
    if (streak >= 7) return "🥈 Starter";
    return "";
}

function displayHabits() {
    let list = document.getElementById("habitList");
    list.innerHTML = "";

    habits.forEach((habit, index) => {
        list.innerHTML += `
        <div class="habit">
            <div>
                <b>${habit.name}</b>
                <div class="streak">
                    🔥 ${habit.streak} days
                    <span class="badge">${getBadge(habit.streak)}</span>
                </div>
            </div>
            <button onclick="markDone(${index})">Done Today</button>
        </div>`;
    });
}

function updateChart() {
    let counts = habits.map(h => h.history.length);
    let names = habits.map(h => h.name);

    if (window.chart) window.chart.destroy();

    const ctx = document.getElementById('progressChart');

    window.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: 'Completion Count',
                data: counts
            }]
        }
    });
}

function updateLeaderboard() {
    let score = habits.reduce((a, b) => a + b.streak, 0);

    let board = JSON.parse(localStorage.getItem("leaderboard")) || {};
    board[user] = score;
    localStorage.setItem("leaderboard", JSON.stringify(board));

    let sorted = Object.entries(board)
        .sort((a, b) => b[1] - a[1]);

    let html = "";
    sorted.forEach((u, i) => {
        html += `<div>${i + 1}. ${u[0]} — ${u[1]} pts</div>`;
    });

    document.getElementById("leaderboard").innerHTML = html;
}

function toggleTheme() {
    document.body.classList.toggle("light");
}
