package com.example.backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Mitarbeiter implements UserDetails {


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

    @Column(columnDefinition = "text")
    private String bildUrl;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(rolle.name()));
    }

    @Override
    public String getPassword() {
        return initialPW;
    }

    @Override
    public String getUsername() {
        return userid;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
