package com.zhaosun.demo.controller;

import com.zhaosun.demo.domain.UserDo;
import com.zhaosun.demo.service.UserService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class RegisterController {
    Map<String,Integer> map = new HashMap<>();
    @Autowired
    private UserService userService;
    @Autowired
    private RabbitTemplate rabbitTemplate;
    @PostMapping("/userRegister")
    @ResponseBody
    public Boolean register(UserDo userDo){
        return userService.register(userDo);
    }

    @PostMapping("/sendCheckNumber")
    @ResponseBody
    public void sendCheckNumber(String telephone){
        int i = (int)((Math.random()*9+1)*100000);
        rabbitTemplate.convertAndSend("msg",i);
        map.put(telephone,i);
    }
}
