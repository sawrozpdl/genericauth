package com.generics.auth.controller;

import com.generics.auth.model.App;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppController {


    @GetMapping("/api/apps")
    public List<App> getApps(@RequestParam(defaultValue = "1") Integer page,
                             @RequestParam(defaultValue = "10") Integer size,
                             @RequestParam(defaultValue = "") String search,
                             @RequestParam(defaultValue = "") String sort,
                             @RequestParam(defaultValue = "true") Boolean active) {
        return null;
    }

    @PostMapping("/api/apps")
    public App createApp(@RequestBody App app) {
        return app;
    }

    @GetMapping("/api/apps/{appName}")
    public App getAppByName(@PathVariable String appName) {
        return null;
    }

    @PutMapping("/api/apps/{appName}")
    public App updateAppByName(@PathVariable String appName, @RequestBody App app) {
        return app;
    }

    @DeleteMapping(value = "/api/apps/{appName}")
    public void deleteAppByName(@PathVariable String appName) {

    }

}
