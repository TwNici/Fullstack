package com.example.backend.auth;

import com.example.backend.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String initialPW;
    private Role rolle;
    private Integer stock;
    private String geschaeftsadresse;
    private String ort;
    private String userid;
    private Integer pultnummer;
    private String gebaeude;
    private String telefonnummer;
    private String name;
    private String nachname;
    private String geschlecht;
    private String bildUrl;
    private String newUserId;
    private String email;

    public RegisterRequest(RegisterRequest build) {
    }
}

/*{
  "initialPW": "ddd",
  "rolle": "USER",
  "stock": 0,
  "geschaeftsadresse": "d",
  "ort": "d",
  "userid": "luej9123",
  "pultnummer": 1,
  "gebaeude": "dd",
  "telefonnummer": "+222",
  "name": "kuan",
  "nachname": "kobold",
  "geschlecht": "gemail",
  "bildUrl": "lol",
  "newUserId": "",
  "email": ""
}*/
