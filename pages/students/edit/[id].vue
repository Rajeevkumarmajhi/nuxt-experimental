<template>
    <div class="mt-5 container">
        <div class="card">
            <div class="card-header">
                <h4>Edit Student
                    <NuxtLink class="btn btn-danger float-end" to="/students">Students</NuxtLink>
                </h4>
            </div>
            <div v-if="isLoading">
                <Loading :title="isLoadingTitle" />
            </div>
            <div v-else>
                <div class="card-body">
                    <form @submit.prevent="saveStudent">
                        <div class="mb-3">
                            <label for="name">Name</label>
                            <input type="text" v-model="student.name" class="form-control" name="name" />
                            <span class="text-danger">{{ formatErrors(errorList.name) }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="course">Course</label>
                            <input type="text" v-model="student.course" class="form-control" name="course" />
                            <span class="text-danger">{{ formatErrors(errorList.course) }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="email">Email</label>
                            <input type="email" v-model="student.email" class="form-control" name="email" />
                            <span class="text-danger">{{ formatErrors(errorList.email) }}</span>
                        </div>
                        <div class="mb-3">
                            <label for="phone">Phone</label>
                            <input type="text" v-model="student.phone" class="form-control" name="phone" />
                            <span class="text-danger">{{ formatErrors(errorList.phone) }}</span>
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Setup Section
import { ref, onMounted } from 'vue';
import axios from 'axios';


import Loading from '../../../components/Loading.vue';
import { useForm } from '../../../helpers/students/forms/FormHandling';
import { StudentData, ErrorList } from '../../../helpers/students/interfaces/StudentInterface';

const { student, clearForm } = useForm();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const base_url = useRuntimeConfig().public.base_url;

const isLoading = ref(false);
const isLoadingTitle = ref("Loading...");
const errorList = ref<ErrorList>({});

// Methods Section
const formatErrors = (errors: string[] | null | undefined): string => {
    if (Array.isArray(errors) && errors.length > 0) {
        return errors[0]; // Display the first error in the array
    }
    return ''; // Return an empty string if there are no errors or if errors is not an array
};

const handleApiError = (error: any) => {
    if (error.response) {
        if (error.response.status === 422) {
            // Assign the validation errors to errorList.value
            errorList.value = error.response.data.errors;
        } else if (error.response.status === 500) {
            alert('Server error. Please contact the developer.');
        }
    }
};

const saveStudent = async () => {
    isLoading.value = true;
    isLoadingTitle.value = "Saving";

    try {
        await submitStudentData(student.value);

        clearForm();
        isLoading.value = false;
        isLoadingTitle.value = "Loading...";
    } catch (error) {
        console.error('Error:', error);
    }
};

const submitStudentData = async (data: StudentData) => {
    try {
        const response = await axios.patch(base_url + `/student/${id}`, data);
        alert(response.data.message);
        router.push('/students');
    } catch (error: any) { // Add the ': any' type assertion here
        if (error.response) {
            handleApiError(error);
        }
    }

    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            // Resolve the promise to simulate a successful submission
            resolve();
        }, 2000); // Simulate a 2-second delay
    });
};

const getStudent = async () => { // Add type 'string' for the id parameter
    try {
        const response = await axios.get(base_url + `/student/${id}`);
        const data = response.data; // Assuming your API response contains student data

        // Update the student object with the fetched data
        student.value.name = data.data.name;
        student.value.course = data.data.course;
        student.value.email = data.data.email;
        student.value.phone = data.data.phone;
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
};

onMounted(() => {
    getStudent(); // Pass the id to fetch student data
});
</script>