// login user
var reg_phone = '';
var reg_servant = '';
var verify_type = 0;
$(document).ready(function () {
    document.title = '';
    pageShopId = 0;
    if (getPhoneNumber() != '') {
        $('#phone_number').val(getPhoneNumber());
    }
    var normal_font_size = 'calc(4vw)';
    var edit_font_size = 'calc(4vw)';
    var active_btn_color = '#f6df52';
    $(document).tooltip();
    $('#phone_number').on('input focus change', function () {
        var phone_number = $('#phone_number').val().toString()
        if (phone_number == '')
            $('#phone_number').attr('style', 'font-size:' + normal_font_size)
        else
            $('#phone_number').attr('style', 'font-size:' + edit_font_size + ' !important;')
        if (phone_number.length != 11) {
            $('#phone_number').val(phone_number.substr(0, 11));
        }
    })

    // $('#phone_number').on('click', function () {
    //     var phone_number = $('#phone_number').val().toString()
    //     showNotifyAlert('请输入便利店手机号', 1, $('#phone_number').css('top'));
    // })

    $('#auth_code').on('input focus change', function () {
        var auth_code = $('#auth_code').val()
        if (auth_code == '')
            $('#auth_code').attr({'style': 'font-size:' + normal_font_size})
        else
            $('#auth_code').attr({'style': 'font-size:' + edit_font_size + ' !important;'})
        if (auth_code.length != 6) {
            $('#auth_code').val(auth_code.substr(0, 6));
        }
    })
    // $('#auth_code').on('click', function () {
    //     var auth_code = $('#auth_code').val().toString()
    //     showNotifyAlert('验证码应该6个字符', 1, $('#auth_code').css('top'))
    // })
    $('#servant_phone').on('input focus change', function () {
        var servant = $('#servant_phone').val().toString()
        if (servant == '')
            $('#servant_phone').attr({'style': 'font-size:' + normal_font_size})
        else
            $('#servant_phone').attr({'style': 'font-size:' + edit_font_size + ' !important;'})
        if (servant.length != 11) {
            $('#servant_phone').val(servant.substr(0, 11));
        }
    })
    // $('#servant_phone').on('click', function () {
    //     var servant = $('#servant_phone').val().toString()
    //     showNotifyAlert('业务员手机号不能一致便利店手机号', 1, $('#servant_phone').css('top'))
    // })
    $('#passwd').on('input focus change', function () {
        var passwd = $('#passwd').val().toString()
        if (passwd == '')
            $('#passwd').attr({'style': 'font-size:' + normal_font_size})
        else
            $('#passwd').attr({'style': 'font-size:' + edit_font_size + ' !important;'})
        if (passwd.length > 20) {
            $('#passwd').val(passwd.substr(0, 20));
        }
    })
    // $('#passwd').on('click', function () {
    //     var passwd = $('#passwd').val().toString()
    //     showNotifyAlert('密码应该6-20个字符', 1, $('#passwd').css('top'))
    //
    // })
    $('#old_passwd').on('input focus change', function () {
        var passwd = $('#old_passwd').val().toString()
        if (passwd == '')
            $('#old_passwd').attr({'style': 'font-size:' + normal_font_size})
        else
            $('#old_passwd').attr({'style': 'font-size:' + edit_font_size + ' !important;'})
        if (passwd.length > 20) {
            $('#old_passwd').val(passwd.substr(0, 20));
        }
    })
    // $('#old_passwd').on('click', function () {
    //     var passwd = $('#old_passwd').val().toString()
    //     showNotifyAlert('旧密码应该6-20个字符', 1, $('#old_passwd').css('top'))
    // })
    $('#confirm_passwd').on('input focus change', function () {
        var passwd = $('#confirm_passwd').val().toString()
        if (passwd == '')
            $('#confirm_passwd').attr({'style': 'font-size:' + normal_font_size + ' !important; padding-left:75px !important'})
        else
            $('#confirm_passwd').attr({'style': 'font-size:' + edit_font_size + ' !important; padding-left:75px !important'})
        if (passwd.length > 20) {
            $('#confirm_passwd').val(passwd.substr(0, 20));
        }
    })
    // $('#confirm_passwd').on('click', function () {
    //     var passwd = $('#confirm_passwd').val().toString()
    //     showNotifyAlert('确认密码应该一致密码', 1, $('#confirm_passwd').css('top'))
    // })
    $('input').on('input change click', function () {

        var phone = $('#phone_number').val() != undefined ? ($('#phone_number').val()).length : 0
        var servant = ($('#servant_phone').val() != undefined ) ? ($('#servant_phone').val()).length : 0
        var phone_num = $('#phone_number').val() != undefined ? ($('#phone_number').val()) : 0
        var servant_num = ($('#servant_phone').val() != undefined ) ? ($('#servant_phone').val()) : 0
        var auth = $('#auth_code').val() != undefined ? ($('#auth_code').val()).length : 0
        var old_passwd = ($('#old_passwd').val() != undefined) ? ($('#old_passwd').val()) : ''
        var passwd = ($('#passwd').val() != undefined) ? ($('#passwd').val()) : ''
        var cpasswd = $('#confirm_passwd').val() != undefined ? ($('#confirm_passwd').val()) : ''
        if (phone == 11) {
            $('#confirm_login').attr({onclick: 'OnLogin()', style: 'background:' + active_btn_color})
        }
        else {
            $('#confirm_login').attr({onclick: '', style: 'background:darkgrey'})
        }

        if (phone == 11 && auth == 6) {
            $('#confirm_verify').attr({onclick: 'OnNext()', style: 'background:' + active_btn_color})
        } else {
            $('#confirm_verify').attr({onclick: '', style: 'background:darkgrey'})
        }

        // if (passwd.length >= 6 && passwd == cpasswd) {
        //     $('#confirm_reset_pwd').attr({onclick: 'OnResetPassword()', style: 'background:#38abff'})
        // } else {
        //     $('#confirm_reset_pwd').attr({onclick: '', style: 'background:darkgrey'})
        // }
        //
        // if (old_passwd.length >= 6 && passwd.length >= 6 && passwd == cpasswd && old_passwd != passwd) {
        //     $('#my_renew_pwd').attr({onclick: 'OnRenewPassword()', style: 'background:#38abff'})
        // } else {
        //     $('#my_renew_pwd').attr({onclick: '', style: 'background:darkgrey;'})
        // }
        // console.log(servant_num)
        if (phone == 11 && auth == 6 && phone_num != servant_num &&
            (servant == 0 || servant == 11)) {
            $('#confirm_register').attr({onclick: 'OnRegister()', style: 'background:' + active_btn_color})
        } else {
            $('#confirm_register').attr({onclick: '', style: 'background:darkgrey;'})
        }
        // console.log(phone);
        // $('#reg_logo').removeClass('reg_logo');
        // $('#reg_logo').addClass('reg_logo_small');
        //if (DetectIOSDevice() == 'iphone') $('#notification_alert').css({'bottom': '250px'})
        setTimeout(function () {
//            $('.ui-tooltip.ui-corner-all').show();
        }, 500);
        //$(this).focus();
    })

    $('#main_body_panel').on('click', function () {

        $('#reg_logo').removeClass('reg_logo_small');
        $('#reg_logo').addClass('reg_logo');
        clearTimeout(app_data.notifyTimer);
        $('.ui-tooltip.ui-corner-all').hide();
        $('#notification_alert_bar').hide();

    });

    setTimeout(function () {
        $('input').trigger('change');
        $('#main_body_panel').trigger('click');
    }, 500);

})

