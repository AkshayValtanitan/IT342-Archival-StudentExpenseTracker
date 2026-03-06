package edu.cit.archival.archival.studentexpensetracker.controller;

import edu.cit.archival.archival.studentexpensetracker.dto.ApiResponse;
import edu.cit.archival.archival.studentexpensetracker.entity.User;
import edu.cit.archival.archival.studentexpensetracker.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse> me(HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Not logged in"));
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, "User not found"));
        }

        Map<String, Object> userData = Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail()
        );
        return ResponseEntity.ok(new ApiResponse(true, "Success", userData));
    }
}