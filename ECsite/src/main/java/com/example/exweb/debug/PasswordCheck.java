package com.example.exweb.debug; // 任意のパッケージにする

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordCheck {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password";  // 実際に試したいパスワードにする
        String dbHashedPassword = "$2a$10$Z1rD1Xe2DOkkk"; // DBのハッシュ

        boolean matches = encoder.matches(rawPassword, dbHashedPassword);
        System.out.println("パスワードが一致するか？ " + matches);
    }
    

    
    }


