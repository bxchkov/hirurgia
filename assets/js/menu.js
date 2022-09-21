
document.addEventListener('click',e=>{
    if(document.querySelector('.body').classList.contains('right-open') && !e.target.closest('.body-right')){
        document.querySelectorAll('.body-right > *').forEach(item=>{
            item.classList.remove('active');
        });
        document.querySelector('.body').classList.remove('right-open');
    }
})
document.addEventListener('click',e=>{
    let btn = e.target.closest('[data-right-action]');
    if(btn === null)
        return;
    let action = btn.getAttribute('data-right-action');
    let targetSelector = btn.getAttribute('data-right-target');
    let target = document.querySelector('.body-right > ' + targetSelector);
    if(target === null && action === 'open')
        return
    document.querySelectorAll('.body-right > *').forEach(item=>{
        item.classList.remove('active');
    })
    switch (action){
        case 'open':
            target.classList.add('active');
            document.querySelector('.body').classList.add('right-open');
            break;
        case 'close':
            document.querySelector('.body').classList.remove('right-open');
            break;
        case 'toggle':
            document.querySelector('.body').classList.toggle('right-open');
            break;
    }
})