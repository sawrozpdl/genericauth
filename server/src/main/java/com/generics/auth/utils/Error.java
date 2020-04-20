package com.generics.auth.utils;

public class Error {

    public static String missing(String entity, String key, String value) {
        return String.format("%s with %s: '%s' doesn't exist", entity, key, value);
    }

    public static String duplicate(String entity, String key, String value) {
        return String.format("%s with %s: '%s' already exists", entity, key, value);
    }

}

