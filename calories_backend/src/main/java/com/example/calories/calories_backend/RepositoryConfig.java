package com.example.calories.calories_backend;

import com.example.calories.calories_backend.entities.AppUser;
import com.example.calories.calories_backend.entities.Record;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(AppUser.class, Record.class);
    }
}
