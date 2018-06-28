/*
Navicat MySQL Data Transfer

Source Server         : erc20token
Source Server Version : 50505
Source Host           : 118.178.193.11:3306
Source Database       : token_erc20

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-06-28 18:51:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admins
-- ----------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(100) DEFAULT NULL COMMENT '姓名',
  `admin_pass` varchar(200) DEFAULT NULL COMMENT '账号',
  `admin_label` varchar(100) DEFAULT NULL COMMENT '备注',
  `permission` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `admin_status` tinyint(2) DEFAULT '0',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admins
-- ----------------------------
INSERT INTO `admins` VALUES ('1', 'admin', '8ddd9f255d7de5ff85f81eac6f8238de9d415e43cf133fb193d348262d0e6d6ce9ea17d6aed89a204124b90887e2241f2bf06f5327c1197f7b52fd4be8763b00', '超级管理员', '{\"menu_10\":\"1\",\"menu_20\":\"1\",\"menu_30\":\"1\",\"menu_40\":\"1\",\"menu_50\":\"1\"}', '2018-04-29 13:23:27', '2018-06-19 15:49:36', '1');
INSERT INTO `admins` VALUES ('7', 'manager', '8ddd9f255d7de5ff85f81eac6f8238de9d415e43cf133fb193d348262d0e6d6ce9ea17d6aed89a204124b90887e2241f2bf06f5327c1197f7b52fd4be8763b00', 'manager', '{\"menu_10\":\"1\",\"menu_20\":\"1\",\"menu_30\":\"1\",\"menu_40\":\"0\",\"menu_50\":\"0\"}', '2018-04-29 13:28:57', '2018-04-29 14:15:36', '1');

-- ----------------------------
-- Table structure for tbl_activationcodes
-- ----------------------------
DROP TABLE IF EXISTS `tbl_activationcodes`;
CREATE TABLE `tbl_activationcodes` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT '',
  `user_id` varchar(20) DEFAULT NULL,
  `activate_status` tinyint(2) DEFAULT '0',
  `password` varchar(20) DEFAULT NULL,
  `wallet` decimal(10,5) DEFAULT '0.00000',
  `friend_id` varchar(20) DEFAULT NULL,
  `friend_count` int(5) DEFAULT '0',
  `token` varchar(10) DEFAULT NULL,
  `user_status` tinyint(2) DEFAULT '0',
  `site_id` int(2) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `activate_time` datetime DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `user_area_id` int(3) DEFAULT NULL,
  `user_address` varchar(30) DEFAULT NULL,
  `user_info` text,
  `usage_info` text,
  `register_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `register_count` int(12) DEFAULT '0',
  `information` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=366 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tbl_activationcodes
-- ----------------------------
INSERT INTO `tbl_activationcodes` VALUES ('308', '12312312312', '652w34565t32wer', '1', null, '0.15000', '', '5', '85753', '1', null, '2018-06-19 10:00:32', '2018-06-19 10:00:32', null, null, null, null, null, null, '2018-06-20 21:14:38', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('309', '45645645645', 'ty78ty78t78t8tty78', '1', null, '0.10000', '12312312312', '0', '59614', '1', null, '2018-06-19 10:02:27', '2018-06-19 10:02:27', null, null, null, null, null, null, '2018-06-19 10:02:46', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('310', '16549516516', 'er56er67rt67', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-19 10:07:01', '2018-06-19 10:07:01', null, null, null, null, null, null, '2018-06-19 10:09:39', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('311', '32452345234', 'er56er56er56e', '1', null, '0.11000', '', '1', '59770', '1', null, '2018-06-19 14:44:16', '2018-06-19 14:44:16', null, null, null, null, null, null, '2018-06-19 15:17:09', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('312', '46435345487', 'w45w3456w45w45', '1', null, '0.10000', '', '0', null, '1', null, '2018-06-19 15:02:07', '2018-06-19 15:02:07', null, null, null, null, null, null, '2018-06-19 15:02:07', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('313', '88373565816', 'GHEGdfgxfghde', '1', null, '0.10000', '12312312312', '0', null, '1', null, '2018-06-19 15:03:29', '2018-06-19 15:03:29', null, null, null, null, null, null, '2018-06-19 15:03:29', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('314', '15968763541', 'GEGEgegrgr', '1', null, '0.10000', '', '0', '81971', '1', null, '2018-06-19 15:11:04', '2018-06-19 15:11:04', null, null, null, null, null, null, '2018-06-19 15:11:36', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('316', '98694865168', 'NGBGRBRGrbgf', '1', null, '0.10000', '', '0', '23134', '1', null, '2018-06-19 15:17:09', '2018-06-19 15:17:09', null, null, null, null, null, null, '2018-06-19 15:28:29', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('317', '18641502372', 'ihgihgihgihgihg', '1', null, '0.13000', '', '3', '32184', '1', null, '2018-06-19 15:23:28', '2018-06-19 15:23:28', null, null, null, null, null, null, '2018-06-26 01:20:28', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('318', '15801582302', 'ugffugfugfugfugf', '1', null, '0.10000', '32452345234', '0', '97734', '1', null, '2018-06-19 15:54:56', '2018-06-19 15:54:56', null, null, null, null, null, null, '2018-06-26 19:57:54', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('319', '18641502373', 'tfdtfdtfdtfdtfdt', '1', null, '0.11000', '', '1', '', '1', null, '2018-06-19 16:03:56', '2018-06-19 16:03:56', null, null, null, null, null, null, '2018-06-19 16:32:50', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('320', '18641502375', 'rdsrdsrdsrds', '1', null, '0.10000', '', '0', '46414', '1', null, '2018-06-19 16:09:27', '2018-06-19 16:09:27', null, null, null, null, null, null, '2018-06-22 13:25:51', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('321', '18641502376', 'mhymhymhymhy', '1', null, '0.10000', '12312312312', '0', '', '1', null, '2018-06-19 16:33:56', '2018-06-19 16:33:56', null, null, null, null, null, null, '2018-06-20 11:50:55', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('322', '46868316646', 'ngtngtngtngtngt', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-19 16:41:05', '2018-06-19 16:41:05', null, null, null, null, null, null, '2018-06-19 16:46:47', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('323', '18641502379', 'bfrwebfrbfrbfr', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-19 16:44:26', '2018-06-19 16:44:26', null, null, null, null, null, null, '2018-06-19 16:45:02', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('324', '83864688864', 'vdwvfewvfewve', '1', null, '0.10000', '18641502372', '0', '', '1', null, '2018-06-19 16:47:41', '2018-06-19 16:47:41', null, null, null, null, null, null, '2018-06-20 14:28:54', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('325', '46838245498', 'cxsqcdsqcdsqcdsq', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-19 17:33:00', '2018-06-19 17:33:00', null, null, null, null, null, null, '2018-06-19 17:33:08', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('326', '18641502370', 'cvbncvncvbncvbn', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-19 17:57:11', '2018-06-19 17:57:11', null, null, null, null, null, null, '2018-06-19 17:57:25', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('327', '15715815630', 'xcvbxcvbxcvbxcvb', '1', null, '0.11000', '', '1', '', '1', null, '2018-06-19 17:57:13', '2018-06-19 17:57:13', null, null, null, null, null, null, '2018-06-28 18:04:49', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('328', '65981354652', 'zxcvzxcvzxcvzxcv', '1', null, '0.11000', '', '1', '93836', '1', null, '2018-06-20 09:52:16', '2018-06-20 09:52:16', null, null, null, null, null, null, '2018-06-20 11:54:59', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('329', '38485848281', 'vcxzvcxzvcxzvcxz', '1', null, '0.10000', '15715815630', '0', '', '1', null, '2018-06-20 10:15:45', '2018-06-20 10:15:45', null, null, null, null, null, null, '2018-06-20 16:11:42', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('330', '28374743738', 'bvcxbvcxbvcxbvx', '1', null, '0.10000', '65981354652', '0', '', '1', null, '2018-06-20 11:38:32', '2018-06-20 11:38:32', null, null, null, null, null, null, '2018-06-20 14:24:54', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('331', '12345678900', 'nbnbvcnbvcnbc', '1', null, '0.10000', '12312312312', '0', '', '1', null, '2018-06-20 11:55:45', '2018-06-20 11:55:45', null, null, null, null, null, null, '2018-06-20 15:54:07', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('332', '98498496846', 'mnmnvbmnvbmnv', '1', null, '0.10000', '', '0', '88153', '1', null, '2018-06-20 14:20:38', '2018-06-20 14:20:38', null, null, null, null, null, null, '2018-06-20 15:29:50', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('333', '18641502388', 'lkjhlkjhlkjhlkjh', '1', null, '0.10000', '12312312312', '0', '95512', '1', null, '2018-06-20 14:21:40', '2018-06-20 14:21:40', null, null, null, null, null, null, '2018-06-20 14:43:06', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('334', '54986846354', 'kjhgkjgkjgkjg', '1', null, '0.11000', '', '1', '', '1', null, '2018-06-20 15:46:18', '2018-06-20 15:46:18', null, null, null, null, null, null, '2018-06-20 21:59:58', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('335', '18641509999', 'jhjhfgjhfgjhfgjh', '1', null, '0.10000', '18641502373', '0', '85108', '1', null, '2018-06-20 15:53:24', '2018-06-20 15:53:24', null, null, null, null, null, null, '2018-06-20 15:56:28', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('336', '13535546758', 'hgdhgdhgfdhg', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-20 16:04:16', '2018-06-20 16:04:16', null, null, null, null, null, null, '2018-06-20 16:33:41', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('337', '18641588888', 'gfdsgfdsgfdsgf', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-20 16:36:02', '2018-06-20 16:36:02', null, null, null, null, null, null, '2018-06-20 16:36:10', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('338', '12345678909', 'fdsafdsafdsafdsa', '1', null, '0.10000', '18641502372', '0', '85701', '1', null, '2018-06-20 16:48:06', '2018-06-20 16:48:06', null, null, null, null, null, null, '2018-06-20 18:08:46', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('339', '18899998888', 'uiopuiopuiopuiop', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-20 17:11:15', '2018-06-20 17:11:15', null, null, null, null, null, null, '2018-06-20 17:11:32', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('340', '53134252858', 'yuioyuioyuioyuio', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-20 17:15:59', '2018-06-20 17:15:59', null, null, null, null, null, null, '2018-06-22 08:41:45', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('341', '16688886666', 'tyuityuityuityui', '1', null, '0.12000', '', '2', '21208', '1', null, '2018-06-20 17:19:49', '2018-06-20 17:19:49', null, null, null, null, null, null, '2018-06-20 17:31:36', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('342', '15555555555', 'rtuyrtuyrtuyrtuy', '1', null, '0.10000', '54986846354', '0', '99975', '1', null, '2018-06-20 17:26:37', '2018-06-20 17:26:37', null, null, null, null, null, null, '2018-06-20 21:06:22', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('343', '31356868676', 'ertyertyertyerty', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-20 17:31:36', '2018-06-20 17:31:36', null, null, null, null, null, null, '2018-06-22 13:51:49', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('344', '64315546764', 'wertwertwertwert', '1', null, '0.11000', '', '1', '', '1', null, '2018-06-20 17:41:37', '2018-06-20 17:41:37', null, null, null, null, null, null, '2018-06-22 09:28:56', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('345', '82837473787', 'qwerqwerqwerqwer', '1', null, '0.10000', '64315546764', '0', '', '1', null, '2018-06-20 17:43:50', '2018-06-20 17:43:50', null, null, null, null, null, null, '2018-06-21 18:04:24', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('346', '64476337636', 'ghjkghjkghjkghjk', '1', null, '0.10000', '16688886666', '0', '55373', '1', null, '2018-06-20 17:45:00', '2018-06-20 17:45:00', null, null, null, null, null, null, '2018-06-20 17:45:02', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('347', '18888888888', 'fgjhfgjhfgjhfgj', '1', null, '0.10000', '', '0', '93372', '1', null, '2018-06-20 21:10:16', '2018-06-20 21:10:16', null, null, null, null, null, null, '2018-06-20 21:10:18', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('348', '12345678999', 'dfghdfghdfghdfgh', '1', null, '0.10000', '16688886666', '0', '68785', '1', null, '2018-06-20 21:35:45', '2018-06-20 21:35:45', null, null, null, null, null, null, '2018-06-21 22:37:09', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('349', '69568498516', 'sdfgsdfgsdfgsdfg', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-20 22:01:47', '2018-06-20 22:01:47', null, null, null, null, null, null, '2018-06-21 08:40:01', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('350', '13757109417', 'asdfasdfasdfasdf', '1', null, '0.12000', '', '2', '72803', '1', null, '2018-06-20 22:08:53', '2018-06-20 22:08:53', null, null, null, null, null, null, '2018-06-28 18:21:30', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('351', '15355076608', '1231231231231231', '1', null, '0.10000', '13757109417', '0', '74146', '1', null, '2018-06-20 22:23:01', '2018-06-20 22:23:01', null, null, null, null, null, null, '2018-06-25 15:50:22', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('352', '65465465465', 'jEubkJ7DVBfoOCkw', '1', null, '0.10000', '', '0', '29344', '1', null, '2018-06-21 17:59:37', '2018-06-21 17:59:37', null, null, null, null, null, null, '2018-06-21 20:53:53', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('353', '32132132132', 'kpEPQ7XnN1DAWr9y', '1', null, '0.11000', '', '1', '', '1', null, '2018-06-21 20:55:18', '2018-06-21 20:55:18', null, null, null, null, null, null, '2018-06-22 11:27:48', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('354', '73737463838', 'etR5I5C2LWq2Iwli', '1', null, '0.10000', '', '0', null, '1', null, '2018-06-21 20:57:34', '2018-06-21 20:57:34', null, null, null, null, null, null, '2018-06-21 20:57:34', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('355', '64466464467', 's7dpxmN7AHwEQXmB', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-21 20:58:32', '2018-06-21 20:58:32', null, null, null, null, null, null, '2018-06-21 21:01:32', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('356', '84847467272', 'Zx9btZRIlmOQJRTx', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-21 21:14:21', '2018-06-21 21:14:21', null, null, null, null, null, null, '2018-06-21 21:17:32', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('357', '28384747483', '1tcmqQCosP52QM5n', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-21 21:18:18', '2018-06-21 21:18:18', null, null, null, null, null, null, '2018-06-21 21:37:37', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('358', '28384747474', 'OSs04V6AIkyxsrhU', '1', null, '0.10000', '32132132132', '0', '', '1', null, '2018-06-21 21:38:56', '2018-06-21 21:38:56', null, null, null, null, null, null, '2018-06-21 21:51:23', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('359', '38374747388', 'PGEDQmSgciZLS5Iu', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-21 22:23:54', '2018-06-21 22:23:54', null, null, null, null, null, null, '2018-06-22 13:11:52', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('360', '18588209031', 'uhFVb7qpirUJjkkI', '1', null, '0.10000', '', '0', '74237', '1', null, '2018-06-22 12:23:16', '2018-06-22 12:23:16', null, null, null, null, null, null, '2018-06-26 00:42:34', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('361', '13130545623', 'm1xxGE29rB40eB1z', '1', null, '0.10000', '', '0', '47320', '1', null, '2018-06-22 13:49:14', '2018-06-22 13:49:14', null, null, null, null, null, null, '2018-06-23 05:18:55', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('362', '13130545612', 'ZA5V5n7Sx8GwzHJs', '1', null, '0.10000', '', '0', '', '1', null, '2018-06-23 04:43:46', '2018-06-23 04:43:46', null, null, null, null, null, null, '2018-06-24 22:32:49', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('363', '17642518820', 'DttZsphD02NfEP94', '1', null, '0.10000', '', '0', '30017', '1', null, '2018-06-23 12:34:14', '2018-06-23 12:34:14', null, null, null, null, null, null, '2018-06-23 23:00:57', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('364', '13130545615', 'JTC45nOVhMzJ92vc', '1', null, '0.10000', '', '0', '12315', '1', null, '2018-06-25 00:47:10', '2018-06-25 00:47:10', null, null, null, null, null, null, '2018-06-25 01:10:36', '0', null);
INSERT INTO `tbl_activationcodes` VALUES ('365', '13819100361', 'soaN4aCMl6BBmrWf', '1', null, '0.10000', '13757109417', '0', '77274', '1', null, '2018-06-25 16:12:33', '2018-06-25 16:12:33', null, null, null, null, null, null, '2018-06-25 16:13:10', '0', null);
