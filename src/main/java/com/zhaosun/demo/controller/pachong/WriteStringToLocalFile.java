package com.zhaosun.demo.controller.pachong;

/**
 * @Author:hzhao
 * @Date:2019/3/1814:42
 */
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 *文件增量下载
 *
 * @Author:          郭航飞
 * @CreateDate:   2018/4/27 15:24
 **/
public class WriteStringToLocalFile {

    public static final String  FILESUFFIXTYPE_TXT=".txt";
    public static final String  FILESUFFIXTYPE_PDF=".pdf";

    /**
     * 本地文件地址
     */
    private String localFilePath;
    /**
     * 字符串
     */
    private String strings;
    /**
     *文件名称
     */
    private String fileName;
    /**
     * 文件后缀
     */
    private String fileSuffixType;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getLocalFilePath() {
        return localFilePath;
    }

    public void setLocalFilePath(String localFilePath) {
        this.localFilePath = localFilePath;
    }

    public String getFileSuffixType() {
        return fileSuffixType;
    }

    public void setFileSuffixType(String fileSuffixType) {
        this.fileSuffixType = fileSuffixType;
    }
    public String getStrings() { return strings; }

    public void setStrings(String strings) { this.strings = strings; }

    /**
     *开始执行下载
     *
     * @Author:          郭航飞
     * @CreateDate:   2018/4/27 15:43
     * @param
     * @return
     **/
    public void startDown(String strings,String localFilePath,String fileName,String fileSuffixType) throws IOException {

        //            将文本写入本地
        FileOutputStream fop = null;
        File file;
        try {
            file = new File(localFilePath+fileName+fileSuffixType);
            fop = new FileOutputStream(file,true);

            if (!file.exists()) {
                file.createNewFile();
            }
            byte[] contentInBytes = strings.getBytes();
            fop.write(contentInBytes);
            fop.flush();
            fop.close();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fop != null) {
                    fop.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

}
