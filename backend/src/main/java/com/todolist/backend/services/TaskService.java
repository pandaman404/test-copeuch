package com.todolist.backend.services;

import com.todolist.backend.entities.Task;
import com.todolist.backend.repositories.TaskRepository;
import com.todolist.backend.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Listar tareas
     * @return ResponseEntity<Object>
     */
    public ResponseEntity<Object> getTasks() {
        try {
            var tasks = taskRepository.findAll();
            return ResponseHandler.responseBuilder(HttpStatus.OK, null, tasks, tasks.size());
        } catch (Exception e) {
            System.out.println("Error en getTasks");
            return ResponseHandler.responseBuilder(HttpStatus.INTERNAL_SERVER_ERROR, "Ups! ha ocurrido un error inesperado.", null, null);
        }
    }

    /**
     * Crear tarea
     * @param newtask
     * @return ResponseEntity<Object>
     */
    public ResponseEntity<Object> createTask(Task newtask) {
        try {
            if(newtask.getDescription() == null || newtask.getDescription().isEmpty() || newtask.getCurrent() == null) {
                return ResponseHandler.responseBuilder(HttpStatus.BAD_REQUEST, "Los campos 'description' y 'current' son requeridos",null, null);
            }

            var savedTask = taskRepository.save(newtask);
            if(savedTask.getId() == null || savedTask.getId() <= 0) {
                throw new RuntimeException("Error creando tarea");
            }

            return ResponseHandler.responseBuilder(HttpStatus.OK, null, savedTask, null);
        }
        catch (DataAccessException e) {
            System.out.println("Error en createTask: " + e.getMessage());
            return ResponseHandler.responseBuilder(HttpStatus.INTERNAL_SERVER_ERROR, "Error creando tarea", null, null);
        }
        catch (Exception e) {
            System.out.println("Error en createTask: " + e.getMessage());
            return ResponseHandler.responseBuilder(HttpStatus.INTERNAL_SERVER_ERROR, "Ups! ha ocurrido un error inesperado.", null, null);
        }
    }

    /**
     * Actualizar tarea
     * @param taskId
     * @param updatedtask
     * @return ResponseEntity<Object>
     */
    public ResponseEntity<Object> updateTask(Long taskId, Task updatedtask) {
        try {
            if(updatedtask.getDescription() == null || updatedtask.getDescription().isEmpty() || updatedtask.getCurrent() == null) {
                return ResponseHandler.responseBuilder( HttpStatus.BAD_REQUEST, "Los campos 'description' y 'current' son requeridos",null, null);
            }
            Optional<Task> task = taskRepository.findById(taskId);
            if (task.isPresent()) {
                Task foundedTask = task.get();
                foundedTask.setDescription(updatedtask.getDescription());
                foundedTask.setCurrent(updatedtask.getCurrent());

                Task savedTask = taskRepository.save(foundedTask);

                if(savedTask.getId() == null || savedTask.getId() <= 0) {
                    throw new RuntimeException("Error al actualizar la tarea");
                }
                return ResponseHandler.responseBuilder(HttpStatus.OK, null, savedTask, null);
            } else {
                String message = String.format("No se ha encontrado una tarea con ID: %d ", taskId);
                return ResponseHandler.responseBuilder( HttpStatus.NOT_FOUND, message,null, null);
            }
        }
        catch (DataAccessException e) {
            System.out.println("Error en updateTask");
            return ResponseHandler.responseBuilder(HttpStatus.INTERNAL_SERVER_ERROR, "Error al actualizar la tarea", null, null);
        }
        catch (Exception e) {
            System.out.println("Error en updateTask");
            return ResponseHandler.responseBuilder(HttpStatus.INTERNAL_SERVER_ERROR, "Ups! ha ocurrido un error inesperado.", null, null);
        }
    }

    /**
     * Eliminar tarea
     * @param taskId
     * @return ResponseEntity<Object>
     */
    public ResponseEntity<Object> deleteTask(Long taskId) {
        try {
            Optional<Task> task = taskRepository.findById(taskId);
            if (task.isPresent()) {
                taskRepository.deleteById(taskId);
                String message = String.format("Tarea con ID %d ha sido eliminada", taskId);
                return ResponseHandler.responseBuilder(HttpStatus.OK, message, null, null);
            } else {
                String message = String.format("No se ha encontrado una tarea con ID: %d", taskId);
                return ResponseHandler.responseBuilder(HttpStatus.NOT_FOUND, message, null, null);
            }
        } catch (Exception e) {
            System.out.println("Error en deleteTask");
            return ResponseHandler.responseBuilder(HttpStatus.INTERNAL_SERVER_ERROR, "Ups! ha ocurrido un error inesperado.", null, null);
        }
    }
}
