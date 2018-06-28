
var osStatus = '';
var isMobile = false;

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        isMobile = true;
        return "Windows Phone";

    }

    if (/android/i.test(userAgent)) {
        isMobile = true;
        return "Android";
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        isMobile = true;
        return "iOS";
    }
    return "unknown";
}
osStatus = getMobileOperatingSystem();

var isScrolling = false;
var scrollRange = [9, 91, 86]; // low, high, answer
var mouseMoveEvent = 'mousemove';
var mouseUpEvent = 'mouseup';
var mouseOutEvent = 'mouseout';
var mouseDownEvent = 'mousedown';
if (isMobile) {
    mouseMoveEvent = 'touchmove';
    mouseUpEvent = 'touchend';
    mouseDownEvent = 'touchstart';
}
function getMouseCoordinate(evt) {
    osStatus = getMobileOperatingSystem();
    if(evt == undefined)
        return {x:0,y:0};
    if (osStatus === 'Android' || osStatus === 'iOS') {
        // evt = evt.originalEvent;
        if (('changedTouches' in evt)) evt = evt.changedTouches[0];
    }
    return {
        x: evt.pageX,
        y: evt.pageY
    };

}

$('.parent-scroll').on(mouseMoveEvent,function (e) {
  //e.preventDefault();
});

