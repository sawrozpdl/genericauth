package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.Profile;
import com.generics.auth.repository.ProfileRepository;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    ProfileRepository profileRepository;

    public Profile updateProfile(Integer id, Profile newProfile) {
        Optional<Profile> profile = profileRepository.findById(id);
        if (profile.isPresent()) {
            newProfile.setId(profile.get().getId());
            return profileRepository.save(newProfile);
        }
        throw new HttpException(Error.missing("Profile", "id", id), HttpStatus.NOT_FOUND);
    }
}
