package com.zhaosun.demo.dao;

import com.zhaosun.demo.domain.UserDo;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface UserDao extends JpaRepository<UserDo, Integer> {
    @Override
    UserDo save(UserDo userDo);

    List<UserDo> findByTelephone(String telephone);
    ;
}
