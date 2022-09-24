let telephone = document.querySelector('.header__telephone');
telephone.addEventListener('click', e=> {
    telephone.classList.add('active');
})
document.addEventListener('click', e=> {
   if(!e.target.closest('.header__telephone')){
       telephone.classList.remove('active');
   }
});
telephone.addEventListener('mouseover', e=> {
    let itsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(!itsMobile)
        telephone.classList.add('active');
});
telephone.addEventListener('mouseleave', e=> {
    let itsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(!itsMobile)
        telephone.classList.remove('active');
});