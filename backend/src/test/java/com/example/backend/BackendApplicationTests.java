package com.example.backend;

import com.example.backend.config.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
class BackendApplicationTests {

    private static final String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNzE2OTY1NDU5LCJleHAiOjE3MTY5NjU0NTk1NX0.Ru_R5ZS6IdrgmnUnhAihkwY8FDkv6-xAcSeyqPeRCDc";
    //token needs to be renewed after the year ~ 7564

    @MockBean
    private JwtService jwtService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        when(jwtService.generateToken(any(Mitarbeiter.class))).thenReturn("test");
    }

    @Test
    void testRegisterMethod_shouldReturnTokenTest() throws Exception {
        String jsonString = "{"
                + "\"initialPW\": \"test\","
                + "\"rolle\": \"USER\","
                + "\"stock\": 0,"
                + "\"geschaeftsadresse\": \"\","
                + "\"ort\": \"\","
                + "\"userid\": \"test\","
                + "\"pultnummer\": 1,"
                + "\"gebaeude\": \"\","
                + "\"telefonnummer\": \"\","
                + "\"name\": \"test\","
                + "\"nachname\": \"test\","
                + "\"geschlecht\": \"test\","
                + "\"bildUrl\": \"\","
                + "\"newUserId\": \"\","
                + "\"email\": \"\""
                + "}";

        String expectedResponse = objectMapper.writeValueAsString(Map.of("token", "test"));
        mockMvc.perform(post("/api/auth/register")
                        .content(jsonString)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedResponse));
    }

    @Test
    void testAuthenticateMethod_shouldReturnTokenTest() throws Exception {
        String jsonString = "{"
                + "\"userid\": \"test\","
                + "\"password\": \"test\""
                + "}";

        String expectedResponse = objectMapper.writeValueAsString(Map.of("token", "test"));
        mockMvc.perform(post("/api/auth/authenticate")
                        .content(jsonString)
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedResponse));
    }


@Test
    void testGetMitarbeiterRolle_shouldReturn() throws Exception {
    mockMvc.perform(get("/api/user/getrole")
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().string("USER")
    );
}


}