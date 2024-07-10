package com.todolist.backend.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.todolist.backend.entities.Task;
import com.todolist.backend.services.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@WebMvcTest(TaskController.class)
@AutoConfigureMockMvc
public class TaskControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private TaskService taskService;


    @Test
    public void testGetTasks() throws Exception {
        this.mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testCreateTask() throws Exception {
        Task mockTask = new Task("New task",  true);

        this.mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/task")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockTask))
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testUpdateTask() throws Exception {
        Task mockTask = new Task("Task updated", false);
        Long mockId = 1L;

        this.mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/task/{id}", mockId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockTask))
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    public void testDeleteTask() throws Exception {
        Long mockId = 1L;

        this.mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/task/{id}", mockId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
