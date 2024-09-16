<x-guest-layout>
    <x-authentication-card>
        <x-slot name="logo">
            <!-- <x-authentication-card-logo /> -->
            <div class="login-pg" style="display:inline-flex; margin-right:4rem ; margin-left: -2rem" >
            <img style="height: 150px; width: 120px;" src="{{ asset('users/img/blood__1_-removebg-preview.png') }}" alt="">

                  <h1 style="color:  rgb(216, 26, 26);font-size:2.5rem ; font-weight:bold; margin-top:4rem ; margin-right: -4rem"  >Blood Link</h1>
                  </div>


        </x-slot>

        <div class="mb-4 text-sm text-gray-600">
            {{ __('Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.') }}
        </div>

        @if (session('status') == 'verification-link-sent')
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ __('A new verification link has been sent to the email address you provided in your profile settings.') }}
            </div>
        @endif

        <div class="mt-4 flex items-center ">
            <form method="POST" action="{{ route('verification.send') }}">
                @csrf

                <div>
                    <x-button style="padding:12px; margin:8px ;background-color: rgb(216, 26, 26);"  type="submit">
                        {{ __('Resend Verification Email') }}
                    </x-button>
                </div>
            </form>

            <div class="" style="display: flex; flex-direction:row;" >
                <a 
                    href="{{ route('profile.show') }}" style="margin-left:27px; margin-top:3px"
                    class=" ms-5 underline  text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {{ __('Edit Profile') }}</a>

                <form method="POST" action="{{ route('logout') }}" class="inline">
                    @csrf

                    <button type="submit" style="margin-left:8px" class=" underline   text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        {{ __('Log Out') }}
                    </button>
                </form>
            </div>
        </div>
    </x-authentication-card>
</x-guest-layout>
