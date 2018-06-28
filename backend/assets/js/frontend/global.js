/**
 * Created by Administrator on 6/12/2017.
 */

var registerBtn = $('#sh_register_btn');
var exitBtn = $('#sh_exit_btn');
var returnBtn = $('#sh_return_btn');


var clickPenX = new Array();
var clickPenY = new Array();
var clickDrag = new Array();
var paintPen;
var penCtx;

function addClickForPenCanvas(x, y, dragging) {
    clickPenX.push(x);
    clickPenY.push(y);
    clickDrag.push(dragging);
}

function redrawForPenCanvas() {

    penCtx.clearRect(0, 0, penCtx.canvas.width, penCtx.canvas.height); // Clears the canvas

    penCtx.strokeStyle = "#df4b26";
    penCtx.lineJoin = "round";
    penCtx.lineWidth = 5;

    for (var i = 0; i < clickPenX.length; i++) {
        penCtx.beginPath();
        if (clickDrag[i] && i) {
            penCtx.moveTo(clickPenX[i - 1], clickPenY[i - 1]);
        } else {
            penCtx.moveTo(clickPenX[i] - 1, clickPenY[i]);
        }
        penCtx.lineTo(clickPenX[i], clickPenY[i]);
        penCtx.closePath();
        penCtx.stroke();
    }
}

function mouseClickFunc(event) {
    var touchobj = event;
    if (isMobile && ('changedTouches' in touchobj)) touchobj = event.changedTouches[0];
    addClickForPenCanvas(Math.floor(touchobj.clientX), Math.floor(touchobj.clientY));
    redrawForPenCanvas();
    paintPen = true;
}

function mouseMoveFunc(event) {
    if (paintPen) {
        var touchobj = event;
        if (isMobile && ('changedTouches' in touchobj)) touchobj = event.changedTouches[0];
        addClickForPenCanvas(Math.floor(touchobj.clientX), Math.floor(touchobj.clientY), true);
        redrawForPenCanvas();
    }
}

function mouseUpFunc(event) {

    paintPen = false;

}

