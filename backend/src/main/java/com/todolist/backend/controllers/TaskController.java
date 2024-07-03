package com.todolist.backend.controllers;

import com.todolist.backend.entities.Task;
import com.todolist.backend.services.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

    @Autowired
    private TaskService taskService;

    /**
     *  Listar tareas
     * @return ResponseEntity<Object>
     */
    @Operation(summary = "Listar tareas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "listar todas las tareas",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Task.class),
                            examples = @ExampleObject(value = "{\"data\":[{\"id\":1,\"description\":\"Task 1\",\"created_at\":\"2024-07-03T00:14:10.002207\",\"current\":true},{\"id\":2,\"description\":\"Task 2\",\"created_at\":\"2024-07-03T00:14:14.203624\",\"current\":true}],\"count\":2,\"status\":200}")
                    )
            )
    })
    @GetMapping(value = "/tasks", produces = { "application/json" })
    public ResponseEntity<Object> getTasks() {
        return taskService.getTasks();
    }

    /**
     * Crear tarea
     * @param task
     * @return ResponseEntity<Object>
     */
    @Operation(summary = "Crear nueva tarea")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarea creada exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Task.class),
                            examples = @ExampleObject(value = "{\"data\":{\"id\":3,\"description\":\"Task 3\",\"created_at\":\"2024-07-03T00:16:09.4864693\",\"current\":true},\"status\":200}")
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Campos requeridos faltantes",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiResponse.class),
                            examples = @ExampleObject(value = "{\"message\":\"Los campos 'description' y 'current' son requeridos\",\"status\":400}")
                    )
            ),
    })
    @PostMapping(value ="/task", consumes = { "application/json" }, produces = { "application/json" })
    public ResponseEntity<Object> createTask(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Datos para registrar nueva tarea",
            required = true,
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = Task.class),
                    examples = @ExampleObject(value = "{\"description\":\"task 1\",\"current\":true}")
            )
    ) @RequestBody Task task) {
        return taskService.createTask(task);
    }

    /**
     * Actualizar tarea
     * @param taskId
     * @param updatedTask
     * @return ResponseEntity<Object>
     */
    @Operation(summary = "Actualizar tarea")
    @PutMapping(value="/tasks/{id}", consumes = { "application/json" }, produces = { "application/json" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarea actualizada exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Task.class),
                            examples = @ExampleObject(value = "{\"data\":{\"id\":1,\"description\":\"task 1 updated\",\"created_at\":\"2024-07-03T00:20:59.376109\",\"current\":false},\"status\":200}")
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Campos requeridos faltantes",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiResponse.class),
                            examples = @ExampleObject(value = "{\"message\":\"Los campos 'description' y 'current' son requeridos\",\"status\":400}")
                    )
            ),
            @ApiResponse(responseCode = "404", description = "No se ha encontrado la tarea",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiResponse.class),
                            examples = @ExampleObject(value = "{\"message\":\"No se ha encontrado una tarea con ID: 99\",\"status\":404}")
                    )
            )
    })
    public ResponseEntity<Object> updateTask(
            @PathVariable("id") @Parameter(name = "id", description = "Task id", example = "1") Long taskId,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Datos actualizados de la tarea",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Task.class),
                            examples = @ExampleObject(value = "{\"description\":\"task 1\",\"current\":false}")
                    )
            ) @RequestBody Task updatedTask
    ) {
        return taskService.updateTask(taskId, updatedTask);
    }


    /**
     * Eliminar tarea
     * @param taskId
     * @return ResponseEntity<Object>
     */
    @Operation(summary = "Eliminar tarea")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Tarea eliminada exitosamente",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiResponse.class),
                            examples = @ExampleObject(value = "{\"message\":\"Tarea con ID 1 ha sido eliminada\",\"status\":200}")
                    )
            ),
            @ApiResponse(responseCode = "404", description = "No se ha encontrado la tarea",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiResponse.class),
                            examples = @ExampleObject(value = "{\"message\":\"No se ha encontrado una tarea con ID: 99\",\"status\":404}")
                    )
            )
    })
    @DeleteMapping(value="/tasks/{id}", produces = { "application/json" })
    public ResponseEntity<Object> deleteTask(@PathVariable("id") @Parameter(name = "id", description = "Task id", example = "1") Long taskId) {
        return taskService.deleteTask(taskId);
    }

}
