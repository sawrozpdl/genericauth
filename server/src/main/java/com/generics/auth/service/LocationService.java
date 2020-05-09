package com.generics.auth.service;

import com.generics.auth.exception.HttpException;
import com.generics.auth.model.Location;
import com.generics.auth.repository.LocationRepository;
import com.generics.auth.utils.Error;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LocationService {

    @Autowired
    LocationRepository locationRepository;

    public boolean locationExists(Integer id) {
        return locationRepository.existsById(id);
    }

    public Location geLocation(Integer id) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isPresent())
            return location.get();
        throw new HttpException(Error.missing("Location", "id", id), HttpStatus.NOT_FOUND);
    }

    public Location updateLocation(Integer id, Location newLocation) {
        Optional<Location> location = locationRepository.findById(id);
        if (location.isPresent()) {
            newLocation.setId(location.get().getId());
            return locationRepository.save(newLocation);
        }
        throw new HttpException(Error.missing("Location", "id", id), HttpStatus.NOT_FOUND);
    }
}
