playtimeSpans = document.querySelectorAll('.playtime');

playtimeSpans.forEach(playtimeSpan => {
  let data = parseInt(playtimeSpan.innerHTML);
  let minutes = data / 60;
  let seconds = data % 60;
  playtimeSpan.innerHTML = `${Math.floor(minutes)}m ${seconds}s`;
});