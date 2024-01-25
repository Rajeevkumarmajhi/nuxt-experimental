// Create a TypeScript module to define the type
// auth.ts

import { Ref } from 'vue';

export interface User {
    email: String;
    password: String;
  }


export interface Auth {
    // Define the properties and methods of your $auth object
    // Example properties:
    user: Ref<User | null>;
    isAuthenticated: Ref<boolean>;
    // Example methods:
    loginWith(strategy: string, data: Record<string, any>): Promise<void>;
    logout(): Promise<void>;
}
