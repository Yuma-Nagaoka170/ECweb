package com.example.exweb.debug;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "newpassword"; // ここに設定したいパスワード
        String hashedPassword = encoder.encode(rawPassword);
        System.out.println("ハッシュ化されたパスワード: " + hashedPassword);
    }
}
