package com.generics.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class MailService {

    @Value("${smtp.server}")
    private String host;

    @Value("${smtp.port}")
    private Integer port;

    @Value("${smtp.username}")
    private String username;

    @Value("${smtp.password}")
    private String password;

    public void send(String to, String subject, String text, String from) throws MessagingException {
        System.out.println(username + password + to);
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(host);
        mailSender.setPort(port);

        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        MimeMessage msg = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(msg, "utf-8");
        helper.setTo(to);
        helper.setFrom(from);
        helper.setSubject(subject);
        helper.setText(text, true);

        mailSender.send(msg);
    }
}

