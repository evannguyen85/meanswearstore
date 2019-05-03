const topNavBar = document.getElementById('topbar');
const mainNavbar = document.getElementById('mainNavbar');
const menu = document.getElementById('menu');
const mainBody = document.getElementById('main-body');
const menuMobile = document.getElementById("menu-mobile");
const btnClose = document.getElementsByClassName("close")[0];
const imgs = document.querySelectorAll('#new-arrival img');
const feature = document.getElementById('feature');

for(let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('mouseover', function(){
        console.log(imgs[i]);
    }, false);
}

feature.addEventListener('load', function(){

},false);

window.addEventListener('scroll', function(){
    const mainNavbarHeight = mainNavbar.clientHeight;
    const topNavBarHeight = topNavBar.clientHeight;
    const navbarHeight = mainNavbarHeight - topNavBarHeight;
    const top = window.scrollY;

    if(top > navbarHeight) {
        mainNavbar.classList.add('scrolled');
        mainNavbar.classList.add('fixed-top');
    } else {
        mainNavbar.classList.remove('scrolled');
        mainNavbar.classList.remove('fixed-top');
    }
});

menu.addEventListener('click', function(){
    mainBody.style.marginRight = "250px";
    mainBody.style.marginLeft = "-250px";
    menuMobile.style.display = 'block';
}, false);

btnClose.addEventListener('click', function(){
    mainBody.style.marginRight = "0";
    mainBody.style.marginLeft = "0";
    menuMobile.style.display = 'none';
}, false);
