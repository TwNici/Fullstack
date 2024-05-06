package com.example.backend;

import com.example.backend.User.Role;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Mitarbeiter {


    private String name;
    private String nachname;
    private String geschlecht;
    private String telefonnummer;
    private String ort;
    private String initialPW;
    private Role rolle;
    private String geschaeftsadresse;
    private int stock;
    private int pultnummer;
    private String gebaeude;

    @Id
    private String userid;

    @Column(columnDefinition = "longtext")
    private String bildUrl;
}
