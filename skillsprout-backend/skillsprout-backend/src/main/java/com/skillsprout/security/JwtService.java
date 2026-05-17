package com.skillsprout.security;

import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.util.Collection;

import java.util.Date;

import java.util.HashMap;

import java.util.Map;

import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET_KEY =

            "mySuperSecretKeyForJwtAuthenticationMySuperSecretKey";

    // SIGNING KEY

    private SecretKey getSignInKey() {

        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }

    // GENERATE TOKEN

    public String generateToken(
            UserDetails userDetails
    ) {

        Map<String, Object> claims =
                new HashMap<>();

        // STORE ROLE

        claims.put(

                "roles",

                userDetails
                        .getAuthorities()
                        .stream()
                        .map(
                                GrantedAuthority::getAuthority
                        )
                        .toList()
        );

        return Jwts.builder()

                .claims(claims)

                .subject(
                        userDetails.getUsername()
                )

                .issuedAt(
                        new Date()
                )

                .expiration(

                        new Date(

                                System.currentTimeMillis()
                                        +
                                        1000 * 60 * 60 * 24
                        )
                )

                .signWith(
                        getSignInKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    // EXTRACT USERNAME

    public String extractUsername(
            String token
    ) {

        return extractClaim(
                token,
                Claims::getSubject
        );
    }

    // EXTRACT SINGLE CLAIM

    public <T> T extractClaim(

            String token,

            Function<Claims, T> claimsResolver
    ) {

        final Claims claims =
                extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    // EXTRACT ALL CLAIMS

    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parser()

                .verifyWith(
                        getSignInKey()
                )

                .build()

                .parseSignedClaims(token)

                .getPayload();
    }

    // VALIDATE TOKEN

    public boolean isTokenValid(

            String token,

            UserDetails userDetails
    ) {

        final String username =
                extractUsername(token);

        return username.equals(
                userDetails.getUsername()
        )

                &&
                !isTokenExpired(token);
    }

    // CHECK EXPIRY

    private boolean isTokenExpired(
            String token
    ) {

        return extractClaim(

                token,

                Claims::getExpiration

        ).before(
                new Date()
        );
    }
}