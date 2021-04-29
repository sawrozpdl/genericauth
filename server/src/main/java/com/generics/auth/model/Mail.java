package com.generics.auth.model;

import java.util.ArrayList;

public class Mail {

    ArrayList<String> toEmails = new ArrayList<String>();
    String from;
    String message;
    String subject;

    public ArrayList<String>  getToEmails() {
        return toEmails;
    }

    public void setToEmails(ArrayList<String>  toEmails) {
        this.toEmails = toEmails;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
