<template>
    <div class="mt-5 container">
        <div class="card">
            <div class="card-header">
                <h4>Add Student
                    <NuxtLink class="btn btn-danger float-end" to="/">Back To Home</NuxtLink>
                </h4>
            </div>
            <div v-if="isLoading">
                <Loading :title="isLoadingTitle" />
            </div>
            <div v-else >
                <div class="card-body">
                    <form @submit.prevent="saveStudent">
                        <div class="mb-3">
                            <label for="name">Name</label>
                            <input type="text" v-model="student.name" class="form-control" name="name" />
                        </div>
                        <div class="mb-3">
                            <label for="course">Course</label>
                            <input type="text" v-model="student.course" class="form-control" name="course" />
                        </div>
                        <div class="mb-3">
                            <label for="email">Email</label>
                            <input type="email" v-model="student.email" class="form-control" name="email" />
                        </div>
                        <div class="mb-3">
                            <label for="phone">Phone</label>
                            <input type="text" v-model="student.phone" class="form-control" name="phone" />
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import Loading from '../../components/Loading.vue';
import axios from 'axios';

const student = ref({
    name: '',
    course: '',
    email: '',
    phone: '',
});

interface StudentData {
    name: string;
    course: string;
    email: string;
    phone: string;
}

const componentName = 'StudentCreate';

const isLoading = ref(false);
const isLoadingTitle = ref("Loading...");

const saveStudent = async () => {
    isLoading.value = true;
    isLoadingTitle.value = "Saving";

    try {
        await submitStudentData(student.value);

        student.value = {
            name: '',
            course: '',
            email: '',
            phone: '',
        };
        isLoading.value = false;
        isLoadingTitle.value = "Loading...";
    } catch (error) {
        console.error('Error:', error);
    }
};

const submitStudentData = async (data: StudentData) => {
    
    axios.post('http://localhost:8000/api/student', data).then(res  =>{
        alert(res.data.message);
    }).catch(function (error){
        console.log(error);
        if(error.response){

            if(error.response.status == 422){
                alert('Permission Denied');
            }

            if(error.response.status == 500){
                alert('server error please talk with the developer...')
            }


        }
    });



    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            // Resolve the promise to simulate a successful submission
            resolve();
        }, 2000); // Simulate a 2-second delay
    });
};


</script>

<style scoped></style>