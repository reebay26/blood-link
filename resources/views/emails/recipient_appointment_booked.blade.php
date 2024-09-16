<!DOCTYPE html>
<html>
<head>
    <title>Recipient Appointment Confirmation</title>
    <style>
        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #dcdcdc;
            font-size: 12px;
            color: #777;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <p>Dear {{ $r_appointment->recipient_name }},</p>
    <p>Your appointment has been booked successfully. Details are as follows:</p>
    <ul>
        <li>Date: {{ $r_appointment->date }}</li>
        <li>Time: {{ $r_appointment->time }}</li>
        <li>Hospital: {{ $r_appointment->hospital }}</li>
        
    </ul>
    <p>Thank you for booking with us!</p>
    <div class="footer">
        <p>&copy; {{ date('Y') }} Blood Link. All rights reserved.</p>
        <p>1234 Any Street, karachi, Pakistan</p>
        <p><a href="mailto:bloodlink897@gmail.com"></a>Contact us: bloodlink897@gmail.com</p>
      
    </div>
</body>
</html>