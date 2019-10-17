package com.example.server;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EnvController {

    @Value("${spring.profiles.active}")
    private String profile;

    @GetMapping("/profile")
    public String profile() throws JSONException {
        JSONObject object = new JSONObject();
        object.put("profile", profile);
        return object.toString();
    }

}
