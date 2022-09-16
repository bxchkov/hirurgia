document.querySelectorAll('.page-player').forEach(item=>{
    let timeOut;
    item.addEventListener('mouseover',e=>{
        if(e.path[0].classList.contains('page-player') && !e.path[0].classList.contains('active')){
            e.target.classList.add('hover');
            timeOut = setTimeout(()=>{
                    e.target.classList.add('active');
            },3000)
        }

    })
    item.addEventListener('mouseout',e=>{
        if(e.path[0].classList.contains('page-player')) {
            e.target.classList.remove('hover');
            clearTimeout(timeOut);
        }
    })
    item.addEventListener('click',e=>{
        e.target.classList.remove('hover');
        e.target.classList.add('active');
    })
})
document.addEventListener('click',e=>{
    if(!e.target.closest('.page-player')){
        document.querySelectorAll('.page-player').forEach(item=>{
            item.classList.remove('active');
        })
    }
})