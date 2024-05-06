package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BackendController {

    private final BackendService service;

    @PostMapping("/mitarbeiter")
    public Mitarbeiter createMitarbeiter(@RequestBody Mitarbeiter mitarbeiter) {
        return service.createMitarbeiter(mitarbeiter);
    }

    @GetMapping("/mitarbeiter/extended")
    public Optional<List<Mitarbeiter>> getExtendedMitarbeiter(@RequestBody ExtendedSearch search) {
        return service.getExtendedMitarbeiter(search);
    }

    @PutMapping("/mitarbeiter/{userId}")
    public Mitarbeiter updateMitarbeiter(@PathVariable String userId, @RequestBody Mitarbeiter mitarbeiter) {
        return service.updateMitarbeiter(userId, mitarbeiter);
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