registerBtn.mouseover(function () {
    registerBtn.css({
        "background": "url(" + baseURL + "assets/images/taiyang/home/login_hover.png) no-repeat",
        'background-size': '100% 100%'
    });
});
registerBtn.mouseout(function () {
    registerBtn.css({
        "background": "url(" + baseURL + "assets/images/taiyang/home/login.png) no-repeat",
        "background-size": "100% 100%"
    });
});
exitBtn.mouseover(function () {
    exitBtn.css({
        "background": "url(" + baseURL + "assets/images/taiyang/home/exit_hover.png) no-repeat",
        "background-size": "100% 100%"
    });
});
exitBtn.mouseout(function () {
    exitBtn.css({
        "background": "url(" + baseURL + "assets/images/taiyang/home/exit.png) no-repeat",
        "background-size": "100% 100%"
    });
});
returnBtn.mouseover(function () {
    returnBtn.css({
        "background": "url(" + baseURL + "assets/images/taiyang/base/back_hover.png) no-repeat",
        "background-size": "100% 100%"
    });
});
returnBtn.mouseout(function () {
    returnBtn.css({
        "background": "url(" + baseURL + "assets/images/taiyang/base/back.png) no-repeat",
        "background-size": "100% 100%"
    });
});
var tmr_tools=0;
function showTools(){
    clearTimeout(tmr_tools);
    $('#tool_arrow').fadeOut('middle');
    $('#tools_bottom').fadeIn('middle');
}
function hideTools(delay_time){
    clearTimeout(tmr_tools);
    var toolset = $('#toolset_1 .toolset');
    var isUsing = false;
    for(var i=0; i<toolset.length;i++){
        var status = $(toolset[i]).attr('sel');
        if(status =='1') {
            isUsing = true;
            break;
        }
    }
    if(!isUsing) {
        tmr_tools = setTimeout(function () {
            $('#toolset_1').fadeOut('middle');
            $('#tools_bottom').fadeOut('middle');
            $('#tool_arrow').fadeIn('middle');
        }, delay_time);
    }
}
$(function () {

    if (CONF.loginUserId == "")
        $('#tools_bottom').hide();

    $('#advertise-header').owlCarousel({
        autoPlay: 8000,
        stopOnHover: true,
        singleItem: true,
        loop: true,
        // items: 1,
        //navigation:true,
        //navigationText:['<','>'],
        // pagination:true
    });

    var tools_bottom = $('#tools_bottom').children();
    // process bottom main button's actions
    if (tools_bottom.length === 4) ///This is tools for teacher
    {
        for (var i = 0; i < 4; i++) {
            tools_bottom[i].style.background = 'url(' + baseURL +
                'assets/images/taiyang/home/tool-' + (i + 1) + '0.png)';
            tools_bottom[i].setAttribute('tool_id', i + 1);
        }
    } else {

        /********code by PMS ***********/
        tools_bottom[0].style.background = 'url(' + baseURL + 'assets/images/taiyang/home/tool-10.png)';
        tools_bottom[0].setAttribute('tool_id', 1);

        tools_bottom[1].style.backgroundImage = 'url(' + baseURL + 'assets/images/taiyang/home/tool-50.png)';
        tools_bottom[1].setAttribute('tool_id', 5);

        tools_bottom[2].style.backgroundImage = 'url(' + baseURL + 'assets/images/taiyang/home/tool-40.png)';
        tools_bottom[2].setAttribute('tool_id', 4);

        $('#toolset_1').css('left', 'calc(21vw)');

    }

    var delay_arrow_time=10000;

    $('#tool_arrow').on('click',function () {
       showTools();
    });

    $('#tools_bottom .toolset').on('mouseover', function () {
        var id = this.getAttribute('tool_id');
        this.style.background = 'url(' + baseURL +
            'assets/images/taiyang/home/tool-' + (id) + '0-hover.png)';
        showTools();
    });

    $('#tools_bottom .toolset').on('mouseout', function () {
        var id = this.getAttribute('tool_id');
        if (!(id == '1' && $('#toolset_1').css('display') != 'none'))
            this.style.background = 'url(' + baseURL +
                'assets/images/taiyang/home/tool-' + (id) + '0.png)';
        hideTools(500);
    });

    $('#tools_bottom .toolset').on('click', function () {
        showTools();
        var id = this.getAttribute('tool_id');
        for (var i = 0; i < 5; i++) {
            var canvas = document.getElementsByTagName('canvas')[0];
            var camera = document.getElementById('camera-view');
            if (canvas != undefined && canvas != camera)
                canvas.remove();
        }
        switch (id) {
            case '1':
                if ($('#toolset_1').css('display') == 'none') {
                    $('#toolset_1').show('fast');
                    // $('#toolset_1').toggle(function () {
                    //
                    // });
                } else {
                    // $('#toolset_1 .toolset').css({'background-color': 'transparent'});
                    // $('#toolset_1').toggle(function () {
                    //
                    // });
                    $('#toolset_1 .toolset').css({'background-color': 'transparent'});
                    $('#toolset_1 .toolset').attr('sel', '0');

                    $('#toolset_1').hide('fast');
                    $('#tools_bottom .toolset[tool_id=1]').trigger('mouseout');
                }
                break;
            case '2':
                closeToolsets();
                location.href = baseURL + "coursewares/mylesson";
                break;
            case '3':
                closeToolsets();
                location.href = baseURL + "community/index";
                break;
            case '4':
                closeToolsets();
                location.href = baseURL + "home/index";
                break;
            case '5':
                closeToolsets();
                location.href = baseURL + "community/index";
                break;
        }
    });


    // process toolset1 subbutton's actions
    $('#toolset_1').css({
        'background': 'url(' + baseURL + 'assets/images/taiyang/home/tool-10-bg.png)'
    });

    tools_bottom = $('#toolset_1').children();
    for (var i = 0; i < 6; i++) {
        tools_bottom[i].style.background = 'url(' + baseURL +
            'assets/images/taiyang/home/tool-1' + (i + 1) + '.png)';
        tools_bottom[i].setAttribute('tool_id', i + 1);
    }

    $('#toolset_1 .toolset').on('mouseover', function () {
        var id = this.getAttribute('tool_id');
        if (this.getAttribute('sel') != '1')
            this.style.backgroundColor = '#00c1f5';
        showTools();
    });
    $('#toolset_1 .toolset').on('mouseout', function () {
        var id = this.getAttribute('tool_id');
        if (this.getAttribute('sel') != '1')
            this.style.backgroundColor = 'transparent';
        hideTools(500);
    });
    // $('#toolset_1 .toolset').on('click', function () {
    //
    // });

    $('.dice-panel img').on('click', function () {
        playDice(parseInt($(this).attr('item_type')));
        showTools();
    });

    // $('.audio-panel img').on('click', function () {
    //     // audioRecord(this);
    // });

    // $('.photo-panel #camera-view').on('click', function () {
    //     $('#play').trigger('click');
    // })


    // process background click event handler
    $('body').on('click', function (object) {
        return;
        if (object.target == $('#tools_bottom .toolset')[0]) return;
        for (var i = 0; i < 6; i++) {
            if (object.target == $('#toolset_1 .toolset')[i]) return;
        }


        if ($('#toolset_1').css('display') != 'none')
            $('#tools_bottom .toolset[tool_id=1]').trigger('click');

//            console.log("triggered");
//                $('#toolset_1').toggle(function () {
//                    $('#toolset_1').hide();
//                    // $('#toolset_1 .toolset').css({'background-color': 'transparent'});
//                    // $('#toolset_1 .toolset').attr('sel','0');
//                });
    })

});

