<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blood Link Appointment Form</title>
    <link rel="stylesheet" href="./users/style.css">
    <link rel="stylesheet" href="./users/asset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    

    <style>
        /* Basic reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            /* font-family: 'Arial', sans-serif; */
            background-color: #f2f2f2;
            color: #333;
        }

        .container1 {
            max-width: 995px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            border: 2px solid rgb(43, 153, 232);
        }

      .container1 h1 {
            color: #d32f2f;
            text-align: center;
            margin-bottom: 20px;
            font-size: 2.4em;
            font-weight: bold;
        }

       .container1 p {
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.2em;
        }

        fieldset {
            border: 2px solid rgb(43, 153, 232) ;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
            background-color: #fafafa;
        }

        legend {
            font-weight: bold;
            color: #d32f2f;
            padding: 0 10px;
            background: #fff;
            position: absolute;
            top: -15px;
            left: 20px;
            font-size: 1.1em;
        }

        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }

        input[type="text"],
        input[type="date"],
        input[type="time"],
        input[type="tel"],
        input[type="email"],
        select,
        textarea {
            width: 100%;
            padding: 12px;
            margin-top: 5px;
            border: 1px solid #ddd;
            border-radius: 8px;
            transition: border-color 0.3s, box-shadow 0.3s;
        }

        input:focus,
        select:focus,
        textarea:focus {
            border-color: #d32f2f;
            box-shadow: 0 0 8px rgba(211, 47, 47, 0.5);
        }

        textarea {
            height: 120px;
            resize: vertical;
        }

        .radio-group {
            display: flex;
            gap: 15px;
            margin-bottom: 10px;
        }

        button {
            background-color: #d32f2f;
            color: #fff;
            border: none;
            padding: 15px;
            font-size: 18px;
            border-radius: 8px;
            cursor: pointer;
            width: 100%;
            text-align: center;
            transition: background-color 0.3s, transform 0.3s;
        }

        button:hover {
            background-color: #b71c1c;
            transform: scale(1.05);
        }

        button:active {
            transform: scale(0.95);
        }

        input[type="radio"],
        input[type="checkbox"] {
            margin-right: 10px;
        }
        
        .b1 button{
          max-width: 95%;
          margin-left: 2rem;
          margin-top: 10px;
         text-align: center;

        }
      #donor-form{
        margin-top: 20px;
      }
    #recipient-form{
        margin-top: 20px;
    }
    .alert {
            padding: 20px;
            background-color: #f44336;
            color: white;
            margin-bottom: 15px;
            border-radius: 4px;
        }

        .closebtn {
            margin-left: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        .closebtn:hover {
            color: black;
        }
    </style>
       <script>
        function showForm(type) {
            document.getElementById('donor-form').style.display = type === 'donor' ? 'block' : 'none';
            document.getElementById('recipient-form').style.display = type === 'recipient' ? 'block' : 'none';
        }

    </script>
</head>
<body>


<h1 class="moto-text_system_7" style="text-align: center; margin-top:2em;" >Book Your Appointment</h1>
    <div class="container1">
   
            <label>Select Form:</label>
            <div class="b1">
            <button type="button" onclick="showForm('donor')">Donor Appointment Form</button>
            <button type="button" onclick="showForm('recipient')">Recipient Appointment Form</button>
        </div>

        <!-- Donor Appointment Form -->
        <div id="donor-form" style="display: none;">
            <h1> Donor Appointment Form </h1>
            <p>Thank you for choosing Blood Link to make a difference. Please fill out the form below to schedule your appointment.</p>
            
            <form action="/book_donor_appointment" method="POST">
                @csrf
                <fieldset>
                    <legend>👤 Personal Information</legend>
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" required>

                    <label>Gender:</label>
                    <div class="radio-group">
                        <input type="radio" id="male" name="gender" value="Male">
                        <label for="male">Male</label>
                        <input type="radio" id="female" name="gender" value="Female">
                        <label for="female">Female</label>
                     
                    </div>

                    <label for="phone">Contact Number:</label>
                    <input type="text" id="phone" name="phone" required>

                    <label for="email">Email Address:</label>
                    <input type="email" id="email" name="email" required>
                </fieldset>

                <fieldset>
                    <legend>📅 Appointment Details</legend>
                    <label for="date">Preferred Date:</label>
                    <input type="text" id="date" name="date" required>

                    <label for="time">Preferred Time:</label>
                    <input type="text" id="time" name="time" required>
                    <label for="source"> Preferred Hospital:</label>
                    <select id="source" name="hospital">
                        <option value="Indus Hospital">Indus Hospital</option>
                        <option value="Fatmid Foundation">Fatmid Foundation</option>
                        <option value="Liaquat National Hospital">Liaquat National Hospital</option>
                        <option value="Husaini Blood Bank">Husaini Blood Bank</option>
                    </select>
                </fieldset>

                <fieldset>
                    <legend>🩺 Health Information</legend>
                    <label>Have you donated blood before?</label>
                    <div class="radio-group">
                        <input type="radio" id="donated-yes" name="donated" value="Yes">
                        <label for="donated-yes">Yes</label>
                        <input type="radio" id="donated-no" name="donated" value="No">
                        <label for="donated-no">No</label>
                    </div>

                    <label>Are you currently taking any medication?</label>
                    <div class="radio-group">
                        <input type="radio" id="medication-yes" name="medication" value="Yes">
                        <label for="medication-yes">Yes</label>
                        <input type="radio" id="medication-no" name="medication" value="No">
                        <label for="medication-no">No</label>
                    </div>
                    <textarea id="medication-details" name="medication_details" placeholder="If yes, please specify"></textarea>

                    <label>Do you have any medical conditions?</label>
                    <div class="radio-group">
                        <input type="radio" id="conditions-yes" name="conditions" value="Yes">
                        <label for="conditions-yes">Yes</label>
                        <input type="radio" id="conditions-no" name="conditions" value="No">
                        <label for="conditions-no">No</label>
                    </div>
                    <textarea id="conditions-details" name="conditions_details" placeholder="If yes, please specify"></textarea>
                </fieldset>

                <fieldset>
                    <legend>📝 Additional Information</legend>
                    <label for="source">How did you hear about us?</label>
                    <select id="source" name="source">
                        <option value="Social Media">Social Media</option>
                        <option value="Referral">Referral</option>
                        <option value="Website">Website</option>
                        <option value="Other">Other</option>
                    </select>

                    <label for="comments">Comments or Special Requests:</label>
                    <textarea id="comments" name="comments"></textarea>
                </fieldset>

                <fieldset>
                    <legend>🔒 Consent</legend>
                    <input type="checkbox" id="consent" name="consent" required>
                    <label for="consent">I consent to the collection and use of my personal information for scheduling and processing my blood donation appointment.</label>
                </fieldset>

                <button type="submit">Submit</button>
            </form>
        </div>

       <!-- Recipient Appointment Form -->
<div id="recipient-form" style="display: none;">
    <h1> Recipient Appointment Form </h1>
    <p>Thank you for choosing Blood Link. Please fill out the form below to schedule your appointment.</p>
    
    <form action="/book_recipient_appointment" method="POST">
        @csrf
        <fieldset>
            <legend>👤 Personal Information</legend>
            <label for="recipient_name">Full Name:</label>
            <input type="text" id="recipient_name" name="recipient_name" required>

            <label for="recipient_dob">Date of Birth:</label>
            <input type="date" id="recipient_dob" name="recipient_dob" required>

            <label>Gender:</label>
            <div class="radio-group">
                <input type="radio" id="recipient_male" name="recipient_gender" value="Male">
                <label for="recipient_male">Male</label>
                <input type="radio" id="recipient_female" name="recipient_gender" value="Female">
                <label for="recipient_female">Female</label>
               
            </div>

            <label for="recipient_phone">Contact Number:</label>
            <input type="text" id="recipient_phone" name="recipient_phone" required>

            <label for="recipient_email">Email Address:</label>
            <input type="email" id="recipient_email" name="recipient_email" required>
        </fieldset>

        <fieldset>
                    <legend>📅 Appointment Details</legend>
                    <label for="date">Preferred Date:</label>
                    <input type="text" id="date" name="date" required>

                    <label for="time">Preferred Time:</label>
                    <input type="text" id="time" name="time" required>
                    <label for="source"> Preferred Hospital:</label>
                    <select id="source" name="hospital">
                        <option value="Indus Hospital">Indus Hospital</option>
                        <option value="Fatmid Foundation">Fatmid Foundation</option>
                        <option value="Liaquat National Hospital">Liaquat National Hospital</option>
                        <option value="Husaini Blood Bank">Husaini Blood Bank</option>
                    </select>
                </fieldset>

        <fieldset>
            <legend>🩺 Health Information</legend>
            <label>Are you currently taking any medication?</label>
            <div class="radio-group">
                <input type="radio" id="recipient_medication_yes" name="recipient_medication" value="Yes">
                <label for="recipient_medication_yes">Yes</label>
                <input type="radio" id="recipient_medication_no" name="recipient_medication" value="No">
                <label for="recipient_medication_no">No</label>
            </div>
            <textarea id="recipient_medication_details" name="recipient_medication_details" placeholder="If yes, please specify"></textarea>

            <label>Do you have any medical conditions?</label>
            <div class="radio-group">
                <input type="radio" id="recipient_conditions_yes" name="recipient_conditions" value="Yes">
                <label for="recipient_conditions_yes">Yes</label>
                <input type="radio" id="recipient_conditions_no" name="recipient_conditions" value="No">
                <label for="recipient_conditions_no">No</label>
            </div>
            <textarea id="recipient_conditions_details" name="recipient_conditions_details" placeholder="If yes, please specify"></textarea>
        </fieldset>

        <fieldset>
            <legend>📝 Additional Information</legend>
            <label for="recipient_source">How did you hear about us?</label>
            <select id="recipient_source" name="recipient_source">
                <option value="Social Media">Social Media</option>
                <option value="Referral">Referral</option>
                <option value="Website">Website</option>
                <option value="Other">Other</option>
            </select>

            <label for="recipient_comments">Comments or Special Requests:</label>
            <textarea id="recipient_comments" name="recipient_comments"></textarea>
        </fieldset>

        <fieldset>
            <legend>🔒 Consent</legend>
            <input type="checkbox" id="recipient_consent" name="recipient_consent" required>
            <label for="recipient_consent">I consent to the collection and use of my personal information for scheduling and processing my blood transfusion appointment.</label>
        </fieldset>

        <button type="submit">Submit</button>
    </form>
</div>
    </div>
    @if (session('status'))
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                alert("{{ session('status') }}");
            });
        </script>
    @endif
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script>
            document.addEventListener('DOMContentLoaded', () => {
        // Initialize Flatpickr for date and time inputs
        flatpickr("#date", {
            dateFormat: "Y-m-d",
            minDate: "today"
        });

        flatpickr("#time", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "h:i K",  // Updated to 12-hour format with AM/PM
            time_24hr: false  // Disable 24-hour time
        });

            const form = document.getElementById('appointment-form');
            
            form.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent form submission
                
                const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value && (input.type !== 'radio' && input.type !== 'checkbox')) {
                        isValid = false;
                        input.style.borderColor = '#d32f2f';
                    } else {
                        input.style.borderColor = '#ddd';
                    }
                });
                
                if (!form.querySelector('input[name="gender"]:checked')) {
                    isValid = false;
                    alert('Please select your gender.');
                }
                
                if (!form.querySelector('input[name="donated"]:checked')) {
                    isValid = false;
                    alert('Please select if you have donated blood before.');
                }
                
                if (!form.querySelector('input[name="medication"]:checked')) {
                    isValid = false;
                    alert('Please select if you are currently taking medication.');
                }
                
                if (!form.querySelector('input[name="conditions"]:checked')) {
                    isValid = false;
                    alert('Please select if you have any medical conditions.');
                }
                
                if (isValid) {
                    form.reset();
                    alert('Your appointment has been scheduled successfully!');
                }
            });
        });


    </script>


</body>
</html>
