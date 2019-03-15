package com.zhaosun.demo.controller.rabbitMq;

import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RabbitListener(queues = "msg")
public class MsgReceiver {
    @RabbitHandler
    public void process(String msg) {
       System.out.println(msg);
    }

}