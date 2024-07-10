package com.todolist.backend.services;

import com.todolist.backend.entities.Task;
import com.todolist.backend.repositories.TaskRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


public class TaskServiceTests {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    AutoCloseable autoCloseable;

    String ERROR_MSG_REQUIRED_FIELDS = "Los campos 'description' y 'current' son requeridos";

    @BeforeEach
    public void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    public void testGetAllTasks() {
        List<Task> mockTasks = new ArrayList<>();
        mockTasks.add(new Task(1L,"Task 1", LocalDateTime.now(), true));
        mockTasks.add(new Task(2L,"Task 2", LocalDateTime.now(), false));

        when(taskRepository.findAll()).thenReturn(mockTasks);

        ResponseEntity<Object> responseEntity = taskService.getTasks();

        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);

        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        Assertions.assertEquals(mockTasks.size(), responseBody.get("count"));
    }

    @Test
    public void testCreateTaskOk() {
       Task mockTask = new Task(1L,"New task", LocalDateTime.now(), true);

       when(taskRepository.save(any(Task.class))).thenReturn(mockTask);
       ResponseEntity<Object> responseEntity = taskService.createTask(mockTask);

       Assertions.assertNotNull(responseEntity.getBody());
       Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);

       Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
       Assertions.assertEquals(mockTask.getId(), ((Task) responseBody.get("data")).getId());
    }

    @Test
    public void testCreateTaskNoOk() {
        Task mockTask = new Task(1L,"", LocalDateTime.now(), null);
        when(taskRepository.save(any(Task.class))).thenReturn(mockTask);

        ResponseEntity<Object> responseEntity = taskService.createTask(mockTask);

        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.BAD_REQUEST);

        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        Assertions.assertEquals(ERROR_MSG_REQUIRED_FIELDS, responseBody.get("message"));
    }

    @Test
    public void testUpdateTaskOk() {
        Task mockTask = new Task(1L, "Task updated", LocalDateTime.now(), true);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(mockTask));
        when(taskRepository.save(any(Task.class))).thenReturn(mockTask);

        ResponseEntity<Object> responseEntity = taskService.updateTask(1L, mockTask);

        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testUpdateTaskNoOk() {
        Task mockTask = new Task(1L, null, LocalDateTime.now(), null);

        ResponseEntity<Object> responseEntity = taskService.updateTask(1L, mockTask);

        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.BAD_REQUEST);

        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        Assertions.assertEquals(ERROR_MSG_REQUIRED_FIELDS, responseBody.get("message"));
    }

    @Test
    public void testUpdateTaskNotFound() {
        Task mockTask = new Task(1L, "Task updated", LocalDateTime.now(), true);

        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Object> responseEntity = taskService.updateTask(1L, mockTask);

        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.NOT_FOUND);

        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        Assertions.assertNotNull(responseBody.get("message"));
    }

    @Test
    public void testDeleteTaskOk() {
        Task mockTask = new Task(1L, "Task 1", LocalDateTime.now(), true);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(mockTask));

        ResponseEntity<Object> responseEntity = taskService.deleteTask(1L);

        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);

        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        Assertions.assertNotNull(responseBody.get("message"));
    }

    @Test
    public void testDeleteTaskNotFound() {
        Task mockTask = new Task(1L, "Task", LocalDateTime.now(), true);

        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        ResponseEntity<Object> responseEntity = taskService.deleteTask(1L);

        Assertions.assertNotNull(responseEntity.getBody());
        Assertions.assertEquals(responseEntity.getStatusCode(), HttpStatus.NOT_FOUND);

        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        Assertions.assertNotNull(responseBody.get("message"));
    }


}
