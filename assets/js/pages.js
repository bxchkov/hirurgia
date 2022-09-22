let onAnimation = false;
let steps = 0;
let prevIndex;
setActivePage(0);
function setActivePage(index){
    //let itsPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(onAnimation)
        return
    let pages = document.querySelectorAll('.page');
    index = getValueLoopRange(index,pages.length);
    if(prevIndex === undefined)
        prevIndex = index;
    let beforeActive = document.querySelector('.page.active');
    if(!beforeActive)
        beforeActive = pages[0];
    beforeActive.querySelector('.page-player').classList.remove('active');
    beforeActive.querySelector('.page-player__stop').dispatchEvent(new Event('click'))
    //pages
    pages.forEach(item=>{
        item.classList.remove('active');
        item.classList.remove('next');
        item.classList.remove('prev');
    });
    let activePage = getElementByIndex(index,pages);
    activePage.classList.add('active');
    activePage.classList.add('is-loaded');
    //if(itsPC){
        let step = shortestWay(prevIndex, index,pages.length);
        steps += step;
        for (let i = getValueLoopRange(prevIndex+Math.sign(step),pages.length);  getValueLoopRange(index + Math.sign(step),pages.length) !== getValueLoopRange(i,pages.length); i = i + Math.sign(step)){
            pages[getValueLoopRange(i,pages.length)].style.transform = `translateY(calc(${Math.floor(steps / pages.length)* 100 * pages.length} * var(--vh,1vh)))`;
        }
        //scroll main
        let main = document.querySelector('.main');
        main.style.transform = `translateY(calc(${-steps*100} * var(--vh,1vh)))`;
        onAnimation = true;
        setTimeout(()=>{
            onAnimation = false;
        },500);
   // }
    setActiveAside(index);
    prevIndex = index;
}
function setActiveAside(index){
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
let bodyLeft = document.querySelector('.body-left');
bodyLeft.addEventListener('wheel', e=>{
    let activePage = document.querySelector('.page.active');
    let activePageIndex = getElementIndex(activePage);
    if (e.deltaY > 0){
        setActivePage(activePageIndex + 1);
    }
    else{
        setActivePage(activePageIndex - 1);
    }
    e.preventDefault();
})
// let timeout;
// document.addEventListener('scroll',e=>{
//     let index = Math.round(window.scrollY / window.innerHeight);
//     setActiveAside(index);
//     function scrollEnd(e){
//         let index = Math.round(window.scrollY / window.innerHeight);
//         setActivePage(index);
//         window.scrollTo({
//             top: index * window.innerHeight,
//             behavior:"smooth"
//         });
//     }
//     clearTimeout(timeout);
//     timeout = setTimeout(scrollEnd,100)
// })
let beforeY;

document.addEventListener('touchstart',e=>{
    beforeY = e.changedTouches[0].clientY;
    if(e.target.closest('.body-right') || e.target.closest('.page-player'))
        return
    document.addEventListener("touchmove", touchmove,{ passive: false })
},{ passive: false })
function touchmove(e){
    if(beforeY){
        let thisY = e.changedTouches[0].clientY;
        let activePage = document.querySelector('.page.active');
        let activePageIndex = getElementIndex(activePage);
        if(beforeY > thisY){
            setActivePage(activePageIndex + 1);
        }
        else{
            setActivePage(activePageIndex - 1);
        }
        document.removeEventListener('touchmove',touchmove)
        document.addEventListener('touchmove',stopmove,{ passive: false })
    }
    e.preventDefault();
}
function stopmove(e){
    e.preventDefault();
}
document.addEventListener("touchend",e=>{
    document.removeEventListener('touchmove',stopmove)
    document.removeEventListener('touchmove',touchmove)
})
document.addEventListener('keydown', e=>{
    let activePage = document.querySelector('.page.active');
    let activePageIndex = getElementIndex(activePage);
    if (e.key === "ArrowUp"){
        setActivePage(activePageIndex - 1);
        e.preventDefault();
    }
    else if(e.key === "ArrowDown"){
        setActivePage(activePageIndex + 1);
        e.preventDefault();
    }
})

let asideItems = document.querySelectorAll('.aside-item');
asideItems.forEach(item=>{
    item.addEventListener('click',e=>{
        setActivePage(getElementIndex(e.target));
    });
})
