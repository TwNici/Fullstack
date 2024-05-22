package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final BackendService service;
    @PostMapping("/mitarbeiter")
    public Mitarbeiter createMitarbeiter(@RequestBody Mitarbeiter mitarbeiter) {
        return service.createMitarbeiter(mitarbeiter);
    }

    @GetMapping("/mitarbeiter/extended")
    public Optional<List<Mitarbeiter>> getExtendedMitarbeiter(@RequestBody ExtendedSearch search) {
        return service.getExtendedMitarbeiter(search);
    }

    @PutMapping("/mitarbeiter")
    public Mitarbeiter updateMitarbeiter(@RequestBody Mitarbeiter mitarbeiter) {
        return service.updateMitarbeiter(mitarbeiter);
    }

    @PutMapping("/mitarbeiter/password")
    public boolean updateMitarbeiterPassword( @RequestBody String password, @RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            return service.updateMitarbeiterPassword(token, password);
        } else return false;
    }

    @GetMapping("/mitarbeiter")
    public List<Mitarbeiter> getAllMitarbeiter() {
        return service.getAllMitarbeiter();
    }

    @GetMapping("/mitarbeiter/{userid}")
    public Optional<Mitarbeiter> findMitarbeiterByUserId(@PathVariable String userid) {
        return service.getMitarbeiterByUserId(userid);
    }

    @GetMapping("/mitarbeiter/specific")
    public Mitarbeiter getMitarbeiterById(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            return service.getMitarbeiterById(token);
        }
        return null;
    }

    @GetMapping("/mitarbeiter/specific/{userId}")
    public Optional<Mitarbeiter> getMitarbeiterByUserId(@PathVariable String userId) {

        return service.getMitarbeiterByUserId(userId);

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

    @GetMapping("/getrole")
    public Role getRole(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            return service.getRole(token);
        }
        else return null;
    }

}
