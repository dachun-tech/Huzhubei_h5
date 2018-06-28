"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

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
    if (evt == undefined) return {x: 0, y: 0};
    if (osStatus === 'Android' || osStatus === 'iOS') {
        // evt = evt.originalEvent;
        if ('changedTouches' in evt) evt = evt.changedTouches[0];
    }
    return {
        x: evt.pageX,
        y: evt.pageY
    };
}

$('.parent-scroll').on(mouseMoveEvent, function (e) {
    //e.preventDefault();
});

(function (window) {
    var l = 42,     // 滑块边长
        r = 10,        // 滑块半径
        w = 250,        // canvas宽度
        h = 120,        // canvas高度
        PI = Math.PI;
    var L = l + r * 2; // 滑块实际边长

    function getRandomNumberByRange(start, end) {
        return Math.round(Math.random() * (end - start) + start);
    }

    function createCanvas(width, height) {
        var canvas = createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    function createImg(onload) {
        var img = createElement('img');
        img.crossOrigin = "Anonymous";
        img.onload = onload;
        img.onerror = function () {
            img.src = getRandomImg();
        };
        img.src = getRandomImg();
        return img;
    }

    function createElement(tagName) {
        return document.createElement(tagName);
    }

    function addClass(tag, className) {
        tag.classList.add(className);
    }

    function removeClass(tag, className) {
        tag.classList.remove(className);
    }

    function getRandomImg() {
        return 'https://picsum.photos/300/150/?image=' + getRandomNumberByRange(0, 1084);
    }

    function _draw(ctx, operation, x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + l / 2, y);
        ctx.arc(x + l / 2, y - r + 2, r, 0, 2 * PI);
        ctx.lineTo(x + l / 2, y);
        ctx.lineTo(x + l, y);
        ctx.lineTo(x + l, y + l / 2);
        ctx.arc(x + l + r - 2, y + l / 2, r, 0, 2 * PI);
        ctx.lineTo(x + l, y + l / 2);
        ctx.lineTo(x + l, y + l);
        ctx.lineTo(x, y + l);
        ctx.lineTo(x, y);
        ctx.fillStyle = '#fff';
        ctx[operation]();
        ctx.beginPath();
        ctx.arc(x, y + l / 2, r, 1.5 * PI, 0.5 * PI);
        ctx.globalCompositeOperation = "xor";
        ctx.fill();
    }

    function sum(x, y) {
        return x + y;
    }

    function square(x) {
        return x * x;
    }

    var jigsaw = function () {
        function jigsaw(el, success, fail) {
            _classCallCheck(this, jigsaw);

            this.el = el;
            this.success = success;
            this.fail = fail;
        }

        _createClass(jigsaw, [{
            key: "init",
            value: function init() {
                this.initDOM();
                this.initImg();
                this.draw();
                this.bindEvents();
            }
        }, {
            key: "initDOM",
            value: function initDOM() {
                var canvas = createCanvas(w, h); // 画布
                var block = canvas.cloneNode(true); // 滑块
                var sliderContainer = createElement('div');
                var refreshIcon = createElement('div');
                var sliderMask = createElement('div');
                var slider = createElement('div');
                var sliderIcon = createElement('span');
                var text = createElement('span');

                block.className = 'block';
                sliderContainer.className = 'sliderContainer';
                refreshIcon.className = 'refreshIcon';
                sliderMask.className = 'sliderMask';
                slider.className = 'slider';
                sliderIcon.className = 'sliderIcon';
                text.innerHTML = '向右滑动滑块填充拼图';
                text.className = 'sliderText';

                var el = this.el;
                el.appendChild(canvas);
                el.appendChild(refreshIcon);
                el.appendChild(block);
                slider.appendChild(sliderIcon);
                sliderMask.appendChild(slider);
                sliderContainer.appendChild(sliderMask);
                sliderContainer.appendChild(text);
                el.appendChild(sliderContainer);

                this.canvas = canvas;
                this.block = block;
                this.sliderContainer = sliderContainer;
                this.refreshIcon = refreshIcon;
                this.slider = slider;
                this.sliderMask = sliderMask;
                this.sliderIcon = sliderIcon;
                this.text = text;
                this.canvasCtx = canvas.getContext('2d');
                this.blockCtx = block.getContext('2d');
            }
        }, {
            key: "initImg",
            value: function initImg() {
                var _this = this;

                var img = createImg(function () {
                    _this.canvasCtx.drawImage(img, 0, 0, w, h);
                    _this.blockCtx.drawImage(img, 0, 0, w, h);
                    var y = _this.y - r * 2 + 2;
                    var ImgData = _this.blockCtx.getImageData(_this.x, y, L, L);
                    _this.block.width = L;
                    _this.blockCtx.putImageData(ImgData, 0, y);
                });
                this.img = img;
            }
        }, {
            key: "draw",
            value: function draw() {
                // 随机创建滑块的位置
                this.x = getRandomNumberByRange(L + 10, w - (L + 10));
                this.y = getRandomNumberByRange(10 + r * 2, h - (L + 10));
                _draw(this.canvasCtx, 'fill', this.x, this.y);
                _draw(this.blockCtx, 'clip', this.x, this.y);
            }
        }, {
            key: "clean",
            value: function clean() {
                this.canvasCtx.clearRect(0, 0, w, h);
                this.blockCtx.clearRect(0, 0, w, h);
                this.block.width = w;
            }
        }, {
            key: "bindEvents",
            value: function bindEvents() {
                var _this2 = this;

                this.el.onselectstart = function () {
                    return false;
                };
                this.refreshIcon.onclick = function () {
                    _this2.reset();
                };

                var originX = void 0,
                    originY = void 0,
                    trail = [],
                    isMouseDown = false;
                this.sliderContainer.addEventListener(mouseDownEvent, function (e) {
                    var mouse = getMouseCoordinate.call(this, e);
                    originX = mouse.x, originY = mouse.y;
                    isMouseDown = true;
                    e.preventDefault();
                });
                this.sliderContainer.addEventListener(mouseMoveEvent, function (e) {
                    var mouse = getMouseCoordinate.call(_this2, e);
                    if (!isMouseDown) return false;
                    var moveX = mouse.x - originX;
                    var moveY = mouse.y - originY;
                    if (moveX < 0 || moveX + 38 >= w) return false;
                    _this2.slider.style.left = moveX + 'px';
                    var blockLeft = (w - 40 - 20) / (w - 40) * moveX;
                    _this2.block.style.left = blockLeft + 'px';

                    addClass(_this2.sliderContainer, 'sliderContainer_active');
                    _this2.sliderMask.style.width = moveX + 'px';
                    trail.push(moveY);
                    e.preventDefault();
                });
                this.sliderContainer.addEventListener(mouseUpEvent, function (e) {
                    if (!isMouseDown) return false;
                    isMouseDown = false;

                    var mouse = getMouseCoordinate.call(_this2, e);

                    e.preventDefault();
                    if (mouse.x == originX) return false;
                    removeClass(_this2.sliderContainer, 'sliderContainer_active');
                    _this2.trail = trail;

                    var _verify = _this2.verify(),
                        spliced = _verify.spliced,
                        TuringTest = _verify.TuringTest;

                    if (spliced) {
                        if (TuringTest) {
                            addClass(_this2.sliderContainer, 'sliderContainer_success');
                            _this2.success && _this2.success();
                        } else {
                            addClass(_this2.sliderContainer, 'sliderContainer_fail');
                            _this2.text.innerHTML = '再试一次';
                            _this2.reset();
                        }
                    } else {
                        addClass(_this2.sliderContainer, 'sliderContainer_fail');
                        _this2.fail && _this2.fail();
                        setTimeout(function () {
                            _this2.reset();
                        }, 1000);
                    }
                });
            }
        }, {
            key: "verify",
            value: function verify() {
                var arr = this.trail; // 拖动时y轴的移动距离
                var average = arr.reduce(sum) / arr.length; // 平均值
                var deviations = arr.map(function (x) {
                    return x - average;
                }); // 偏差数组
                var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // 标准差
                var left = parseInt(this.block.style.left);
                return {
                    spliced: Math.abs(left - this.x) < 10,
                    TuringTest: average !== stddev // 只是简单的验证拖动轨迹，相等时一般为0，表示可能非人为操作
                };
            }
        }, {
            key: "reset",
            value: function reset() {
                this.sliderContainer.className = 'sliderContainer';
                this.slider.style.left = 0;
                this.block.style.left = 0;
                this.sliderMask.style.width = 0;
                this.clean();
                this.img.src = getRandomImg();
                this.draw();
            }
        }]);

        return jigsaw;
    }();

    window.jigsaw = {
        "init": function init(element, success, fail) {
            new jigsaw(element, success, fail).init();
        }
    };
})(window);