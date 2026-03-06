package edu.cit.archival.archival.studentexpensetracker.service;

import edu.cit.archival.archival.studentexpensetracker.entity.User;
import edu.cit.archival.archival.studentexpensetracker.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Register
    public String register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(name.trim());
        user.setEmail(email.trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return "User registered successfully";
    }

    // Login
    public String login(String email, String password) {
        return userRepository.findByEmail(email.trim().toLowerCase())
                .map(user -> passwordEncoder.matches(password, user.getPassword()) ?
                        "Login successful" :
                        "Incorrect password")
                .orElse("User not found");
    }
}