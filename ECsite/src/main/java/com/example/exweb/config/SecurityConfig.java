package com.example.exweb.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
            // 🔹 CORS設定を適用
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            
            // 🔹 CSRFを無効化（API利用時に問題がある場合、一時的に無効化）
            .csrf(csrf -> csrf.disable())
            
            // 🔹 認可設定
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/products", "/static/**", "/images/**", "/login").permitAll()
                .requestMatchers("/api/products/**").permitAll()
                .requestMatchers("/api/orders/**").authenticated()
                .anyRequest().authenticated()
            )

            // 🔹 フォームログインの設定
            .formLogin(login -> login
                .loginPage("/login")
                .defaultSuccessUrl("/products", true)
                .permitAll()
            )

            // 🔹 ログアウト設定
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .permitAll()
            );

        return http.build();
    }

    // 🔹 CORSの設定（CORSを適用する正しい方法）
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://frontend.example.com")); // フロントエンドのURL
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true); // クッキーの送信を許可
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
