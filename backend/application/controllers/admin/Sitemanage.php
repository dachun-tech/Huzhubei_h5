<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Sitemanage extends Admin_Controller
{

    function __construct()
    {
        parent::__construct();
        $language = 'chinese';
        $this->load->model("activationcodes_m");
        $this->lang->load('courses', $language);
        $this->load->library("pagination");
    }

    public function index()
    {
        $this->data['items'] = $this->activationcodes_m->getCodeItems();
        $this->data['status_act'] = [$this->lang->line('status_activated'), $this->lang->line('status_unactivated')];
        $this->data['status_use'] = [$this->lang->line('status_using'), $this->lang->line('status_disabled')];
        $this->data["subview"] = "admin/users/activation";
        $this->data["subscript"] = "admin/settings/script";
        $this->data["subcss"] = "admin/settings/css";
        $this->data["tbl_content"] = $this->activation_output_content($this->data['items']);
        if (!$this->checkRole()) {
            $this->load->view('admin/_layout_error', $this->data);
        } else {
            $this->load->view('admin/_layout_main', $this->data);
        }
    }

    function activation_output_content($items)
    {
        $output_html = '';
        $j = 0;
        $status_activation = [$this->lang->line('status_unactivated'), $this->lang->line('status_activated')];
        $status_user = [$this->lang->line('status_disabled'), $this->lang->line('status_using')];
//        for ($i = 0; $i < 10; $i++)
        foreach ($items as $unit):
            $j++;
            $isDisabled = true;
            $btn_str = $this->lang->line('enable');
            if ($unit->user_status == '1') {
                $isDisabled = false;
                $btn_str = $this->lang->line('disable');
            }
            $userInfo = json_decode($unit->user_info);
            $friend = $unit->friend_id;
            if($friend=='' || $friend==NULL) $friend = $this->lang->line('direct_register');
            $output_html .= '<tr>';
            $output_html .= '<td>' . $j . '</td>';
            $output_html .= '<td>' . $unit->code . '</td>';
            $output_html .= '<td>' . ($unit->wallet*10000) . ' H </td>';
            $output_html .= '<td>' . $friend . '</td>';
            $output_html .= '<td>' . $unit->friend_count . '</td>';
            $output_html .= '<td style="display:none;">' . $status_activation[$unit->activate_status] . '</td>';
            $output_html .= '<td>' . $unit->activate_time . '</td>';
            $output_html .= '<td style="display:none;">' . $status_user[$unit->user_status] . '</td>';
            $output_html .= '<td style="display:none;">';
            $output_html .= '<button class="btn btn-sm ' . ($isDisabled ? 'btn-default' : 'btn-warning') . '"'
                . ' onclick = "publish_item(this);" '
                . ' item_status="' . $unit->user_status . '"'
                . ' item_site="' . $unit->site_id . '"'
                . ' item_id = ' . $unit->id . '>' . $btn_str . '</button>';
            $output_html .= '</td>';
            $output_html .= '</tr>';
        endforeach;
        return $output_html;
    }

    public function publish()
    {
        $ret = array(
            'data' => '',
            'status' => 'fail'
        );
        if ($_POST) {
            $item_id = $_POST['item_id'];
            $publish_st = $_POST['publish_state'];
            $site_id = $_POST['site_id'];
            $items = $this->activationcodes_m->publish($item_id, $publish_st, $site_id);
            $ret['data'] = $this->activation_output_content($items);
            $ret['status'] = 'success';
        }
        echo json_encode($ret);
    }

    public function create_activation_codes()
    {
        $ret = array(
            'data' => '',
            'status' => 'fail'
        );
        if ($_POST) {
            $item_amount = intval($_POST['item_amount']);
            $param = null;
            for ($i = 0; $i < $item_amount; $i++) {
                $param[$i] = array(
                    'code' => $this->generateRandomString(15),
                    'activate_status' => 0,
                    'user_status' => 0,
                    'create_time' => date('Y-m-d H:i:s'),
                    'register_count' => 0
                );
            }
            $items = $this->activationcodes_m->addItems($param);
            $ret['data'] = $this->activation_output_content($items);
            $ret['status'] = 'success';
        }
        echo json_encode($ret);
    }

    public function generateRandomString($length = 10)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    function checkRole()
    {

        $permission = $this->session->userdata('admin_user_type');
        if ($permission != NULL) {
            $permissionData = json_decode($permission);
            $accessInfo = $permissionData->menu_10;
            if ($accessInfo == '1') return true;
            else return false;
        }
        return false;
    }

}
