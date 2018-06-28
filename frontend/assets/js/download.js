$(document).ready(function () {

//    showQR(MY_API_URL + 'user_register.php?invited=' + getUserId());

    if (getPhoneNumber() != '') {
        $('.img-resource[item_type=username]').html(getPhoneNumber().substr(7));
    }
});
var isMouseDown = false;
var mouseTmr = 0;
window.onload = function () {
    showQR(MY_API_URL + 'user_register.php?invited=' + getUserId());

    drawCanvasImg();
    $('#main-canvas').on(mouseDownEvent, function (object) {
        clearTimeout(mouseTmr);
        isMouseDown = true;
        mouseTmr = setTimeout(function () {
            if (isMouseDown)
                save_panel()
        }, 1000);
    });
    $('#main-canvas').on(mouseUpEvent, function (object) {
        clearTimeout(mouseTmr);
        isMouseDown = false;
    });
}

function getPos(pos, status) {

    var ww = 621;
    var hh = 1104;

    var scaleX = 375 / ww;
    var scaleY = 675 / hh;
    if (status != undefined) status = false;
    // if (scaleX < scaleY) scaleX = scaleY;
    var centerX = Math.floor((pos[0] + pos[2] / 2) / scaleX);
    var centerY = Math.floor((pos[1] + pos[3] / 2) / scaleY);
    return ({
        cx: centerX,
        cy: centerY,
        left: Math.floor(centerX - pos[2] / 2 / scaleX),
        top: Math.floor(centerY - pos[3] / 2 / scaleY),
        width: Math.floor(pos[2] / scaleX),
        height: Math.floor(pos[3] / scaleY)
    });
}

