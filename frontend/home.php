<!DOCTYPE html>
<html lang="en">

<?php include('page_header.php'); ?>

<body>
<div class="main-content">
    <div class="title-container">
        <div class="title-content">
            <div class="friend_info">恭喜尾号<span class="userfriend"></span>的用户</div>
            获得&nbsp;<span class="userwallet" item_type="value"></span><span class="userwallet">&nbsp;H</span>
        </div>
        <div class="title-description">智能合约创始地址 : &nbsp;<br>
            0xd3f33a2e553b363b432d7f81f721a2a6202ecc67
        </div>
    </div>
    <div class="qr-view-container">
        <div id="qr-view"></div>
        <img id="avatar-img" src="assets/images/qr-admin.jpg"/>
        <div class="qr-description">
            <span class="desc-top">扫一扫添加互助圈小二</span><br>
            <span class="desc-middle">添加互助圈小二微信可获得<br>
            使用攻略和更多转发奖励</span><br>
            <a href="#" onclick="signOut()" style="color:lightgrey;text-decoration: none;">
                <span class="desc-bottom">邀请好友您将获得10%奖励<br>
                    （限10万用户以内）</span>
            </a>
            <div class="btn_saveqr" onclick="go2download()">立即邀请</div>
        </div>
    </div>
    <div class="home-footer"></div>
</div>
<div class="home-content" style="display: none;">
    <div class="row-item">
        <div class="left-item" item_type="signin"><a href="user_login.php">登录</a></div>
        <div class="right-item" item_type="signout"><a href="#" onclick="signOut()">退出</a></div>
    </div>

</div>
<?php include('page_footer.php'); ?>
<script>
    $(function () {
//        showQR(MY_API_URL + 'user_register.php?invited=' + getUserId());
        if (getPhoneNumber() != '') {
            $('.left-item[item_type=signin]').hide();
            $('.right-item[item_type=signout]').show();
        } else {
            location.href = 'user_register.php';
            $('.left-item[item_type=signin]').show();
            $('.right-item[item_type=signout]').hide();
        }
    });

    function go2download() {
        location.href = 'download.php';
    }
</script>
<script type="text/javascript" src="assets/js/main.js"></script>
</body>

</html>