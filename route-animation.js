(()=>{
  const scene=document.querySelector('.scene-map');
  if(!scene)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const vehicles=[
    {element:scene.querySelector('.freight-model'),path:scene.querySelector('#freight-path'),seconds:23,phase:.18,heading:45},
    {element:scene.querySelector('.van-model'),path:scene.querySelector('#van-path'),seconds:19,phase:.61,heading:45},
    {element:scene.querySelector('.bike-model'),path:scene.querySelector('#bike-path'),seconds:15,phase:.37,heading:45},
    {element:scene.querySelector('.ship-model'),path:scene.querySelector('#ship-path'),seconds:31,phase:.42,heading:-24},
    {element:scene.querySelector('.plane-model'),path:scene.querySelector('#air-path'),seconds:18,phase:.42,heading:-8}
  ].map(v=>({...v,length:v.path.getTotalLength()}));
  let started=performance.now();
  const position=(v,progress)=>{
    const distance=progress*v.length;
    const point=v.path.getPointAtLength(distance);
    const before=v.path.getPointAtLength(Math.max(0,distance-3));
    const after=v.path.getPointAtLength(Math.min(v.length,distance+3));
    const angle=Math.atan2(after.y-before.y,after.x-before.x)*180/Math.PI+v.heading;
    v.element.style.left=`${point.x/12}%`;
    v.element.style.top=`${point.y/7}%`;
    const depth=.78+.19*(point.y/700);
    v.element.style.transform=`translate(-50%,-50%) rotate(${angle}deg) scale(${depth})`;
  };
  const animate=now=>{
    for(const v of vehicles){
      const progress=reduced.matches?v.phase:((now-started)/(v.seconds*1000)+v.phase)%1;
      position(v,progress);
    }
    if(!reduced.matches)requestAnimationFrame(animate);
  };
  reduced.addEventListener('change',()=>{started=performance.now();requestAnimationFrame(animate)});
  requestAnimationFrame(animate);
})();
