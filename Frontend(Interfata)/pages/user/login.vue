<template>
  <ClientOnly>
  <div class="flex justify-center items-center h-screen">
    <div class="w-2/3 flex flex-col justify-center items-center border border-gray-300 rounded-2xl py-32 px-32">
      <div>
        <h1 class="text-5xl font-semibold mb-2 text-center">Login</h1>
        <p class="text-sm md:text-lg">Insert your email and your password</p>
      </div>
      <form class="flex flex-col mt-8 min-w-fit w-full" @submit.prevent="loginUser">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Enter your email address" class="mb-4 rounded-md p-2"
          required>

        <label for="password">Password</label>
        <input type="password" name="password" id="password" placeholder="Enter your password"
          class="mb-4 rounded-md p-2 w-full" required>

        <LoadingButton class="w-full" :isLoading="isLoading" :function="loginUser">Login</LoadingButton>
      </form>
    </div>
  </div>
</ClientOnly>
  <!-- <div class="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-red-600">Create Account</h1>
        <p class="text-gray-600 mt-2">Sign up to get started</p>
      </div>
      <div class="bg-white rounded-lg shadow-lg p-8">
        <form>
          <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400"></UserIcon>
              </div>
              <input id="name" type="text" value="name"
                class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="John Doe" required />
            </div>
          </div>

          <div class="mb-6">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400"></UserIcon>
              </div>
              <input id="name" type="text" value="name"
                class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="John Doe" required />
            </div>
          </div>

          <div class="mb-2">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400"></UserIcon>
              </div>
              <input id="name" type="text" value="name"
                class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="John Doe" required />
              <button type="button" onclick="alert('hello')" class="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Show password">
                <UserIcon class="h-5 w-5 text-gray-400"></UserIcon>
              </button>
            </div>
          </div>
          <div class="mb-2">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400"></UserIcon>
              </div>
              <input id="name" type="text" value="name"
                class="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="John Doe" required />
              <button type="button" onclick="alert('hello')" class="absolute inset-y-0 right-0 pr-3 flex items-center"
                aria-label="Show password">
                <UserIcon class="h-5 w-5 text-gray-400"></UserIcon>
              </button>
            </div>
            <div class="mt-2 space-y-2">
              <ValidationItem text="At least 8 characters" satisfied />
              <ValidationItem text="At least one lowercase letter" satisfied />
              <ValidationItem text="At least one uppercase letter" satisfied />
              <ValidationItem text="At least one number" :satisfied=false />
              <ValidationItem text="At least one special character" satisfied />
            </div>
          </div>
          
        </form>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
const a = 1;
const { login } = useAuth();
const router = useRouter();

const isLoading = ref(false);
const loginUser = async () => {
  const email = document.getElementById('email') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 400));
  const response = await login(email.value, password.value);
  isLoading.value = false;
  if (!response) {
    return;
  }
  if (!response.success) {
    return;
  }
  alert(response.message);
  router.push('/');
  window.location.reload();
}
</script>