package com.zhaosun.demo.controller;

import com.zhaosun.demo.domain.UserDo;
import com.zhaosun.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class RegisterController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    @ResponseBody
    public Boolean register(UserDo userDo){
        return userService.register(userDo);
    }
}
