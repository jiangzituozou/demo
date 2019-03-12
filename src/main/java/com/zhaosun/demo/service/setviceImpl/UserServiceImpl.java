package com.zhaosun.demo.service.setviceImpl;

import com.zhaosun.demo.dao.UserDao;
import com.zhaosun.demo.domain.UserDo;
import com.zhaosun.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private BCryptPasswordEncoder encoder;
    @Override
    public Boolean register(UserDo userDo) {
        userDo.setPassword(encoder.encode(userDo.getPassword()));
        UserDo user = userDao.save(userDo);
        if (user!=null){
            return true;
        }else {
            return false;
        }
    }
    @Override
    public Boolean login(UserDo userDo){
        List<UserDo> list = userDao.findByTelephone(userDo.getTelephone());
        if (list.size()>0){
            if (encoder.matches(userDo.getPassword(),list.get(0).getPassword())){
                return true;
            }else {
                return false;
            }
        }
        return false;
    }
}
