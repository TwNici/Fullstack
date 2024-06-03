package com.example.backend;

import com.example.backend.config.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
@EnableAutoConfiguration(exclude = { SecurityAutoConfiguration.class })
class BackendApplicationTests {

    private static final String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNzE2OTY1NDU5LCJleHAiOjE3MTY5NjU0NTk1NX0.Ru_R5ZS6IdrgmnUnhAihkwY8FDkv6-xAcSeyqPeRCDc";
    //token needs to be renewed after the year ~ 7564

    private static final Mitarbeiter test = Mitarbeiter.builder().userid("test").rolle(Role.USER).initialPW("test").bildUrl("").gebaeude("").geschaeftsadresse("").geschlecht("").nachname("").ort("").telefonnummer("").pultnummer(0).stock(0).build();
    @MockBean
    private JwtService jwtService;

    @Mock
    private BackendRepository repo;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        when(jwtService.generateToken(any(Mitarbeiter.class))).thenReturn("test");
        when(repo.save(any(Mitarbeiter.class))).thenReturn(test);
        when(repo.findById(any(String.class))).thenReturn(Optional.ofNullable(test));
    }

    @Test
    void testRegisterMethod_shouldReturnTokenTest() throws Exception {
        String expectedResponse = objectMapper.writeValueAsString(Map.of("token", "test"));
        mockMvc.perform(post("/api/auth/register")
                        .content(objectMapper.writeValueAsString(test))
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedResponse));
    }

    @Test
    void testAuthenticateMethod_shouldReturnTokenTest() throws Exception {
        String expectedResponse = objectMapper.writeValueAsString(Map.of("token", "test"));
        mockMvc.perform(post("/api/auth/authenticate")
                        .content(objectMapper.writeValueAsString(test))
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedResponse));
    }


}