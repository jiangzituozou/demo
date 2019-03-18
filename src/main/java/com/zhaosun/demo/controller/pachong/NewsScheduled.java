package com.zhaosun.demo.controller.pachong;

/**
 * @Author:hzhao
 * @Date:2019/3/1810:57
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import us.codecraft.webmagic.Spider;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;


/**
 * info:新闻定时任务
 * Created by shang on 16/8/22.
 */
//@Component
public class NewsScheduled {

    /**
     * 简书
     */
//    @Scheduled(cron = "0 0 0 * * ? ")//从0点开始,每2个小时执行一次
    public void jianShuScheduled() {
        System.out.println("----开始执行简书定时任务");
        Spider spider = Spider.create(new JianShuProcessor());
        spider.addUrl("http://www.jianshu.com");
        spider.thread(5);
        spider.setExitWhenComplete(true);
        spider.start();
        spider.stop();
    }
}

