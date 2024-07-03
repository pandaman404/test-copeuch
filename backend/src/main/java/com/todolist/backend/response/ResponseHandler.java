package com.todolist.backend.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {
    public static ResponseEntity<Object> responseBuilder(
            HttpStatus status,
            String message,
            Object data,
            Integer count
    ) {
        Map<String, Object> response = new HashMap<>();


        if(message != null) {
            response.put("message", message);
        }

        if(data != null) {
            response.put("data", data);
        }

        if(count != null) {
            response.put("count", count);
        }

        response.put("status", status.value());
        return new ResponseEntity<>(response, status);
    }

}
