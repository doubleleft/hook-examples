/*
 * This example uses only jQuery, without any JavaScript framework just for
 * demonstration purposes.
 *
 * Actually, hook is a lot more powerful using JavaScript frameworks.
 */
$(function() {

  //
  // Create hook instance with your application credentials
  //
  hook = new Hook.Client({
    app_id: 1,
    key: "95e6e9c7ac3add84588fecfa43280ee9",
    endpoint: "http://ancient-dusk-7627.herokuapp.com/"
  })

  update_user_status();

  function update_user_status() {
    if (hook.auth.currentUser) {
      // show logged-in section
      $('.not-logged-in').addClass('hidden');
      $('.logged-in').removeClass('hidden');

      $('.user-data').html("hook.auth.currentUser:  " + JSON.stringify(hook.auth.currentUser));

    } else {
      // show login/register form
      $('.not-logged-in').removeClass('hidden');
      $('.logged-in').addClass('hidden');
    }
  }

  // logout button click
  $('#bt-logout').click(function(e) {
    e.preventDefault();
    hook.auth.logout();
    update_user_status();
  });

  // login button click
  $('#bt-login').click(function(e) {
    e.preventDefault();
    $('#message').html('Loading...');

    hook.oauth.popup('facebook').then(function(data) {
      // success!
      console.log("Sucessfully logged in: ", data);
      $('#message').html('');

      // show logged-in info
      update_user_status();

    }).otherwise(function(data) {
      // error!
      // - bad email address?
      // - invalid user
      $('#message').html("Opps, hook responded with error: " + data.error);
    })
  });

});

