
document.querySelectorAll('.page-player').forEach(item=>{
    // let onWait = false;
    // item.addEventListener('mouseenter',e=>{
    //     if(e.path[0].classList.contains('page-player')){
    //         console.log(e);
    //         onWait = true;
    //
    //         setTimeout(()=>{
    //             if(onWait){
    //                 e.target.classList.add('active');
    //             }
    //         },3000)
    //     }
    //
    // })
    // item.addEventListener('mouseover',e=>{
    //     onWait = false;
    // })
    item.addEventListener('click',e=>{
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