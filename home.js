document.addEventListener('DOMContentLoaded', async () => {
  setTimeout(() => {
    window.location.href = '/src/pages/landing/index.html';
  }, 3400);

  document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.querySelector('#audioplayer');
    audioPlayer.play();
  });
});
