<!DOCTYPE html>
<html lang="en" data-ng-app="website">

<head>
    <meta charset="utf-8">
    <title>About Us</title>
    <link rel="SHORTCUT ICON" style="height: 950; width: 650;" href="./users/img/blood__1_-removebg-preview.png" />

     <link rel="stylesheet" href="./users/style.css">
   <link rel="stylesheet" href="./users/asset.css">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preload" as="font" type="font/woff2" crossorigin href="https://template79832.motopreview.com/mt-includes/fonts/fontawesome-webfont.woff2?v=4.7.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />



   

    <style>
        @import url(//fonts.googleapis.com/css?family=Merriweather:300,300italic,regular,italic,700,700italic,900,900italic|Poppins:200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic&subset=latin);
    </style>
  

            
        
          
            






</head>

<body class="moto-background moto-website_live">



    <!-- Hook: |Render: website.body.top| -->
    <!-- Google Tag Manager -->
    <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-PXV336" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>
    <script>(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : ""; j.async = true; j.src = "//www.googletagmanager.com/gtm.js?id=" + i + dl; f.parentNode.insertBefore(j, f); })(window, document, "script", "xxxxDataLayer", "GTM-PXV336");</script>
    <!-- End Google Tag Manager -->





    <div class="page">
        
     @include('users.header')
    
@include('users.about_section')


     
    </div>

   
    @include('users.footer')


    <div data-moto-back-to-top-button class="moto-back-to-top-button">
        <a ng-click="toTop($event)" class="moto-back-to-top-button-link">
            <span class="moto-back-to-top-button-icon fa"></span>
        </a>
    </div>
    <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
    <script type="text/javascript" data-cfasync="false">
        var websiteConfig = websiteConfig || {};
        websiteConfig.address = 'https://demo.try-builder.com/site/03/00s/9w/0300s9wjo5own9w5/';
        websiteConfig.relativeAddress = '/site/03/00s/9w/0300s9wjo5own9w5/';
        websiteConfig.pageAbsoluteAddress = 'https://demo.try-builder.com/site/03/00s/9w/0300s9wjo5own9w5/about-us/';
        websiteConfig.addressHash = 'c2b6e5894224fcde2011960371c5db01';
        websiteConfig.apiUrl = '/site/03/00s/9w/0300s9wjo5own9w5/api.php';
        websiteConfig.preferredLocale = 'en_US';
        websiteConfig.timeZone = 'UTC';
        websiteConfig.preferredLanguage = websiteConfig.preferredLocale.substring(0, 2);
        websiteConfig.back_to_top_button = { "topOffset": 300, "animationTime": 500, "type": "theme" };
        websiteConfig.popup_preferences = { "loading_error_message": "The content could not be loaded." };
        websiteConfig.lazy_loading = { "enabled": true };
        websiteConfig.cookie_notification = { "enabled": false, "content": "<p class=\"moto-text_normal\">This website uses cookies to ensure you get the best experience on our website.<\/p>", "content_hash": "6610aef7f7138423e25ee33c75f23279", "controls": { "visible": "close,accept", "accept": { "label": "Got it", "preset": "default", "size": "medium", "cookie_lifetime": 365 } } };
        if (window.websiteConfig.lazy_loading && !window.websiteConfig.lazy_loading.enabled) {
            window.lazySizesConfig = window.lazySizesConfig || {};
            window.lazySizesConfig.preloadAfterLoad = true;
        }
    </script>
    <script
        src="./users/text.js" data-cfasync="false"></script>
    <script type="text/javascript" data-cfasync="false">
        angular.module('website.plugins', []);
    </script>
    <script
        src="./users/min.j"
        type="text/javascript" data-cfasync="false"></script>






</body>

</html>