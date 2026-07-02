(function(){
 var side=document.getElementById('sidebar'),bd=document.getElementById('backdrop'),mb=document.getElementById('menuBtn');
 function openSide(){side.classList.add('open');bd.classList.add('show');}
 function closeSide(){side.classList.remove('open');bd.classList.remove('show');}
 if(mb)mb.addEventListener('click',function(){side.classList.contains('open')?closeSide():openSide();});
 if(bd)bd.addEventListener('click',closeSide);
 side&&side.addEventListener('click',function(e){if(e.target.tagName==='A'&&window.innerWidth<=900)closeSide();});

 var modal=document.getElementById('modal'),mT=document.getElementById('mTitle'),mM=document.getElementById('mMeta'),mB=document.getElementById('mBody');
 function openModal(id){var e=window.DATASET&&window.DATASET[id];if(!e){return;}
  mT.textContent=e.t||'(제목 없음)';
  var meta='<span class="tag">'+(e.ty||'')+'</span> 출처: '+(e.s||'')+' · '+(e.n||0).toLocaleString()+'자';
  if(e.u){meta+=' · <a href="'+e.u+'" target="_blank" rel="noopener">원문 링크 ↗</a>';}
  mM.innerHTML=meta; mB.textContent=e.b||'(본문 없음)';
  modal.classList.add('open');document.body.style.overflow='hidden';}
 function closeModal(){modal.classList.remove('open');document.body.style.overflow='';}
 document.addEventListener('click',function(e){
  var r=e.target.closest('.ref');if(r&&r.dataset.id){e.preventDefault();openModal(r.dataset.id);}});
 document.getElementById('modalClose').addEventListener('click',closeModal);
 modal.addEventListener('click',function(e){if(e.target===modal)closeModal();});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeModal();closeSide();}});

 // 현재 위치 TOC 하이라이트
 var links={};document.querySelectorAll('.toc-list a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a;});
 var heads=document.querySelectorAll('.content h2,.content h3');
 if('IntersectionObserver' in window && heads.length){
  var obs=new IntersectionObserver(function(es){es.forEach(function(en){
   if(en.isIntersecting){document.querySelectorAll('.toc-list a.cur').forEach(function(a){a.classList.remove('cur');});
    var l=links[en.target.id];if(l)l.classList.add('cur');}});},{rootMargin:'-70px 0px -75% 0px'});
  heads.forEach(function(h){obs.observe(h);});
 }
})();
