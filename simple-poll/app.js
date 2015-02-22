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

      $('.user-data').html("Welcome " + hook.auth.currentUser.email + "!");
      reload_questions();

    } else {
      // show login/register form
      $('.not-logged-in').removeClass('hidden');
      $('.logged-in').addClass('hidden');
    }
  }

  function reload_questions() {
    // clear all questions
    $('.questions').html('');

    // request for all items on questions collection
    hook.collection('questions').sort('votes', -1).each(function(question) {
      var item = $('<li>' + question.name + ' <a href="#" data-_id="' + question._id + '">upvote</a> (<span data-count="' + question.votes + '" class="count"></span>)</li>');
      $('.questions').append(item)
    }).otherwise(function(data) {
      // there is no questions registered yet.
      console.log("No question registered yet.");
    })
  }

  // bind events to DOM elements

  $('.questions').on('click', 'a', function(e) {
    var that = this,
        _id = $(this).data('_id');

    hook.collection('questions').where('_id', _id).increment('votes', 1).then(function() {
      reload_questions();

    }).otherwise(function(data) {
      $('#question-message').html(data.error);
    });
  });

  // logout button click
  $('#bt-logout').click(function(e) {
    e.preventDefault();
    hook.auth.logout();
    update_user_status();
  });

  // register button click
  $('#bt-register').click(function(e) {
    e.preventDefault();
    $('#message').html('Loading...');

    hook.auth.register({
      email: $('input[name="email"]').val(),
      password: $('input[name="password"]').val()
    }).then(function(data) {
      // success!
      console.log("Sucessfully registered: ", data);
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

  // login button click
  $('#bt-login').click(function(e) {
    e.preventDefault();
    $('#message').html('Loading...');

    hook.auth.login({
      email: $('input[name="email"]').val(),
      password: $('input[name="password"]').val()
    }).then(function(data) {
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

  // create question form
  $('#form-create-question').submit(function(e) {
    e.preventDefault();

    // loading indicator
    $('#question-message').html('Creating...');

    hook.collection('questions').create({
      name: $('input[name="question"]').val(),
      votes: 0
    }).then(function(data) {
      // empty question field
      $('input[name="question"]').val('');

      // status message
      $('#question-message').html('Created.');

      // reload all questions on complete
      reload_questions();

    }).otherwise(function(data) {
      // oops! that was unexpected.
      // is the server offline?
      alert(data.error);
    });

  })

});
