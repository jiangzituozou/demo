package com.zhaosun.demo.controller.rabbitMq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MsgController {
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @RequestMapping("/rabbit")
    @ResponseBody
    public  void rabbit(){
        rabbitTemplate.convertAndSend("msg","hang");

    }
}
