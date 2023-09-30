<template>
    <div class="container mt-4">

        <div class="card">
            <div class="card-header">
                Students List
                <NuxtLink to="/students/create" class="btn btn-primary float-end">Add Student</NuxtLink>
            </div>
            <div class="card-body">

                <div v-if="isLoading">
                    <Loading title="Loading..." />
                </div>
                <div v-else>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in studentsList" :key="student.id">
                                <td>{{ student.id }}</td>
                                <td>{{ student.name }}</td>
                                <td>{{ student.course }}</td>
                                <td>{{ student.email }}</td>
                                <td>{{ student.phone }}</td>
                                <td>
                                    <NuxtLink :to="`/students/edit/${student.id}`" class="btn btn-sm btn-primary">Edit
                                    </NuxtLink>
                                    <button @click="deleteStudent(student.id)" type="button"
                                        class="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { StudentData, ErrorList } from '../../helpers/students/interfaces/StudentInterface';
import Loading from '../../components/Loading.vue';

const studentsList = ref<StudentData[]>([]);
const errorList = ref<ErrorList>({});
const isLoading = ref(false);
const base_url = useRuntimeConfig().public.base_url;

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

const getStudentList = async () => {
    try {
        isLoading.value = true;
        const res = await axios.get(base_url + '/student'); // Replace with your API endpoint
        // Assuming the API response is an array of student objects
        studentsList.value = res.data.data;
        isLoading.value = false;
    } catch (error) {
        handleApiError(error);
    }
};

const deleteStudent = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this student?');

    if (confirmed) {
        try {
            await axios.delete(base_url + `/student/${id}`);
            getStudentList();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
};

onMounted(() => {
    getStudentList(); // Call the API when the component is mounted
});

</script>

<style scoped></style>