(function (window) {

  // const l = 42, // 滑块边长
  //   r = 10, // 滑块半径
  //   w = 310, // canvas宽度
  //   h = 155, // canvas高度
  //   PI = Math.PI
  // const L = l + r * 2 // 滑块实际边长
  var l = 42, // 滑块边长
    r = 10, // 滑块半径
    w = 250, // canvas宽度
    h = 120, // canvas高度
    PI = Math.PI
  var L = l + r * 2 // 滑块实际边长

  function getRandomNumberByRange(start, end) {
    return Math.round(Math.random() * (end - start) + start)
  }

  function createCanvas(width, height) {
    var canvas = createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }

  function createImg(onload) {
    var img = createElement('img')
    img.crossOrigin = "Anonymous"
    img.onload = onload
    img.onerror = () => {
      img.src = getRandomImg()
    }
    img.src = getRandomImg()
    return img
  }

  function createElement(tagName) {
    return document.createElement(tagName)
  }

  function addClass(tag, className) {
    tag.classList.add(className)
  }

  function removeClass(tag, className) {
    tag.classList.remove(className)
  }

  function getRandomImg() {
    return 'https://picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 1084)
  }

  function draw(ctx, operation, x, y) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + l / 2, y)
    ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI)
    ctx.lineTo(x + l / 2, y)
    ctx.lineTo(x + l, y)
    ctx.lineTo(x + l, y + l / 2)
    ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI)
    ctx.lineTo(x + l, y + l / 2)
    ctx.lineTo(x + l, y + l)
    ctx.lineTo(x, y + l)
    ctx.lineTo(x, y)
    ctx.fillStyle = '#fff'
    ctx[operation]()
    ctx.beginPath()
    ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI)
    ctx.globalCompositeOperation = "xor"
    ctx.fill()
  }

  function sum(x, y) {
    return x + y
  }

  function square(x) {
    return x * x
  }


  class jigsaw {
    constructor(el, success, fail) {
      this.el = el
      this.success = success
      this.fail = fail
    }

    init() {
      this.initDOM()
      this.initImg()
      this.draw()
      this.bindEvents()
    }

    initDOM() {
      var canvas = createCanvas(w, h) // 画布
      var block = canvas.cloneNode(true) // 滑块
      var sliderContainer = createElement('div')
      var refreshIcon = createElement('div')
      var sliderMask = createElement('div')
      var slider = createElement('div')
      var sliderIcon = createElement('span')
      var text = createElement('span')

      block.className = 'block'
      sliderContainer.className = 'sliderContainer'
      refreshIcon.className = 'refreshIcon'
      sliderMask.className = 'sliderMask'
      slider.className = 'slider'
      sliderIcon.className = 'sliderIcon'
      text.innerHTML = '向右滑动滑块填充拼图'
      text.className = 'sliderText'

      var el = this.el
      el.appendChild(canvas)
      el.appendChild(refreshIcon)
      el.appendChild(block)
      slider.appendChild(sliderIcon)
      sliderMask.appendChild(slider)
      sliderContainer.appendChild(sliderMask)
      sliderContainer.appendChild(text)
      el.appendChild(sliderContainer)

      Object.assign(this, {
        canvas,
        block,
        sliderContainer,
        refreshIcon,
        slider,
        sliderMask,
        sliderIcon,
        text,
        canvasCtx: canvas.getContext('2d'),
        blockCtx: block.getContext('2d')
      })
    }

    initImg() {
      var img = createImg(() => {
        this.canvasCtx.drawImage(img, 0, 0, w, h)
        this.blockCtx.drawImage(img, 0, 0, w, h)
        var y = this.y - r * 2 + 2
        var ImageData = this.blockCtx.getImageData(this.x, y, L, L)
        this.block.width = L
        this.blockCtx.putImageData(ImageData, 0, y)
      })
      this.img = img
    }

    draw() {
      // 随机创建滑块的位置
      this.x = getRandomNumberByRange(L + 10, w - (L + 10))
      this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10))
      draw(this.canvasCtx, 'fill', this.x, this.y)
      draw(this.blockCtx, 'clip', this.x, this.y)
    }

    clean() {
      this.canvasCtx.clearRect(0, 0, w, h)
      this.blockCtx.clearRect(0, 0, w, h)
      this.block.width = w
    }

    bindEvents() {
      this.el.onselectstart = () => false
      this.refreshIcon.onclick = () => {
        this.reset()
      }

      let originX, originY, trail = [], isMouseDown = false
      this.sliderContainer.addEventListener(mouseDownEvent, function (e) {
          var mouse = getMouseCoordinate.call(this, e);
        originX = mouse.x, originY = mouse.y;
        isMouseDown = true;
          e.preventDefault();
      });
      this.sliderContainer.addEventListener(mouseMoveEvent, (e) => {
          var mouse = getMouseCoordinate.call(this, e);
        if (!isMouseDown) return false
        var moveX = mouse.x - originX
        var moveY = mouse.y - originY
        if (moveX < 0 || moveX + 38 >= w) return false
        this.slider.style.left = moveX + 'px'
        var blockLeft = (w - 40 - 20) / (w - 40) * moveX
        this.block.style.left = blockLeft + 'px'

        addClass(this.sliderContainer, 'sliderContainer_active')
        this.sliderMask.style.width = moveX + 'px'
        trail.push(moveY);
        e.preventDefault();
      });
      this.sliderContainer.addEventListener(mouseUpEvent, (e) => {
        if (!isMouseDown) return false
        isMouseDown = false

        var mouse = getMouseCoordinate.call(this, e);

        e.preventDefault();
        if (mouse.x == originX) return false
        removeClass(this.sliderContainer, 'sliderContainer_active')
        this.trail = trail
        var {spliced, TuringTest} = this.verify()
        if (spliced) {
          if (TuringTest) {
            addClass(this.sliderContainer, 'sliderContainer_success')
            this.success && this.success()
          } else {
            addClass(this.sliderContainer, 'sliderContainer_fail')
            this.text.innerHTML = '再试一次'
            this.reset()
          }
        } else {
          addClass(this.sliderContainer, 'sliderContainer_fail')
          this.fail && this.fail()
          setTimeout(() => {
            this.reset()
          }, 1000)
        }
      })
    }

    verify() {
      var arr = this.trail // 拖动时y轴的移动距离
      var average = arr.reduce(sum) / arr.length // 平均值
      var deviations = arr.map(x => x - average) // 偏差数组
      var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // 标准差
      var left = parseInt(this.block.style.left)
      return {
        spliced: Math.abs(left - this.x) < 10,
        TuringTest: average !== stddev, // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
      }
    }

    reset() {
      this.sliderContainer.className = 'sliderContainer'
      this.slider.style.left = 0
      this.block.style.left = 0
      this.sliderMask.style.width = 0
      this.clean()
      this.img.src = getRandomImg()
      this.draw()
    }

  }

  window.jigsaw = {
    init: function (element, success, fail) {
      new jigsaw(element, success, fail).init()
    }
  }
}(window))