function OnLogin() {
// first, send login request to server
// second, when receive response, if successful then SUCCESS else FAIL
// third, store login result to sessionStorage
    var phone_number = $('#phone_number').val();
    // var password = $('#passwd').val();

    if (phone_number == "") {
        showNotifyAlert('手机号码不能为空');
        return;
    }
    if (phone_number.length != 11) {
        showNotifyAlert('手机号码不正确');
        return;
    }
    // if (password.length < 6 || password.length > 20) {
    //     showNotifyAlert('密码不正确');
    //     return;
    // }
    sendLoginRequest(phone_number, '', 1);
}

// register user
function OnRegister() {
    if (!confirm_verifyPhone()) return;

    // var passwd = $('#passwd').val();
    // var confirm_passwd = $('#confirm_passwd').val();
    // if (passwd == "") {
    //     showNotifyAlert('密码不能为空');
    //     return;
    // }
    //
    // if (passwd.length < 6 || passwd.length > 20) {
    //     showNotifyAlert('密码格式错误！');
    //     return;
    // }

    // if (passwd != confirm_passwd) {
    //     showNotifyAlert('确认密码错误');
    //     return;
    // }

// check the availability of the servant's mobile number
    //var servant_phone = $('#servant_phone').val();
    var servant_phone = invitedNumber;
    if (servant_phone == undefined)
        servant_phone = '';

    var phone_number = $('#phone_number').val();

    // $('#custom-scroll').attr('phone', phone_number);
    // // $('#custom-scroll').attr('passwd', passwd);
    // $('#custom-scroll').attr('servant', servant_phone);
    //
    reg_phone = phone_number;
    reg_servant = servant_phone;
    verify_type = 'reg';
    sendRegisterRequest(reg_phone, '', reg_servant);
    // $('.parent-scroll').fadeIn('fast');
}

