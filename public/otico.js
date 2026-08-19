const faixa=document.querySelector('.faixa');
document.querySelector('.anterior')?.addEventListener('click',()=>faixa?.scrollBy({left:-faixa.clientWidth*.8,behavior:'auto'}));
document.querySelector('.seguinte')?.addEventListener('click',()=>faixa?.scrollBy({left:faixa.clientWidth*.8,behavior:'auto'}));
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
menu?.addEventListener('click',()=>{const aberto=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!aberto));nav?.toggleAttribute('data-aberto',!aberto)});
nav?.addEventListener('click',()=>{menu?.setAttribute('aria-expanded','false');nav.removeAttribute('data-aberto')});
document.querySelector('form')?.addEventListener('submit',e=>e.preventDefault());
