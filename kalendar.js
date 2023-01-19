const calendar = document.getElementById('calendar');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month-button');
const nextMonthButton = document.getElementById('next-month-button');
const calendarBody = document.getElementById('calendar-body');
var formDiv = document.getElementById('form-div');


let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function generateCalendar() {
    calendarBody.innerHTML = '';

    let nameOfMonths = ['JANUAR', 'FEBRUAR', 'MART', 'APRIL',
        'MAJ', 'JUNI', 'JULI', 'AUGUST', 'SEPTEMBAR', 'OKTOBAR',
        'NOVEMBAR', 'DECEMBAR'
    ]

    let nameOfCurrentMonth = nameOfMonths[currentMonth];

    let firstDay = new Date(currentYear, currentMonth, 1);
    let firstDayOfWeek = firstDay.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    let lastDay = new Date(currentYear, currentMonth + 1, 0);
    let lastDate = lastDay.getDate();
    if (lastDate === 0) lastDate = 7;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 1; j < 8; j++) {
            let cell = document.createElement('td');

            if (i === 0 && j < firstDayOfWeek || date > lastDate) {
                cell.innerHTML = '';
            } else {
                cell.addEventListener('click', () => {
                    let paragraph = document.querySelector('#form-div p');
                    paragraph.innerText = `${cell.innerText}. ${currentMonth + 1}. ${currentYear}`;

                    // formDiv.classList.add('visible');
                    formDiv.style.display = 'block';
                    document.getElementById('close-button').addEventListener('click', () => {
                        formDiv.style.display = 'none';
                    });
                });

                cell.innerHTML = date;
                date++;
            }

            row.appendChild(cell);

        }

        calendarBody.appendChild(row);


    }

    currentMonthSpan.innerHTML = `${nameOfCurrentMonth} / ${currentYear}`;
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
    highlightCurrentDay();
    addClickEventToDays();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
    highlightCurrentDay();
    addClickEventToDays();
}

prevMonthButton.addEventListener('click', prevMonth);
nextMonthButton.addEventListener('click', nextMonth);

function highlightCurrentDay() {
    const currentDayCells = document.querySelectorAll('#calendar-table td');
    let today = new Date();
    let _currentMonth = today.getMonth();
    let _currentYear = today.getFullYear();
    let _currentDate = today.getDate();

    currentDayCells.forEach(cell => cell.classList.remove('current'));

    currentDayCells.forEach(cell => {
        if (cell.innerHTML === _currentDate.toString() && _currentMonth === currentMonth && _currentYear === currentYear) {
            cell.classList.add('current');
        }
    });
}

function addClickEventToDays() {
    const calendarCells = document.querySelectorAll('#calendar-table td');

    calendarCells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log(cell);
        });
    });
}

generateCalendar();
highlightCurrentDay();
addClickEventToDays();

window.onclick = (event) => {
    console.log(event.target)
    // if (event.target !== formDiv) {
    //     formDiv.style.display = 'none'
    // }
}

