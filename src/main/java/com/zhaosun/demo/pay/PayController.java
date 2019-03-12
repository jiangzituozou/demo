package com.zhaosun.demo.pay;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PayController {
    @RequestMapping("/pay")
    @ResponseBody
    public String pay(){
        return "支付成功！";
    }
}
