package com.todolist.backend.controllers;

import com.todolist.backend.entities.Task;
import com.todolist.backend.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    public ResponseEntity<Object> getTasks() {
        return taskService.getTasks();
    }

    @PostMapping("/task")
    public ResponseEntity<Object> createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<Object> updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        return taskService.updateTask(taskId, updatedTask);
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<Object> deleteTask(@PathVariable Long taskId) {
        return taskService.deleteTask(taskId);
    }

}
