
document.querySelector('.mobile-toggle')?.addEventListener('click', ()=>{
  const m = document.querySelector('.menu');
  if(!m) return;
  m.style.display = (m.style.display==='flex'?'none':'flex');
});
