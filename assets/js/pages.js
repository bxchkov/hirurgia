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
    steps += nearestLength(prevIndex, index,pages.length);
    console.log(nearestLength(prevIndex, index,pages.length),prevIndex,index);
    prevIndex = index;
    pages.forEach(item=>{
        item.classList.remove('active');
        item.classList.remove('next');
        item.classList.remove('prev');
    });
    let activePage = getElementByIndex(index,pages);
    activePage.classList.add('active');
    activePage.classList.add('is-loaded');
    getElementByIndex(index+1,pages).classList.add('next');
    getElementByIndex(index-1,pages).classList.add('prev');
    let main = document.querySelector('.main');
    main.style.top = -steps*100+'vh';
    let asideItems = document.querySelectorAll('.aside-item');
    asideItems.forEach(item=>{
        item.classList.remove('active');
        item.classList.remove('next');
        item.classList.remove('prev');
    });
    getElementByIndex(index,asideItems).classList.add('active');
    getElementByIndex(index-1,asideItems).classList.add('prev');
    getElementByIndex(index+1,asideItems).classList.add('next');
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
function nearestLength(from,to,range){
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
