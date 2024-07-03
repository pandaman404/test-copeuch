package com.todolist.backend.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public Boolean getCurrent() {
        return current;
    }

    public void setCurrent(Boolean current) {
        this.current = current;
    }

    @PrePersist
    protected void onCreate() {
        created_at  = LocalDateTime.now();
    }
}
