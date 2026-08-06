$(document).ready(function() {
    // Check if user has already given consent
    var consent = localStorage.getItem('privacyConsent');
    if (!consent) {
        // Show the privacy banner
        $('#privacyBanner').show();
    }
 
    // Handle accept button click
    $('#acceptCookies').on('click', function() {
        localStorage.setItem('privacyConsent', 'accepted');
        $('#privacyBanner').hide();
        // TODO: Enable analytics or other cookies here
    });
 
    // Handle reject button click
    $('#rejectCookies').on('click', function() {
        localStorage.setItem('privacyConsent', 'rejected');
        $('#privacyBanner').hide();
        // TODO: Disable analytics or other cookies here
    });
});
 
 