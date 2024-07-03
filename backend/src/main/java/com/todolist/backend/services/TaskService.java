package com.todolist.backend.services;

import com.todolist.backend.entities.Task;
import com.todolist.backend.repositories.TaskRespository;
import com.todolist.backend.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRespository taskRespository;

    public ResponseEntity<Object> getTasks() {
        var tasks = taskRespository.findAll();
        return ResponseHandler.responseBuilder(HttpStatus.OK, null, tasks, tasks.size());
    }

    public ResponseEntity<Object> createTask(Task newtask) {
        if(newtask.getDescription() == null || newtask.getDescription().isEmpty() || newtask.getCurrent() == null) {
            return ResponseHandler.responseBuilder(HttpStatus.BAD_REQUEST, "Los campos 'description' y 'current' son requeridos",null, null);
        }
        var savedTask = taskRespository.save(newtask);
        return ResponseHandler.responseBuilder(HttpStatus.OK, null, savedTask, null);
    }

    public ResponseEntity<Object> updateTask(Long taskId, Task updatedtask) {
        if(updatedtask.getDescription() == null || updatedtask.getDescription().isEmpty() || updatedtask.getCurrent() == null) {
            return ResponseHandler.responseBuilder( HttpStatus.BAD_REQUEST, "Los campos 'description' y 'current' son requeridos",null, null);
        }

        Optional<Task> task = taskRespository.findById(taskId);
        if (task.isPresent()) {
            Task foundedTask = task.get();
            foundedTask.setDescription(updatedtask.getDescription());
            foundedTask.setCurrent(updatedtask.getCurrent());
            Task savedTask = taskRespository.save(foundedTask);
            return ResponseHandler.responseBuilder(HttpStatus.OK, null, savedTask, null);
        } else {
            String message = String.format("No se ha encontrado una tarea con ID: %d ", taskId);
            return ResponseHandler.responseBuilder( HttpStatus.NOT_FOUND, message,null, null);
        }
    }

    public ResponseEntity<Object> deleteTask(Long taskId) {
        Optional<Task> task = taskRespository.findById(taskId);
        if (task.isPresent()) {
            taskRespository.deleteById(taskId);
            String message = String.format("Tarea con ID %d ha sido eliminada", taskId);
            return ResponseHandler.responseBuilder(HttpStatus.OK, message, null, null);
        } else {
            String message = String.format("No se ha encontrado una tarea con ID: %d", taskId);
            return ResponseHandler.responseBuilder(HttpStatus.NOT_FOUND, message, null, null);
        }
    }
}
