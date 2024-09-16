
<!DOCTYPE html>
<html lang="en" data-ng-app="website">
<head>
          <meta charset="utf-8">
        <title>Search</title>
        <link rel="SHORTCUT ICON" style="height: 950; width: 650;" href="./users/img/blood__1_-removebg-preview.png" />
         <link rel="stylesheet" href="./users/style.css">
         <link rel="stylesheet" href="./users/asset.css">
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="canonical" href="https://demo.try-builder.com/site/03/00s/ax/0300sax6wbg7oedj/contacts/" />
<meta property="og:title" content="Contacts"/>
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://static-demo.try-builder.com/moto3/engine/441/src/mt-includes/fonts/fontawesome-webfont.woff2?v=4.7.0">
<meta property="og:url" content="https://demo.try-builder.com/site/03/00s/ax/0300sax6wbg7oedj/contacts/"/>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>

<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<meta property="og:type" content="website"/>
 <meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
@import url(//fonts.googleapis.com/css?family=Merriweather:300,300italic,regular,italic,700,700italic,900,900italic|Poppins:200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic&subset=latin);
</style>
<style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:weight@100;200;300;400;500;600;700;800&display=swap");
    body{

   /* font-family: "Poppins", sans-serif; */
   font-weight: 300;
  }




  .search{
  position: relative;
  box-shadow: 0 0 40px rgba(51, 51, 51, .1);

  }

  .search input{

   height: 60px;
   text-indent: 25px;
   border: 2px solid #d6d4d4;
   font-size: 1.5rem;

  }


  .search input:focus{

   box-shadow: none;
   border: 2px solid blue;


  }

  .search .fa-search{

   position: absolute;
   top: 24px;
   left: 16px;

  }

  .search button{

   position: absolute;
   top: 5px;
   right: 5px;
   height: 50px;
   width: 110px;
   background:  rgb(216, 26, 26);
   font-size: 1.9rem;

  }
  @media(max-width: 460px){

      .search button{
  height: 39px;
  width: 80px;
  font-size: 1.2rem;

  }

  .search input{
  height: 50px;
  font-size: 10px;
  }

  .search .fa-search{
  top: 18px;
  }

  }



  .message {
              padding: 15px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f8f9fa;
              text-align: center;
              font-size: 1.1em;
              color: #333;
              margin-top: 20px;
          }

          .message.no-donors {
              background-color: #f8d7da;
              color: #721c24;
          }

          .message.info {
              background-color: rgb(43, 153, 232);
              color: white;
          }
          .template_faq {
      background: #edf3fe none repeat scroll 0 0;
  }
  .panel-group {
      background: #fff none repeat scroll 0 0;
      border-radius: 3px;
      box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 0.04);
      margin-bottom: 0;
      padding: 30px;
  }
  #accordion .panel {
      border: medium none;
      border-radius: 0;
      box-shadow: none;
      margin: 0 0 15px 10px;
  }
  #accordion .panel-heading {
      border-radius: 30px;
      padding: 0;
  }
  #accordion .panel-title a {
      background: rgb(216, 26, 26) none repeat scroll 0 0;
      border: 1px solid transparent;
      border-radius: 30px;
      color: #fff;
      display: block;
      font-size: 18px;
      font-weight: 600;
      padding: 12px 20px 12px 50px;
      position: relative;
      transition: all 0.3s ease 0s;
  }
  #accordion .panel-title a.collapsed {
      background: #fff none repeat scroll 0 0;
      border: 1px solid #ddd;
      color: #333;
  }
  #accordion .panel-title a::after, #accordion .panel-title a.collapsed::after {
      background: rgb(216, 26, 26) none repeat scroll 0 0;
      border: 1px solid transparent;
      border-radius: 50%;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.58);
      color: #fff;
      content: "";
      font-family: fontawesome;
      font-size: 25px;
      height: 55px;
      left: -20px;
      line-height: 55px;
      position: absolute;
      text-align: center;
      top: -5px;
      transition: all 0.3s ease 0s;
      width: 55px;
  }
  #accordion .panel-title a.collapsed::after {
      background: #fff none repeat scroll 0 0;
      border: 1px solid #ddd;
      box-shadow: none;
      color: #333;
      content: "";
  }
  #accordion .panel-body {
      background: transparent none repeat scroll 0 0;
      border-top: medium none;
      padding: 20px 25px 10px 9px;
      position: relative;
  }
  #accordion .panel-body p {
      border-left: 1px dashed #8c8c8c;
      padding-left: 25px;
  }
  .section-title{
      margin-top: 8rem;
  }
  .section-title h1{
      font-size: 4vw;
      font-weight: 600;
      color:  rgb(216, 26, 26);
  }
  .section-title p{
      font-size: 2rem;
      margin-top: 2rem;
      font-weight: 400;
  }
  .panel-body p{
      font-size: 1.8rem;
      font-weight: 400;
  }
  .panel-group{
      margin-bottom: 3rem;
  }

         </style>
