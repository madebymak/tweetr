$(function() {

  $( ".compose-text" ).click(function() {
    $( ".new-tweet" ).toggle( "slow" );
    $( ".text-box" ).focus();
  });

  $('form[action="/tweets"]').on('submit', function (event) {
    event.preventDefault();
    var formInput = $(this);
    $.ajax({
      method: formInput.attr('method'),
      url: formInput.attr('action'),
      data: formInput.serialize(),
      success: function (data){
        // console.log(Date.now()%1000000, "data from reply to our POST", data);
        $( ".text-box" ).val("");
        loadTweets(data);
      }
    })


  });

  function loadTweets() {
    // console.log(Date.now()%1000000, "just called loadTweets, haven't done any work yet");
    $.ajax({
      dataType: "JSON",
      url: "http://localhost:8080/tweets/",
      method: "GET",
      success: function (data) {
        // console.log("loadTweets data", data)
        renderTweets(data);
      }
    });
    // console.log(Date.now()%1000000, "leaving loadTweets, good night and good luck");
  };

  function renderTweets(tweets) {
    $('.tweet-timeline').empty();
    console.log(tweets);

    // TODO: delete all pre-existing tweets from the webpage, before the next-line redraws all of them
    tweets.forEach(function (data) {
      // console.log(Date.now()%1000000, 'about to call createTweetElement');
      createTweetElement(data);
    });
  };

  function createTweetElement(tweet) {
    var avatar = tweet.user.avatars.regular;
    var userHandle = tweet.user.handle;
    var userName = tweet.user.name;
    var tweetText = tweet.content.text;
    var timePosted = timeSince(tweet.created_at);

    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    $('.tweet-timeline').prepend(     // TODO: Jeremy says that this 'prepend' should not be on this line
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

    if (interval > 1) {
        return interval + " years";
    }

    interval = Math.floor(seconds / 2592000);

    if (interval > 1) {
        return interval + " months";
    }

    interval = Math.floor(seconds / 86400);

    if (interval > 1) {
        return interval + " days";
    }

    interval = Math.floor(seconds / 3600);

    if (interval > 1) {
        return interval + " hours";
    }

    interval = Math.floor(seconds / 60);

    if (interval > 1) {
        return interval + " minutes";
    }

    return Math.floor(seconds) + " seconds";
    }
  }

  loadTweets();
  // console.log(Date.now()%1000000, "done first pass; now it is nap time until a callback fires");
});
