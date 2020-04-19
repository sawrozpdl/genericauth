package com.generics.auth.service;

import com.generics.auth.store.RequestFilter;
import com.generics.auth.exception.HttpException;
import com.generics.auth.model.User;
import com.generics.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Page<User> getAllUsers(RequestFilter filter) {
        return userRepository.findAll(PageRequest.of(filter.page, filter.size));
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
        }
        return user;
    }

    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
        }

        userRepository.deleteByUsername(username);
    }

}
