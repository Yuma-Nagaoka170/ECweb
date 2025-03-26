package com.example.exweb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.exweb.model.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    // トークンで検索
    Optional<VerificationToken> findByToken(String token);

    // ユーザーIDで検索
    Optional<VerificationToken> findByUserId(Long userId);
}
