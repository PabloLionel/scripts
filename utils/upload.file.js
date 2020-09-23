const downloadFile = async (url) => {
  const res = await fetch(url, { mode: 'cors' });
  const file = new File([await res.blob()], 'dafaultName.png', {
    type: 'image/png',
  });
  const img = new Image();
  img.src = URL.createObjectURL(file);
  document.body.appendChild(img);
};

downloadFile('https://picsum.photos/200/300');
