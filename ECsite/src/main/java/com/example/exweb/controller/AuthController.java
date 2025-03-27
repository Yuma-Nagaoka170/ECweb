package com.example.exweb.controller;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.exweb.dto.LoginRequest;
import com.example.exweb.service.UserDetailsServiceImpl;

@Controller // @RestControllerではなく@Controllerを使用
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsServiceImpl userDetailsService;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest request) {
        try {
            // Spring Security で認証を行う
            var authenticationToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
            var authentication = authenticationManager.authenticate(authenticationToken);

            // 認証成功なら SecurityContext を更新
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 認証成功時にリダイレクト
            return ResponseEntity.status(HttpStatus.FOUND)
                                 .location(URI.create("/home")) // リダイレクト先
                                 .build();
        } catch (Exception e) {
            // 認証失敗時の処理
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // login.htmlを返す
    }
}
