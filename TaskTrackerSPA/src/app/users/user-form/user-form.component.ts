import { JsonPipe } from '@angular/common'; // Importing Angular's JsonPipe for transforming JSON data in templates
import { Component, inject, OnDestroy, OnInit } from '@angular/core'; // Angular core imports
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Reactive forms module for form building and validation
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Angular router for navigation and route params
import { UserService } from '../../services/user.service'; // Importing user service for handling user data operations
import { Subscription } from 'rxjs'; // For managing RxJS subscriptions
import { ToastrService } from 'ngx-toastr'; // For showing success/error notifications

@Component({
  selector: 'app-user-form', // The component's selector to be used in templates
  imports: [ReactiveFormsModule, JsonPipe, RouterLink], // Modules needed for this component
  templateUrl: './user-form.component.html', // The HTML template path for this component
  styleUrl: './user-form.component.css' // The CSS styles for this component
})
export class UserFormComponent implements OnInit, OnDestroy { 
  // Declare properties for the form group, subscriptions, user service, and form state
  form!: FormGroup; // Form group for the form controls
  userformSubscription!: Subscription; // Subscription for user form data submission
  paramsSubscription!: Subscription; // Subscription for route parameters
  userService = inject(UserService); // Injecting UserService to handle API calls
  isEdit = false; // Flag to determine if the form is for editing or adding a user
  id = 0; // User ID, initialized to 0
  
  // Constructor to inject necessary services: FormBuilder, ActivatedRoute, Router, and ToastrService
  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute, private router: Router, private toasterService: ToastrService) {}

  // onSubmit method called when the form is submitted
  onSubmit() {
    if (!this.isEdit) { // If it's not an edit, add a new user
      console.log(this.form.value);
      this.userformSubscription = this.userService.addUser(this.form.value).subscribe(
        {
          next: (response) => {
            // On success, show a success message and navigate to the users list
            this.toasterService.success("User successfully added");
            this.router.navigateByUrl("/users");
          },
          error: err => {
            console.log(err); // Log any errors to the console
          }
        }
      );
    } else { // If it's an edit, update the existing user
      let data = this.form.value;
      data.id = this.id; // Add the user ID to the form data
      console.log(data); // Log the data for debugging
      this.userService.editUser(this.id, data).subscribe(
        {
          next: (res) => {
            // On success, show a success message and navigate to the users list
            this.toasterService.success("User successfully edited");
            this.router.navigateByUrl("/users");
          },
          error: err => {
            console.log(err); // Log any errors to the console
          }
        }
      );
    }
  }

  // ngOnDestroy method to unsubscribe from subscriptions when the component is destroyed
  ngOnDestroy(): void {
    if (this.userformSubscription) {
      this.userformSubscription.unsubscribe(); // Unsubscribe from user form subscription
    }

    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe(); // Unsubscribe from route params subscription
    }
  }

  // ngOnInit method called when the component is initialized
  ngOnInit(): void {
    // Subscribe to the route parameters to get the user ID
    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {
        next: (response) => {
          console.log(response['id']); // Log the user ID from the route
          let id = response['id']; // Get the user ID from the route params
          this.id = id; // Set the user ID property
          if (!id) return; // If no ID is found, return early

          // If an ID is present, fetch the user details and populate the form
          this.userService.getUser(id).subscribe({
            next: (response) => {
              this.form.patchValue(response); // Patch the form with the fetched user data
              this.isEdit = true; // Set isEdit flag to true for editing
            },
            error: err => {
              console.log(err); // Log any errors to the console
            }
          });
        },
        error: err => {
          console.log(err); // Log any errors in fetching route params
        }
      }
    );

    // Initialize the form with form controls and validation
    this.form = this.fb.group(
      {
        name: [''], // Username field with  validation
        email: ['', Validators.email], // Email field with email validation
        role: [] // Role field with  validation
      }
    );
  }
}
