package com.todolist.backend.repositories;

import com.todolist.backend.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRespository extends JpaRepository<Task, Long> {
}
