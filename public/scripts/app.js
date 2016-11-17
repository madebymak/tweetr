/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(function() {

//   var tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];



  //version 1
  function loadTweets() {
      var getTweets = $.ajax({
      dataType: "JSON",
      url: "http://localhost:8080/tweets/",
      method: "GET",
      success: function (data) {
         console.log(renderTweets(data))
         // console.log(JSON.stringify(data));
      }
    })
     // return tweetObject;
     // console.log(JSON.stringify(tweetObject));
  }

loadTweets();



  ///////////////
  function renderTweets(tweets) {
    // console.log(tweets);

    tweets.forEach(function (data) {
      createTweetElement(data);
      return;
    })

  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

////////////


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

    $('.tweet-timeline').append(
    `<article>
          <header>
            <div class="header"><img class="avatar" src="${avatar}">
              <div class= "user-handle">${userHandle} </div>
              <div class= "real-name-box"><h1 class="name">${userName} </h1></div>
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
            <div class="blank"></div>
          </footer>
        </article>`
    );



    // $( ".user-handle" ).append( tweet.user.handle );
    // $( ".real-name-box .name" ).append( tweet.user.name );
    // $( ".timeline-body" ).append( tweet.content.text );
    // $( ".date" ).append( timeSince(tweet.created_at));
    // $( ".avatar" ).attr("src", tweet.user.avatars.regular  )


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

///////////////

// createTweetElement(tweetData)
 // renderTweets(loadTweets());



});
