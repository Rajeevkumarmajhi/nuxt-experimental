
import { NuxtLink } from '#build/components';
<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <NuxtLink class="navbar-brand" to="/">Brand Home</NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <NuxtLink class="nav-link active" aria-current="page" to="/">Home</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link active" aria-current="page" to="/about-us">About Us</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link active" aria-current="page" to="/contact-us">Contact Us</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link active" aria-current="page" to="/students">Students</NuxtLink>
                    </li>
                    <li class="nav-item">
                        <NuxtLink class="nav-link active" aria-current="page" to="/login">Login</NuxtLink>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">

</script>