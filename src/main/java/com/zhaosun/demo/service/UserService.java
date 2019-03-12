package com.zhaosun.demo.service;

import com.zhaosun.demo.domain.UserDo;

public interface UserService {
    Boolean register(UserDo userDo);
    Boolean login(UserDo userDo);
}
