package com.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BackendService {

    private final BackendRepository repo;

    public Mitarbeiter createMitarbeiter(Mitarbeiter mitarbeiter) {
        return repo.save(mitarbeiter);
    }

    public Mitarbeiter updateMitarbeiter(String userId, Mitarbeiter mitarbeiterDetails) {
        repo.deleteById(userId);
        return repo.save(mitarbeiterDetails);
    }

    public List<Mitarbeiter> getAllMitarbeiter() {
        return repo.findAll();
    }

    public Mitarbeiter getMitarbeiterById(String userId) {
        return repo.findById(userId).orElseThrow();
    }

    public void deleteMitarbeiter(String userId) {
        repo.deleteById(userId);
    }
}
