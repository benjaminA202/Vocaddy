import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'https://cdn.skypack.dev/react-icons/ti';



let challenges = {};
let stars;
let highscore;
let level;

let TOP_RIGHT_PROFILE;
let STARS_AMOUNT;


var requestOptions = {
  method: 'GET',
  headers: { "Content-Type": "application/json" },
};
fetch('/userMetadata', requestOptions)
  .then(response => response.json())
  .then(data => {
    challenges = data.challenges;
    stars = data.stars;
    highscore = data.highscore;
    level = data.level;

    // players displayed on the invite popup
    const player1 = getRandomPlayer();
    const player2 = getRandomPlayer();
    const player3 = getRandomPlayer();

    let totalWordsCount = 0;
    Object.keys(challenges).forEach(() => {
      totalWordsCount += 1;
    })
    // check if object is empty
    if (Object.keys(challenges).length !== 0 && challenges.constructor === Object) {

      // LOAD CARDS PAGE WITH REACT


      // check if cards h2 contents already exist
      const allCards = document.getElementsByClassName('card'); 
      const alreadyAdded = {};
      
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }

      function changeAllCardsH2() {
        let counter = 0;
        Object.keys(challenges).forEach(element => {
            allCards[counter].childNodes[1].innerText = `from ${element} (Level ${challenges[element].level})`;
          counter++;
        })
      }

      function changeAllCardsParagraph() {
        let counter = 0;
        Object.keys(challenges).forEach(element => {

            if (challenges[element].challenge.title === "Achieve a score of") {
              allCards[counter].childNodes[2].innerText = `Achieve a score of ${challenges[element].challenge.value}`;
            } else if (challenges[element].challenge.title === "Reach level") {
              allCards[counter].childNodes[2].innerText = `Reach level ${challenges[element].challenge.value}`;
            } else if (challenges[element].challenge.title === "Collect Star Amount:") {
              allCards[counter].childNodes[2].innerText = `Collect Star Amount: ${challenges[element].challenge.value}`;
            } 
          counter++;
        })
      }

      function changeAllCardsRewards() {
        let counter = 0;
        Object.keys(challenges).forEach(element => {

            allCards[counter].childNodes[3].lastChild.lastChild.innerText = `+${challenges[element].starReward}`;
          counter++;
        })
      }

      function changeAllCardsProfilePic() {
        let counter = 0;
        Object.keys(challenges).forEach(element => {
          if (challenges[element].profilePic !== undefined) {
            allCards[counter].childNodes[0].src = challenges[element].profilePic;
          } else allCards[counter].childNodes[0].src = "/Images/user.png";
          counter++;
        })
      }

      function changeAllCardsButton() {
        let counter = 0;
        Object.keys(challenges).forEach(element => {
          if (challenges[element].challenge.status === "complete") {
            allCards[counter].childNodes[3].firstChild.innerText = "Claim Reward";
            allCards[counter].childNodes[3].firstChild.onclick = e => claimReward(e);
          } 
          counter++;
        })
      }

      function changeAllCardsButtonBG() {
        let counter = 0;
        Object.keys(challenges).forEach(element => {
          if (challenges[element].challenge.status === "complete") {
            allCards[counter].childNodes[3].firstChild.style.backgroundColor = "#dbcab7";
          } 
          counter++;
        })
      }


      const CARDS = totalWordsCount;
      const MAX_VISIBILITY = 3;

      const Card = ({ title, content }) => /*#__PURE__*/
    
        React.createElement("div", { className: "card" }, /*#__PURE__*/
          React.createElement(
            "img",
            {
              src: "/Images/user.png",
              style: {width: "10vh", marginLeft: "23%", borderRadius: "50%"}
            },
            null
          ),
          React.createElement("h2", null, title), /*#__PURE__*/
          React.createElement("p", null, content),
          React.createElement(
            "div",
            {
              style: {display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "20%", cursor: "pointer"}
            },
            React.createElement(
              "button",
              {style: {width: "fit-content", fontSize: "1.5vh", display: "flex", zIndex: "9"}},
              "tracking progress..."
            ),
            React.createElement(
              "div",
              {
                style: {display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%"}
              },
              React.createElement(
                "img",
                {
                  src: "/Icons/star.svg",
                  style: {width: "3vh", marginLeft: "3vh", borderRadius: "50%", marginRight: "1vh"}
                },
                null
              ),
              React.createElement(
                "p",
                {
                  style: {width: "2vh", marginLeft: "1.5vh", borderRadius: "50%", display: "contents"}
                },
                "+200"
              )
            )
          ));

      const Carousel = ({ children }) => {
        const [active, setActive] = useState(2);
        const count = React.Children.count(children);

        return /*#__PURE__*/(
          React.createElement("div", { className: "carousel" },
            active > 0 && /*#__PURE__*/React.createElement("button", { className: "nav left", onClick: () => setActive(i => i - 1) }, /*#__PURE__*/React.createElement(TiChevronLeftOutline, null)),
            React.Children.map(children, (child, i) => /*#__PURE__*/
              React.createElement("div", {
                className: "card-container", style: {
                  '--active': i === active ? 1 : 0,
                  '--offset': (active - i) / 3,
                  '--direction': Math.sign(active - i),
                  '--abs-offset': Math.abs(active - i) / 3,
                  'pointer-events': active === i ? 'auto' : 'none',
                  'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
                  'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block'
                }
              },

                child)),


            active < count - 1 && /*#__PURE__*/React.createElement("button", { className: "nav right", onClick: () => setActive(i => i + 1) }, /*#__PURE__*/React.createElement(TiChevronRightOutline, null))));


      };

      const App = () => /*#__PURE__*/
        
        React.createElement("div", { className: "app" }, /*#__PURE__*/
          React.createElement("div", { id: "popup", className: "hide", zIndex: "9" },
            React.createElement("h1", null, "If they fail to complete the task, you receive", 
            React.createElement(
              'span',
              {
                style: {color: "#9c2127", margin: "1vh"},
              },
              `${Math.floor(Math.random() * 1000)} Stars.`),
              React.createElement("h1", {style: {margin: "0"}}, "If they succeed, you lose the number of stars.", null)

              
              ),

            // PLAYER 1
            React.createElement("div", { className: "player" },

              React.createElement("div", { className: "playerInfo", style: {display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "5vh"} },
                React.createElement("h2", {className: "playerName", style: { fontSize: "2vh", marginTop: "0", color: "rgb(156, 33, 39)"}}, Object.keys(player1)[0]),
                React.createElement(
                  "img",
                  {
                    className: "playerIMG",
                    src: Object.values(player1)[0].profilePic,
                    style: { width: "7vh", borderRadius: "50%", border: "1px solid #9c2127" }
                  },
                  null
                ),
              ),

              React.createElement("form", { className: "form", zIndex: "9" },
                React.createElement("label", { className: "selectionLabel" }, "Challenge:"),
                React.createElement("select", null,
                  React.createElement("option", null, `Achieve a score of ${Math.floor(Math.random() * 1000)}`),
                  React.createElement("option", null, `Reach level ${getRandomInt(4, 10)}`),
                  React.createElement("option", null, `Collect Star Amount: ${Math.floor(Math.random() * 5000)}`)
                )
              ),

              React.createElement(
                "button",
                {
                  className: "sendButton",
                  onClick: (el) => {
                    el.target.style.backgroundColor = "lightgray";
                    if (getMobileOperatingSystem() === 'Android') {
                      navigator.vibrate(50); // vibrate 
                    }
                  },
                  style: {width: "fit-content", fontSize: "1.5vh", display: "flex", zIndex: "9"}
                },
                "Send"
              )

            ),

            //PLAYER 2
            React.createElement("div", { className: "player" },

              React.createElement("div", { className: "playerInfo", style: {display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "5vh"} },
                React.createElement("h2", {className: "playerName", style: { fontSize: "2vh", marginTop: "0", color: "rgb(156, 33, 39)"}}, Object.keys(player2)[0]),
                React.createElement(
                  "img",
                  {
                    className: "playerIMG",
                    src: Object.values(player2)[0].profilePic,
                    style: { width: "7vh", borderRadius: "50%", border: "1px solid #9c2127" }
                  },
                  null
                ),
              ),

              React.createElement("form", { className: "form", zIndex: "9" },
                React.createElement("label", { className: "selectionLabel" }, "Challenge:"),
                React.createElement("select", null,
                  React.createElement("option", null, `Achieve a score of ${Math.floor(Math.random() * 1000)}`),
                  React.createElement("option", null, `Reach level ${getRandomInt(4, 10)}`),
                  React.createElement("option", null, `Collect Star Amount: ${Math.floor(Math.random() * 5000)}`)
                )
              ),

              React.createElement(
                "button",
                {
                  className: "sendButton",
                  onClick: (el) => {
                    el.target.style.backgroundColor = "lightgray";
                    if (getMobileOperatingSystem() === 'Android') {
                      navigator.vibrate(50); // vibrate 
                    }
                  },
                  style: {width: "fit-content", fontSize: "1.5vh", display: "flex", zIndex: "9"}
                },
                "Send"
              )

            ),

            //PLAYER 3
            React.createElement("div", { className: "player" },

              React.createElement("div", { className: "playerInfo", style: {display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "5vh"} },
                React.createElement("h2", {className: "playerName", style: { fontSize: "2vh", marginTop: "0", color: "rgb(156, 33, 39)"}}, Object.keys(player3)[0]),
                React.createElement(
                  "img",
                  {
                    className: "playerIMG",
                    src: Object.values(player3)[0].profilePic,
                    style: { width: "7vh", borderRadius: "50%", border: "1px solid #9c2127" }
                  },
                  null
                ),
              ),

              React.createElement("form", { className: "form", zIndex: "9" },
                React.createElement("label", { className: "selectionLabel" }, "Challenge:"),
                React.createElement("select", null,
                  React.createElement("option", null, `Achieve a score of ${Math.floor(Math.random() * 1000)}`),
                  React.createElement("option", null, `Reach level ${getRandomInt(4, 10)}`),
                  React.createElement("option", null, `Collect Star Amount: ${Math.floor(Math.random() * 5000)}`)
                )
              ),

              React.createElement(
                "button",
                {
                  className: "sendButton",
                  onClick: (el) => {
                    el.target.style.backgroundColor = "lightgray";
                    if (getMobileOperatingSystem() === 'Android') {
                      navigator.vibrate(50); // vibrate 
                    }
                  },
                  style: {width: "fit-content", fontSize: "1.5vh", display: "flex", zIndex: "9"}
                },
                "Send"
              )

            ),

            React.createElement(
              "button",
              {
                id: "doneButton",
                onClick: () => {document.getElementById("popup").classList.add('hide')},
                style: {width: "fit-content", fontSize: "1.5vh", display: "flex", zIndex: "9", marginBottom: "4vh", marginTop: "4vh"}
              },
              "Close"
            )
          ),
          React.createElement("div", { id: "top-right-profile", className: "hide" },
            React.createElement("div", { id: "top-right-profile-container" },
              React.createElement("h4", null, ""),
              React.createElement(
                "img",
                {
                  src: "/Icons/star.svg",
                  style: { width: "3vh", marginLeft: "23%", borderRadius: "50%" }
                },
                null
              )
            )),
          React.createElement(
            "img",
            {
              src: "/Icons/leave.svg",
              id: "none-leave-after",
              onClick: () => { location.replace('/') }
            },
            null
          ),
          React.createElement(Carousel, null,
            [...new Array(CARDS)].map((_, i) => /*#__PURE__*/
              React.createElement(Card, { title: "X" + (i + 1), content: "X" }))),
          React.createElement("h2", {style: {color: "#767676", fontSize: "2vh", position: "absolute", marginTop: "75vh"}}, 
          "Send a challenge to ",
          React.createElement(
            'span',
            {
              style: {color: "#dbcab7", cursor: "pointer"},
              onClick: () => {document.getElementById("popup").classList.remove('hide')},
            },
            'Available Players')))


      ReactDOM.render( /*#__PURE__*/
        React.createElement(App, null),
        document.body);


      var x;
      var $cards = $(".card");
      var $style = $(".hover");

      $cards.
        on("mousemove touchmove", function (e) {
          // normalise touch/mouse
          var pos = [e.offsetX, e.offsetY];
          e.preventDefault();
          if (e.type === "touchmove") {
            pos = [e.touches[0].clientX, e.touches[0].clientY];
          }
          var $card = $(this);
          // math for mouse position
          var l = pos[0];
          var t = pos[1];
          var h = $card.height();
          var w = $card.width();
          var px = Math.abs(Math.floor(100 / w * l) - 100);
          var py = Math.abs(Math.floor(100 / h * t) - 100);
          var pa = 50 - px + (50 - py);
          // math for gradient / background positions
          var lp = 50 + (px - 50) / 1.5;
          var tp = 50 + (py - 50) / 1.5;
          var px_spark = 50 + (px - 50) / 7;
          var py_spark = 50 + (py - 50) / 7;
          var p_opc = 20 + Math.abs(pa) * 1.5;
          var ty = (tp - 50) / 2 * -1;
          var tx = (lp - 50) / 1.5 * .5;
          // css to apply for active card
          var grad_pos = `background-position: ${lp}% ${tp}%;`;
          var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
          var opc = `opacity: ${p_opc / 100};`;
          var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;
          // need to use a <style> tag for psuedo elements
          var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `;
          // set / apply css class and style
          $cards.removeClass("active");
          $card.removeClass("animated");
          $card.attr("style", tf);
          $style.html(style);
          if (e.type === "touchmove") {
            return false;
          }
          clearTimeout(x);
        }).on("mouseout touchend touchcancel", function () {
          // remove css, apply custom animation on end
          var $card = $(this);
          $style.html("");
          $card.removeAttr("style");
          x = setTimeout(function () {
            $card.addClass("animated");
          }, 2500);
        });

        changeAllCardsH2();
        changeAllCardsParagraph();
        changeAllCardsRewards();
        changeAllCardsProfilePic();
        changeAllCardsButton();
        changeAllCardsButtonBG();
    }
  })
  .catch(error => console.log(error));




// push status to app metadata
function claimReward(el) {

      if (getMobileOperatingSystem() === 'Android') {
        navigator.vibrate(125); // vibrate 
      }

      //give reward amount
      Object.keys(challenges).forEach(element => {

        if (challenges[element].challenge.status === "complete" && el.target.parentNode.parentElement.childNodes[1].innerText === `from ${element} (Level ${challenges[element].level})`) {

          giveStarReward(challenges[element].starReward)
            .then(() => {

              //show animation, make card dissapear
              el.target.parentNode.parentElement.classList.add("completed");
              let node = el.target.parentNode.parentElement.parentElement;

              setTimeout(() => {
                el.target.parentNode.parentElement.remove();
              }, 500)
              setTimeout(() => {
              const confetti = document.createElement("img");
              confetti.src = "/Images/confetti.gif";
              confetti.className = "confetti-gif";
              node.appendChild(confetti);
              refreshImage('.confetti-gif', '/Images/confetti.gif');
              }, 600)
              setTimeout(() => {
                node.firstChild.remove();
              }, 1300)

              // delete challenge from app metadata
              let newChallenge = challenges;
              delete newChallenge[element];


              var payload = {
                "challenges": newChallenge
              };

              var requestOptions = {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
              };

              fetch("/user", requestOptions)
                .catch(error => console.log('error', error));

            });
        } 
      })

}


function refreshImage(imgElement, imgURL) {    
  //create a new timestamp 
  var timestamp = new Date().getTime();  
  var el = document.querySelector(imgElement);  
  var queryString = "?t=" + timestamp;    
  el.src = imgURL + queryString;    
}    

//send new added  star amount to appdata
async function giveStarReward(rewardAmount) {

  var requestOptions = {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  };
  fetch('/userMetadata', requestOptions)
    .then(response => response.json())
    .then(data => {
      challenges = data.challenges;
      stars = data.stars;
    })
    .then(() => {
      var newStars = {
        "stars": stars + rewardAmount
      };
        
      var requestOptions = {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newStars)
      };
          
      fetch("/user", requestOptions)
        .catch(error => console.log('error', error));
    
      starRewardAnimation(rewardAmount);
    })
}



//flickering animation when stars are given
var animInterval;
async function starRewardAnimation(starReward) {
  clearInterval(animInterval);
  TOP_RIGHT_PROFILE = document.getElementById('top-right-profile');
  STARS_AMOUNT = document.querySelector('#top-right-profile-container h4');
  var counter = stars;
  TOP_RIGHT_PROFILE.classList.remove('hide');
  TOP_RIGHT_PROFILE.style.zIndex = 10;
    animInterval = setInterval(() => {
      STARS_AMOUNT.classList.toggle('starRewardAnim');
      STARS_AMOUNT.innerText = counter;
      if (counter === stars + starReward) {
        clearInterval(animInterval);
        var requestOptions = {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        };
        fetch('/userMetadata', requestOptions)
          .then(response => response.json())
          .then(data => {
            stars = data.stars;
            STARS_AMOUNT.innerText = stars;
            setTimeout(() => {
              STARS_AMOUNT.classList.remove('starRewardAnim');
              TOP_RIGHT_PROFILE.classList.add('hide');
            }, 2000);
          })
      }
      counter += 1;
    }, 45);	
}


//Determine the mobile operating system.
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first since its an UA and contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}





// can be used to display random player or to create random player challenge for user
function getRandomPlayer () {

  //randomize player
  const player = getRandomInt(1, 12);
  let playerName;
  let playerImage;
  let playerLevel = getRandomInt(6, 10);
  let starReward = getRandomInt(stars / 25, stars / 15);

  //set name
  switch (player) {
    case 1:
      playerName = 'Olivia'
      break;
    case 2:
      playerName = 'Davis'
      break;
    case 3:
      playerName = 'Aleksandar'
      break;
    case 4:
      playerName = 'Abeiku'
      break;
    case 5:
      playerName = 'Carlos'
      break;
    case 6:
      playerName = 'Bryan'
      break;
    case 7:
      playerName = 'Julian'
      break;
    case 8:
      playerName = 'Emily'
      break;
    case 9:
      playerName = 'Michael'
      break;
    case 10:
      playerName = 'Anderson'
      break;
    case 11:
      playerName = 'Henry'
      break;
    case 12:
      playerName = 'Jordan'
      break;
  }
  //set image
  playerImage = `/Images/Players/${player}.jpg`

  //set challenge
  let challengeRandomizer = getRandomInt(1, 3);
  let challengeTitle;
  let challengeValue;

  switch (challengeRandomizer) {
    case 1:
      challengeTitle = 'Achieve a score of';
      challengeValue = getRandomInt(highscore - highscore / 2, highscore * 2);
      break;
    case 2:
      challengeTitle = 'Reach level';
      if (level !== 10) {
        challengeValue = getRandomInt(level + 1, 10);
      } else {
        challengeTitle = 'Achieve a score of';
        challengeValue = getRandomInt(highscore - highscore / 2, highscore * 2);
      }
      break;
    case 3:
      challengeTitle = 'Collect Star Amount:';
      challengeValue = getRandomInt(stars * 1.5, stars * 2);
      starReward = getRandomInt(stars * 2.5, stars * 4);
      break;
  }

  //Return Player Object
  return {
    [playerName]: {
      "challenge": {
        "title": challengeTitle,
        "value": challengeValue
      },
      "level": playerLevel,
      "starReward": starReward,
      "profilePic": playerImage
    }
  }

}

