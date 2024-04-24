package com.example.backend;

import jakarta.persistence.*;
import lombok.Data;

import java.lang.reflect.Type;

@Data
@Entity
public class Mitarbeiter {


    private String name;
    private String nachname;
    private String geschlecht;
    private String telefonnummer;
    private String ort;
    private String strasse;
    private String privatadresse;
    private String geschaeftsadresse;
    private int stock;
    private int pultnummer;
    private String gebaeude;

    @Id
    private String userid;

    @Column(columnDefinition = "longtext")
    private String bildUrl;
}
