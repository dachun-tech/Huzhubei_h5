var data = {
    'phone_num': '',
    'menu_info': [],
    'advertise_imgs': [],
    'cur_menu_index': 0,
    'cur_detail_index': 0,
    'cur_bottom_index': 0,
    'bShow_detal_menu': 0,
    'paginationCnt': 5,////for Pagination variable-PMS-CODE
    'productPageCnt': 0////for Pagination variable-PMS-CODE
};

$(document).ready(function () {
    document.title = '互助贝';
    showUserInfos();
    // setTimeout(function () {
    //     getLocationGroupRequest(getPhoneNumber());
    // }, 2000);
    // weixinConfigure();

//    $('body').on('pageshow', onFocus);
});

function showUserInfos() {
    if (getPhoneNumber() == '') {
        $('.qr-view-container').hide();
        $('.title-container').html(' ');
    } else {
        $('.userfriend').html(getPhoneNumber().substr(7));
        $('.userwallet[item_type=value]').html((parseFloat(getMySessionWallet())*10000).toFixed(0));
    }
    // if (getCouponStatus()) {
    //     $('.friend_info').html(getCouponStatus().substr(7));
    // } else {
    //     $('.friend_info').html(' ');
    // }
    if (getPhoneNumber()!='') {
        $('.friend_info').show();
    } else {
        $('.friend_info').html(' ');
    }

}


function showAroundGroupingNotification() {
    var msgs = getSessionAroundInfo();
    if (msgs == '') return;
    showNotification(msgs[0].message, msgs[0].activity);
    msgs.slice(0);
    if (msgs.length == 0) {
        setSessionAroundInfo('');
        return;
    }
    setSessionAroundInfo(msgs);
    setTimeout(function () {
        showAroundGroupingNotification();
    }, 10000);
}

function signOut() {
    sendLoginRequest(getPhoneNumber(), '', 2);
}

function OnOk() {
    if (!getRegisterStatus())
        location.href = "user_login.php";
    else
        location.href = 'user_register_detail.php';
}

function OnCancel() {
    $('#auth_question').modal('hide');
}
