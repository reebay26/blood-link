<!DOCTYPE html>
<html>
<head>
    <title>Volunteer Application Approved</title>
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
<h5>Congratulations, {{ $v_details->name }}!</h5>
    <p>Your application to volunteer as a {{ $v_details->role }} has been approved.</p>
    <p>We look forward to working with you to make a positive impact!</p>
    <p>For more details, feel free to contact us.</p>
    <div class="footer">
        <p>&copy; {{ date('Y') }} Blood Link. All rights reserved.</p>
        <p>1234 Any Street, karachi, Pakistan</p>
        <p><a href="mailto:bloodlink897@gmail.com"></a>Contact us: bloodlink897@gmail.com</p>

    </div>
</body>
</html>
