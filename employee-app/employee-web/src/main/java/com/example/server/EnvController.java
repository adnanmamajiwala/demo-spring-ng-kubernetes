package com.example.server;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnvController {

    @Value("${spring.profiles.active}")
    private String profile;

    @GetMapping("/profile")
    public Env profile() {
        return new Env(profile);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    private static class Env {
        String profile;
    }

}
