(()=>{
  const form=document.querySelector('#shipment-form');
  if(!form)return;
  const dialog=document.querySelector('#enquiry-review');
  document.querySelector('#edit-enquiry').addEventListener('click',()=>dialog.close());
  document.querySelector('#send-enquiry').addEventListener('click',()=>dialog.close());
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const get=name=>String(data.get(name)||'').trim();
    const lines=[
      'Hello Clearbase, I would like to discuss a shipment.',
      '',
      'SENDER',
      `Name: ${get('senderName')}`,
      `Phone: ${get('senderPhone')}`,
      '',
      'SHIPMENT',
      `Pickup location: ${get('pickup')}`,
      `Delivery location: ${get('delivery')}`,
      `Goods: ${get('cargo')}`,
      '',
      'RECIPIENT',
      `Name: ${get('recipientName')}`,
      `Phone: ${get('recipientPhone')}`
    ];
    if(get('packageCount'))lines.push(`Packages: ${get('packageCount')}`);
    if(get('weightKg'))lines.push(`Total weight: ${get('weightKg')} kg`);
    const dims=['lengthCm','widthCm','heightCm'];
    if(dims.some(name=>get(name)))lines.push(`Typical package (L × W × H): ${dims.map(name=>get(name)||'not specified').join(' × ')} cm`);
    if(get('handling'))lines.push(`Handling needs: ${get('handling')}`);
    if(get('pickupDate'))lines.push(`Preferred pickup date: ${get('pickupDate')}`);
    if(get('mode'))lines.push(`Transport preference: ${get('mode')}`);
    if(get('notes'))lines.push(`Other instructions: ${get('notes')}`);
    const url=`https://wa.me/263710901681?text=${encodeURIComponent(lines.join('\n'))}`;
    document.querySelector('#enquiry-message').textContent=lines.join('\n');
    document.querySelector('#send-enquiry').href=url;
    document.querySelector('#enquiry-review').showModal();
  });
})();
