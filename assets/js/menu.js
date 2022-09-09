
let menuBtns = document.querySelectorAll('[js-toggle-menu]');
menuBtns.forEach(elem=>{
    elem.addEventListener('click',e=>{
        document.body.classList.toggle('menu-open');
        e.stopPropagation();
    })
})

menuBtns = document.querySelectorAll('[js-close-menu]');
menuBtns.forEach(elem=>{
    elem.addEventListener('click',e=>{
        document.body.classList.remove('menu-open');
    })
})
document.addEventListener('click',e=>{
    if(document.body.classList.contains('menu-open') && !e.target.closest('.menu'))
        document.body.classList.remove('menu-open');
})