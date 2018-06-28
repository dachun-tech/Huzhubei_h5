<!-- page footer Datas -->


<div id="auth_question" class="modal fade " tabindex="-1" data-backdrop="basic"
     data-keyboard="false" style="background-color: rgba(255,255,255,0.85);">
    <div class="modal-body">
        <b>
            <center>注册成功！</center>
        </b>
    </div>
    <div class="modal-footer" style="display: none">
        <button id="auth_cancel" type="button" class="btn_custom btn-default" onclick="OnCancel()">跳过</button>
        <button id="auth_ok" type="button" class="btn_custom"
                onclick="OnOk();">立即认证
        </button>
    </div>
    <br><br>
</div>

<div id="message_dialog" class="modal fade" tabindex="-1" data-backdrop="basic"
     data-keyboard="false" style="background-color: rgba(255,255,255,0.85);">
    <div class="modal-body">
    </div>
    <div class="modal-footer" style="border: none;">
        <button id="msg_cancel" type="button" class="btn_custom btn-default"
                onclick="$('#message_dialog').modal('hide');">取消
        </button>
        <button id="msg_ok" type="button" class="btn_custom"
                onclick="onOk()">确定
        </button>
    </div>
    <br><br>
</div>

<div id="message_loading" class="modal fade" tabindex="-1"
     data-backdrop="basic" data-keyboard="false"
     style="background-color: rgba(255,255,255,0.85);">
    <div class="modal-body">
    </div>
    <br><br>
</div>

<div id="notification_bar">

</div>

<div id="notification_alert">
    <span id="notification_alert_bar"></span>
</div>

<script src="assets/global/plugins/owl-carousel/owl.carousel.js"></script>
<script src="assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<!--<script src="assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>-->
<!--<script src="assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>-->
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="assets/global/plugins/bootstrap-modal/js/bootstrap-modalmanager.js" type="text/javascript"></script>
<script src="assets/global/plugins/bootstrap-modal/js/bootstrap-modal.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN THEME GLOBAL SCRIPTS -->
<script src="assets/global/scripts/app.min.js" type="text/javascript"></script>
<script src="assets/global/plugins/moment.min.js" type="text/javascript"></script>
<!-- END THEME GLOBAL SCRIPTS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<!--<script src="assets/pages/scripts/ui-extended-modals.min.js" type="text/javascript"></script>-->
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME LAYOUT SCRIPTS -->
<script src="assets/layouts/layout/scripts/layout.min.js" type="text/javascript"></script>
<!--<script src="assets/layouts/layout/scripts/demo.min.js" type="text/javascript"></script>-->
<!--<script src="assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>-->
<!--<script src="assets/layouts/global/scripts/quick-nav.min.js" type="text/javascript"></script>-->

<script type="text/javascript" src="assets/js/global_restapi.js"></script>
<script type="text/javascript" src="assets/js/item_templates.js"></script>
<script type="text/javascript" src="assets/js/global.js"></script>
<script type="text/javascript" src="assets/js/plugins/jquery.qrcode.js" charset="utf-8"></script>
<script type="text/javascript" src="assets/js/plugins/qrcode.js" charset="utf-8"></script>
<script type="text/javascript" src="assets/js/plugins/jigsaw.js" charset="utf-8"></script>