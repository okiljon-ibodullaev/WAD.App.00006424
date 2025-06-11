// Importing necessary modules for HTTP communication and dependency injection
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Importing the Task type for type-checking the data
import { Task } from '../types/task';
// Importing Observable for handling asynchronous data
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indicates that this service is available throughout the application
})
export class TaskService {

  // Base URL for the API endpoint
  apiUrl: string = "https://localhost:7089/api/tasks";

  // Injecting HttpClient for making HTTP requests
  constructor(private http: HttpClient) { }

  /**
   * Fetch all tasks from the API.
   * @returns Observable of an array of Task objects.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Add a new task to the API.
   * @param data - The Task object to be added.
   * @returns Observable representing the HTTP POST request.
   */
  addTask(data: Task) {
    return this.http.post(this.apiUrl, data);
  }

  /**
   * Fetch a single task by its ID.
   * @param id - The ID of the task to retrieve.
   * @returns Observable of the Task object.
   */
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  /**
   * Delete a task by its ID.
   * @param id - The ID of the task to delete.
   * @returns Observable representing the HTTP DELETE request.
   */
  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Update an existing task's details.
   * @param id - The ID of the task to update.
   * @param data - The updated Task object.
   * @returns Observable representing the HTTP PUT request.
   */
  editTask(id: number, data: Task) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
