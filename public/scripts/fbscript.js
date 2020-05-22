/**
 * The following code instantiates the Facebook SDK for our app.
 * Source : https://developers.facebook.com/
 */


window.fbAsyncInit = function () {
    FB.init({
        appId: '265211758218768',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v7.0'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));