const menu = document.querySelector('.menu');
const closeMenu = document.querySelector('.close-menu');
const openMenu = document.querySelector('.open-menu');

openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);

function show() {
    menu.style.display = 'flex';
    menu.style.top = '0';
}

function close() {
    menu.style.top = '-100%';
}