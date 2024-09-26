<!DOCTYPE html>
<html>
<head>
    <title>Donor Registration</title>
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
    <h1>Hello, {{ $donor->name }}</h1>
    <p>Thank you for registering as a donor. Once you have completed your blood donation, please let us know by clicking the button below to send us an email.</p>

    <a href="mailto:bloodlink897@gmail.com?subject=Donation Confirmation&body=I have donated my blood."
       style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
        I Have Donated
    </a>

    <p>If you haven’t donated yet, you can come back to this email and click the button once you have.</p>

    <p>Thank you!</p>
</body>
</html>
