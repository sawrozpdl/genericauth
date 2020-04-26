package com.generics.auth.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Gen {

    public static String getMD5From(String data) {
        MessageDigest messageDigest= null;
        try {
            messageDigest = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return "";
        }
        messageDigest.update(data.getBytes());
        byte[] digest=messageDigest.digest();
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(Integer.toHexString((int) (b & 0xff)));
        }
        return sb.toString();
    }

    public static String base64Decode(String payload) {
        byte[] decodedBytes = Base64.getDecoder().decode(payload);
        return new String(decodedBytes);
    }

    public static String base64Encode(String payload) {
        byte[] toDecodeBytes = payload.getBytes();
        return Base64.getEncoder().encodeToString(toDecodeBytes);
    }

}
