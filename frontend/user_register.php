<!DOCTYPE html>
<html lang="en">

<?php include('page_header.php'); ?>
<body>
<div class="main-content">
    <div class="title-container" item_type="register"></div>
    <div class="register-middle">互助币即将全面上市流通</div>
    <div class="register-container">
        <div class="user_register">
            <div class="custom_row">
                <input type="number" class="form-control" id="phone_number" placeholder="手机号码为登录账号"
                       title="请输入手机号">
            </div>
            <div class="custom_row">
                <input type="number" class="form-control" id="auth_code" placeholder="验证码"
                       style="font-size:10pt !important;" title="请输入6位验证码">
                <span id="sms_button" onclick="sendingSMS()">获取验证码</span>
            </div>
            <!--    <div class="form-group form-md-line-input custom_row">-->
            <!--        <input type="password" class="form-control" id="passwd" placeholder="请输入您的密码"-->
            <!--               title="请输入6-20位密码">-->
            <!--        <label for="passwd">密码</label>-->
            <!--    </div>-->
            <!--    <div class="form-group form-md-line-input custom_row">-->
            <!--        <input type="password" class="form-control" id="confirm_passwd" placeholder="请再次输入您的密码"-->
            <!--               style="padding-left: 75px!important;" title="两次输入的密码应该一致">-->
            <!--        <label for="confirm_passwd">确认密码</label>-->
            <!--    </div>-->

            <div id="confirm_register" class="btn_login" onclick="">立即领取</div>
        </div>
    </div>
    <div class="home-footer"></div>
</div>

<div class="parent-scroll">
    <div class="captcha-container">
        <div id="captcha"></div>
    </div>
<!--    <div id="custom-scroll" container_class="content-board">-->
<!--        向右滑动验证-->
<!--        <div class="scroll-read"></div>-->
<!--        <div class="scroll-thumb"></div>-->
<!--    </div>-->
</div>

<?php include('page_footer.php');
$invited = '';
if (isset($_GET['invited']))
    $invited = $_GET['invited'];
?>
<script type="text/javascript">
    $(document).ready(function () {
        document.title = '注册';
        clearInterval(pageLoginTmr);
    });
    var invitedNumber = '<?= $invited?>';

    function OnOk() {
        $('#auth_question').modal('hide');
        // jump individual information input page
        window.location.href = 'user_register_detail.php';
    }

    function OnCancel() {
        $('#auth_question').modal('hide');
        // jump first page
        window.location.href = 'home.php';
    }
</script>
<script src="assets/js/user_manage/login.js" type="text/javascript"></script>

<script>
    if (getPhoneNumber() != '') {
        $('body').html('');
        location.href = "home.php";
    }
    jigsaw.init(document.getElementById('captcha'), function () {
        switch (verify_type) {
            case 'sms':
                sendSMSToServer(reg_phone);
                break;
//            case 'reg':
//                sendRegisterRequest(reg_phone, '', reg_servant);
//                break;
        }
        $('.parent-scroll').fadeOut('fast');
        $('#captcha').html('');
        this.init();
    });
</script>
</body>

</html>
