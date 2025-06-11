import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { User } from '../../types/users';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  form!: FormGroup; // Form group for task management
  users$!: Observable<User[]>; // Observable of users for dropdown
  taskFormSubscription!: Subscription; // Subscription for form submission
  paramsSubscription!: Subscription; // Subscription for route parameters
  taskService = inject(TaskService); // Injecting TaskService
  userService = inject(UserService); // Injecting UserService
  isEdit = false; // Flag to check if it’s an edit operation
  id = 0; // Task ID for editing

  constructor(
    private fb: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private toasterService: ToastrService
  ) {}

  /**
   * Handles the form submission to create or edit a task.
   */
  onSubmit() {
    if (!this.isEdit) {
      // Add new task
      this.taskFormSubscription = this.taskService.addTask(this.form.value).subscribe({
        next: () => {
          this.toasterService.success('Task successfully added');
          this.router.navigateByUrl('/tasks');
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      // Edit existing task
      const data = { ...this.form.value, id: this.id };
      this.taskService.editTask(this.id, data).subscribe({
        next: () => {
          this.toasterService.success('Task successfully edited');
          this.router.navigateByUrl('/tasks');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  /**
   * Initializes the component, sets up the form, and checks for edit mode.
   */
  ngOnInit(): void {
    this.users$ = this.userService.getUsers(); // Fetch users for dropdown
    this.paramsSubscription = this.activatedRouter.params.subscribe({
      next: (params) => {
        const id = params['id'];
        this.id = id;
        if (!id) return;

        // Load task for editing
        this.taskService.getTask(id).subscribe({
          next: (task) => {
            this.form.patchValue(task);
            this.isEdit = true;
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Initialize the form with default fields
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      status: ['Open', [Validators.required]],
      userId: ['', [Validators.required]]
    });
  }

  /**
   * Cleans up subscriptions to avoid memory leaks.
   */
  ngOnDestroy(): void {
    if (this.taskFormSubscription) {
      this.taskFormSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
