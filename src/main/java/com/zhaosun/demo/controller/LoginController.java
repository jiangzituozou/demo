package com.zhaosun.demo.controller;

import com.zhaosun.demo.domain.UserDo;
import com.zhaosun.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
    @Autowired
    private UserService userService;
    @PostMapping("/login")
    @ResponseBody
    public Boolean login(UserDo userDo){
        return userService.login(userDo);
    }
}
