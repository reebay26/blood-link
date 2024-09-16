<x-guest-layout>
    <x-authentication-card>
    <x-slot name="logo">
        
            <div class="login-pg" style="display:inline-flex; margin-right:4rem ; margin-left: -2rem" >
                  <img style="height:150px; width:120px;" src="./users/img/blood__1_-removebg-preview.png"  alt="">
                  <h1 style="color:  rgb(216, 26, 26);font-size:2.5rem ; font-weight:bold; margin-top:4rem ; margin-right: -4rem"  >Blood Link</h1>
                  </div>
        </x-slot>

        <div class="mb-4 text-sm text-gray-600">
            {{ __('This is a secure area of the application. Please confirm your password before continuing.') }}
        </div>

        <x-validation-errors class="mb-4" />

        <form method="POST" action="{{ route('password.confirm') }}">
            @csrf

            <div>
                <x-label for="password" value="{{ __('Password') }}" />
                <x-input id="password" class="block mt-1 w-full" type="password" name="password" required autocomplete="current-password" autofocus />
            </div>

            <div class="flex justify-end mt-4">
                <x-button  style="padding:12px; margin:10px ;background-color: rgb(216, 26, 26);" class="ms-4">
                    {{ __('Confirm') }}
                </x-button>
            </div>
        </form>
    </x-authentication-card>
</x-guest-layout>
