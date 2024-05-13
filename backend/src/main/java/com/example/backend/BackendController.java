package com.example.backend;

import com.example.backend.auth.AuthenticationRequest;
import com.example.backend.auth.AuthenticationResponse;
import com.example.backend.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BackendController {

    private final BackendService service;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/mitarbeiter")
    public Mitarbeiter createMitarbeiter(@RequestBody Mitarbeiter mitarbeiter) {
        return service.createMitarbeiter(mitarbeiter);
    }

    @GetMapping("/mitarbeiter/extended")
    public Optional<List<Mitarbeiter>> getExtendedMitarbeiter(@RequestBody ExtendedSearch search) {
        return service.getExtendedMitarbeiter(search);
    }

    @PutMapping("/mitarbeiter")
    public Mitarbeiter updateMitarbeiter( @RequestBody Mitarbeiter mitarbeiter) {
        return service.updateMitarbeiter(mitarbeiter);
    }

    @PutMapping("/mitarbeiter/password")
    public boolean updateMitarbeiterPassword( @RequestBody String userid, String password){
        return service.updateMitarbeiterPassword(userid, password);
    }

    @GetMapping("/mitarbeiter")
    public List<Mitarbeiter> getAllMitarbeiter() {
        return service.getAllMitarbeiter();
    }

    @GetMapping("/mitarbeiter/{userId}")
    public Mitarbeiter getMitarbeiterById(@PathVariable String userId) {
        return service.getMitarbeiterById(userId);
    }

    @GetMapping("/mitarbeiter-bildUrl/{userId}")
    public ResponseEntity<String> getMitarbeiterBildUrl(@PathVariable String userId) {
        Mitarbeiter mitarbeiter = service.getMitarbeiterById(userId);
        return ResponseEntity.ok(mitarbeiter.getBildUrl());
    }




    @DeleteMapping("/mitarbeiter/{userId}")
    public void deleteMitarbeiter(@PathVariable String userId) {
        service.deleteMitarbeiter(userId);

    }

}
