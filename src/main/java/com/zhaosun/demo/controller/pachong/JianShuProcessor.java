package com.zhaosun.demo.controller.pachong;

/**
 * @Author:hzhao
 * @Date:2019/3/1810:47
 */
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.selector.Selectable;

import java.util.List;

/**
 * info:简书首页爬虫
 * Created by shang on 16/9/9.
 */
public class JianShuProcessor implements PageProcessor {

    private Site site = Site.me()
            .setDomain("jianshu.com")
            .setSleepTime(100)
            .setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36");
    ;

    public static final String list = "http://www.jianshu.com";

    @Override
    public void process(Page page) {
        if (page.getUrl().regex(list).match()) {
            List<Selectable> list=page.getHtml().xpath("//ul[@class='article-list thumbnails']/li").nodes();
            for (Selectable s : list) {
                String title=s.xpath("//div/h4/a/text()").toString();
                String link=s.xpath("//div/h4").links().toString();
                System.out.println(title+link);
            }
        }
    }

    @Override
    public Site getSite() {
        return site;
    }

}
