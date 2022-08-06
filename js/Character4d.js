function Character(info){
  this.mainElem = document.createElement('div');
  this.mainElem.classList.add('character');
  this.mainElem.innerHTML = `
        <div class="character-face-con character-head">
            <div class="character-face character-head-face face-front"></div>
            <div class="character-face character-head-face face-back"></div>
        </div>
        <div class="character-face-con character-torso">
            <div class="character-face character-torso-face face-front"></div>
            <div class="character-face character-torso-face face-back"></div>
        </div>
        <div class="character-face-con character-arm character-arm-right">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
        </div>
        <div class="character-face-con character-arm character-arm-left">
            <div class="character-face character-arm-face face-front"></div>
            <div class="character-face character-arm-face face-back"></div>
        </div>
        <div class="character-face-con character-leg character-leg-right">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
        </div>
        <div class="character-face-con character-leg character-leg-left">
            <div class="character-face character-leg-face face-front"></div>
            <div class="character-face character-leg-face face-back"></div>
        </div>
        `
  document.querySelector('.stage').appendChild(this.mainElem);
  this.mainElem.style.left = info.xPos + '%';
  // 스크롤 중인지 아닌지 상태를 저장함.
  this.scrollState = false;
  // prototype 메소드가 실행됨
  this.init();
}

// Character prototype 객체를 재 정의 한다.
Character.prototype = {
  constructor : Character,
  init: function(){
    const self = this;
    window.addEventListener('scroll', function(){
      // 스크롤 할때마다 계속 실행.
       clearTimeout(self.scrollState);

            // 스크롤 했을때 최초 한번만 실행됨
            if (!self.scrollState) {
                self.mainElem.classList.add('running');
            }
            // 스크롤 멈추면 0.5초후 실행 된는 부분 한번만 실행됨
            self.scrollState = setTimeout(function () {
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);
    })
  }
}