const calendar = document.getElementById('calendar');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month-button');
const nextMonthButton = document.getElementById('next-month-button');
const calendarBody = document.getElementById('calendar-body');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Generate the calendar for the current month
function generateCalendar() {
    // Clear any existing days from the calendar
    calendarBody.innerHTML = '';

    let nameOfMonths = ['JANUAR', 'FEBRUAR', 'MART', 'APRIL',
        'MAJ', 'JUNI', 'JULI', 'AUGUST', 'SEPTEMBAR', 'OKTOBAR',
        'NOVEMBAR', 'DECEMBAR'
    ]

    let nameOfCurrentMonth = nameOfMonths[currentMonth];

    // Get the first day of the month
    let firstDay = new Date(currentYear, currentMonth, 1);
    let firstDayOfWeek = firstDay.getDay();
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    // Get the last day of the month
    let lastDay = new Date(currentYear, currentMonth + 1, 0);
    let lastDate = lastDay.getDate();
    if (lastDate === 0) lastDate = 7;

    // Create a calendar row for each week
    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        // Create a calendar cell for each day of the week
        for (let j = 1; j < 8; j++) {
            let cell = document.createElement('td');

            // If the current cell represents a day in the current month, add the
            // day to the cell
            if (i === 0 && j < firstDayOfWeek || date > lastDate) {
                cell.innerHTML = '';
            } else {
                cell.innerHTML = date;
                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }

    // Update the current month display
    currentMonthSpan.innerHTML = `${nameOfCurrentMonth} / ${currentYear}`;
}

// Move to the previous month
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

// Move to the next month
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

// Add event listeners for the navigation buttons
prevMonthButton.addEventListener('click', prevMonth);
nextMonthButton.addEventListener('click', nextMonth);



// Add a class to the current day cell
function highlightCurrentDay() {
    const currentDayCells = document.querySelectorAll('#calendar-table td');
    // Get the current date
    let today = new Date();
    let _currentMonth = today.getMonth();
    let _currentYear = today.getFullYear();
    let _currentDate = today.getDate();

    // Remove the "current" class from any previously selected days
    currentDayCells.forEach(cell => cell.classList.remove('current'));

    // Add the "current" class to the current day cell
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
            // Do something when the cell is clicked
            console.log(cell);
        });
    });
}
// Generate the calendar for the current month
generateCalendar();
highlightCurrentDay();
addClickEventToDays();

