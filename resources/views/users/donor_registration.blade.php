<!DOCTYPE html>
<html lang="en" data-ng-app="website">
<head>
    <meta charset="utf-8">
    <title>Home</title>
    <link rel="SHORTCUT ICON" style="height: 950; width: 650;" href="./users/img/blood__1_-removebg-preview.png" />
    <link rel="stylesheet" href="./users/style.css">
    <link rel="stylesheet" href="./users/asset.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="canonical" href="https://demo.try-builder.com/site/03/00s/ax/0300sax6wbg7oedj/contacts/" />
    <meta property="og:title" content="Contacts"/>
    <meta property="og:type" content="website"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url(//fonts.googleapis.com/css?family=Merriweather:300,300italic,regular,italic,700,700italic,900,900italic|Poppins:200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic&subset=latin);
    </style>
    <style>
        .container {
            max-width: 600px;
            margin: 2em auto;
            padding: 15px;
            border: 1px solid whitesmoke;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-label {
            display: block;
            margin-bottom: 5px;
        }
        .form-input {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        .form-error {
            color: red;
            display: none;
        }
        .form-error.visible {
            display: block;
        }
        .form-button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color:  rgb(216, 26, 26);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .form-button:hover {
            background-color:rgb(216, 26, 26) ;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .form-input {
                padding: 6px;
            }
            .form-button {
                padding: 8px;
            }
        }
        /* Alert styles */
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border: 1px solid transparent;
            border-radius: 4px;
            text-align: center
        }
        .alert-success {
            color: #155724;
            background-color: #d4edda;
            border-color: #c3e6cb;
        }
        .alert-error {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
        }
    </style>
</head>
<body class="moto-background moto-website_live">
    <div class="page">
        @include("users.header")

        <!-- Donor form start -->
       @if(session('status'))
       <script>
        document.addEventListener('DOMContentLoaded',function(){
            alert("{{session('status')}}");
        })
       </script>
       @endif


        <h1 class="moto-text_system_7" style="text-align: center;  color: rgb(216, 26, 26);">Donor Registration Form</h1>
        <div class="container">
            <form action="/add_donor" method="POST" id="donorForm" enctype="multipart/form-data">
                @csrf
                <div class="form-group">
                    <label for="name" class="form-label">Your name</label>
                    <input type="text" class="form-input" placeholder="Your name *" name="name" id="name" required />
                    <span class="form-error" id="nameError">Field is required</span>
                </div>

                <div class="form-group">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-input" placeholder="Email *" name="email" id="email" required />
                    <span class="form-error" id="emailError">Field is required</span>
                </div>

                <div class="form-group">
                    <label for="type" class="form-label">Blood Type</label>
                    <input list="bloodTypes" class="form-input" placeholder="Your Blood Type *" name="type" id="type" required />
                    <datalist id="bloodTypes">
                        <option value="A+"></option>
                        <option value="A-"></option>
                        <option value="B+"></option>
                        <option value="B-"></option>
                        <option value="AB+"></option>
                        <option value="AB-"></option>
                        <option value="O+"></option>
                        <option value="O-"></option>
                    </datalist>
                    <span class="form-error" id="typeError">Field is required</span>
                </div>

                @if(session('birthstatus'))
                <script>
                 document.addEventListener('DOMContentLoaded',function(){
                     alert("{{session('birthstatus')}}");
                 })
                </script>
                @endif
                <div class="form-group">
                    <label for="date" class="form-label">Date Of Birth</label>
                    <input type="date" class="form-input" placeholder="Your Date Of Birth *" name="date" id="date" required />
                    <span class="form-error" id="dateError">Field is required</span>
                </div>
                @if(session('durationstatus'))
                <script>
                 document.addEventListener('DOMContentLoaded',function(){
                     alert("{{session('durationstatus')}}");
                 })
                </script>
                @endif
                <div class="form-group">
                    <label for="last_donation" class="form-label">Last Donation(if donate)</label>
                    <input type="date" class="form-input" placeholder="Your last donation" name="last_donation" id="last_donation" />
                </div>

                @if(session('weightstatus'))
                <script>
                document.addEventListener('DOMContentLoaded',function(){
                    alert("{{ session('weightstatus') }}");
                });
                </script>
                @endif

                <div class="form-group">
                    <label for="weight" class="form-label">Weight (in kg)</label>
                    <input type="number" class="form-input" placeholder="Your weight *" name="weight" id="weight" required />
                    <span class="form-error" id="weightError">Field is required</span>
                </div>

                <div class="form-group">
                    <label for="health_conditions" class="form-label">Health Conditions(Optional)</label>
                    <textarea class="form-input" placeholder="Any existing health conditions" name="health_conditions" id="health_conditions"></textarea>
                </div>

                <div class="form-group">
                    <label for="eligibility_document"  class="form-label">Upload Medical Proof </label>
                    <input type="file" required class="form-input" name="eligibility_document" id="eligibility_document" accept=".pdf, .jpg, .jpeg, .png" />
                    <small class="form-description">
                        Acceptable documents include:
                        <ol  >
                            <li>Blood test report</li>
                            <li>Health card</li>
                            <li>Medical fitness certificate</li>
                            <li>Doctor's prescription or medical clearance</li>
                        </ol>
                    </small>
                </div>

                <div class="form-group">
                    <input type="checkbox" name="no_disqualifying_conditions" id="no_disqualifying_conditions" required />
                    <label for="no_disqualifying_conditions" class="form-label">I confirm that I have no disqualifying conditions and meet the eligibility criteria *</label>
                    <span class="form-error" id="noDisqualifyingConditionsError">This field is required</span>
                </div>

                <button type="submit" class="form-button">Register Yourself</button>
            </form>
        </div>
        <!-- Donor form end -->

        @include("users.footer")
    </div>
</body>
</html>
