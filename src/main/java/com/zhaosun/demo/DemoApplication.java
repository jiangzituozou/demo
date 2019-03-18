package com.zhaosun.demo;

import com.zhaosun.demo.server.DiscardServer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.Resource;
@Configuration
@SpringBootApplication
@EnableScheduling
public class DemoApplication implements CommandLineRunner{

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
    @Resource
    private DiscardServer discardServer;

    @Override
    public void run(String... args) throws Exception {
        discardServer.run(8091);
    }
    @Bean
    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }

}

