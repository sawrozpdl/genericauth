package com.generics.auth.service;

import com.generics.auth.model.App;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.exception.HttpException;
import com.generics.auth.model.User;
import com.generics.auth.repository.UserRepository;
import com.generics.auth.utils.Error;
import com.generics.auth.utils.Gen;
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

    public boolean usernameTakenForApp(String appName, String username) {
        return userRepository.existsByUsernameInApp(username, appName);
    }

    public Page<User> getAllUsers(RequestFilter filter) {
        return userRepository.findAll(PageRequest.of(filter.page, filter.size));
    }

    public User createUser(User user, App app) {
        String appName = app.getName();
        String[] userExists =  userRepository.existsByEmail(user.getEmail()) ?
                new String[]{"email ", user.getEmail()} : null;

        if (userExists != null) {
            throw new  HttpException(Error.duplicate("User", userExists[0], userExists[1]), HttpStatus.BAD_REQUEST);
        }

        if (usernameTakenForApp(appName, user.getUsername()))
            throw new HttpException("Username already taken", HttpStatus.BAD_REQUEST);

        user.setPassword(Gen.getMD5From(user.getPassword()));

        return userRepository.save(user);
    }

    public boolean userExistsInApp(String username, String appName) {
        return userRepository.existsByUsernameInApp(username, appName);
    }

    public User authenticateUser(String username, String password, String appName) {
        Optional<User> user = userRepository.findUserByUserNamePasswordAndAppName(username, password, appName);
        return user.orElse(null);
    }

    public User getUserByUsernameForApp(String username, String appName) {
        Optional<User> user = userRepository.findUserByUsernameAndAppName(username, appName);
        if (user.isPresent())
            return user.get();

        throw new HttpException(String.format("%s in %s",Error
                .missing("User", "username", username), appName), HttpStatus.NOT_FOUND);
    }

    public User getUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent())
            return user.get();

        throw new HttpException(Error.missing("User", "id", id), HttpStatus.NOT_FOUND);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public User updateUserByUsernameForApp(String username, String appName, User user) {
        User oldUser  = getUserByUsernameForApp(username, appName);

        oldUser.setFirstName((user.getFirstName()));
        oldUser.setMiddleName((user.getMiddleName()));
        oldUser.setLastName((user.getLastName()));
        oldUser.setGender((user.getGender()));
        oldUser.setBirthDate((user.getBirthDate()));
        oldUser.setPhoneNumber((user.getPhoneNumber()));

        return userRepository.save(oldUser);
    }

    public void deleteUserById(Integer id) {
        if (userRepository.existsById(id))
            userRepository.deleteById(id);

        else throw new HttpException(Error.missing("User", "id", id), HttpStatus.NOT_FOUND);
    }

    public Page<User> getAllUsersInApp(String appName, String search, boolean active, RequestFilter filter) {
        return userRepository.findUsersByAppName(appName, search, active, PageRequest.of(filter.page, filter.size));
    }

    public void changePassword(User user, String password) {
        user.setPassword(Gen.getMD5From(password));
        userRepository.save(user);
    }
}
