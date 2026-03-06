package com.example.project.controller;

import com.example.project.dto.ApiResponse;
import com.example.project.dto.AuthRequest;
import com.example.project.entity.User;
import com.example.project.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody AuthRequest request) {
        String name = request.getName();
        String email = request.getEmail();
        String password = request.getPassword();

        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Name is required"));
        }
        if (email == null || !email.contains("@")) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "A valid email is required"));
        }
        if (password == null || password.length() < 6) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Password must be at least 6 characters"));
        }
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ApiResponse(false, "Email already registered"));
        }

        User user = new User();
        user.setName(name.trim());
        user.setEmail(email.trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody AuthRequest request,
                                             HttpSession session) {
        String email = request.getEmail();
        String password = request.getPassword();

        if (email == null || password == null) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Email and password are required"));
        }

        User user = userRepository.findByEmail(email.trim().toLowerCase()).orElse(null);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid email or password"));
        }

        session.setAttribute("email", email.trim().toLowerCase());
        return ResponseEntity.ok(new ApiResponse(true, "Login successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok(new ApiResponse(true, "Logged out successfully"));
    }
}