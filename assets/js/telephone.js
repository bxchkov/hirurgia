let telephone = document.querySelector('.header__telephone');
telephone.addEventListener('click', e=> {
    telephone.classList.add('active');
})
document.addEventListener('click', e=> {
   if(!e.target.closest('.header__telephone')){
       telephone.classList.remove('active');
   }
});