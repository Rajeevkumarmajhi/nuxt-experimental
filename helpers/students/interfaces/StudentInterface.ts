// StudentInterface.ts
export interface StudentData {
    id?: number;
    name: string;
    course: string;
    email: string;
    phone: string;
}

export interface ErrorList {
    name?: string[];
    course?: string[];
    email?: string[];
    phone?: string[];
}