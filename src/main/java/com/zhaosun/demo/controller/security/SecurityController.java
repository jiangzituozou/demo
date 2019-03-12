package com.zhaosun.demo.controller.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SecurityController {
    @Autowired
    private BCryptPasswordEncoder encoder;
    @RequestMapping("/secutityRes")
    @ResponseBody
    public void securityRes(){
        System.out.println("_________________"+encoder.encode("zh05020429")+"___________________");
    }

    @RequestMapping("/secutityLogin")
    @ResponseBody
    public boolean securityLogin(){
        if(encoder.matches("zh05020429","$2a$10$aSP8sS2sOCz7qGICzyGe234Pv1zjorK5Bgs3maayqgF2THFbk9Sia")){
            return true;
        }else {
            return false;
        }
    }
}
