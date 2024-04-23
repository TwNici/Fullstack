package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BackendRepository extends JpaRepository<Mitarbeiter, String> {}
