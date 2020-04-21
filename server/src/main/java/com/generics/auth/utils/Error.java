package com.generics.auth.utils;

public class Error {

    public static <T> String missing(String entity, String key, T value) {
        return String.format("%s with %s: '%s' doesn't exist", entity, key, String.valueOf(value));
    }

    public static <T> String duplicate(String entity, String key, T value) {
        return String.format("%s with %s: '%s' already exists", entity, key, String.valueOf(value));
    }

}

