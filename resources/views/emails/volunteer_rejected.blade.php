<!DOCTYPE html>
<html>
<head>
    <title>Volunteer Application Rejected</title>
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
    <h5>Dear {{ $v_details->name }},</h5>
    <p>We regret to inform you that we are unable to approve your application to volunteer as a {{ $v_details->role }} at this time, as all available slots are currently full.</p>
    <p>However, we encourage you to apply again in the future when more opportunities become available.</p>
    <p>Thank you for your interest, and we hope to work with you soon!</p>
    <p>If you have any questions, feel free to contact us.</p>

    <div class="footer">
        <p>&copy; {{ date('Y') }} Blood Link. All rights reserved.</p>
        <p>1234 Any Street, karachi, Pakistan</p>
        <p><a href="mailto:bloodlink897@gmail.com"></a>Contact us: bloodlink897@gmail.com</p>

    </div>
</body>
</html>
