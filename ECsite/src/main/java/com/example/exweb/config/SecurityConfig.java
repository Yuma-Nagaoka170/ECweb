package com.example.exweb.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

  

    public SecurityConfig() {
        
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // CSRFを無効化（API向け）
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS設定
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // セッション管理を無効化（JWT使用のため）
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/products", "/favicon.ico").permitAll() // ホーム・製品ページ許可
                .requestMatchers("/login").permitAll()
                .requestMatchers("/home").permitAll()
                .requestMatchers("/css/**", "/js/**", "/images/**", "/img/**").permitAll() // 静的リソース許可
                .requestMatchers("/api/auth/**").permitAll() // 認証API許可
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll() // 商品取得API許可
                .requestMatchers("/api/orders/**").authenticated() // 注文APIは認証必須
                .anyRequest().authenticated() // その他は認証必須
            )
            .formLogin(form -> form
                .loginPage("/login") // カスタムログインページ
                .defaultSuccessUrl("/home", true) // 認証成功時のリダイレクト先
                .failureUrl("/login?error=true") // 認証失敗時のリダイレクト先
                .permitAll() // 認証なしでアクセス可能
            );
         

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:8080")); // 許可するオリジン
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 許可するHTTPメソッド
        config.setAllowedHeaders(List.of("Authorization", "Content-Type")); // 許可するヘッダー
        config.setExposedHeaders(List.of("Authorization")); // クライアントに返すヘッダー

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // 全てのエンドポイントにCORS設定適用
        return source;
    }
}
