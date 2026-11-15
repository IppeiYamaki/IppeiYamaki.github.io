// 作品ページの画像を押すと、画面いっぱいに大きく表示する
(() => {
  const images = document.querySelectorAll('.figure img, .gallery img');
  const viewer = document.createElement('dialog');
  if (images.length === 0 || !viewer.showModal) {
    return;
  }

  const large = document.createElement('img');
  viewer.className = 'viewer';
  viewer.append(large);
  document.body.append(viewer);

  const open = (img) => {
    large.src = img.currentSrc || img.src;
    large.alt = img.alt;
    viewer.showModal();
  };

  images.forEach((img) => {
    img.classList.add('zoomable');
    img.tabIndex = 0;
    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(img);
      }
    });
  });

  // 背景か絵を押すと閉じる。Esc では dialog が自分で閉じる
  viewer.addEventListener('click', () => viewer.close());
  viewer.addEventListener('close', () => large.removeAttribute('src'));
})();