// check phone verify code
function confirm_verifyPhone() {
// if (app_data.timerID == undefined) {
//     showNotifyAlert('你没有发短信');
//     return false;
// }

    restoreSMSButton();

    var auth_code = $('#auth_code').val();
    if (auth_code != app_data.sms_code || app_data.sms_code == "") {
        showNotifyAlert('验证码错误');
        return false;
    }
    return true;
}

// reset password
function OnResetPassword() {
    if (!getRegisterStatus()) {
        showNotifyAlert('手机号码错误！');
        return;
    }
    app_data.phone_num = getPhoneNumber();
    if (app_data.phone_num == undefined || app_data.phone_num.length != 11) {
        showNotifyAlert('手机号码错误！');
        return;
    }

    var password = $('#passwd').val();
    var confirm_password = $('#confirm_passwd').val();

    if (password == "") {
        showNotifyAlert('密码不能为空！');
        return;
    }

    if (password.length < 6 || password.length > 20) {
        showNotifyAlert('密码格式错误！');
        return;
    }

    if (password != confirm_password) {
        showNotifyAlert('确认密码错误！');
        return;
    }

    sendSetforgetPassword(app_data.phone_num, password);
}

// reset password
function OnRenewPassword() {
    app_data.phone_num = getPhoneNumber();
    if (app_data.phone_num == undefined || app_data.phone_num.length != 11) {
        showNotifyAlert('手机号码错误！');
        return;
    }

    var password = $('#passwd').val();
    var confirm_password = $('#confirm_passwd').val();
    var old_password = $('#old_passwd').val();

    if (old_password == "") {
        showNotifyAlert('旧密码不能为空！');
        return;
    }

    if (old_password.length < 6 || old_password.length > 20) {
        showNotifyAlert('旧密码格式错误！');
        return;
    }

    if (password == "") {
        showNotifyAlert('密码不能为空！');
        return;
    }

    if (password.length < 6 || password.length > 20) {
        showNotifyAlert('密码格式错误！');
        return;
    }

    if (password != confirm_password) {
        showNotifyAlert('确认密码错误！');
        return;
    }

    sendSetforgetPassword(app_data.phone_num, password, old_password);
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

/*
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

$('#custom-scroll').on(mouseDownEvent, function (e) {
    var mouse = getMouseCoordinate.call(this, e);
    var thumb = $('.scroll-thumb')[0];
    var pos = mouse.x;
    if (pos > thumb.offsetLeft - thumb.offsetWidth / 2 &&
        pos < thumb.offsetLeft + thumb.offsetWidth / 2) {
        isScrolling = true;
    } else {
        $(thumb).css({left: scrollRange[0] + '%'})
    }
});
$('#custom-scroll').on(mouseUpEvent, function (e) {
    isScrolling = false;
    var mouse = getMouseCoordinate.call(this, e);
    var thumb = $('.scroll-thumb')[0];
    var pos = mouse.x;
    pos = (pos / this.clientWidth * 100).toFixed(1);
    if (pos < scrollRange[2]) {
        $(thumb).css({left: scrollRange[0] + '%'})
    }
});
$('#custom-scroll').on(mouseOutEvent, function (e) {
    isScrolling = false;
    var mouse = getMouseCoordinate.call(this, e);
    var thumb = $('.scroll-thumb')[0];
    var pos = mouse.x;
    pos = (pos / this.clientWidth * 100).toFixed(1);
    if (pos < scrollRange[2]) {
        $(thumb).css({left: scrollRange[0] + '%'})
    }
});

$('#custom-scroll').on(mouseMoveEvent, function (e) {
    e.preventDefault();
    if (!isScrolling) return;
    var mouse = getMouseCoordinate.call(this, e);
    var pos = mouse.x;
    pos = (pos / this.clientWidth * 100).toFixed(1);
    if (pos < scrollRange[0] || pos > scrollRange[1]) return;
    $('.scroll-thumb').css({left: pos + '%'})
    if (pos > scrollRange[2]) {
        isScrolling = false;
        var phone_number = $(this).attr('phone');
        var passwd = '';//$(this).attr('passwd');
        var servant_phone = $(this).attr('servant');
        $('.parent-scroll').fadeOut('fast', function () {
            // sendRegisterRequest(phone_number, passwd, servant_phone);
            $('.scroll-thumb').css({left: scrollRange[0] + '%'});
        });
    }
});

function getMouseCoordinate(evt) {

    if (osStatus === 'Android' || osStatus === 'iOS') {
        evt = evt.originalEvent;
        if (('changedTouches' in evt)) evt = evt.changedTouches[0];
    }
    return {
        x: evt.pageX - (this.offsetLeft - this.offsetWidth / 2),
        y: evt.pageY - this.offsetTop
    };

}*/