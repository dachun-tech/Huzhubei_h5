<?php
//$usertype = $this->session->userdata("user_type");
?>
<!-- BEGIN SIDEBAR -->
<div class="page-sidebar-wrapper">
    <div class="page-sidebar navbar-collapse collapse">
        <ul class="page-sidebar-menu  page-header-fixed" data-keep-expanded="true" data-auto-scroll="true"
            data-slide-speed="200" style="padding-top: 20px">
            <li class="sidebar-toggler-wrapper hide">
                <div class="sidebar-toggler">
                    <span></span>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link menu-title" id="course_menu">
                    <i class="icon-docs"></i>
                    <span class="title"><?php echo $this->lang->line('panel_title_20'); ?></span>
                </a>
            </li>
            <li class="nav-item">
                <a href="<?= base_url('admin/sitemanage') ?>" class="nav-link " menu_id="12">
                    <i class="icon-briefcase"></i>
                    <span class="title"><?php echo $this->lang->line('panel_title_12'); ?></span>
                </a>
            </li>
            <!----------Community Manage------------------->
            <li class="nav-item  ">
                <a href="javascript:;" class="nav-link menu-title">
                    <i class="icon-user"></i>
                    <span class="title"><?php echo $this->lang->line('panel_title_50'); ?></span>
                </a>
            </li>
            <li class="nav-item  ">
                <a href="<?= base_url('admin/admins') ?>" class="nav-link " menu_id="51">
                    <i class="icon-notebook"></i>
                    <span class="title"><?php echo $this->lang->line('panel_title_51'); ?></span>
                </a>
            </li>
            <li class="nav-item  " style="display: none">
                <a href="<?= base_url('admin') ?>" class="nav-link " menu_id="52">
                    <i class="icon-notebook"></i>
                    <span class="title"><?php echo $this->lang->line('panel_title_51'); ?></span>
                </a>
            </li>
        </ul>
        <!-- END SIDEBAR MENU -->
        <!-- END SIDEBAR MENU -->
    </div>
    <!-- END SIDEBAR -->
</div>
<!-- END SIDEBAR -->


