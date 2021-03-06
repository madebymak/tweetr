$(function() {

  $( ".compose-text" ).click(function() {
    $( ".new-tweet" ).toggle( "slow" );
    $( ".text-box" ).focus();
  });

  $('form[action="/tweets"]').on('submit', function (event) {
    event.preventDefault();
      if( $(".text-box").val().length === 0 ) {
          $(".counter").text(length).css("color", "red").text("Empty!");
      }
    var formInput = $(this);
    $.ajax({
      method: formInput.attr('method'),
      url: formInput.attr('action'),
      data: formInput.serialize(),
      success: function (data){
        $( ".text-box" ).val("");
        $(".counter").text("140");
        loadTweets(data);
      }
    })
  });

  function loadTweets() {
    $.ajax({
      dataType: "JSON",
      url: "/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data);
      }
    });
  };

  function renderTweets(tweets) {
    $(".tweet-timeline").empty();
    tweets.forEach(function (data) {
      createTweetElement(data);
    })
  }

  function createTweetElement(tweet) {
    var avatar = tweet.user.avatars.regular;
    var userHandle = tweet.user.handle;
    var userName = tweet.user.name;
    var tweetText = tweet.content.text;
    var timePosted = timeSince(tweet.created_at);

    function escape(str) {
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    $(".tweet-timeline").prepend(
      `<article>
        <header>
          <div class="tweet-box-header">
            <img class="avatar" src="${avatar}">
            <div class= "user-handle">${userHandle} </div>
            <div class= "real-name-box">
              <h1 class="name">${userName}</h1>
            </div>
          </div>
        </header>
        <div class="timeline-body">${escape(tweetText)}</div>
        <footer>
          <div class="date">${timePosted}
            <div class="icons">
              <i class="fa fa-flag"></i>
              <i class="fa fa-retweet"></i>
              <i class="fa fa-heart"></i>
            </div>
          </div>
        </footer>
      </article>`
    );

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    var minutes = 60;
    var hours = 3600;
    var days = 86400;
    var years = 259200;

    if (interval > 1) {
        return interval + " years";
    }

    interval = Math.floor(seconds / years);

    if (interval > 1) {
        return interval + " months";
    }

    interval = Math.floor(seconds / days);

    if (interval > 1) {
        return interval + " days";
    }

    interval = Math.floor(seconds / hours);

    if (interval > 1) {
        return interval + " hours";
    }

    interval = Math.floor(seconds / minutes);

    if (interval > 1) {
        return interval + " minutes";
    }

    return Math.floor(seconds) + " seconds";
    }
  }

  loadTweets();
});
