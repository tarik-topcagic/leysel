const calendar = document.getElementById('calendar');
const currentMonthSpan = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month-button');
const nextMonthButton = document.getElementById('next-month-button');
const calendarBody = document.getElementById('calendar-body');
const formDiv = document.getElementById('form-div');
const nameInput = document.getElementById('name');
const nameError = document.getElementById('name-error');
const surnameInput = document.getElementById('surname');
const surnameError = document.getElementById('surname-error');
const phoneInput = document.getElementById('phone_number');
const phoneError = document.getElementById('phone-error');
const timeInput = document.getElementById('day_time');
const timeError = document.getElementById('time-error');
const servicesInput = document.getElementById('services');
const servicesError = document.getElementById('services-error');
var elements = document.querySelectorAll("#form-div .error");

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

                    for (var i = 0; i < elements.length; i++) {
                        elements[i].style.display = 'none';
                    }

                    formDiv.style.display = 'block';

                    formDiv.addEventListener("submit", function (event) {
                        event.preventDefault();

                        checkForm();

                    });


                    document.getElementById('close-button').addEventListener('click', () => {
                        formDiv.style.display = 'none';
                    });

                    document.getElementById('cancel-button').addEventListener('click', () => {
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].style.display = 'none';
                        }
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

function checkForm() {
    var hasErrors = false;

    if (nameInput.value === "") {
        nameError.innerHTML = "Molimo Vas da unesete svoje ime!";
        nameError.style.display = 'block';
        hasErrors = true;
    } else if (!/^[a-zA-ZćĆčČšŠđĐžŽ]+$/.test(nameInput.value)) {
        nameError.innerHTML = "Molimo Vas da unesete validno ime!";
        nameError.style.display = 'block';
        hasErrors = true;
    } else {
        nameError.style.display = "none";
    }
    nameInput.addEventListener("input", function () {
        document.getElementById("name-error").style.display = "none";
    });


    if (surnameInput.value === "") {
        surnameError.innerHTML = "Molimo Vas da unesete svoje prezime!";
        surnameError.style.display = 'block';
        hasErrors = true;
    }
    else if (!/^[a-zA-ZćĆčČšŠđĐžŽ]+$/.test(surnameInput.value)) {
        surnameError.innerHTML = "Molimo Vas da unesete validno prezime!";
        surnameError.style.display = 'block';
        hasErrors = true;
    } else {
        surnameError.style.display = "none";
    }
    surnameInput.addEventListener("input", function () {
        document.getElementById("surname-error").style.display = "none";
    });


    if (phoneInput.value == "") {
        phoneError.innerHTML = "Molimo Vas da unesete broj telefona!";
        phoneError.style.display = 'block';
        hasErrors = true;
    }
    else if (!/^[0-9]+$/.test(phoneInput.value)) {
        phoneError.innerHTML = "Molimo Vas da unesete validan broj telefona!";
        phoneError.style.display = 'block';
        hasErrors = true;
    } else {
        phoneError.style.display = "none";
    }
    phoneInput.addEventListener("input", function () {
        document.getElementById("phone-error").style.display = "none";
    });


    if (timeInput.value == "") {
        timeError.innerHTML = "Molimo Vas da izaberete željeni termin!";
        timeError.style.display = 'block';
        hasErrors = true;
    } else {
        timeError.style.display = "none";
    }
    timeInput.addEventListener("input", function () {
        document.getElementById("time-error").style.display = "none";
    });


    if (servicesInput.value == "") {
        servicesError.innerHTML = "Molimo vas da upišete željenu uslugu!";
        servicesError.style.display = 'block';
        hasErrors = true;
    }
    else if (!/^[a-zA-ZćĆčČšŠđĐžŽ]+$/.test(servicesInput.value)) {
        servicesError.innerHTML = "Nije validno!";
        servicesError.style.display = 'block';
        hasErrors = true;
    } else {
        servicesError.style.display = "none";
    }

    if (hasErrors === false) {
        alert("Uspješno ste prijavili termin.");
    }
}

generateCalendar();
highlightCurrentDay();
addClickEventToDays();



