let onAnimation = false;
let steps = 0;
let prevIndex;
setActivePage(0);
function setActivePage(index){
    if(onAnimation)
        return
    let pages = document.querySelectorAll('.page');
    index = getValueLoopRange(index,pages.length);
    if(prevIndex === undefined)
        prevIndex = index;
    //pages
    pages.forEach(item=>{
        item.classList.remove('active');
        item.classList.remove('next');
        item.classList.remove('prev');
    });
    let step = shortestWay(prevIndex, index,pages.length);
    steps += step;
    for (let i = getValueLoopRange(prevIndex+Math.sign(step),pages.length);  getValueLoopRange(index + Math.sign(step),pages.length) !== getValueLoopRange(i,pages.length); i = i + Math.sign(step)){
        pages[getValueLoopRange(i,pages.length)].style.transform = `translateY(${Math.floor(steps / pages.length)* 100 * pages.length}vh)`;
    }
    let activePage = getElementByIndex(index,pages);
    activePage.classList.add('active');
    activePage.classList.add('is-loaded');
    //scroll main
    let main = document.querySelector('.main');
    main.style.top = -steps*100+'vh';
    //aside
    let asideItems = document.querySelectorAll('.aside-item');
    asideItems.forEach(item=>{
        item.classList.remove('active');
        item.classList.remove('next');
        item.classList.remove('prev');
    });
    getElementByIndex(index,asideItems).classList.add('active');
    getElementByIndex(index-1,asideItems).classList.add('prev');
    getElementByIndex(index+1,asideItems).classList.add('next');
    prevIndex = index;
    onAnimation = true;
    setTimeout(()=>{
        onAnimation = false;
    },500);
}
/**
 * @return HTMLElement
 * */
function getElementByIndex(index,arr){
    return arr[getValueLoopRange(index,arr.length)];
}
function getValueLoopRange(value,range){
    return ((value % range) + range) % range;
}
function getElementIndex(element){
    let nodes = Array.prototype.slice.call(element.parentNode.children);
    return nodes.indexOf(element);
}
function shortestWay(from,to,range){
    let positiveDirection, negativeDirection;
    if(to > from){
         positiveDirection = to - from;
         negativeDirection = -(range - to + from);
    }else{
         positiveDirection = range - from + to;
         negativeDirection = to - from;
    }
    return  Math.abs(positiveDirection) < Math.abs(negativeDirection)? positiveDirection:negativeDirection;
}
document.querySelector('.body-left').addEventListener('wheel', e=>{
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
