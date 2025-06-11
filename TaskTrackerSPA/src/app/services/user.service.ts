// Importing necessary modules for HTTP communication and dependency injection
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Importing the User type for type-checking the data
import { User } from '../types/users';
// Importing Observable for handling asynchronous data
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indicates that this service is available throughout the application
})
export class UserService {

  // Base URL for the API endpoint
  apiUrl: string = "https://localhost:7089/api/users";

  // Injecting HttpClient for making HTTP requests
  constructor(private http: HttpClient) { }

  /**
   * Fetch all users from the API.
   * @returns Observable of an array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Add a new user to the API.
   * @param data - The User object to be added.
   * @returns Observable representing the HTTP POST request.
   */
  addUser(data: User) {
    return this.http.post(this.apiUrl, data);
  }

  /**
   * Fetch a single user by their ID.
   * @param id - The ID of the user to retrieve.
   * @returns Observable of the User object.
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Delete a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns Observable representing the HTTP DELETE request.
   */
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Update an existing user's details.
   * @param id - The ID of the user to update.
   * @param data - The updated User object.
   * @returns Observable representing the HTTP PUT request.
   */
  editUser(id: number, data: User) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
