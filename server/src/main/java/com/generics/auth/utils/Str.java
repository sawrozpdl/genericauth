package com.generics.auth.utils;

import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import static java.nio.charset.StandardCharsets.UTF_8;

public class Str {

    public static String asString(Resource resource) {
        try (Reader reader = new InputStreamReader(resource.getInputStream(), UTF_8)) {
            return FileCopyUtils.copyToString(reader);
        } catch (IOException e) {
            return  "";
        }
    }

    public static String format(String raw, String[] args) {
        for (String arg : args) {
            String[] items = arg.split("::");
            raw = raw.replaceAll(String.format("\\{\\{%s\\}\\}", items[0]), items[1]);
        }
        return  raw;
    }
}
