package com.generics.auth.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

//@Configuration
//@EnableSwagger2
public class SwaggerConfiguration {


//    @Bean
    public Docket authApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.generics.auth"))
                .build()
                .apiInfo(meta())
                .securitySchemes(new ArrayList<>(Collections.singletonList(new ApiKey("Bearer %token", "Authorization", "Header"))))
                .tags(new Tag("users", "Operations about users"))
                .tags(new Tag("ping", "Just a ping"))
                .genericModelSubstitutes(Optional.class);
    }

    private ApiInfo meta() {
        return new ApiInfoBuilder()
                .title("Generic Auth API")
                .description(
                        "This is a Generic JWT authentication service. You can find out more about JWT at [https://jwt.io/](https://jwt.io/).")
                .version("0.1.0")
                .license("MIT License").licenseUrl("http://opensource.org/licenses/MIT")
                .contact(new Contact("Saroj Paudyal", "https://sarojpaudyal.com.np", "sarojpaudyal53@gmail.com"))
                .build();
    }
}
