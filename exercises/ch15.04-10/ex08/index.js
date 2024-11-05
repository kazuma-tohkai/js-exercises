(function updateClock() {
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes() + sec / 60;
  const hour = (now.getHours() % 12) + min / 60;
  const secangle = sec * 6;
  const minangle = min * 6;
  const hourangle = hour * 30;

  const secondhand = document.querySelector("#clock .secondhand");
  const minhand = document.querySelector("#clock .minutehand");
  const hourhand = document.querySelector("#clock .hourhand");

  secondhand.setAttribute("transform", `rotate(${secangle}, 50, 50)`);
  minhand.setAttribute("transform", `rotate(${minangle}, 50, 50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle}, 50, 50)`);

  // 0.1秒後に再度updateClockを呼び出す
  setTimeout(updateClock, 100);
})();
