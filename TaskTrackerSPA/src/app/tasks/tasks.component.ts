import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs';
import { Task } from '../types/task';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tasks',
  imports: [AsyncPipe, RouterLink, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks$!: Observable<Task[]>; // Observable for the task list
  taskService = inject(TaskService); // Inject TaskService

  constructor(private toasterService: ToastrService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks(); // Fetch tasks on component load
  }

  /**
   * Deletes a task by its ID.
   * @param id - The ID of the task to delete
   */
  delete(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.toasterService.success('Task successfully deleted'); // Notify success
        this.getTasks(); // Refresh task list
      },
      error: (err) => {
        console.log(err); // Log error for debugging
      }
    });
  }

  /**
   * Private method to refresh the task list.
   */
  private getTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  /**
   * TrackBy function for ngFor optimization.
   * @param index - Current index in the loop
   * @param task - Current task object
   * @returns Task ID
   */
  trackById(index: number, task: Task): number {
    return task.id;
  }
}
