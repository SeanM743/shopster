package com.shopster.user.repository;

import com.shopster.user.entity.UserSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for UserSession entity operations
 */
@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Long> {
    
    /**
     * Find session by refresh token
     */
    Optional<UserSession> findByRefreshToken(String refreshToken);
    
    /**
     * Find all active sessions for a user
     */
    @Query("SELECT s FROM UserSession s WHERE s.user.id = :userId AND s.expiresAt > :now")
    List<UserSession> findActiveSessionsByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
    
    /**
     * Find session by user and device info
     */
    Optional<UserSession> findByUserIdAndDeviceInfo(Long userId, String deviceInfo);
    
    /**
     * Delete expired sessions
     */
    @Modifying
    @Query("DELETE FROM UserSession s WHERE s.expiresAt < :now")
    void deleteExpiredSessions(@Param("now") LocalDateTime now);
    
    /**
     * Delete all sessions for a user (for logout all devices)
     */
    @Modifying
    @Query("DELETE FROM UserSession s WHERE s.user.id = :userId")
    void deleteAllUserSessions(@Param("userId") Long userId);
    
    /**
     * Count active sessions for a user
     */
    @Query("SELECT COUNT(s) FROM UserSession s WHERE s.user.id = :userId AND s.expiresAt > :now")
    Long countActiveSessionsByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
}