-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE USER(
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `telephone` VARCHAR(255)  DEFAULT NULL COMMENT '电话号码',
  `password` VARCHAR(255)  DEFAULT NULL COMMENT '密码',
   PRIMARY KEY (`id`)
)ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='用户信息表';