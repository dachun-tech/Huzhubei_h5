<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


class Api extends CI_Controller
{

    function __construct()
    {
        parent::__construct();

        $language = 'chinese';
        $this->lang->load('frontend', $language);
        $this->load->model("activationcodes_m");
        $this->load->library("pagination");
        $this->load->library("session");
    }

    public function index()
    {
        $this->data["subview"] = "admin/signin/index";
        $this->load->view('admin/_layout_signin', $this->data);
        $this->session->sess_destroy();
    }

    public function register()
    {
        $param = ['code' => ''];
        $ret = [
            'status' => false,
            'err_code' => 'Register data is invalid.',
            'err_message' => ''
        ];
        if (empty($_POST)) {
            echo json_encode($ret);
            return;
        }

        $param['code'] = $_POST['phone'];

        $userInfo = $this->activationcodes_m->getItemFromArray($param);
        $userCount = count($this->activationcodes_m->getItems());

        // add 1000 to phone.
        $invited = '';
        if ($_POST['invited'] != '') {
            $arr = ['user_id' => $_POST['invited']];
            $userInfo1 = $this->activationcodes_m->getItemFromArray($arr);
            if (count($userInfo1) == 0)
                $invited = '';
            else
                $invited = $userInfo1->code;
        }

        if (count($userInfo) == 0) {
//            $param['password'] = $_POST['password'];
            $param['activate_status'] = 1;
            $param['user_status'] = 1;
            $param['create_time'] = date('Y-m-d H:i:s');
            $param['activate_time'] = date('Y-m-d H:i:s');
            $param['update_time'] = date('Y-m-d H:i:s');
            $param['friend_id'] = $invited;
            $param['user_id'] = $this->generateRandomString(16);
            $param['wallet'] = 0.1;
            if ($userCount > 10000) $param['wallet'] = .05;
            $this->activationcodes_m->addItem($param);
        } else {
            $ret['err_code'] = 2;
//            $param['password'] = $_POST['password'];
//            $param['update_time'] = date('Y-m-d H:i:s');
//            $this->activationcodes_m->editItem($param);
            echo json_encode($ret);
            return;
        }

        // if saleman is exist, then add 100 to saleman,
        $param = ['code' => ''];
        if ($invited != '') {
            $param['code'] = $invited;
            $userInfo = $this->activationcodes_m->getItemFromArray($param);
            if ($userInfo->friend_count < 10000) {
                $param['friend_count'] = $userInfo->friend_count + 1;
                $param['wallet'] = $userInfo->wallet + .01;
                $param['update_time'] = date('Y-m-d H:i:s');
                $this->activationcodes_m->editItem($param);
            } else {
                $ret['err_message'] = '不允许超过1000的朋友. 所以你的朋友没有得到任何货币.';
            }
        }
        $ret['status'] = true;
        $ret['err_code'] = 'Success';
        echo json_encode($ret);
    }

    public function login()
    {
        $param = ['code' => ''];
        $ret = [
            'status' => false,
            'err_code' => 'Register data is invalid.'
        ];
        if (empty($_POST)) {
            echo json_encode($ret);
            return;
        }

        $param['code'] = $_POST['phone'];
        $status = $_POST['status'];
        $userInfo = $this->activationcodes_m->getItemFromArray($param);
        $userCount = count($this->activationcodes_m->getItems());

        // add 1000 to phone.
        if (count($userInfo) == 0) {
            $ret['err_code'] = 2;
            echo json_encode($ret);
            return;
        } else {
            if ($status == 1) {
                $param['token'] = rand(10000, 99999);
                $userInfo->token = $param['token'];
            } else if ($status == 2) {
                $param['token'] = '';
                $userInfo->token = $param['token'];
            }
            $param['update_time'] = date('Y-m-d H:i:s');
            $this->activationcodes_m->editItem($param);
        }

        $ret['status'] = true;
        $ret['err_code'] = 'Success';
        $ret['token'] = $userInfo->token;
        $ret['user_data'] = $userInfo;
        echo json_encode($ret);
    }

    public function uploadImgData()
    {
        $request = $_POST;
        if (!isset($request['imageData'])) {
            $this->response(array('status' => false, 'data' => 'Image Data is none.'), 400);
            return;
        }
        $imgdata = $request['imageData'];
        $imgdata = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $imgdata));

        //$imgdata = base64_decode($data);

        $imageName = 'qr' . rand(10000, 99999) . '.png';
        if (file_put_contents('uploads/' . $imageName, $imgdata))
            echo json_encode(array('status' => true, 'data' => base_url() . 'uploads/' . $imageName));
        else
            echo json_encode(array('status' => false, 'data' => 'Image uploading failed.'));
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
}

?>