package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BackendController {

    private final BackendService service;

    @PostMapping("/mitarbeiter")
    public Mitarbeiter createMitarbeiter(@RequestBody Mitarbeiter mitarbeiter) {
        return service.createMitarbeiter(mitarbeiter);
    }

    @PutMapping("/mitarbeiter/{id}")
    public Mitarbeiter updateMitarbeiter(@PathVariable int id, @RequestBody Mitarbeiter mitarbeiter) {
        return service.updateMitarbeiter(id, mitarbeiter);
    }

    @GetMapping("/mitarbeiter")
    public List<Mitarbeiter> getAllMitarbeiter() {
        return service.getAllMitarbeiter();
    }

    @GetMapping("/mitarbeiter/{id}")
    public Mitarbeiter getMitarbeiterById(@PathVariable int id) {
        return service.getMitarbeiterById(id);
    }

    @DeleteMapping("/mitarbeiter/{id}")
    public void deleteMitarbeiter(@PathVariable int id) {
        service.deleteMitarbeiter(id);
    }
}
