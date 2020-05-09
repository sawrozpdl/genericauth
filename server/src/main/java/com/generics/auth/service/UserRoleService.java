package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.App;
import com.generics.auth.model.User;
import com.generics.auth.model.UserRole;
import com.generics.auth.repository.UserRoleRepository;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserRoleService {
    @Autowired
    UserRoleRepository userRoleRepository;

    public boolean userRoleExists(Integer id) {
        return userRoleRepository.existsById(id);
    }

    public Page<UserRole> getAllUserRoles(RequestFilter filter) {
        return userRoleRepository.findAll(PageRequest.of(filter.page, filter.size));
    }

    public UserRole geUserRole(Integer id) {
        Optional<UserRole> userRole = userRoleRepository.findById(id);
        if (userRole.isPresent())
            return userRole.get();
        throw new HttpException(Error.missing("UserRole", "id", id), HttpStatus.NOT_FOUND);
    }

    public List<String> getUserRolesForApp(String username, String appName) {
        return userRoleRepository.findUserRolesInApp(username, appName);
    }

    public UserRole createUserRole(UserRole userRole) {
        return userRoleRepository.save(userRole);
    }

    public UserRole updateUserRole(Integer id, UserRole newUserRole) {
        Optional<UserRole> userRole = userRoleRepository.findById(id);
        if (userRole.isPresent()) {
            newUserRole.setId(userRole.get().getId());
            return userRoleRepository.save(newUserRole);
        }
        throw new HttpException(Error.missing("UserRole", "id", id), HttpStatus.NOT_FOUND);
    }

    public void deleteUserRole(Integer id) {
        if (userRoleRepository.existsById(id))
            userRoleRepository.deleteById(id);
        throw new HttpException(Error.missing("UserRole", "id", id), HttpStatus.NOT_FOUND);
    }

}
