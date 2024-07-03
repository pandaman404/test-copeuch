package com.todolist.backend.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "tarea")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(name = "id")
    private Long id;

    @Column(name = "descripcion")
    @Schema(name = "description", example = "Realizar prueba tecnica", required = true)
    private String description;

    @Column(name = "fechaCreacion")
    @Schema(name = "created_at", example = "2007-12-03T10:15:30")
    private LocalDateTime created_at;

    @Column(name = "vigente")
    @Schema(name = "current", example = "true", required = true)
    private Boolean current;

    @PrePersist
    protected void onCreate() {
        created_at  = LocalDateTime.now();
    }
}
