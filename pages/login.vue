<template>
    <div class="container mt-60">
        <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <h3>Please login to continue</h3>
                <form ref="loginForm" @submit.prevent="login($auth)">
                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <input type="email" name="email" id="form2Example1" class="form-control" />
                        <label class="form-label" for="form2Example1">Email address</label>
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <input type="password" name="password" id="form2Example2" class="form-control" />
                        <label class="form-label" for="form2Example2">Password</label>
                    </div>

                    <!-- Submit button -->
                    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

                </form>

                <!-- Register buttons -->
                <div class="text-center">
                    <p>Not a member? <NuxtLink to="/">Register</NuxtLink>
                    </p>
                    <p>or sign up with:</p>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-google"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-twitter"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-github"></i>
                    </button>
                </div>

            </div>
            <div class="col-sm-4"></div>
        </div>

    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref, inject, provide } from 'vue';
import { Auth } from '@nuxtjs/auth-next';

const router = useRouter();

const base_url = useRuntimeConfig().public.base_url;
const loginForm = ref({} as HTMLFormElement);


const login = async ($auth: Auth) => {
    try {
        if (loginForm.value instanceof HTMLFormElement) {
            const formData = new FormData(loginForm.value);

            console.log($auth);


            await $auth.loginWith('laravelSanctum', { data: formData });

            router.push('/students');

        } else {
            console.error('loginForm is not an HTMLFormElement');
        }
    } catch (err) {
        // Handle login errors here
        console.error('Login error:', err);
    }
};

onMounted(async () => {
    try {
        await this.$auth.ready();
    
    // Now you can access $auth
    console.log(this.$auth);
        // await axios.get(base_url + '/sanctum/csrf-cookie');
    } catch (err) {
        console.error('Error fetching CSRF cookie:', err);
    }
});
</script>

<style scoped>
.mt-60 {
    margin-top: 60px;
}
</style>