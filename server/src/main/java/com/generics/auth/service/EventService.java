package com.generics.auth.service;

import com.generics.auth.constant.Events;
import com.generics.auth.model.App;
import com.generics.auth.model.Event;
import com.generics.auth.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    public void track(String producer,Events eventName, String consumer, App app) {
        eventRepository.save(new Event(producer, eventName.name(), consumer, app));
    }
}
