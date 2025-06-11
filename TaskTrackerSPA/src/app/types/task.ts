import { User } from "./users";

export interface Task {
    id: number;
    name: string;
    description: string;
    status: string;
    userId: number;
    user: User
}