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
  // 바로 이전 스크롤 위치 저장
  this.lastScrollTop = 0;
  // 각각의 인스턴스의 위치를 조금 더 다루기 쉽게
  this.xPos = info.xPos;
  this.speed = info.speed;
  this.direction;
  // 좌/우 이동인지 아닌지 판별 하는 상태
  this.runningState = false;
  this.rafId;
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


            // 이전 스크롤 위치와 현재 스크롤 위치를 비교
            if (self.lastScrollTop > scrollY){
              // 이전 스크롤 값이 현재 스크롤 값보다 크면 : 스크롤을 위로 올린것
              console.log("밑으로 내림");
              self.mainElem.setAttribute('data-direction', 'backward');
            }else {
              console.log("위로 올림");
              // 이전 스크롤 값이 현재 스크롤 값보다 작으면 : 스크롤을 아래로 내린것
              self.mainElem.setAttribute('data-direction', 'forward');
            }

            self.lastScrollTop = scrollY;
    })

    window.addEventListener('keydown', function(e){
    if (self.runningState) return;      
    if(e.key === 'ArrowLeft'){
        self.mainElem.setAttribute('data-direction', 'left');
        self.mainElem.classList.add('running');
        self.direction = 'left';
        self.run(self);
        // 누르고 있으면 running중이니깐 true로 바꿔서 keydown 이벤트가 실행되지않게
        self.runningState = true;
      }else if(e.key === 'ArrowRight'){
          self.mainElem.setAttribute('data-direction', 'right');
          self.mainElem.classList.add('running');
          self.direction= 'right';
          self.run(self);
          self.runningState = true;

      }
    })

    window.addEventListener('keyup', function(e){
      self.mainElem.classList.remove('running');
      cancelAnimationFrame(self.rafId);
      // 다시 runningState를 false로 바꿔줘서 KeyDown 이벤트가 실행 되도록 만들어준다.
      self.runningState = false;

    })
  },

  run : function(self){
    if(self.direction === 'left'){
         // 이동할때 현재 xPos에서 이동하는 스피드 만큼 빼준다.
        self.xPos -= self.speed;

    }else if(self.direction === 'right'){
              // 이동할때 현재 xPos에서 이동하는 스피드 만큼 빼준다.
        self.xPos += self.speed;
        // 캐릭터 인스턴스 left위치를 위에서 빼준 값만큼 최신화 된값을 left값으로 최신화 해준다.
    }

  // xPos이 넘어가는 순간에 안넘어 가게 만들어준다.
  if (self.xPos < 2) {
      self.xPos = 2;
  }

   if (self.xPos > 88) {
      self.xPos = 88;
  }

    self.mainElem.style.left = self.xPos + '%';
    // requestAnimationFrame이 reutrn 하는 숫자값을 나중에 cancelAnimationFrame에도 쓴다.
    self.rafId = requestAnimationFrame(function () {
            self.run(self);
        });
  }
}