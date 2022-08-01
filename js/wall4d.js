(function () {
  // 컨텐츠 벽들을 감싸고 있는 house를 움직일 예정
  const houseElem = document.querySelector('.house');
  const bar = document.querySelector('.progress-bar');
  const stageElem = document.querySelector('.stage');
  const mousePos = { x : 0 , y : 0};
  let maxScrollValue;

  function resizeHandler(){
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  // 비율 * 1000 함으로써 0~~ 1000사이의 값을 얻는다.
  window.addEventListener('scroll', function () {
    const scrollPer = scrollY / maxScrollValue;
    // -490을 해준 이유 : css에 최초에 .house를 -490vw를 해줬기때문에 똑같이 맞춰줌
    // let zMove = (scrollY / maxScrollValue) * 1000 - 490;
    // 살짝 끝까지 스크롤이 되자않고 좀 덜 스크롤 시켜서 마지막 벽에서 3d처럼 보여주기휘해
    let zMove = scrollPer * 980 - 490;
    houseElem.style.transform = `translateZ(${zMove}vw)`

    // progress bar
    bar.style.width = `${(scrollPer * 100)}%`
  });

  window.addEventListener('resize', resizeHandler);
  resizeHandler();

  window.addEventListener('mousemove', function (e) {
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    // X로 회전하는것은 y축 좌표, Y로 회전하는 것은 x축 좌표
    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${mousePos.x * 5}deg)`
});

})();