function drawCanvasImg() {
    var canvas = document.getElementById('main-canvas');
    var arr_pos = {
        'img_bg': [0, 0, 375, 667],
        'img_main_bg': [35, 28, 305, 535],
        'img_top_bg': [70, 54, 237, 190],
        'img_logo_icon': [158, 74, 60, 60],
        'item_1': [111, 264, 11, 11],
        'item_2': [111, 295, 11, 11],
        'item_3': [111, 326, 11, 11],
        'item_4': [111, 357, 11, 11],
        'qr_container': [128, 389, 120, 120],
        'qr_content': [136, 397, 104, 104],
        'user_avatar': [176, 438, 24, 24],
        'img_button_bg': [125, 596, 130, 41],
        'txt_user_name': [167, 149, 42, 28],
        'txt_user_desc': [124, 180, 129, 20],
        'txt_item_1': [131, 258, 113, 20],
        'txt_item_2': [131, 289, 123, 20],
        'txt_item_3': [131, 320, 134, 20],
        'txt_item_4': [131, 351, 134, 20],
        'qr_desc': [97, 527, 180, 17],
        'btn_name': [137, 604, 96, 20]
    };
    var arr_ctrl = {
        'img_bg': $('#img-bg')[0],
        'img_main_bg': $('#img-main-bg')[0],
        'img_top_bg': $('#img-top-bg')[0],
        'img_logo_icon': $('#img-logo-icon')[0],
        'item_1': $('#img-round')[0],
        'item_2': $('#img-round')[0],
        'item_3': $('#img-round')[0],
        'item_4': $('#img-round')[0],
        'qr_content': $('#qr-view').find('canvas')[0],
        'user_avatar': $('#img-user-avatar')[0],
        'img_button_bg': $('#img-button-bg')[0],
        'txt_user_name': $('.img-resource[item_type=username]'),
        'txt_user_desc': $('.img-resource[item_type=user_description]'),
        'txt_item_1': $('.img-resource[item_type=item_1]'),
        'txt_item_2': $('.img-resource[item_type=item_2]'),
        'txt_item_3': $('.img-resource[item_type=item_3]'),
        'txt_item_4': $('.img-resource[item_type=item_4]'),
        'qr_desc': $('.img-resource[item_type=qr_description]'),
        'btn_name': $('.img-resource[item_type=btn_name]')
    };
    $('.main-content').css('background', 'black');
    $('body').css('background', 'black');
    var pp = getPos(arr_pos.img_bg);

    var _scale_x = pp.width / window.innerWidth;
    var _scale_y = pp.height / window.innerHeight;
    var _scale = _scale_x / _scale_y;
    var _cy = pp.cy;
    var _cx = pp.cx;

    canvas.width = pp.width;
    canvas.height = pp.height;

    var ctx = canvas.getContext('2d');

    ctx.rect(pp.left, Math.floor(_cy - (_cy - pp.cy + pp.height / 2) * _scale), pp.width, Math.floor(pp.height*(_scale+0.01)));
    ctx.clip();
    ctx.fillRect(0, 0, pp.width, pp.height);

    ctx.drawImage(arr_ctrl.img_bg, pp.left, _cy - (_cy - pp.cy + pp.height / 2) * _scale, pp.width, pp.height);

    pp = getPos(arr_pos.img_main_bg);
    ctx.drawImage(arr_ctrl.img_main_bg, pp.left, _cy - (_cy - pp.cy + pp.height / 2) * _scale, pp.width, pp.height * _scale);

    pp = getPos(arr_pos.img_top_bg);
    ctx.drawImage(arr_ctrl.img_top_bg, pp.left, _cy - (_cy - pp.cy + pp.height / 2) * _scale, pp.width, pp.height * _scale);

    pp = getPos(arr_pos.img_button_bg);
    ctx.drawImage(arr_ctrl.img_button_bg, pp.left, _cy - (_cy - pp.cy + pp.height / 2) * _scale, pp.width, pp.height * _scale);

    pp = getPos(arr_pos.item_1);
    ctx.drawImage(arr_ctrl.item_1, pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);

    pp = getPos(arr_pos.item_2);
    ctx.drawImage(arr_ctrl.item_2, pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);

    pp = getPos(arr_pos.item_3);
    ctx.drawImage(arr_ctrl.item_3, pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);

    pp = getPos(arr_pos.item_4);
    ctx.drawImage(arr_ctrl.item_4, pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);

    pp = getPos(arr_pos.qr_container);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#e0e0e0';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);
    ctx.strokeRect(pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);

    pp = getPos(arr_pos.qr_content);
    ctx.fillStyle = '#a0a0a0';
    ctx.fillRect(pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);
    ctx.drawImage(arr_ctrl.qr_content,
        pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);

    pp = getPos(arr_pos.user_avatar);
    ctx.lineWidth = 2;
    ctx.fillStyle = '#a0a0a0';
    ctx.strokeStyle = '#ffffff';
    ctx.fillRect(pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);
    ctx.strokeRect(pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);
    ctx.drawImage(arr_ctrl.user_avatar,
        pp.left, _cy - (_cy - pp.cy) * _scale - pp.height / 2, pp.width, pp.height);

    pp = getPos(arr_pos.img_logo_icon);
    arr_ctrl.qr_content.width = pp.width;
    arr_ctrl.qr_content.height = pp.height;
    var ctx1 = arr_ctrl.qr_content.getContext('2d');
    ctx1.clearRect(0, 0, pp.width, pp.height);
    ctx1.arc(pp.width / 2, pp.width / 2, pp.width / 2, 0, 2 * Math.PI);
    ctx1.clip();
    ctx1.drawImage(arr_ctrl.img_logo_icon, 0, 0, pp.width, pp.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#e0e0e0';
    ctx.arc(pp.cx, _cy - (_cy - pp.cy) * _scale,
        pp.width * _scale / 2 + 2,
        0, 2 * Math.PI);
    ctx.stroke();
    ctx.drawImage(arr_ctrl.qr_content,
        _cx - pp.width * _scale / 2, _cy - (_cy - pp.cy + pp.width / 2) * _scale,
        pp.width * _scale,
        pp.width * _scale);

    pp = getPos(arr_pos.txt_user_name);
    ctx.font = Math.floor(pp.height * .7) + 'px Arial';
    ctx.fillStyle = '#505050';
    ctx.strokeStyle = '#505050';
    ctx.lineWidth = .5;
    ctx.textAlign = 'center';
    ctx.strokeText(arr_ctrl.txt_user_name.html(), pp.cx, _cy - (_cy - pp.cy) * _scale);
    ctx.fillText(arr_ctrl.txt_user_name.html(), pp.cx, _cy - (_cy - pp.cy) * _scale);

    pp = getPos(arr_pos.txt_user_desc);
    ctx.font = Math.floor(pp.height  * .7) + 'px Arial';
    ctx.strokeText(arr_ctrl.txt_user_desc.html(), pp.cx,_cy - (_cy - pp.cy) * _scale);
    ctx.fillText(arr_ctrl.txt_user_desc.html(), pp.cx, _cy - (_cy - pp.cy) * _scale);

    pp = getPos(arr_pos.txt_item_1);
    ctx.font = Math.floor(pp.height * .7) + 'px Arial';
    ctx.strokeText(arr_ctrl.txt_item_1.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);
    ctx.fillText(arr_ctrl.txt_item_1.html(), pp.cx,_cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);

    pp = getPos(arr_pos.txt_item_2);
    ctx.font = Math.floor(pp.height * .7) + 'px Arial';
    ctx.strokeText(arr_ctrl.txt_item_2.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);
    ctx.fillText(arr_ctrl.txt_item_2.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);

    pp = getPos(arr_pos.txt_item_3);
    ctx.font = Math.floor(pp.height * .7) + 'px Arial';
    ctx.fillText(arr_ctrl.txt_item_3.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);
    ctx.strokeText(arr_ctrl.txt_item_3.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);

    pp = getPos(arr_pos.txt_item_4);
    ctx.font = Math.floor(pp.height * .7) + 'px Arial';
    ctx.strokeText(arr_ctrl.txt_item_4.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);
    ctx.fillText(arr_ctrl.txt_item_4.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);

    pp = getPos(arr_pos.qr_desc);
    ctx.font = Math.floor(pp.height * .7) + 'px Arial';
    ctx.strokeText(arr_ctrl.qr_desc.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);
    ctx.fillText(arr_ctrl.qr_desc.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);

    pp = getPos(arr_pos.btn_name);
    ctx.font = Math.floor(pp.height * .7) + 'px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.strokeText(arr_ctrl.btn_name.html(), pp.cx,_cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);
    ctx.fillText(arr_ctrl.btn_name.html(), pp.cx, _cy - (_cy - pp.cy) * _scale + Math.floor(pp.height)*0.25);
}

function b64toBlob(b64Data, contentType, sliceSize) {

    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    //var byteCharacters = atob(b64Data);//IE10+
    var byteCharacters = Base64.decode(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

function save_panel() {
    var save_canvas = $('#main-canvas')[0];
    var spiriteURL = save_canvas.toDataURL();
    var spData = spiriteURL.substring(22);
    $.ajax({
        url: REMOTE_API_URL + "api/uploadImgData",
        type: "POST",
        data: {'imageData': spData},
        success: function (result) {
            result = JSON.parse(result);
            if (result.status) {
                var elem = document.createElement('a');
                elem.href = result.data;
                elem.download = "code.png";
                elem.innerHTML = "Click here to download the file";
                document.body.appendChild(elem);
                elem.click();
                setTimeout(function () {
                    document.body.removeChild(elem);
                    window.URL.revokeObjectURL(elem.href);
                }, 100);
                console.log(result);
            } else
                window.alert(result['data']);
        }
    });
}