function clickSubToolset(element){

    $('#toolset_1 .toolset').css({'background-color': 'transparent'});
    $('#toolset_1 .toolset').attr('sel', '0');

    var id = element.getAttribute('tool_id');

    if ($(element).attr('onclick') != 'closeToolsets()') {
        $(element).attr('onclick', 'closeToolsets()');
    } else {
        $(element).attr('onclick', 'clickSubToolset(this)');
        closeToolsets();
        return;
    }
    showTools();

    element.style.backgroundColor = '#0082a5';
    element.setAttribute('sel', '1');
    $('#main-toolset-function>div').hide();
    $('#main-toolset-function').show('fast');
    if (id == '1') $('#main-toolset-function').css({background: 'rgba(0,0,0,0)'});
    else $('#main-toolset-function').css({background: 'rgba(0,0,0,.5)'});
    switch (id) {
        case '1':
            clearTimeout(CONF.tmrID[0]);

            CONF.tmrID[0] = setTimeout(function () {
                $('.pen-panel').show();

                clickPenX = new Array();
                clickPenY = new Array();
                clickDrag = new Array();

                var canvasDiv = document.getElementById('pen-canvas-wrapper');
                var canvas = document.createElement('canvas');
                canvas.setAttribute('width', window.innerWidth);
                canvas.setAttribute('height', window.innerHeight);
                canvas.setAttribute('id', 'pen_canvas');
                canvasDiv.appendChild(canvas);
                penCtx = canvas.getContext("2d");

                if (isMobile) {
                    window.addEventListener('touchmove', mouseMoveFunc, true);
                    window.addEventListener('touchstart', mouseClickFunc, true);
                    window.addEventListener('touchend', mouseUpFunc, true);
                } else {
                    window.addEventListener('mousemove', mouseMoveFunc, true);
                    window.addEventListener('mousedown', mouseClickFunc, true);
                    window.addEventListener('mouseup', mouseUpFunc, true);
                }

            }, 10);
            break;
        case '6':
            $('.photo-panel').show();
            $('#play').trigger('click');
            break;
        case '2':
            $('.paint-panel').show();

            $('.paint-panel').find('iframe').attr('src', '');
            setTimeout(function () {
                $('.paint-panel').find('iframe').attr('src', baseURL + 'assets/js/toolset/paint-panel.html');
            }, 300);

            break;
        case '3':
            var panel = $('.dice-panel');
            panel.show();
            panel.find('img').attr('item_type', '2');
            panel.find('img').trigger('click');
            break;
        case '4':
            var panel = $('.dice-panel');
            panel.show();
            panel.find('img').attr('item_type', '1');
            panel.find('img').trigger('click');
            break;
        case '5':
            var panel = $('.audio-panel');
            panel.show();
            CONF.isRecording = 555;
            audioRecord($('.audio-panel').find('img')[0]);
            // panel.find('img').trigger('click');
            break;
    }
}

$('#main-toolset-function .pen-panel canvas').on('mousedown', function (e) {
    var posx = e.offsetX;
    var posy = e.offsetY;

});

function audioRecord(element) {
    clearInterval(CONF.tmrID[0]);
    if (CONF.isRecording == 555) {
        CONF.isRecording = false;
        $(element).attr('src', baseURL + 'assets/images/taiyang/toolset/audio/0.png');
        $('.btn_audio_play').hide();
        $('.btn_audio_download').hide();
        recordStop();
        return;
    }
    if (CONF.isRecording) {
        CONF.isRecording = false;
        $(element).attr('src', baseURL + 'assets/images/taiyang/toolset/audio/0.png');
        $('.btn_audio_play').show();
        $('.btn_audio_download').show();
        recordStop();
    } else {
        //hide play and download button
        $('.btn_audio_play').hide();
        $('.btn_audio_download').hide();
        CONF.isRecording = true;
        CONF.progress = 0;
        CONF.tmrID[0] = setInterval(function () {
            CONF.progress++;
            if (CONF.progress > 3) CONF.progress = 0;
            $(element).attr('src', baseURL + 'assets/images/taiyang/toolset/audio/'
                + CONF.progress + '.png');
        }, 300);
        recordStart();
    }
}

