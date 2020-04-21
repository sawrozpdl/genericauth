package com.generics.auth.service;

import com.generics.auth.store.RequestFilter;
import com.generics.auth.exception.HttpException;
import com.generics.auth.model.User;
import com.generics.auth.repository.UserRepository;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public Page<User> getAllUsers(RequestFilter filter) {
        return userRepository.findAll(PageRequest.of(filter.page, filter.size));
    }

    public User createUser(User user) {
        String[] userExists = userRepository.existsByUsername(user.getUsername()) ?
                new String[]{"username", user.getUsername()} : userRepository.existsByEmail(user.getEmail()) ?
                new String[]{"email ", user.getEmail()} : null;

        if (userExists != null) {
            throw new  HttpException(Error.duplicate("User", userExists[0], userExists[1]), HttpStatus.BAD_REQUEST);
        }

        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent())
            return user.get();

        throw new HttpException(Error.missing("User", "username", username), HttpStatus.NOT_FOUND);
    }

    public void deleteUserByUsername(String username) {
        if (userRepository.existsByUsername(username))
            userRepository.deleteByUsername(username);

        throw new HttpException(Error.missing("User", "username", username), HttpStatus.NOT_FOUND);
    }

}
