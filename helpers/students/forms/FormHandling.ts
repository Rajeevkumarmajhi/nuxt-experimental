import { ref } from 'vue';

export function useForm() {
    const student = ref({
        name: '',
        course: '',
        email: '',
        phone: '',
    });

    const clearForm = () => {
        student.value = {
            name: '',
            course: '',
            email: '',
            phone: '',
        };
    };

    return { student, clearForm };
}