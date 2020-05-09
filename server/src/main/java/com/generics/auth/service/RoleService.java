package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.Role;
import com.generics.auth.repository.RoleRepository;
import com.generics.auth.object.RequestFilter;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public boolean roleExists(String name) {
        return roleRepository.existsByName(name);
    }

    public Page<Role> getAllRoles(RequestFilter filter) {
        return roleRepository.findAll(PageRequest.of(filter.page, filter.size));
    }

    public Role geRoleByName(String name) {
        Optional<Role> role = roleRepository.findByName(name);
        if (role.isPresent())
            return role.get();
        throw new HttpException(Error.missing("Role", "name", name), HttpStatus.NOT_FOUND);
    }

    public Role createRole(Role role) {
        if (roleRepository.existsByName(role.getName())) {
            throw new  HttpException(Error.duplicate("Role", "name", role.getName()), HttpStatus.BAD_REQUEST);
        }
        roleRepository.save(role);
        return  role;
    }

    public Role updateRole(String name, Role newRole) {
        Optional<Role> role = roleRepository.findByName(name);
        if (role.isPresent()) {
            newRole.setId(role.get().getId());
            return roleRepository.save(newRole);
        }
        throw new HttpException(Error.missing("Role", "name", name), HttpStatus.NOT_FOUND);
    }

    public void deleteRoleByName(String name) {
        if (roleRepository.existsByName(name))
            roleRepository.deleteByName(name);
        throw new HttpException(Error.missing("Role", "name", name), HttpStatus.NOT_FOUND);
    }

    public Role getOrCreateRole(Role role) {
        Optional<Role> existingRole = roleRepository.findByName(role.getName());
        return existingRole.orElseGet(() -> roleRepository.save(role));
    }
}
