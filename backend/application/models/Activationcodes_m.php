<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Activationcodes_m extends MY_Model
{

    protected $_table_name = 'tbl_activationcodes';
    protected $_primary_key = 'id';
    protected $_primary_filter = 'intval';
    protected $_order_by = "id asc";

    function __construct()
    {
        parent::__construct();
    }

    function getItems()
    {
        $this->db->select('*, tbl_activationcodes.id as id');
        $this->db->from('tbl_activationcodes');
        $this->db->order_by('tbl_activationcodes.update_time', 'desc');
        $this->db->order_by('tbl_activationcodes.activate_time', 'desc');
//        $this->db->order_by('nunit_publish','desc');
//        $this->db->order_by('nunit_id','asc');
        $query = $this->db->get();
        return $query->result();
    }

    public function addItems($param)
    {
        foreach ($param as $item) {
            $this->db->set($item);
            $this->db->insert('tbl_activationcodes');
        }
        return $this->getCodeItems();
    }

    public function addItem($param)
    {
        $this->db->set($param);
        $this->db->insert('tbl_activationcodes');
        return $this->getCodeItems();
    }

    public function editItem($param)
    {
        $this->db->set($param);
        $this->db->where('code', $param['code']);
        $this->db->update('tbl_activationcodes');
        return $this->getCodeItems();
    }

    function getCodeItems()
    {
        $this->db->select('*, tbl_activationcodes.id as id, tbl_activationcodes.create_time as create_time');
        $this->db->from('tbl_activationcodes');
        $this->db->order_by('tbl_activationcodes.activate_time', 'desc');
        $this->db->order_by('tbl_activationcodes.create_time', 'desc');
//        $this->db->order_by('nunit_publish','desc');
//        $this->db->order_by('nunit_id','asc');
        $query = $this->db->get();
        return $query->result();
    }

    function getUnusedCodeItems()
    {
        $this->db->select('code');
        $this->db->from('tbl_activationcodes');
        $this->db->where('activate_status', '0');

//        $this->db->order_by('nunit_publish','desc');
//        $this->db->order_by('nunit_id','asc');
        $query = $this->db->get();
        return $query->result();
    }

    public function publish($item_id, $publish_st, $site_id = 1)
    {
        $this->db->set('user_status', $publish_st);
        $this->db->where('id', $item_id);
        $this->db->update('tbl_activationcodes');
        return $this->getCodeItems($site_id);
    }

    function getItemFromArray($param)
    {
        $this->db->select('*');
        $this->db->from('tbl_activationcodes');
        $this->db->where($param);
        $query = $this->db->get();
        return $query->row();
    }

    function getNewRegisterItem($param)
    {
        $this->db->select('*');
        $this->db->from('tbl_activationcodes');
        $this->db->where('activate_status', '0');
        $query = $this->db->get();
        $item = $query->row();
        $this->db->set($param);
        $this->db->where('id', $item->id);
        $this->db->update('tbl_activationcodes');

        return $item;
    }

    function getOldRegisterItem($param, $item_code)
    {
        $this->db->set($param);
        $this->db->where('code', $item_code);
        $this->db->update('tbl_activationcodes');

        $this->db->select('*');
        $this->db->from('tbl_activationcodes');
        $this->db->where('code', $item_code);
        $query = $this->db->get();
        return $query->row();
    }
}
