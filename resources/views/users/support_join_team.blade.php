<style>
.container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
        }

        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }

        input[type="text"],
        input[type="email"],
        select {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }

        .message {
            text-align: center;
            font-size: 16px;
            color: green;
            margin-top: 20px;
        }
    </style>

<div class="moto-widget moto-widget-block moto-spacing-top-large moto-spacing-right-auto moto-spacing-bottom-large moto-spacing-left-auto" data-widget="block" data-spacing="lala" style="background-image:url(/site/03/00s/9w/0300s9wjo5own9w5/mt-content/uploads/2019/04/mt-1802-content-bg10.jpg);background-position:bottom;background-repeat:no-repeat;background-size:cover;" data-bg-position="bottom" data-bg-image="2019/04/mt-1802-content-bg10.jpg">    
    
    <div class="container-fluid">
        <div class="row">
            <div class="moto-cell col-sm-12" data-container="container">
                
            <div class="moto-widget moto-widget-row row-fixed moto-spacing-top-auto moto-spacing-right-auto moto-spacing-bottom-auto moto-spacing-left-auto" data-grid-type="sm" data-widget="row" data-spacing="aaaa"  data-bg-position="left top">
    <div class="container-fluid">
        <div class="row" data-container="container">
                    <div class="moto-widget moto-widget-row__column moto-cell col-sm-6 moto-spacing-top-auto moto-spacing-right-auto moto-spacing-bottom-auto moto-spacing-left-auto"  data-widget="row.column" data-container="container" data-spacing="aaaa" data-bg-position="left top">
<div class="moto-widget moto-widget-text moto-preset-default moto-spacing-top-auto moto-spacing-right-auto moto-spacing-bottom-small moto-spacing-left-auto" data-widget="text" data-preset="default" data-spacing="aasa" data-animation="">
    <div  class="moto-widget-text-content moto-widget-text-editable"><h2 class="moto-text_system_7">Become a Volunteer</h2></div>
</div><div class="moto-widget moto-widget-text moto-preset-default moto-spacing-top-auto moto-spacing-right-small moto-spacing-bottom-medium moto-spacing-left-auto" data-widget="text" data-preset="default" data-spacing="asma" data-animation="">
    <div class="moto-widget-text-content moto-widget-text-editable"><p class="moto-text_186">Volunteers are the heartbeat of our mission to save lives and support those in need. If you are young, energetic, and ready to make a meaningful impact, we eagerly invite you to join our volunteer family. Your enthusiasm and dedication can help us extend our reach and effectiveness in serving the community. By volunteering with us, you’ll not only gain valuable experience and contribute to a noble cause but also become part of a supportive and dynamic team committed to making a difference. We are always looking for passionate individuals who are ready to bring positive change. Join us today and be a beacon of hope for those in need—together, we can make a lasting impact and transform lives.</p></div>
</div></div><div class="moto-widget moto-widget-row__column moto-cell col-sm-5 moto-spacing-top-auto moto-spacing-right-auto moto-spacing-bottom-auto moto-spacing-left-auto"  data-widget="row.column" data-container="container" data-spacing="aaaa" data-bg-position="left top">
<div class="moto-widget moto-widget-text moto-preset-default moto-spacing-top-auto moto-spacing-right-auto moto-spacing-bottom-small moto-spacing-left-auto" data-widget="text" data-preset="default" data-spacing="aasa" data-animation="">
    <div class="moto-widget-text-content moto-widget-text-editable"><h3 class="moto-text_system_8"><span class="moto-color_custom1">Join our team</span></h3></div>
</div><div id="wid_1555315234_tagcohrr5" class="moto-widget moto-widget-contact_form moto-preset-default moto-spacing-top-auto moto-spacing-right-auto moto-spacing-bottom-auto moto-spacing-left-auto  " data-preset="default" data-widget="contact_form" data-spacing="aaaa">
<div class="container">
@if (session('status'))
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                alert("{{ session('status') }}");
            });
        </script>
    @endif

        <form action="/volunteer_register" method="POST">
            @csrf
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>

            <label for="contact">Contact Number:</label>
            <input type="text" id="contact" name="contact" required><br>

            <label for="role">Select Role:</label>
            <select id="role" name="role" required>
                <option value="Event Organizer">Event Organizer</option>
                <option value="Donor Outreach Specialist">Donor Outreach Specialist</option>
                <option value="Logistics Manager">Logistics Manager</option>
            </select><br>

            <button type="submit">Register</button>
        </form>

        <div class="message" id="confirmationMessage"></div>
    </div>

    </div></div><div class="moto-widget moto-widget-row__column moto-cell col-sm-1 moto-spacing-top-auto moto-spacing-right-auto moto-spacing-bottom-auto moto-spacing-left-auto"  data-widget="row.column" data-container="container" data-spacing="aaaa" data-bg-position="left top">

</div>
        </div>
    </div>
</div></div>
        </div>
    </div>
    
</div>            