// Importing required Angular core and common modules
import { Component, inject, OnInit } from '@angular/core';
// Importing the UserService to interact with the API
import { UserService } from '../services/user.service';
// Importing Observable for asynchronous data handling
import { Observable } from 'rxjs';
// Importing the User type for type-checking
import { User } from '../types/users';
// Importing Angular common modules for template functionality
import { AsyncPipe, CommonModule } from '@angular/common';
// Importing RouterLink for navigation in templates
import { RouterLink } from '@angular/router';
// Importing ToastrService for showing notifications
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users', // Selector for this component
  imports: [AsyncPipe, CommonModule, RouterLink], // Declaring template dependencies
  templateUrl: './users.component.html', // Path to the HTML template
  styleUrl: './users.component.css' // Path to the CSS file
})
export class UsersComponent implements OnInit {
    
    // Observable to store the list of users
    users$!: Observable<User[]>;

    // Injecting the UserService to handle API requests
    userService = inject(UserService);

    // Injecting ToastrService for user notifications
    constructor(private toasterService: ToastrService) {}

    // Lifecycle hook that runs after the component is initialized
    ngOnInit(): void {
      // Fetches the users list when the component is loaded
      this.users$ = this.userService.getUsers();
    }

    /**
     * Deletes a user by ID and refreshes the user list
     * @param id - The ID of the user to be deleted
     */
    delete(id: number) {
        this.userService.deleteUser(id).subscribe(
          {
            // Executes on successful deletion
            next: (response) => {
              this.toasterService.success("User successfully deleted"); // Notify success
              this.getUsers(); // Refresh the users list
            },
            // Handles errors during the deletion process
            error: err => {
              console.log(err); // Log the error for debugging
            }
          }
        )
    }

    /**
     * Private method to refresh the user list
     */
    private getUsers() {
      this.users$ = this.userService.getUsers();
    }
}
