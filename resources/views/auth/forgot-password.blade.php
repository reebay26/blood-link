<x-guest-layout>
    <x-authentication-card>
        <x-slot name="logo">
            <!-- <x-authentication-card-logo /> -->
            <div class="login-pg" style="display:inline-flex; margin-right:4rem ; margin-left: -2rem" >
                  <img style="height: 150px; width: 120px; " src="./users/img/blood__1_-removebg-preview.png"  alt="">
                  <h1 style="color:  rgb(216, 26, 26);font-size:2.5rem ; font-weight:bold; margin-top:4rem ; margin-right: -4rem"  >Blood Link</h1>
                  </div>
        </x-slot>

        <div class="mb-4 text-sm text-gray-600">
            {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
        </div>

        @if (session('status'))
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ session('status') }}
            </div>
        @endif

        <x-validation-errors class="mb-4" />

        <form method="POST" action="{{ route('password.email') }}">
            @csrf

            <div class="block">
                <x-label for="email" value="{{ __('Email') }}" />
                <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <x-button style="padding:12px; margin:8px ;background-color: rgb(216, 26, 26);" class="ms-4" >
                    {{ __('Email Password Reset Link') }}
                </x-button>
            </div>
        </form>
    </x-authentication-card>
</x-guest-layout>
