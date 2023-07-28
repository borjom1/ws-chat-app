package com.example.wschatapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserLoginDto {

    @NotBlank(message = "should not be blank")
    @Size(min = 3, max = 15, message = "length should be within 3 and 15")
    private String login;

    @NotBlank(message = "should not be blank")
    @Size(min = 3, max = 15, message = "length should be within 3 and 15")
    private String password;

}