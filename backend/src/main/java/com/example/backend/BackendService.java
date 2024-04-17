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

    public Mitarbeiter updateMitarbeiter(int id, Mitarbeiter mitarbeiterDetails) {
        Mitarbeiter mitarbeiter = repo.findById(id).orElseThrow();
        mitarbeiter.setName(mitarbeiterDetails.getName());

        return repo.save(mitarbeiter);
    }

    public List<Mitarbeiter> getAllMitarbeiter() {
        return repo.findAll();
    }

    public Mitarbeiter getMitarbeiterById(int id) {
        return repo.findById(id).orElseThrow();
    }

    public void deleteMitarbeiter(int id) {
        repo.deleteById(id);
    }
}
