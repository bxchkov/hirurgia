
document.querySelectorAll('.page-player').forEach(item=>{
    let onWait = false;
    item.addEventListener('mouseover',e=>{
        onWait = false;
    })
    item.addEventListener('mouseenter',e=>{
        onWait = true
        setTimeout(()=>{
            if(onWait){
                e.target.classList.add('active');
            }
        },3000)
    })
})