(()=>{
  const form=document.querySelector('#shipment-form');
  if(!form)return;
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
    if(get('pickupDate'))lines.push(`Preferred pickup date: ${get('pickupDate')}`);
    if(get('mode'))lines.push(`Transport preference: ${get('mode')}`);
    if(get('notes'))lines.push(`Other instructions: ${get('notes')}`);
    const url=`https://wa.me/263772185946?text=${encodeURIComponent(lines.join('\n'))}`;
    const opened=window.open('about:blank','_blank');
    if(opened){opened.opener=null;opened.location.href=url;}
    else window.location.href=url;
  });
})();
