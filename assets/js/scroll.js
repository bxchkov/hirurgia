let content = document.querySelectorAll('[js-custom-scroll]');
content.forEach(item=>{
    let scrollButton = item.querySelector('.scroll-button');
    let scroll = item.querySelector('.scroll');
    let defaultButtonTransition = scrollButton.style.transition;
    item.addEventListener('wheel', (e)=>{
        let maxScrollHeight = item.scrollHeight - item.clientHeight;
        let range = (item.scrollTop + e.deltaY) / maxScrollHeight;
        moveButton(scrollButton,range);
    });
    function mouseMove(e){
        scrollButton.style.transition = 'none';
        let range = (e.y - scroll.offsetTop - scrollButton.clientHeight / 2) / (scroll.clientHeight - scrollButton.clientHeight);
        let to = (item.scrollHeight - item.clientHeight) * range;
        item.scrollTo({
            top:  to,
        });
        moveButton(scrollButton,range);
        e.preventDefault();
    }
    scroll.addEventListener('mousedown',(e)=>{
        let range = (e.y - scroll.offsetTop - scrollButton.clientHeight / 2) / (scroll.clientHeight - scrollButton.clientHeight);
        let to = (item.scrollHeight - item.clientHeight) * range;
        item.scrollTo({
            top:  to,
            behavior:"smooth"
        });
        moveButton(scrollButton,range)
        document.addEventListener('mousemove',mouseMove);
    });
    document.addEventListener('mouseup',e=>{
        document.removeEventListener('mousemove',mouseMove);
        scrollButton.style.transition = defaultButtonTransition;
    });
});
function moveButton(button,range){
    if(range >= 1)
        range = 1;
    else if(range <= 0)
        range= 0;
    let percent = range * 100;
    let buttonHeight = button.clientHeight;
    button.style.top = `calc(${percent}% - (${buttonHeight}px * ${range}))`;
}

