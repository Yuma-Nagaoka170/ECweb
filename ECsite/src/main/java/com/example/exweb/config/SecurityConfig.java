package com.example.exweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/products", "/static/**", "/images/**", "/login").permitAll() // ホームページ、商品ページ、静的リソース、ログインページは誰でもアクセス可能
                .requestMatchers("/api/products/**").permitAll() // REST APIも許可
                .anyRequest().authenticated() // その他のページは認証が必要
            )
            .formLogin(login -> login
                .loginPage("/login") // ログインページの URL
                .defaultSuccessUrl("/products", true) // ログイン成功後にリダイレクトする URL
                .permitAll() // ログインページは誰でもアクセス可能
            )
            .logout(logout -> logout
                .logoutUrl("/logout") // ログアウトの URL
                .logoutSuccessUrl("/") // ログアウト成功後にリダイレクトする URL
                .permitAll() // ログアウトページは誰でもアクセス可能
            );

        return http.build(); // セキュリティ設定を適用
    }
}