function playDice(type) {
    var str = 'dice';
    if (type == 1) str = 'hand';
    $('.dice-panel img').attr('src', baseURL + 'assets/images/taiyang/toolset/' + str + '/play.gif');
    setTimeout(function () {
        var num = parseInt(Math.random() * type * 3) + 1;
        $('.dice-panel img').attr('src', baseURL + 'assets/images/taiyang/toolset/' + str + '/' + num + '.png');
    }, 1000);
}

function closeToolsets() {
    $('#stopAll').trigger('click');

    CONF.isRecording = 555;
    audioRecord($('.audio-panel').find('img')[0]);

    $('#main-toolset-function').hide('fast');

    $('#toolset_1 .toolset').css({'background-color': 'transparent'});
    $('#toolset_1 .toolset').attr('sel', '0');
    $('#toolset_1 .toolset').attr('onclick','clickSubToolset(this)');

    var pen_canvas = document.getElementById('pen_canvas');
    if (pen_canvas != null)
        pen_canvas.remove();
}

function setSessionLessons(data) {
    var saveKey = "lessons";
    var tmp = localStorage.getItem(saveKey);
    if (tmp == undefined) tmp = '[]';
    tmp = JSON.parse(tmp);
    if (data == undefined) return tmp;
    localStorage.setItem(saveKey, JSON.stringify(data));
    return 'ok';
}

function setSessionCoursewares(data) {
    var saveKey = "coursewares";
    var tmp = localStorage.getItem(saveKey);
    if (tmp == undefined) tmp = '[]';
    tmp = JSON.parse(tmp);
    if (data == undefined) return tmp;
    localStorage.setItem(saveKey, JSON.stringify(data));
    return 'ok';
}

function updateSessionCoursewares(lessonId, ncwId, order) {
    // order==0 => delete ncwId
    // order==1 => move next;
    // order==-1 => move prev;

    var saveKey = 'lessons';
    var tmp = localStorage.getItem(saveKey);
    var l_idx = 0, m_idx = 0;

    if (tmp == undefined) tmp = '[]';
    tmp = JSON.parse(tmp);

    for (var i = 0; i < tmp.length; i++) {
        if (tmp[i].title_id == lessonId) {
            l_idx = i;
            break;
        }
    }

    var mediaInfos = JSON.parse(tmp[l_idx].media_infos);

    for (var i = 0; i < mediaInfos.length; i++) {
        if (mediaInfos[i] == ncwId) {
            m_idx = i;
            break;
        }
    }
    if (order == undefined) {
        mediaInfos[mediaInfos.length] = ncwId.toString();
    } else if (order == 0) {
        mediaInfos.splice(m_idx, 1);
    } else if (order < 0) {
        var s_idx = m_idx;
        var d_idx = s_idx - 1;
        if (d_idx >= 0) {
            var tmedia = mediaInfos[d_idx];
            mediaInfos[d_idx] = mediaInfos[s_idx];
            mediaInfos[s_idx] = tmedia;
        }
    } else if (order > 0) {
        var s_idx = m_idx;
        var d_idx = s_idx + 1;
        if (d_idx < mediaInfos.length) {
            var tmedia = mediaInfos[d_idx];
            mediaInfos[d_idx] = mediaInfos[s_idx];
            mediaInfos[s_idx] = tmedia;
        }
    }
    tmp[l_idx].media_infos = JSON.stringify(mediaInfos);
    localStorage.setItem(saveKey, JSON.stringify(tmp));
    return 'ok';
}

function setSessionConf(data) {
    var tmp = localStorage.getItem('global_conf');
    if (tmp == undefined) tmp = '[]';
    if (data == undefined) return JSON.parse(tmp);
    localStorage.setItem('global_conf', JSON.stringify(data));
    return 'ok';
}

function showContent(id) {
    window.open(baseURL + 'community/contentview/' + id, '_blank', 'menubar=no,width=680,height=680,status=no');
}

function showCourseware(itemId) {
    window.open(baseURL + "coursewares/view/" + (parseInt(itemId) - 1), '_blank', 'menubar=no,width=680,height=400,status=no');
}