</head>
<body class="moto-background moto-website_live">
    @include("users.header")
       <div class="container">

                    <div class="row height d-flex justify-content-center align-items-center">

                      <div class="col-md-8">
                             <form action="/search" method="post">
                                @csrf
                        <div class="search">
                          <i class="fa fa-search"></i>
                          <input name="bloodtype" type="text" class="form-control" placeholder="Search For Donor Based On Your Blood Type">
                          <button class="btn btn-primary">Search</button>
                        </div>
                        </form>
                      </div>

                    </div>
                </div>

                <div class="container mt-4">
            @if(isset($message))
                <div class="message no-donors">
                    {{ $message }}
                </div>
            @endif

            @if($results->isNotEmpty())
            <div class="table-responsive">
                <table class="table table-bordered table-striped mt-5 mb-5">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Blood Type</th>
                            <th>Date Of Birth</th>
                            <th>Last Donation</th>
                            <th>Eligibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($results as $donor)
                        <tr>
                            <td>{{ $donor->id }}</td>
                            <td>{{ $donor->name }}</td>
                            <td>{{ $donor->email }}</td>
                            <td>{{ $donor->blood_type }}</td>
                            <td>{{ $donor->date_of_birth }}</td>
                            <td class="border-bottom-0">
                                @if(isset($donor->last_donation))
                                  <p>{{ $donor->last_donation }}</p>
                                @else
                                 Not donated yet
                                @endif
                            </td>
                            <td style=" color:green">{{ $donor->status }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            @else
                @if(!isset($message))
                    <div class="message info">
                        Please enter a blood type to search for donors.
                    </div>
                @endif
            @endif
        </div>
<!-- FAQ Section -->

<div class="container">
			<div class="row">
				<div class="col-md-12">
					<div class="section-title text-center wow zoomIn">
						<h1>Frequently Asked Questions</h1>
						<span></span>
						<p>Our Frequently Asked Questions here.</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="headingOne">
								<h4 class="panel-title">
									<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    How can I register to receive blood?
									</a>
								</h4>
							</div>
							<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
								<div class="panel-body">
									<p> To register to receive blood, you need to complete the recipient registration form on our website. Ensure you provide accurate information and necessary medical history to facilitate a smooth process. </p>
								</div>
							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="headingTwo">
								<h4 class="panel-title">
									<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    What information do I need to provide as a recipient?
									</a>
								</h4>
							</div>
							<div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
								<div class="panel-body">
									<p>   As a recipient, you will need to provide personal information such as your name, contact details, medical history, and the reason for your blood need. This information helps us ensure the right match and timely delivery of blood. </p>
								</div>
							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="headingThree">
								<h4 class="panel-title">
									<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    How will I know if my blood request has been fulfilled?
									</a>
								</h4>
							</div>
							<div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
								<div class="panel-body">
									<p>         You will receive a notification via email or phone once your blood request has been processed and fulfilled. You can also check the status of your request through our online portal.</p>
								</div>
							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="headingFour">
								<h4 class="panel-title">
									<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    What should I do if I need urgent blood?
									</a>
								</h4>
							</div>
							<div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
								<div class="panel-body">
									<p>    If you need urgent blood, contact your healthcare provider immediately. They will help expedite your request and coordinate with the blood donation center to ensure you receive the necessary blood as quickly as possible.</p>
								</div>
							</div>
						</div>
						<div class="panel panel-default">
							<div class="panel-heading" role="tab" id="headingFive">
								<h4 class="panel-title">
									<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Can I update my blood request or personal information?
									</a>
								</h4>
							</div>
							<div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
								<div class="panel-body">
									<p>Yes, you can update your blood request or personal information by logging into your account on our website. If you encounter any issues, please contact our support team for assistance. </p>
								</div>
							</div>
						</div>
					</div>
				</div><!--- END COL -->
			</div><!--- END ROW -->
		</div>
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
        <script type="text/javascript"  src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
@include("users.footer")
                <div data-moto-back-to-top-button class="moto-back-to-top-button">
        <a ng-click="toTop($event)" class="moto-back-to-top-button-link">
            <span class="moto-back-to-top-button-icon fa"></span>
        </a>
    </div>
    <script data-cfasync="false" src="./decode.js"></script><script type="text/javascript" data-cfasync="false">
        var websiteConfig = websiteConfig || {};
                websiteConfig.address = 'https://demo.try-builder.com/site/03/00s/9w/0300s9wjo5own9w5/';
        websiteConfig.relativeAddress = '/site/03/00s/9w/0300s9wjo5own9w5/';
        websiteConfig.pageAbsoluteAddress = 'https://demo.try-builder.com/site/03/00s/9w/0300s9wjo5own9w5/';
        websiteConfig.addressHash = 'c2b6e5894224fcde2011960371c5db01';
        websiteConfig.apiUrl = '/site/03/00s/9w/0300s9wjo5own9w5/api.php';
        websiteConfig.preferredLocale = 'en_US';
        websiteConfig.timeZone = 'UTC';
        websiteConfig.preferredLanguage = websiteConfig.preferredLocale.substring(0, 2);
                websiteConfig.back_to_top_button = {"topOffset":300,"animationTime":500,"type":"theme"};
                websiteConfig.popup_preferences = {"loading_error_message":"The content could not be loaded."};
        websiteConfig.lazy_loading = {"enabled":true};
        websiteConfig.cookie_notification = {"enabled":false,"content":"<p class=\"moto-text_normal\">This website uses cookies to ensure you get the best experience on our website.<\/p>","content_hash":"6610aef7f7138423e25ee33c75f23279","controls":{"visible":"close,accept","accept":{"label":"Got it","preset":"default","size":"medium","cookie_lifetime":365}}};
        if (window.websiteConfig.lazy_loading && !window.websiteConfig.lazy_loading.enabled) {
            window.lazySizesConfig = window.lazySizesConfig || {};
            window.lazySizesConfig.preloadAfterLoad = true;
        }

    </script>

    <script src="./users/text.js" type="text/javascript" data-cfasync="false"></script>
        <script type="text/javascript" data-cfasync="false">
        angular.module('website.plugins', []);
    </script>
    <script src="./users/min.js" type="text/javascript" data-cfasync="false"></script>
        <script type="text/javascript">$.fn.motoGoogleMap.setApiKey('AIzaSyCPbz3W389x_owB2TlrqPuMEYCTFVuRvMY');</script>



</body>
</html>
