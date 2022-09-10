let onAnimation = false;
setActivePage(0);
function setActivePage(index){
    if(onAnimation)
        return
    let pages = document.querySelectorAll('.page');
    pages.forEach(item=>{
        item.classList.remove('active');
    })
    pages[((index % pages.length) + pages.length) % pages.length].classList.add('active');
    let main = document.querySelector('.main');
    main.style.top = '-'+(((index % pages.length) + pages.length) % pages.length)*100+'vh';
    let asideItems = document.querySelectorAll('.aside-item');
    asideItems.forEach(item=>{
        item.classList.remove('active');
        item.classList.remove('next');
        item.classList.remove('prev');
    });
    asideItems[((index % pages.length) + pages.length) % pages.length].classList.add('active');
    asideItems[(((index-1) % pages.length) + pages.length) % pages.length].classList.add('prev');
    asideItems[(((index+1) % pages.length) + pages.length) % pages.length].classList.add('next');
    onAnimation = true;
    setTimeout(()=>{
        onAnimation = false;
    },500);
}
function getElementIndex(element){
    var nodes = Array.prototype.slice.call(element.parentNode.children);
    return nodes.indexOf(element);
}
document.addEventListener('wheel', e=>{
    let activePage = document.querySelector('.page.active');
    let activePageIndex = getElementIndex(activePage);
    if (e.deltaY > 0){
        setActivePage(activePageIndex + 1);
    }
    else{
        setActivePage(activePageIndex - 1);
    }
})
document.addEventListener('keydown', e=>{
    let activePage = document.querySelector('.page.active');
    let activePageIndex = getElementIndex(activePage);
    if (e.key === "ArrowUp"){
        setActivePage(activePageIndex - 1);
    }
    else if(e.key === "ArrowDown"){
        setActivePage(activePageIndex + 1);
    }
})

let asideItems = document.querySelectorAll('.aside-item');
asideItems.forEach(item=>{
    item.addEventListener('click',e=>{
        setActivePage(getElementIndex(e.target));
    });
})
