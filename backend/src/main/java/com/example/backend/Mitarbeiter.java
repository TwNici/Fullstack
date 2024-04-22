package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Mitarbeiter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int mitarbeiterId;

    private String name;
    private String nachname;
    private String geschlecht;
    private String telefonnummer;
    private String ort;
    private String strasse;
    private String privatadresse;
    private String geschaeftsadresse;
    private String stock;
    private int pultnummer;
    private String gebaeude;
    private String userid;
    private String bildUrl;
}
