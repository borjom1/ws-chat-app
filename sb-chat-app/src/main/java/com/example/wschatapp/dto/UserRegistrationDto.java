package com.example.wschatapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserRegistrationDto {

    @NotBlank(message = "should not be blank")
    @Size(min = 3, max = 15, message = "length should be within 3 and 15")
    private String name;

    @NotBlank(message = "should not be blank")
    @Size(min = 3, max = 15, message = "length should be within 3 and 15")
    private String login;

    @NotBlank(message = "should not be blank")
    @Size(min = 6, max = 20, message = "length should be within 6 and 20")
    private String password;

}