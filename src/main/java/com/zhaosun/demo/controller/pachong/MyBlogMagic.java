package com.zhaosun.demo.controller.pachong;

/**
 * @Author:hzhao
 * @Date:2019/3/1811:48
 */
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.monitor.SpiderMonitor;
import us.codecraft.webmagic.pipeline.ConsolePipeline;
import us.codecraft.webmagic.pipeline.FilePipeline;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.Request;
import us.codecraft.webmagic.scheduler.PriorityScheduler;
import us.codecraft.webmagic.selector.Html;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.zhaosun.demo.controller.pachong.WriteStringToLocalFile.FILESUFFIXTYPE_TXT;

@Controller
public class MyBlogMagic implements PageProcessor {
    private static String localPath="C:/Users/ghf/Desktop/";
    private static int count =0;

    /**  * 爬取  */  public void process(Page page) {

        if (page.getUrl().toString().equals("http://www.freexs.org")) {
            processBookName(page);
        } else if (page.getUrl().regex("https://www\\.freexs\\.org/info/").toString() != null) {
            processBookPage(page);
        } else  if (page.getUrl().regex("https://www\\.freexs\\.org/novel/[0-9]+/[0-9]+/index\\.html").toString() != null) {
            processCatalog(page);
        }else {
            processDownBook(page);
        }

    }

    /**  * 设置属性  */  public Site getSite() {
        return Site.me().
                setRetryTimes(3).
                setSleepTime(1000);
    }

    /**  *获得首页书籍的名称和url地址  *  * @Author: 郭航飞  * @CreateDate: 2018/5/3 13:51  **/  private void processBookName(Page page) {
        List<String> catalogs = page.getHtml().xpath("//*[@class=\"leikuangbottom\"]/a").all();
        for (String catalog :catalogs ) {
            Document doc = Jsoup.parse(catalog);
            Element e_title = doc.getElementsByTag("a").get(0);
            String bookName = e_title.text();
            String bookHref = e_title.attr("href");
            Request request = new Request(bookHref).putExtra("bookName", bookName);
            page.addTargetRequest(request);
        }
        System.out.println("***********执行processBookName：获得首页书籍的名称和url地址");
    }

    /**  *获得书籍的页面链接  *  * @Author: 郭航飞  * @CreateDate: 2018/5/3 14:07  * @param  * @return  **/  private void processBookPage(Page page) {
        String bookPageLink = page.getHtml().xpath("//*[@class=\"downloads\"]/a/@href").toString();
        Request request = new Request(bookPageLink).putExtra("bookName", page.getRequest().getExtra("bookName"));
        page.addTargetRequest(request);
        System.out.println("***********执行processBookPage：获得书籍的页面链接");
    }

    /**  *获得书籍目录和章节URL地址  *  * @Author: 郭航飞  * @CreateDate: 2018/5/3 14:09  **/  private void processCatalog(Page page) {
        String hrefPrefic = page.getUrl().toString().substring(0, page.getUrl().toString().length() - 10);
        List<String> catalogs = page.getHtml().xpath("//table/tbody/tr/td/dl/dd/a/@href").all();
        if (catalogs==null){
            catalogs =page.getHtml().xpath("//table/tbody/tr[2]/td/a/@href").all();
        }

        for (int i = 0; i <catalogs.size() ; i++) {
            Request request = new Request(hrefPrefic+catalogs.get(i)).putExtra("bookName", page.getRequest().getExtra("bookName"));
            page.addTargetRequest(request);
        }
        System.out.println("***********执行processCatalog：获得书籍目录");

    }

    /**  *获得最终页面进行下载  *  * @Author: 郭航飞  * @CreateDate: 2018/5/3 14:13  **/  private void processDownBook(Page page) {
        WriteStringToLocalFile writeStringToLocalFile=new WriteStringToLocalFile();
        /**  * 把所有的目录页都添加到 爬取的目标URL中  */  List<String> targetRequests = new ArrayList<String>();
        targetRequests.add(page.getUrl().toString());
        page.addTargetRequests(targetRequests);
//        获得传递过来的书籍名称
        String  bookName=page.getRequest().getExtra("bookName").toString();
        System.out.println("***********执行processDownBook：执行下载图书： "+"《"+bookName+"》");
        count++;

//            获得章节
        String chapter = page.getHtml().xpath("//div[@class=\"readout\"]/h1/text()").toString();
//            获得内容
        String content = page.getHtml().xpath("//div[@class=\"shuneirong\"]/text()").toString();
        String allContent=chapter+"\r\n"+content+"\r\n";

        try {
            writeStringToLocalFile.startDown(allContent,localPath,bookName,FILESUFFIXTYPE_TXT);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    @RequestMapping("/pachong")
    @ResponseBody
    public void pachopng() {
        long startTime, endTime;
        System.out.println("开始爬取...");
        startTime = System.currentTimeMillis();
        //启动爬虫
        Spider.create(new MyBlogMagic())
                //添加初始化的URL
                .addUrl("http://www.freexs.org")
                //启动10个线程
                .thread(5).addPipeline(new ConsolePipeline())
                //运行
                .run();
//        Spider.create(new GetBooklinks()).setScheduler(new PriorityScheduler()).run();;
        endTime = System.currentTimeMillis();
        System.out.println("爬取结束，耗时约" + ((endTime - startTime) / 1000) + "秒，抓取了"+count+"条记录");
    }
}
