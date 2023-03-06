let words = ["conundrum","sardonic","quintessential","clandestine","revel","insidious","cacophony","lurid","idiosyncratic","divergent","bourgeois","avant-grade","magnanimous","dilettante","capricious","bravado","acquiesce","harbinger","accolade","baroque","cognition","deference","circumspect","gregarious","facetious","motif","connotation"];
// definitions are in the same sequence/order as the words. Example no. 1 (superb) definition is 'The wine was  ̶ v̶e̶r̶y̶ ̶n̶i̶c̶e̶ '
// these hard coded words and defs are just used for users who are not logged in
let definitions = ["That was a <span style=\"text-decoration: line-through; font-weight: bold;\">puzzle,</span> even to experts.","He put on a <span style=\"text-decoration: line-through; font-weight: bold;\">scornful</span> smile.","He is the <span style=\"text-decoration: line-through; font-weight: bold;\">typical</span> tough teacher ","I will never attend <span style=\"text-decoration: line-through; font-weight: bold;\">secret</span> meetings.","You can <span style=\"text-decoration: line-through; font-weight: bold;\">enjoy</span> your stay here.","Snakes are always <span style=\"text-decoration: line-through; font-weight: bold;\">subtle</span> creatures. ","There was a <span style=\"text-decoration: line-through; font-weight: bold;\">discord</span> of deafening sounds in the music theatre.","The incident was <span style=\"text-decoration: line-through; font-weight: bold;\">highly shocking.</span>","He follows a very <span style=\"text-decoration: line-through; font-weight: bold;\">specific</span> schedule.","Our opinions on abortion <span style=\"text-decoration: line-through; font-weight: bold;\">differed.</span> ","Everyone who lives in this estate is <span style=\"text-decoration: line-through; font-weight: bold;\">middle class</span>","You are so <span style=\"text-decoration: line-through; font-weight: bold;\">daring.</span>","Many rich people are <span style=\"text-decoration: line-through; font-weight: bold;\">generous.</span>","She is an <span style=\"text-decoration: line-through; font-weight: bold;\">amateur</span> artist.","The refusal was <span style=\"text-decoration: line-through; font-weight: bold;\">impulsive</span>","The teacher tells stories with a <span style=\"text-decoration: line-through; font-weight: bold;\">sense of boldness</span>","She will <span style=\"text-decoration: line-through; font-weight: bold;\">passively accept</span> their demands.","The sirens were a <span style=\"text-decoration: line-through; font-weight: bold;\">precursor</span> of their arrival.","His approval was the highest <span style=\"text-decoration: line-through; font-weight: bold;\">recognition</span> he could receive.","The drawing is <span style=\"text-decoration: line-through; font-weight: bold;\">fancy.</span>","His <span style=\"text-decoration: line-through; font-weight: bold;\">comprehension ability</span> is quite low","The fallen soldier was given the utmost <span style=\"text-decoration: line-through; font-weight: bold;\">respect.</span>","That investor was <span style=\"text-decoration: line-through; font-weight: bold;\">cautious</span> in his speech","He’s a <span style=\"text-decoration: line-through; font-weight: bold;\">company-loving</span> person","The speaker kept making <span style=\"text-decoration: line-through; font-weight: bold;\">inappropriately teasing</span> comments","His jumper has a unique <span style=\"text-decoration: line-through; font-weight: bold;\">decoration.</span>","His words have a negative <span style=\"text-decoration: line-through; font-weight: bold;\">meaning.</span>"];

let RE_CALL_WORDS = [];
let RE_CALL_DEFINITIONS = [];

var timeLeft = 30;
var score = 0;
var livesLeft = 5;
var randomValue = 0;
var challenge = [];
var interval;
var timeout;
let stars;
let user = {};
let userEmail;
let userID;
let userMetadata = {};
let subscription;
let premiumPass = false;
let blockedFromSubscribing = false;
let serverDate;
let notificationSubExists;
let totalTimesPlayed;
let starAnimIntervalRunning = false;
let starAnimLimit = false;
let competence;
let competenceCompletions = 0;
let competenceClickable = true;
let vocabulary;
let challenges;
let level;
let socialRevive = false;
let utteranceLang;
let starRevive = false;
let todayPlayedGames;
let highscore = 10000;
let highscoreShared = false;
let languagePacks = [];
let activeLanguagePacks = [];
let questionsAnswered = {};
let completedGames;
let requiredCompletedGames;
let isLoggedIn = false;
var streak = 0;
let currentSelection = '#FFFFFF';
let bonusChestActive = false;
let profileChestActive = false;
var streakCount = 0;
//if user skips, selection will be displayed.
var hasSkipped;
var _correctAnswer = challenge[0];     
//both values are based on the order at which words and definitons are .pushed() at line 32
var _definitionOnDisplay = challenge[1];

let chestHP = 1000;
let chestHPMode;
let chestClickCount = 0;
let xCursorPosition;
let yCursorPosition;
              
const START_BUTTON = document.getElementById('start');
const SLIDER = document.getElementById('slider');
const OR_WATCH_TUTORIAL = document.querySelector('#start-container-bottom a');
const MOBILE_CONTAINER = document.getElementById('mobile-container');
const TIMER = document.getElementById('timer');
const LEAVE_ICON = document.querySelector('#top-left-challenge img');
const CHALLENGE_SPACE = document.getElementById('challenge-space');
const CENTER_CONTAINER = document.getElementById('center-container');
const QUESTION = document.querySelector('#question-container h3');
const SCORE = document.querySelector('#score h4');
const LIVES_LEFT = document.querySelector('#lives-left h4');
const FORM = document.querySelector('#answer-container form');
const ANSWER_CONTAINER = document.querySelector('#answer-container');
const SELECTIONS = document.getElementById('selection');
const SELECTION1 = document.getElementById('selection1');
const SELECTION2 = document.getElementById('selection2');
const SELECTION3 = document.getElementById('selection3');
const HINT_ICON = document.getElementById('hint-button');
const HINT_WORD = document.querySelector('#upper-hint h3');
const POPUPS = document.getElementById('popups');
const CORRECT_ANSWER = document.getElementById('correct-answer');
const CORRECT_ANSWER_TEXT = document.querySelector('#middle-wrong h4');
const TIME_EXPIRED_CORRECT_ANSWER_TEXT = document.querySelector('#middle-expired h4');
const SPEAKER = document.getElementById('speaker');
const DIC_DEFINITION = document.querySelector('#upper-definition-popup h4');
const SPEAKER2 = document.getElementById('speaker2');
const LAST_CORRECT_ANSWER_TEXT = document.querySelector('#middle-last-answer h4');
const LEVELUP_TEXT = document.querySelector('#middle-levelup h4');
const CORRECT_ANSWER_TEXT_TWO = document.querySelector('#middle-expired h4');
const WRONG_ANSWER = document.getElementById('wrong-answer');
const SKIP_BUTTON = document.getElementById('skip');
const SKIP_HEADER = document.querySelector('#upper-wrong h3');
const LAST_ANSWER = document.getElementById('last-answer');
const SOCIAL_REVIVE = document.getElementById('social-revive');
const STAR_REVIVE = document.getElementById('star-revive');
const LOADER = document.getElementById('loader');
const LOADER_GIF = document.getElementById('loader-gif');

const SOCIAL_REVIVE_BUTTONS = document.querySelector("a[href='#social-revive-button']");

const LOWER_LAST_ANSWER = document.getElementById('lower-last-answer');
const LEVELUP = document.getElementById('levelup');
const TIME_EXPIRED = document.getElementById('time-expired');
const GAME_OVER = document.getElementById('game-over');
const GAME_OVER_TEXT = document.querySelector('#upper-game-over h4');
const SALES_FORM = document.getElementById('sales-form');
const UPPER_SALES_FORM = document.getElementById('upper-sales-form');
const SALES_FORM_QUESTION = document.querySelector('#upper-sales-form h4');
const SALES_FORM_PARAGRAPH = document.getElementById('sales-form-paragraph');
const SALES_FORM_TWO_BUTTON = document.getElementById('sales-form-two-button');
const SALES_FORM_LEFT_BUTTON = document.querySelector('#sales-form-two-button button');
const SALES_FORM_RIGHT_BUTTON = document.getElementById('sales-form-two-button-right');
const SALES_PAGE = document.getElementById('sales-page');
const HIGHSCORE = document.querySelector('#upper-game-over h3');
const HINT_POPUP = document.getElementById('hint-popup');
const CONFETTI = document.getElementById('confetti');
const BONUS_CHEST_CONFETTI = document.getElementById('bonus-chest-confetti');
const STARS = document.getElementById('stars');
const SPARKLE = document.getElementById('sparkle');
const SPARKLE_GIF = document.querySelector('#sparkle img');
const STREAK_TEXT = document.getElementById('streak-text');
const CORRECT_HEADING_TEXT = document.querySelector('#upper-correct h3');
const UPPER_CORRECT = document.getElementById('upper-correct');
const FIRE_GIF = document.getElementById('fire-gif');
const BONUS_CHEST = document.getElementById('bonus-chest');
const PROFILE_CHEST = document.querySelector('#profile-middle-left img');
const BONUS_CHEST_HEADER = document.getElementById('bonus-chest-header');
const BONUS_CHEST_HEALTH = document.getElementById('bonus-chest-health');
const LEFT_HP = document.getElementById('left-hp');
const MAX_HP = document.getElementById('max-hp');
const BONUS_CHEST_OPENED = document.getElementById('bonus-chest-opened');
const BONUS_CHEST_OPENED_TEXT = document.getElementById('bonus-chest-opened-text');
const MINUS_HP1 = document.getElementById('minus-hp1');
const MINUS_HP2 = document.getElementById('minus-hp2');
const MINUS_HP3 = document.getElementById('minus-hp3');
const MINUS_HP4 = document.getElementById('minus-hp4');
const MINUS_HP5 = document.getElementById('minus-hp5');
const MINUS_HP6 = document.getElementById('minus-hp6');
const MINUS_HP7 = document.getElementById('minus-hp7');
const MINUS_HP8 = document.getElementById('minus-hp8');
const MINUS_HP9 = document.getElementById('minus-hp9');
const MINUS_HP10 = document.getElementById('minus-hp10');
const MINUS_HP11 = document.getElementById('minus-hp11');
const MINUS_HP12 = document.getElementById('minus-hp12');


// nav Bar Menu 
const MENU_BUTTON = document.querySelector('.menu-btn');
const NAV = document.querySelector('nav');
const NAV_CONTAINER = document.getElementById('nav-container');
const LINE_ONE = document.querySelector('nav .menu-btn .line--1');
const LINE_TWO = document.querySelector('nav .menu-btn .line--2');
const LINE_THREE = document.querySelector('nav .menu-btn .line--3');
const LINK = document.querySelector('.nav-links');
// profile 
const TOP_RIGHT_PROFILE = document.getElementById('top-right-profile');
const TOP_RIGHT_PROFILE_CONTAINER = document.getElementById('top-right-profile-container');
const PROFILE_SPACE = document.getElementById('profile-space');
const PROFILE_HIGHSCORE = document.getElementById('profile-highscore');
const COMPETENCE_PNG = document.getElementById('competence-png');
const COMPETENCE_GIF = document.getElementById('competence-gif');
const REFILL_BUTTON = document.getElementById('refill-button');
const PROFILE_PIC = document.querySelector('#profile-pic-image');
const PROFILE_NAME = document.getElementById('profile-name');
const PROFILE_LEVEL = document.getElementById('profile-level');
const STARS_AMOUNT = document.querySelector('#top-right-profile-container h4');
PROFILE_NAME.innerText = 'You';

// language packs
const PACK_ONE = document.getElementById('pack-one');
const PACK_TWO = document.getElementById('pack-two');
const PACK_THREE = document.getElementById('pack-three');
const PACK_FOUR = document.getElementById('pack-four');
const PACK_FIVE = document.getElementById('pack-five');
const PACK_SIX = document.getElementById('pack-six');
const PACK_SEVEN = document.getElementById('pack-seven');
const PACK_EIGHT = document.getElementById('pack-eight');
const LANGUAGE_PACK_OPEN = document.getElementById('language-pack-open');

// not enough stars failure popup
const NOT_ENOUGH_STARS = document.getElementById('not-enough-stars');
const NOT_ENOUGH_STARS_TEXT = document.querySelector('#middle-not-enough-stars h4');

// daily play limit failure popup
const PLAY_LIMIT = document.getElementById('today-played-games');

//sales page popup
const SALES_PAGE_MIDDLE_SPACE = document.getElementById('sales-page-middle-space');
const BUY_SUBSCRIPTION_BUTTON = document.querySelector('#sales-page-space button');
const ONE_MONTH_PLAN = document.getElementById('one-month-container');
const TWELVE_MONTH_PLAN = document.getElementById('twelve-month-container');
const SIX_MONTH_PLAN = document.getElementById('six-month-container');
const ONE_MONTH_CHECKMARK_ICON = document.getElementById('one-month-checkmark-icon');
const TWELVE_MONTH_CHECKMARK_ICON = document.getElementById('twelve-month-checkmark-icon');
const SIX_MONTH_CHECKMARK_ICON = document.getElementById('six-month-checkmark-icon');
const SALES_PAGE_MINUTES = document.getElementById('sales-page-minutes');
const SALES_PAGE_SECONDS = document.getElementById('sales-page-seconds');

//tutorial popup
const TUTORIAL = document.getElementById('tutorial');
const TUTORIAL_PARAGRAPH = document.getElementById('tutorial-paragraph');
const TUTORIAL_BUTTON = document.getElementById('tutorial-button');
const TUTORIAL_IMAGE = document.querySelector('#upper-inner-tutorial img');
const RIGHT_ARROW = document.getElementById('right-arrow');
const LEFT_ARROW = document.getElementById('left-arrow');

const CONNECTION_LOST = document.getElementById('connection-lost');
const CONNECTION_LOST_TEXT = document.querySelector('#middle-connection-lost h4');

const FEEDBACK = document.getElementById('feedback');

const DEFINITION_POPUP = document.getElementById('definition-popup');

const ADD_TO_HOMESCREEN = document.getElementById('add-to-homescreen');
const ADD_TO_HOMESCREEN_BUTTON = document.querySelector('#add-to-homescreen-button button');
const ADD_TO_HOMESCREEN_TEXT = document.getElementById('middle-add-to-homescreen-text');
const ADD_TO_HOMESCREEN_ICON = document.querySelector('#middle-add-to-homescreen-text img');

const FEATURE_VIEW = document.getElementById('feature-view');
const FEATURE_VIEW_PRICE = document.getElementById('feature-view-bottom-top');
const FEATURE_VIEW_BUTTON = document.querySelector('#feature-view-bottom-bottom button');
const FEATURE_VIEW_CANCEL_ANYIME = document.querySelector('#feature-view-bottom-bottom h5');

const ALLOW_NOTIFICATIONS = document.getElementById('allow-notifications');




if (getMobileOperatingSystem() === 'iOS') {
  POPUPS.classList.remove('hide');
  document.getElementById('iOS-soon').classList.remove('hide');
}



checkUserLogin()
  .then(() => {
    if (isLoggedIn === true) {
      localStorage.setItem('firstGamePlayed', 'false');
    } else if (isLoggedIn === false && localStorage.getItem('firstGamePlayed') === null) {
      localStorage.setItem('firstGamePlayed', 'false');
    }

  })
  .then(() => {
    if (isLoggedIn === true) {
      //load profile data from server
      checkUserPic();
      checkUserEmail();
      checkUserID();
      checkUserMetadata()
        .then(() => PROFILE_LEVEL.innerText = `Level ${level} ${levelTitle()}`)
        .then (() => {
          if (competence === 0) {
            REFILL_BUTTON.classList.remove('hide');
            COMPETENCE_PNG.classList.add('hide');
          } else if (competence === 1) {
            COMPETENCE_PNG.src = '/Images/fill-up-states/1.png';
          } else if (competence === 2) {
            COMPETENCE_PNG.src = '/Images/fill-up-states/2.png';
          } else if (competence === 3) {
            COMPETENCE_PNG.src = '/Images/fill-up-states/3.png';
          }
        })
        .then(() => {
          if (competenceCompletions >= profileChestRequirement) {
            profileChestActive = true;
            PROFILE_CHEST.classList.remove('hide');
          }
        })
        .then(() => STARS_AMOUNT.innerText = stars)
        .then(() => {
          if (stars > 9 && stars <= 99) {
            TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '81.5%';
          } else if (stars > 99 && stars <= 999) {
            TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '79%';
          } else if (stars > 999 && stars <= 9999) {
            TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '76.5%';
          } else if (stars > 9999 && stars <= 99999) {
            TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '73.8%';
          } else if (stars > 99999 && stars <= 999999) {
            TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '71.3%';
          } else if (stars > 999999 && stars <= 9999999) {
            TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '69.3%';
          }
        })
        .then(() => PROFILE_HIGHSCORE.innerText = `Highscore: ${highscore} points`)
        .then(() => subscribeToNotifications())
        // also handles language packs
        .then(() => handleUserSubscription())
        .catch((error) => console.log(error));
    } else {
      // if logged out and firstGame is not played show click GIF
      if (localStorage.getItem('firstGamePlayed') === 'false') {
        document.getElementById('click').classList.remove('hide');
      }
    }
  })
  .then(() => {
    if (isLoggedIn === true) {
    checkUserMetadata()
      .then(() => {
        if (subscription === undefined) {
          salesFormSequence();
          displaySingleForm();
        }
        displayFeedback();
        checkChallengeCompletion();
      })
    displayAllowNotificationPermission();
    }
  })
  .catch((error) => console.log(error));
MENU_BUTTON.addEventListener('click', () => {
    NAV.classList.toggle('nav-open');
    MENU_BUTTON.classList.toggle('menu-btn-open');
    LINE_ONE.classList.toggle('line-cross');
    LINE_TWO.classList.toggle('line-fade-out');
    LINE_THREE.classList.toggle('line-cross');
    LINK.classList.toggle('fade-in');
    //making sure that the nav menu overlays at right time
    setTimeout(() => {
      NAV_CONTAINER.classList.toggle('nav-container-open');
      PROFILE_SPACE.classList.toggle('nav-container-open');
    }, 500);
})
function isAlreadyHidden (element, theClass) {
  //if it returns true, the element is already hidden
  return element.classList.contains(theClass) === true;
}

// check if user is logged in
async function checkUserLogin () {
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  await fetch('/isLoggedin', requestOptions)
    .then(response => response.json())
    .then(data => isLoggedIn = data)
    .then(() => console.log('user logged in: ' + isLoggedIn))
    .catch(error => console.log(error));
}

// set local data to force login if user wants to play again
function setLocalStorage () {
  if (isLoggedIn === false) {
    localStorage.setItem('firstGamePlayed', 'true');
  }
}

function checkLocalStorage () {
  return new Promise((resolve, reject) => {
    if (isLoggedIn === false) {
      const firstGamePlayed = JSON.parse(localStorage.getItem('firstGamePlayed'));
      resolve(firstGamePlayed);
    } else {
      resolve();
    }
  })
}

async function addHighscoreShared () {
  var newHighscoreShared = {
    "highscoreShared": true
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newHighscoreShared)
  };
    
  await fetch("/user", requestOptions)
    .catch(error => console.log('error', error));

}

async function checkNotificationSub (sub) {
  var newNotificationSub = {
    "notificationSub": sub
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newNotificationSub)
  };
    
  await fetch("/user", requestOptions)
    .catch(error => console.log('error', error));

}

async function addNotificationSub (sub) {
  var newNotificationSub = {
    "notificationSub": sub
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newNotificationSub)
  };
    
  await fetch("/user", requestOptions)
    .catch(error => console.log('error', error));

}



async function addActiveLanguagePack(pack) {
  if (languagePacks.some(element => element === pack) === true && activeLanguagePacks.some(element => element === pack) === false) {
    var updatedActiveLanguagePack = activeLanguagePacks;
    updatedActiveLanguagePack.push(pack);

    //update app_data
    var newActiveLanguagePacks = {
      "activeLanguagePacks": updatedActiveLanguagePack
    };

    var requestOptions = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActiveLanguagePacks)
    };

    await fetch("/user", requestOptions)
      .then(handleLanguagePack())
      .catch(error => console.log('error', error));
  }
}

async function removeActiveLanguagePack(pack) {
  // if not already removed (non existent) then remove
  if (languagePacks.some(element => element === pack) === true && activeLanguagePacks.some(element => element === pack) === true && pack !== 1) {
    var updatedActiveLanguagePack = activeLanguagePacks.filter(word => word !== pack);
    //update app_data
    var newActiveLanguagePacks = {
      "activeLanguagePacks": updatedActiveLanguagePack
    };

    var requestOptions = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newActiveLanguagePacks)
    };

    await fetch("/user", requestOptions)
      .then(handleLanguagePack())
      .catch(error => console.log('error', error));
  }
}

function addCompletedGame () {
  var newCompletedGames = {
    "completedGames": completedGames + 1
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newCompletedGames)
  };
    
  fetch("/user", requestOptions)
    .catch(error => console.log('error', error));

}

function addTodayPlayedGame () {
  var newTodayPlayedGames = {
    "todayPlayedGames": todayPlayedGames + 1
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newTodayPlayedGames)
  };
    
  fetch("/user", requestOptions)
    .catch(error => console.log('error', error));
}

function addTotalTimesPlayed () {
  var newTotalTimesPlayed = {
    "totalTimesPlayed": totalTimesPlayed + 1
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newTotalTimesPlayed)
  };
    
  fetch("/user", requestOptions)
    .catch(error => console.log('error', error));

}


function checkRequiredCompletedGames() {
  if (level === 1) {
    requiredCompletedGames = 2;
  } else if (level === 2) {
    requiredCompletedGames = 6;
  } else if (level === 3) {
    requiredCompletedGames = 13;
  } else if (level === 4) {
    requiredCompletedGames = 22;
  } else if (level === 5) {
    requiredCompletedGames = 32;
  } else if (level === 6) {
    requiredCompletedGames = 44;
  } else if (level === 7) {
    requiredCompletedGames = 59;
  } else if (level === 8) {
    requiredCompletedGames = 77;
  } else if (level === 9) {
    requiredCompletedGames = 98;
  }
}

// PATCH request to add 1 to level
function addLevel () {
  var newLevel = {
    "level": level + 1
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newLevel)
  };
    
  fetch("/user", requestOptions)
    .catch(error => console.log('error', error));

}

function refreshImage(imgElement, imgURL) {    
  //create a new timestamp 
  var timestamp = new Date().getTime();  
  var el = document.getElementById(imgElement);  
  var queryString = "?t=" + timestamp;    
  el.src = imgURL + queryString;    
}    

// disable a button
function disableButton(el) {
  el.disabled = true; 
}

// enable a button
function enableButton(el) {
  el.disabled = false; 
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/// track cursor position 
document.addEventListener("mousemove", function(e) {
  xCursorPosition = -(window.innerWidth/2- e.clientX);
  yCursorPosition = -(window.innerHeight/2- e.clientY);
})

async function checkUserPic () {
  // GET Profile picture and profile name
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  await fetch('/userPic', requestOptions)
    .then(response => response.json())
    .then(data =>  { 
      PROFILE_PIC.src = data;
    })
    .catch(error => console.log(error));
}

async function checkUserEmail () {
  // GET Profile picture and profile name
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  await fetch('/userEmail', requestOptions)
    .then(response => response.json())
    .then(data =>  { 
      userEmail = data;
    })
    .catch(error => console.log(error));
}

async function checkUserID () {
  // GET Profile picture and profile name
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  await fetch('/userID', requestOptions)
    .then(response => response.json())
    .then(data =>  { 
      userID = data;
    })
    .catch(error => console.log(error));
}

async function checkUserMetadata () {
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  await fetch('/userMetadata', requestOptions)
    .then(response => response.json())
    .then(data =>  { 
      userMetadata = data;
      competence = data.competence;
      competenceCompletions = data.competenceCompletions;
      completedGames = data.completedGames;
      vocabulary = data.vocabulary;
      highscore = data.highscore;
      highscoreShared = data.highscoreShared;
      languagePacks = data.languagePacks;
      activeLanguagePacks = data.activeLanguagePacks;
      questionsAnswered = data.questionsAnswered;
      level = data.level;
      stars = data.stars;
      todayPlayedGames = data.todayPlayedGames;
      blockedFromSubscribing = data.blockedFromSubscribing;
      totalTimesPlayed = data.totalTimesPlayed;
      if (data.challenges === undefined) {
        challenges = undefined;
      } else challenges = data.challenges;
      if (data.subscription === undefined) {
        subscription = undefined;
      } else subscription = data.subscription;
      if (data.notificationSub === undefined) {
        notificationSubExists = false;
      } else notificationSubExists = true;
    })
    .catch(error => console.log(error));
}


// update stars for client
async function updateStars() {
  await checkUserMetadata()
    .then(() => {
      STARS_AMOUNT.innerText = stars;
      if (stars > 9 && stars <= 99) {
        TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '81.5%';
      } else if (stars > 99 && stars <= 999) {
        TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '79%';
      } else if (stars > 999 && stars <= 9999) {
        TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '76.5%';
      } else if (stars > 9999 && stars <= 99999) {
        TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '73.8%';
      } else if (stars > 99999 && stars <= 999999) {
        TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '71.3%';
      } else if (stars > 999999 && stars <= 9999999) {
        TOP_RIGHT_PROFILE_CONTAINER.style.marginLeft = '69.3%';
      }
    })
    .catch(error => console.log(error));
}


// update competence for client
async function updateCompetence () {
  await checkUserMetadata() 
    .then (() => {
      if (competence === 0) {
        REFILL_BUTTON.classList.remove('hide');
        COMPETENCE_PNG.classList.add('hide');
      } else if (competence === 1) {
        COMPETENCE_PNG.src = '/Images/fill-up-states/1.png';
      } else if (competence === 2) {
        COMPETENCE_PNG.src = '/Images/fill-up-states/2.png';
      } else if (competence === 3) {
        COMPETENCE_PNG.src = '/Images/fill-up-states/3.png';
      }
    })
    .catch(error => console.log(error));
}

// randomizer 3-6 requirements for competence completions
var profileChestRequirement = 3 + Math.floor(Math.random() * 4);

// PATCH request to add 1 to competenceCompletions
async function addCompetenceCompletion () {
  var newCompetenceCompletions = {
    "competenceCompletions": competenceCompletions + 1
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newCompetenceCompletions)
  };
    
  await fetch("/user", requestOptions)
    .catch(error => console.log('error', error));
}

// PATCH request to reset competenceCompletions
async function resetCompetenceCompletion () {
  var newCompetenceCompletions = {
    "competenceCompletions": 0
  };
  
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newCompetenceCompletions)
  };
    
  await fetch("/user", requestOptions)
    .catch(error => console.log('error', error));
}

// extract level title to apply to profile
var levelTitle = function () {
  if (level === 1) {
    return '(Rookie)';
  } else if (level === 2) {
    return '(Beginner)';
  } else if (level === 3) {
    return '(Intermediate)';
  } else if (level === 4) {
    return '(Challenger)';
  } else if (level === 5) {
    return '(Semi-Pro)';
  } else if (level === 6) {
    return '(Professional)';
  } else if (level === 7) {
    return '(Expert)';
  } else if (level === 8) {
    return '(Legend)';
  } else if (level === 9) {
    return '(Elite Challenger)';
  } else if (level === 10) {
    return '(Grand Speaker)';
  }
}

//send new added  star amount to appdata
async function giveStarReward(rewardAmount) {
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
}

//send new decuted star amount to appdata
async function takeStars(deductionAmount) {
  // let animation run on old star amount first so deduction amount is correct
  starDeductionAnimation(deductionAmount);
    var newStars = {
      "stars": stars - deductionAmount
    };
        
    var requestOptions = {
      method: 'PATCH',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newStars)
    };
        
    fetch("/user", requestOptions)
      .catch(error => console.log('error', error));
}

//flickering animation when stars are given
var animInterval
function starRewardAnimation(starReward) {
  var counter = stars;
  TOP_RIGHT_PROFILE.classList.remove('hide');
  // dont set position to absolute on profile page
  if (isAlreadyHidden(PROFILE_SPACE, 'hide') === true) {
    TOP_RIGHT_PROFILE.style.position = 'absolute';
  }
  TOP_RIGHT_PROFILE.style.zIndex = 10;
  if (starAnimLimit === false) {
    animInterval = setInterval(() => {
      starAnimIntervalRunning = true;
      STARS_AMOUNT.classList.toggle('starRewardAnim');
      STARS_AMOUNT.innerText = counter;
      if (counter === stars + starReward) {
        clearInterval(animInterval);
        starAnimIntervalRunning = false;
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
              // dont hide top right profile on profile page
              if (isAlreadyHidden(PROFILE_SPACE, 'hide') === true) {
                TOP_RIGHT_PROFILE.classList.add('hide');
              }
              TOP_RIGHT_PROFILE.style.position = null;
              STARS_AMOUNT.classList.remove('starRewardAnim');
              TOP_RIGHT_PROFILE.style.zIndex = null;
            }, 2000);
          })
      }
      counter += 1;
    }, 45);	
  } else {
    animInterval = setInterval(() => {
      starAnimIntervalRunning = true;
      STARS_AMOUNT.classList.toggle('starRewardAnim');
      STARS_AMOUNT.innerText = counter;
      if (counter === stars + starReward) {
        clearInterval(animInterval);
        starAnimIntervalRunning = false;

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
              // dont hide top right profile on profile page
              if (isAlreadyHidden(PROFILE_SPACE, 'hide') === true) {
                TOP_RIGHT_PROFILE.classList.add('hide');
              }
              TOP_RIGHT_PROFILE.style.position = null;
              STARS_AMOUNT.classList.remove('starRewardAnim');
              TOP_RIGHT_PROFILE.style.zIndex = null;
            }, 2000);
          })
      }
      counter += 1;
    }, 0);	
  }
}

//flickering animation when stars are taken
function starDeductionAnimation(starDeduct) {
  var animInterval;
  var counter = stars;
  // make MENU_BUTTON unclickable until animation over (under condition that animation is not too long)
  if (starAnimLimit === false) {
    TOP_RIGHT_PROFILE.style.zIndex = 9;
  }
  animInterval = setInterval(() => {
  STARS_AMOUNT.innerText = counter;
  if (counter === stars - starDeduct) {
    clearInterval(animInterval);
    setTimeout(() => {
      STARS_AMOUNT.classList.remove('starRewardAnim');
      TOP_RIGHT_PROFILE.style.zIndex = null;
    }, 2000);
  } else if (counter === 0) {
    clearInterval(animInterval);
  }
  counter -= 1;
  }, 23);	
}

//send new competence state to appdata
async function saveCompetence(state) {
  var newCompetence = {
      "competence": state
    };
    
  var requestOptions = {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newCompetence)
  };
    
  await fetch("/user", requestOptions)
    .then(() => {
      competenceClickable = true;
    })
    .then(() => {
      if (state === 3) {
        addCompetenceCompletion();
      }
    })
    .catch(error => console.log('error', error));
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
});

// start game for the first time (not by pressing "play again" button)
function initializeGame() {
  challengeTimer();
  createRandom();
  createChallenge();
}

function handleLanguagePack () {
  let compiledWordPack = [];
  let compiledDefinitionPack = [];

  
  // Show "Premium Only" language packs if premiumPass === false
  // (only for premium packs, since they cannot be unlocked if user is not premium)
  if (premiumPass === false) {
    // only handle LP 1 - 3 and make show "Premium Only" for the rest
    if (languagePacks.some(element => element === 3) === true && activeLanguagePacks.some(element => element === 3) === true) {

      fetch('/wordsAndDefinitions3')
        .then(res => res.json())
        .then(data => {
          data.words.forEach(element => {
            compiledWordPack.push(element);
          })
        })
        .then(() => words = compiledWordPack)
        .then(() => PACK_THREE.style.backgroundImage = "url('/Images/Knight_Pack/Active/knightActivated.jpg')");
  
      fetch('/wordsAndDefinitions3')
        .then(res => res.json())
        .then(data => {
          data.definitions.forEach(element => {
            compiledDefinitionPack.push(element);
          })
        })
        .then(() => definitions = compiledDefinitionPack);
    } else if (languagePacks.some(element => element === 3) === true && activeLanguagePacks.some(element => element === 3) !== true) {
      PACK_THREE.style.backgroundImage = "url('/Images/Knight_Pack/Deactivated/knightDeactivated.jpg')";
    }
    
    
    if (languagePacks.some(element => element === 2) === true && activeLanguagePacks.some(element => element === 2) === true) {

      fetch('/wordsAndDefinitions2')
        .then(res => res.json())
        .then(data => {
          data.words.forEach(element => {
            compiledWordPack.push(element);
          })
        })
        .then(() => words = compiledWordPack)
        .then(() => PACK_TWO.style.backgroundImage = "url('/Images/Bishop_Pack/Active/bishopActivated.jpg')");
  
      fetch('/wordsAndDefinitions2')
        .then(res => res.json())
        .then(data => {
          data.definitions.forEach(element => {
            compiledDefinitionPack.push(element);
          })
        })
        .then(() => definitions = compiledDefinitionPack);
    } else if (languagePacks.some(element => element === 2) === true && activeLanguagePacks.some(element => element === 2) !== true) {
      PACK_TWO.style.backgroundImage = "url('/Images/Bishop_Pack/Deactivated/bishopDeactivated.jpg')";
    }
    
    // default language pack that is also available to not logged in users (no. 1)
    // if none of the above language packs are unlocked, assign the default LP below
    if (languagePacks.some(element => element === 2) === false && languagePacks.some(element => element === 3) === false && languagePacks.some(element => element === 4) === false && languagePacks.some(element => element === 5) === false && languagePacks.some(element => element === 6) === false  && languagePacks.some(element => element === 7) === false  && languagePacks.some(element => element === 8) === false) {
      fetch('/wordsAndDefinitions1')
        .then(res => res.json())
        .then(data => words = data.words); 
  
      fetch('/wordsAndDefinitions1')
        .then(res => res.json())
        .then(data => definitions = data.definitions)
    }

    PACK_FOUR.style.backgroundImage = "url('/Images/Rook_Pack/Premium_Only/Rook.jpg')";
    PACK_FIVE.style.backgroundImage = "url('/Images/Queen_Pack/Premium_Only/Queen.jpg')";
    PACK_SIX.style.backgroundImage = "url('/Images/King_Pack/Premium_Only/King.jpg')";
    PACK_SEVEN.style.backgroundImage = "url('/Images/Japanese_Pack/Premium_Only/Jp.jpg')";
    PACK_EIGHT.style.backgroundImage = "url('/Images/Spanish_Pack/Premium_Only/Es.jpg')";

    PACK_FOUR.onclick = () => {
      startSalesPageTimer();POPUPS.classList.remove('hide'); SALES_PAGE.classList.remove('hide');
    }
    PACK_FIVE.onclick = () => {
      startSalesPageTimer();POPUPS.classList.remove('hide'); SALES_PAGE.classList.remove('hide');
    }
    PACK_SIX.onclick = () => {
      startSalesPageTimer();POPUPS.classList.remove('hide'); SALES_PAGE.classList.remove('hide');
    }
    PACK_SEVEN.onclick = () => {
      startSalesPageTimer();POPUPS.classList.remove('hide'); SALES_PAGE.classList.remove('hide');
    }
    PACK_EIGHT.onclick = () => {
      startSalesPageTimer();POPUPS.classList.remove('hide'); SALES_PAGE.classList.remove('hide');
    }
  } else {
    // handle all LPs
    if (languagePacks.some(element => element === 8) === true && activeLanguagePacks.some(element => element === 8) === true) {

      fetch('/wordsAndDefinitions8')
        .then(res => res.json())
        .then(data => {
          data.words.forEach(element => {
            compiledWordPack.push(element);
          })
        })
        .then(() => words = compiledWordPack)
        .then(() => PACK_EIGHT.style.backgroundImage = "url('/Images/Spanish_Pack/Active/esActivated.jpg')")

      fetch('/wordsAndDefinitions8')
        .then(res => res.json())
        .then(data => {
          data.definitions.forEach(element => {
            compiledDefinitionPack.push(element);
          })
        })
        .then(() => definitions = compiledDefinitionPack);

    } else if (languagePacks.some(element => element === 8) === true && activeLanguagePacks.some(element => element === 8) !== true) {
      PACK_EIGHT.style.backgroundImage = "url('/Images/Spanish_Pack/Deactivated/esDeactivated.jpg')";
    }


    if (languagePacks.some(element => element === 7) === true && activeLanguagePacks.some(element => element === 7) === true) {
      fetch('/wordsAndDefinitions7')
        .then(res => res.json())
        .then(data => {
          data.words.forEach(element => {
            compiledWordPack.push(element);
          })
        })
        .then(() => words = compiledWordPack)
        .then(() => PACK_SEVEN.style.backgroundImage = "url('/Images/Japanese_Pack/Active/jpActivated.jpg')")

      fetch('/wordsAndDefinitions7')
        .then(res => res.json())
        .then(data => {
          data.definitions.forEach(element => {
            compiledDefinitionPack.push(element);
          })
        })
        .then(() => definitions = compiledDefinitionPack);

    } else if (languagePacks.some(element => element === 7) === true && activeLanguagePacks.some(element => element === 7) !== true) {
      PACK_SEVEN.style.backgroundImage = "url('/Images/Japanese_Pack/Deactivated/jpDeactivated.jpg')";
    }

    if (languagePacks.some(element => element === 6) === true && activeLanguagePacks.some(element => element === 6) === true) {

      fetch('/wordsAndDefinitions6')
        .then(res => res.json())
        .then(data => {
          data.words.forEach(element => {
            compiledWordPack.push(element);
          })
        })
        .then(() => words = compiledWordPack)
        .then(() => PACK_SIX.style.backgroundImage = "url('/Images/King_Pack/Active/kingActivated.jpg')")

      fetch('/wordsAndDefinitions6')
        .then(res => res.json())
        .then(data => {
          data.definitions.forEach(element => {
            compiledDefinitionPack.push(element);
          })
        })
        .then(() => definitions = compiledDefinitionPack);

    } else if (languagePacks.some(element => element === 6) === true && activeLanguagePacks.some(element => element === 6) !== true) {
      PACK_SIX.style.backgroundImage = "url('/Images/King_Pack/Deactivated/kingDeactivated.jpg')";
    }


    if (languagePacks.some(element => element === 5) === true && activeLanguagePacks.some(element => element === 5) === true) {

      fetch('/wordsAndDefinitions5')
        .then(res => res.json())
        .then(data => {
          data.words.forEach(element => {
            compiledWordPack.push(element);
          })
        })
        .then(() => words = compiledWordPack)
        .then(() => PACK_FIVE.style.backgroundImage = "url('/Images/Queen_Pack/Active/queenActivated.jpg')");

      fetch('/wordsAndDefinitions5')
        .then(res => res.json())
        .then(data => {
          data.definitions.forEach(element => {
            compiledDefinitionPack.push(element);
          })
        })
        .then(() => definitions = compiledDefinitionPack);
    } else if (languagePacks.some(element => element === 5) === true && activeLanguagePacks.some(element => element === 5) !== true) {
      PACK_FIVE.style.backgroundImage = "url('/Images/Queen_Pack/Deactivated/queenDeactivated.jpg')";
    }

    if (languagePacks.some(element => element === 4) === true && activeLanguagePacks.some(element => element === 4) === true) {

      fetch('/wordsAndDefinitions4')
        .then(res => res.json())
        .then(data => {
          data.words.forEach(element => {
            compiledWordPack.push(element);
          })
        })
        .then(() => words = compiledWordPack)
        .then(() => PACK_FOUR.style.backgroundImage = "url('/Images/Rook_Pack/Active/rookActivated.jpg')");

      fetch('/wordsAndDefinitions4')
        .then(res => res.json())
        .then(data => {
          data.definitions.forEach(element => {
            compiledDefinitionPack.push(element);
          })
        })
        .then(() => definitions = compiledDefinitionPack);
    } else if (languagePacks.some(element => element === 4) === true && activeLanguagePacks.some(element => element === 4) !== true) {
      PACK_FOUR.style.backgroundImage = "url('/Images/Rook_Pack/Deactivated/rookDeactivated.jpg')";
    }
  }
  
  
  if (languagePacks.some(element => element === 3) === true && activeLanguagePacks.some(element => element === 3) === true) {

    fetch('/wordsAndDefinitions3')
      .then(res => res.json())
      .then(data => {
        data.words.forEach(element => {
          compiledWordPack.push(element);
        })
      })
      .then(() => words = compiledWordPack)
      .then(() => PACK_THREE.style.backgroundImage = "url('/Images/Knight_Pack/Active/knightActivated.jpg')");

    fetch('/wordsAndDefinitions3')
      .then(res => res.json())
      .then(data => {
        data.definitions.forEach(element => {
          compiledDefinitionPack.push(element);
        })
      })
      .then(() => definitions = compiledDefinitionPack);
  } else if (languagePacks.some(element => element === 3) === true && activeLanguagePacks.some(element => element === 3) !== true) {
    PACK_THREE.style.backgroundImage = "url('/Images/Knight_Pack/Deactivated/knightDeactivated.jpg')";
  }
  
  
  if (languagePacks.some(element => element === 2) === true && activeLanguagePacks.some(element => element === 2) === true) {
    fetch('/wordsAndDefinitions2')
      .then(res => res.json())
      .then(data => {
        data.words.forEach(element => {
          compiledWordPack.push(element);
        })
      })
      .then(() => words = compiledWordPack)
      .then(() => PACK_TWO.style.backgroundImage = "url('/Images/Bishop_Pack/Active/bishopActivated.jpg')");

    fetch('/wordsAndDefinitions2')
      .then(res => res.json())
      .then(data => {
        data.definitions.forEach(element => {
          compiledDefinitionPack.push(element);
        })
      })
      .then(() => definitions = compiledDefinitionPack);
  } else if (languagePacks.some(element => element === 2) === true && activeLanguagePacks.some(element => element === 2) !== true) {
    PACK_TWO.style.backgroundImage = "url('/Images/Bishop_Pack/Deactivated/bishopDeactivated.jpg')";
  }
  
  // default language pack that is also available to not logged in users (no. 1)
  // if none of the above language packs are unlocked, assign the default LP below
  if (languagePacks.some(element => element === 2) === false && languagePacks.some(element => element === 3) === false && languagePacks.some(element => element === 4) === false && languagePacks.some(element => element === 5) === false && languagePacks.some(element => element === 6) === false  && languagePacks.some(element => element === 7) === false  && languagePacks.some(element => element === 8) === false) {
    fetch('/wordsAndDefinitions1')
      .then(res => res.json())
      .then(data => words = data.words); 

    fetch('/wordsAndDefinitions1')
      .then(res => res.json())
      .then(data => definitions = data.definitions)
  }
}

// check if user still has free access
START_BUTTON.addEventListener('click', function () {
  if (getMobileOperatingSystem() !== 'iOS' && getMobileOperatingSystem() !== 'Android' && getMobileOperatingSystem() !== 'Windows Phone') {
    document.body.requestFullscreen();
  }
  //if user is logged in check totalTimesPlayed
  if (isLoggedIn === true) {
    setLoading(true);
    checkUserMetadata()
      .then(() => {
        if (totalTimesPlayed >= 80 && premiumPass === false) {
          setLoading(false);
          POPUPS.classList.remove('hide');
          SALES_PAGE.classList.remove('hide');
          startSalesPageTimer();
        } else {
          startGame();
        }
      })
  } else {
    startGame();
  }
});

//register game start, and change visuals
function startGame() {
  // check local storage if user should be allowed to play
  checkLocalStorage()
    .then((firstGamePlayed) => {
      if (firstGamePlayed === false || isLoggedIn === true) {
        if (isLoggedIn === true) {
          STARS.classList.add('hide');
          displayAddToHomescreen();
          // check if daily play limit is reached
          if (todayPlayedGames <= 1 || premiumPass === true) {
                MOBILE_CONTAINER.style.backgroundSize = "110vw 160vh";
                //GET languagePack that user has unlocked and apply for game
                handleLanguagePack();
                addTodayPlayedGame();
                PROFILE_LEVEL.innerText = `Level ${level} ${levelTitle()}`;
                checkRequiredCompletedGames();
                PROFILE_HIGHSCORE.innerText = `Highscore: ${highscore} points`;
                checkUserLogin();
                setLoading(false);
                NAV.classList.add('hide');
                LEAVE_ICON.classList.remove('hide');
                CENTER_CONTAINER.classList.add('hide');
                START_BUTTON.classList.add('hide');
                SLIDER.classList.add('hide');
                OR_WATCH_TUTORIAL.classList.add('hide');
                MOBILE_CONTAINER.classList.add('change-background-for-challenge');
                TIMER.classList.remove('hide');
                CHALLENGE_SPACE.classList.remove('hide');
                initializeGame();
                _correctAnswer = challenge[0];
                _definitionOnDisplay = challenge[1];
                QUESTION.innerHTML = `${_definitionOnDisplay}`;
                SCORE.innerText = `Score: ${score}`;
                LIVES_LEFT.innerText = `${livesLeft} lives left.`;
                selectionOrNot()
                  .then(() => {
                    console.log("last?")
                    //check again if correct word is displayed in any selection innerText
                    // avoid not displaying a correct option 
                    if (SELECTION1.innerText !== _correctAnswer.toLowerCase() && SELECTION2.innerText !== _correctAnswer.toLowerCase() && SELECTION3.innerText !== _correctAnswer.toLowerCase()) {
                      SELECTION1.innerText = _correctAnswer.toLowerCase()
                    }
                    // avoid not displaying "undefined" as definitionOnDisplay
                    if (QUESTION.innerText !== _definitionOnDisplay) {
                      console.log(_definitionOnDisplay)
                    } 
                  })
          } else {
            setLoading(false);
            POPUPS.classList.remove('hide');
            PLAY_LIMIT.classList.remove('hide');
          }
        } else {
          setLoading(false);
          STARS.classList.add('hide');
          NAV.classList.add('hide');
          LEAVE_ICON.classList.remove('hide');
          CENTER_CONTAINER.classList.add('hide');
          START_BUTTON.classList.add('hide');
          SLIDER.classList.add('hide');
          OR_WATCH_TUTORIAL.classList.add('hide');
          MOBILE_CONTAINER.classList.add('change-background-for-challenge');
          TIMER.classList.remove('hide');
          CHALLENGE_SPACE.classList.remove('hide');
          initializeGame();
          _correctAnswer = challenge[0];
          _definitionOnDisplay = challenge[1];
          QUESTION.innerHTML = `${_definitionOnDisplay}`;
          SCORE.innerText = `Score: ${score}`;
          LIVES_LEFT.innerText = `${livesLeft} lives left.`;
          selectionOrNot()
            .then(() => {
              console.log("last?")
              //check again if correct word is displayed in any selection innerText
              // avoid not displaying a correct option 
              if (SELECTION1.innerText !== _correctAnswer.toLowerCase() && SELECTION2.innerText !== _correctAnswer.toLowerCase() && SELECTION3.innerText !== _correctAnswer.toLowerCase()) {
                SELECTION1.innerText = _correctAnswer.toLowerCase()
              }
              // avoid not displaying "undefined" as definitionOnDisplay
              if (QUESTION.innerText !== _definitionOnDisplay) {
                console.log(_definitionOnDisplay)
              } 
            })
          MOBILE_CONTAINER.style.backgroundSize = "110vw 160vh";
        }
      } else {
        //redirect to login page
        location.href = '/login';
      }
    })
    .catch((error) => console.log(error));
}
//question countdown timer
function challengeTimer () {
  interval = setInterval(function() {
    if (timeLeft <= 10) {
      TIMER.style.color = '#9c2127';
    } 
    if (timeLeft <= 1) {
      clearInterval(interval);
      timeExpired();
    } else if (timeLeft <= 15 && isAlreadyHidden(SELECTIONS, 'hide') === true && document.querySelector('#crossword-container').classList.contains('hide') === true) {
      HINT_ICON.classList.remove('hide');
      HINT_ICON.classList.add('wiggle-animation');
    } else if (timeLeft <= 6 && isAlreadyHidden(SELECTIONS, 'hide') === true && document.querySelector('#crossword-container').classList.contains('hide') === false) {
      HINT_ICON.classList.remove('hide');
      HINT_ICON.classList.add('wiggle-animation');
    };
    timeLeft -= 1;
    TIMER.innerText = timeLeft;
  }, 1000);
};

//reset values and giving user a new challenge
function newChallenge () {
  if ( score < 0 || SCORE.innerText < 0) {
    closeAllPopups();
    POPUPS.classList.add('hide');
    POPUPS.classList.remove('hide');
    GAME_OVER.classList.add('hide');
    GAME_OVER.classList.remove('hide');
    gameOver();
  }
  randomValue = 0;
  challenge = [];  
  timeLeft = 30;
  //increase game difficulty over time (less time)
  if (score > 100) {
    timeLeft = 28
  }
  if (score > 200) {
    timeLeft = 27
  }
  if (score > 300) {
    timeLeft = 26
  }
  if (score > 400) {
    timeLeft = 25
  }
  if (score > 500) {
    timeLeft = 24
  }
  if (score > 600) {
    timeLeft = 23
  }
  if (score > 700) {
    timeLeft = 22
  }
  if (score > 800) {
    timeLeft = 21
  }
  if (score > 900) {
    timeLeft = 20
  }
  if (score > 1000) {
    timeLeft = 19
  }
  if (score > 1100) {
    timeLeft = 18
  }
  if (score > 1200) {
    timeLeft = 17
  }
  if (score > 1300) {
    timeLeft = 16
  } 
  if (score > 1400) {
    timeLeft = 15
  }
  if (score > 1500) {
    timeLeft = 14
  }
  if (score > 1600) {
    timeLeft = 13
  }
  if (score > 1700) {
    timeLeft = 12
  }
  if (score > 1800) {
    timeLeft = 11
  } 
  if (score > 1900) {
    timeLeft = 10
  }
  if (score > 2000) {
    timeLeft = 9
  } 
  TIMER.style.color = '#BEBABB';
  BONUS_CHEST_HEALTH.style.backgroundSize = '100%';
  BONUS_CHEST_CONFETTI.classList.add('hide');
  HINT_ICON.classList.add('hide');
  challengeTimer();
  createRandom();
  createChallenge();
  _correctAnswer = challenge[0];    
  _definitionOnDisplay = challenge[1];
  QUESTION.innerHTML = `${_definitionOnDisplay}`;
  SCORE.innerText = `Score: ${score}`;
  LIVES_LEFT.innerText = `${livesLeft} lives left.`;
  //make form input reset automatically after submission
  document.querySelector('#challenge-container form .answer').value = '';
  SKIP_HEADER.innerText = 'Wrong.';
  reCallWords();
  selectionOrNot()
    .then(() => {
      console.log("last?")
      //check again if correct word is displayed in any selection innerText
      // avoid not displaying a correct option 
      if (SELECTION1.innerText !== _correctAnswer.toLowerCase() && SELECTION2.innerText !== _correctAnswer.toLowerCase() && SELECTION3.innerText !== _correctAnswer.toLowerCase()) {
        SELECTION1.innerText = _correctAnswer.toLowerCase()
      }
      // avoid not displaying "undefined" as definitionOnDisplay
      if (QUESTION.innerText !== _definitionOnDisplay) {
        console.log(_definitionOnDisplay)
      } 
    })
  STREAK_TEXT.classList.add('hide');
  CORRECT_HEADING_TEXT.innerText = 'Correct!';
  UPPER_CORRECT.classList.add('margin_bottom7percent');
  refreshImage('fire-gif', '/Images/fire.gif');
  refreshImage('stars-gif', '/Images/stars.gif');
  refreshImage('sparkle-gif', '/Images/sparkle.gif');

  //reset green border that is for correct answer
  SELECTION1.style.borderBlockColor = '#FFFFFF';
  SELECTION2.style.borderBlockColor = '#FFFFFF';
  SELECTION3.style.borderBlockColor = '#FFFFFF';

  // hide bonus chest again (for when time expired at visible bonus chest)
  BONUS_CHEST.classList.add('invisible');
  BONUS_CHEST_HEADER.classList.add('invisible');
  BONUS_CHEST_HEALTH.classList.add('invisible');
  // random bonus chest HP
  const hpRandomizer = Math.floor(Math.random() * 4);
  // lower open difficulty because of game being more difficult (less timeLeft)
  if (score < 400) {
    if (hpRandomizer === 1) {
      chestHPMode = 1000;
      chestHP = 1000;
      MAX_HP.innerText = chestHP;
      LEFT_HP.innerText = chestHP;
    } else if (hpRandomizer === 2) {
      chestHPMode = 1500;
      chestHP = 1500;
      MAX_HP.innerText = chestHP;
      LEFT_HP.innerText = chestHP;
    } else {
      chestHPMode = 2000;
      chestHP = 2000;
      MAX_HP.innerText = chestHP;
      LEFT_HP.innerText = chestHP;
    }
  }
  // no randomness above 400 score
  if (score > 400) {
    chestHPMode = 800;
    chestHP = 800;
    MAX_HP.innerText = chestHP;
    LEFT_HP.innerText = chestHP;
  }
  if (score > 600) {
    chestHPMode = 650;
    chestHP = 650;
    MAX_HP.innerText = chestHP;
    LEFT_HP.innerText = chestHP;
  }
  if (score > 1300) {
    chestHPMode = 300;
    chestHP = 300;
    MAX_HP.innerText = chestHP;
    LEFT_HP.innerText = chestHP;
  } 
  enableButton(SELECTION1);
  enableButton(SELECTION2);
  enableButton(SELECTION3);
  STARS.classList.add('hide');
  SPARKLE.classList.add('hide');
  SPARKLE_GIF.style.marginBottom = '0%';

  if (isLoggedIn === true) {
    checkChallengeCompletion();
  }
};

//recall words that user has before answered wrong and ask them again
function reCallWords () {
  var reCallProbability = Math.floor(Math.random() * 7);
  var wordProbability = Math.floor(Math.random() * RE_CALL_WORDS.length);

  if (reCallProbability === 1 && RE_CALL_WORDS != '' || isAlreadyHidden(ANSWER_CONTAINER, 'hide') === false) {
    _correctAnswer = RE_CALL_WORDS[wordProbability];
    _definitionOnDisplay = RE_CALL_DEFINITIONS[wordProbability];
    QUESTION.innerHTML = `${RE_CALL_DEFINITIONS[wordProbability]}`;
  }
}

//display popup for correct answer
function correctAnswer () {
  if (isAlreadyHidden(POPUPS, 'hide') === true && isAlreadyHidden(CORRECT_ANSWER, 'hide') === true && isAlreadyHidden(CONFETTI, 'hide') === true && bonusChestActive === false) {
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(125); // vibrate 
    }
    refreshImage('confetti-gif', '/Images/confetti.gif');
    streakCheck();
    wordCounter(_correctAnswer);
    closeAllPopups();
    POPUPS.classList.remove('hide');
    CORRECT_ANSWER.classList.remove('hide');
    CONFETTI.classList.remove('hide');
    score += 10;
    streak += 1;

    if (streakCount < 3) {
    streakCount += 1;
    } else {streakCount = 0;}
  } else if (bonusChestActive === true && isAlreadyHidden(CORRECT_ANSWER, 'hide') === true) {
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(125); // vibrate 
    }
    refreshImage('confetti-gif', '/Images/confetti.gif');
    streakCheck();
    wordCounter(_correctAnswer);
    closeAllPopups();
    POPUPS.classList.remove('hide');
    CORRECT_ANSWER.classList.remove('hide');
    CONFETTI.classList.remove('hide');
    score += 10;
    streak += 1;
    if (streakCount < 3) {
    streakCount += 1;
    } else {streakCount = 0;}
  } else {
    POPUPS.classList.add('hide');
    CORRECT_ANSWER.classList.add('hide');
    CONFETTI.classList.add('hide');
  }
  bonusChestActive = false; 
}

//display popup for wrong answer
function wrongAnswer () {
  if (isAlreadyHidden(POPUPS, 'hide') === true && isAlreadyHidden(WRONG_ANSWER, 'hide') === true) {
    CORRECT_ANSWER_TEXT.innerHTML = 'Correct answer: ' + '<span style="text-decoration: underline; cursor: pointer; text-shadow: 2px 2px #000000" onclick="showDefinition()">' + `${_correctAnswer}` + '</span>';
    setUtterance()
    SPEAKER.onclick = () => speakWord(_correctAnswer);
    closeAllPopups();
    POPUPS.classList.remove('hide');
    WRONG_ANSWER.classList.remove('hide');
    livesLeft -= 1;
    streak = 0;
    streakCount = 0;
    FIRE_GIF.classList.add('hide');
    RE_CALL_WORDS.push(_correctAnswer);
    RE_CALL_DEFINITIONS.push(_definitionOnDisplay);
  } else {
    POPUPS.classList.add('hide');
    WRONG_ANSWER.classList.add('hide');
  }
  bonusChestActive = false; 
}


function giveRevive () {
  if (socialRevive === true) {
    POPUPS.classList.add('hide');
    SOCIAL_REVIVE.classList.add('hide');
    newChallenge();
    livesLeft += 1;
    LIVES_LEFT.innerText = `${livesLeft} lives left.`;
  } else if (starRevive === true && stars >= 500) {
    POPUPS.classList.add('hide');
    STAR_REVIVE.classList.add('hide');
    newChallenge();
    takeStars(500);
    livesLeft += 4;
    LIVES_LEFT.innerText = `${livesLeft} lives left.`;
  } else {
    NOT_ENOUGH_STARS.classList.remove('hide');
  }
}

// used in index.html
function socialRevived () {
  LOADER.classList.remove('hide');
  setTimeout(() => {
    newChallenge();
    livesLeft += 1;
    LIVES_LEFT.innerText = `${livesLeft} lives left.`;
    LOADER.classList.add('hide');
    POPUPS.classList.add('hide');
    SOCIAL_REVIVE.classList.add('hide');
  }, 15000);
}


// give opportunity for user to revive or not
function reviveOrNot () {
  var reviveProbability = Math.floor(Math.random() * 5);
  var socialReviveProbability = Math.floor(Math.random() * 4);
  if (reviveProbability === 1) {
    // revive by sharing on social media or spending stars
    if (socialReviveProbability === 1) {
      socialRevive = true;
    } else {
      starRevive = true;
    }
  }
}


//make last popup appear that redirects to game over pop up
function lastWrongAnswer () {
  if (isLoggedIn === true) {
    if (completedGames <= requiredCompletedGames - 1 || level === 10) {
      if (isAlreadyHidden(POPUPS, 'hide') === true && isAlreadyHidden(LAST_ANSWER, 'hide') === true) {
        updateStars()
          .then(() => {
            reviveOrNot();
          })
          .then(() => {
            if (socialRevive === true) {
              //display social revive
              closeAllPopups();
              POPUPS.classList.remove('hide');
              SOCIAL_REVIVE.classList.remove('hide');
            } else if (starRevive === true) {
              //display star revive
              closeAllPopups();
              POPUPS.classList.remove('hide');
              STAR_REVIVE.classList.remove('hide');
            } else {
              LAST_CORRECT_ANSWER_TEXT.innerText = `Correct answer: ${_correctAnswer}`;
              setUtterance();
              closeAllPopups();
              POPUPS.classList.remove('hide');
              LAST_ANSWER.classList.remove('hide');
            }
          })
      } else {
        LAST_ANSWER.classList.add('hide');
        SOCIAL_REVIVE.classList.add('hide');
        STAR_REVIVE.classList.add('hide');
        GAME_OVER.classList.remove('hide');
        gameOver();
      }
    } else if (completedGames >= requiredCompletedGames && level !== 10) { 
      levelUp();
    }
  } else {
    if (isAlreadyHidden(POPUPS, 'hide') === true && isAlreadyHidden(LAST_ANSWER, 'hide') === true) {
      LAST_CORRECT_ANSWER_TEXT.innerText = `Correct answer: ${_correctAnswer}`;
      setUtterance();
      closeAllPopups();
      POPUPS.classList.remove('hide');
      LAST_ANSWER.classList.remove('hide');
      //make game over popup appear after timeout
      if (livesLeft <= 1) {
        timeout = setTimeout(() => {
        LAST_ANSWER.classList.add('hide');
        GAME_OVER.classList.remove('hide');
        gameOver();
        }, 5000);
      };
    } else {
      LAST_ANSWER.classList.add('hide');
      GAME_OVER.classList.remove('hide');
      gameOver();
    }
  }
}


//display levelUp PopUp 
function levelUp () {
  addLevel();
  setTimeout(() => {
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(125); // vibrate 
    }
    if (POPUPS.classList.contains('hide') === false && LAST_ANSWER.classList.contains('hide') === false ) { 
      
      } else if (POPUPS.classList.contains('hide') === true && LAST_ANSWER.classList.contains('hide') === true) {
        //open last answer popup
        closeAllPopups();
        POPUPS.classList.remove('hide');
        LAST_ANSWER.classList.remove('hide');
        LAST_CORRECT_ANSWER_TEXT.innerText = `Correct answer: ${_correctAnswer}`;
        setUtterance();
        LEVELUP_TEXT.innerText = `You have reached Level ${level + 1}.`;
        LOWER_LAST_ANSWER.onclick = function () {
        LAST_ANSWER.classList.add('hide');
        LEVELUP.classList.remove('hide');
        }
      }
  }, 500);
}









//display score or highscore based on score
function gameOver () {
  if (isLoggedIn === true) {
    pushWordsToVocab();
    // (only resets if level up was given)
    addTotalTimesPlayed();
    addCompletedGame();
    checkUserMetadata()
      .then(() => PROFILE_HIGHSCORE.innerText = `Highscore: ${highscore} points`);
  }
  setLocalStorage();
  refreshImage('sparkle-gif', '/Images/sparkle.gif');
  SPARKLE.style.marginBottom = '0%';
  if (score > highscore) {
    GAME_OVER_TEXT.innerText = 'New Highscore:';
    HIGHSCORE.innerText = `${score} points.`;
    STARS.classList.remove('hide');
    SPARKLE.classList.remove('hide');
    if (isLoggedIn === true) {
      // send stars to appdata
      giveStarReward(500)
        .then(() => updateStars());
      // PATCH request to send highscore to appdata
      var newHighscore = {
        "highscore": score
      };
      var requestOptions = {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHighscore)
      };
      fetch("/user", requestOptions)
        .then(() => setLoading(false))
        .catch(error => console.log('error', error));
    }
  } else {
    GAME_OVER_TEXT.innerText = 'Your score:';
    HIGHSCORE.innerText = `${score} points.`;
  }
}

//restart game with new stats
function playAgainButton () {
  //if user is logged in check totalTimesPlayed
  if (isLoggedIn === true) {
    setLoading(true);
    checkUserMetadata()
      .then(() => {
        if (totalTimesPlayed >= 100 && premiumPass === false) {
          closeAllPopups();
          POPUPS.classList.remove('hide');
          SALES_PAGE.classList.remove('hide');
          startSalesPageTimer();
        } else {
          playAgain();
        }
      })
  } else {
    playAgain();
  }
}


function playAgain () {
  checkLocalStorage()
    .then((firstGamePlayed) => {
      if (firstGamePlayed === false || isLoggedIn === true) {
        if (isLoggedIn === true) {
          // check if daily play limit is reached
          if (todayPlayedGames <= 1 || premiumPass === true) {
            addTodayPlayedGame();
            PROFILE_LEVEL.innerText = `Level ${level} ${levelTitle()}`;
            checkRequiredCompletedGames();
            checkUserLogin();
            livesLeft = 5;
            score = 0;
            timeout = NaN;
            socialRevive = false;
            starRevive = false;
            setLoading(false);
            POPUPS.classList.add('hide');
            GAME_OVER.classList.add('hide');
            STARS.classList.add('hide');
            SPARKLE.classList.add('hide');
            newChallenge();
            SKIP_BUTTON.classList.remove('hide');
            refreshImage('stars-gif', '/Images/stars.gif');
            refreshImage('levelup-gif', '/Images/badge.gif');
            //reset onclick 
            LOWER_LAST_ANSWER.onclick = function () {
              lastWrongAnswer();
            }
          } else {
            setLoading(false);
            closeAllPopups();
            POPUPS.classList.remove('hide');
            GAME_OVER.classList.add('hide');
            PLAY_LIMIT.classList.remove('hide');
          }
        } else {
          checkUserLogin();
          livesLeft = 5;
          score = 0;
          timeout = NaN;
          POPUPS.classList.add('hide');
          GAME_OVER.classList.add('hide');
          STARS.classList.add('hide');
          SPARKLE.classList.add('hide');
          newChallenge();
          SKIP_BUTTON.classList.remove('hide');
          refreshImage('stars-gif', '/Images/stars.gif');
          refreshImage('levelup-gif', '/Images/badge.gif');
          //reset onclick 
          LOWER_LAST_ANSWER.onclick = function () {
            lastWrongAnswer();
          }
        }
      } else {
        //redirect to login page
        location.href = '/login';
      }
    });
}



//check if the answer is correct
function userAnswerCheck () {
  let answer = document.querySelector("#challenge-container form .answer").value.trim();
  let isValidated;
  function startsWithCapital(word){
    return word.charAt(0) === word.charAt(0).toUpperCase()
  }
  if (answer === _correctAnswer) {
    isValidated = true;
  } else if (startsWithCapital(answer) === true) {
    if (answer.toLowerCase() === _correctAnswer) {
      isValidated = true;
    } else { isValidated = false; }
  } else { isValidated = false; }

  if (isValidated === true) {
    clearInterval(interval);
    correctAnswer();  //correct
    whenHideSkipButton();
    function checkWord(word) {
      return word === _correctAnswer;
    }
    // remove a recallword when that word is has been answered correctly into answer container (not from the answer selection)
    function filterWords(word) {
      return word != _correctAnswer;
    }
    function filterDefinitions(definition) {
      return definition != _definitionOnDisplay;
    }
    //filter out questions from recall that have been answered right
    if (_correctAnswer === RE_CALL_WORDS.find(checkWord)) {
      RE_CALL_WORDS = RE_CALL_WORDS.filter(filterWords);
      RE_CALL_DEFINITIONS = RE_CALL_DEFINITIONS.filter(filterDefinitions);
    }
  } else if (isValidated === false && livesLeft === 1 || isValidated === false && livesLeft === 1 && timeLeft <= 1) {
    clearInterval(interval);
    if (isLoggedIn === true) {
      // check completed games for level up
      checkUserMetadata();
    }
    lastWrongAnswer();  //last answer
  } else if (isValidated === false) {
    clearInterval(interval);  
    wrongAnswer();  //wrong 
    whenHideSkipButton();
  }
};

//multiply Math.random by amount of words and definitions
function createRandom () {
  randomValue = Math.floor(Math.random() * words.length);
};

function createChallenge () {
  challenge.push(words[randomValue], definitions[randomValue]); 
};

//censor word and display it in hint popup
function displayHint () {
  var censoredWord = _correctAnswer;
  var hintWordLength = 0;
  function censor() {
    for (let i = 0; i < _correctAnswer.length; i++) {
      hintWordLength += 1;
    }
    for (let i = 5; i < hintWordLength; i++) {
      censoredWord = censoredWord.replace(_correctAnswer.charAt(i), '*');
    }
  }
  censor();
  HINT_WORD.innerText = censoredWord;
};

HINT_ICON.addEventListener('click', function () {
  POPUPS.classList.remove('hide');
  HINT_POPUP.classList.remove('hide');
  displayHint();
})

//transition to next popup if time expires
function timeExpired () {
  TIMER.style.color = '#BEBABB';
  if (bonusChestActive === false) {
    //check if hint pop up is open and close it first
    if (isAlreadyHidden(POPUPS, 'hide') === false && isAlreadyHidden(HINT_POPUP, 'hide') === false) {
      POPUPS.classList.add('hide');
      HINT_POPUP.classList.add('hide');
    }
    if (isAlreadyHidden(POPUPS, 'hide') === true && isAlreadyHidden(TIME_EXPIRED, 'hide') === true) {
      CORRECT_ANSWER_TEXT_TWO.innerText = `Correct answer: ${_correctAnswer}`;
      setUtterance();
      TIME_EXPIRED_CORRECT_ANSWER_TEXT.innerHTML = 'Correct answer: ' + '<span style="text-decoration: underline; cursor: pointer; text-shadow: 2px 2px #000000" onclick="showDefinition()">' + `${_correctAnswer}` + '</span>';
      SPEAKER2.onclick = () => speakWord(_correctAnswer);
      POPUPS.classList.remove('hide');
      TIME_EXPIRED.classList.remove('hide');
      livesLeft -= 1;
      if (livesLeft === 0) {
        timeout = setTimeout(() => {
        TIME_EXPIRED.classList.add('hide');
        GAME_OVER.classList.remove('hide');
        gameOver();
        }, 5000);
      };
    } else if (livesLeft > 0) {
      POPUPS.classList.add('hide');
      TIME_EXPIRED.classList.add('hide');
      newChallenge();
    } else if (livesLeft === 0) {
      TIME_EXPIRED.classList.add('hide');
      GAME_OVER.classList.remove('hide'); 
      gameOver();
    }
    streak = 0;
    streakCount = 0;
    FIRE_GIF.classList.add('hide');
  } else if (bonusChestActive === true && isAlreadyHidden(CORRECT_ANSWER, 'hide') === true) {
    clearInterval(interval);
    refreshImage('confetti-gif', '/Images/confetti.gif');
    streakCheck();
    POPUPS.classList.remove('hide');
    CORRECT_ANSWER.classList.remove('hide');
    CONFETTI.classList.remove('hide');
    score += 10;
    streak += 1;
    if (streakCount < 3) {
    streakCount += 1;
    } else {streakCount = 0;}
  }
  if (isAlreadyHidden(CONNECTION_LOST, 'hide') === false) {
    POPUPS.classList.remove('hide');
    CONNECTION_LOST.classList.remove('hide');
  }
}




// chose word for word selection that is in same language as _definitionOnDisplay
// (to avoid a mix of languages in selection)
async function setRandomWord() {
  if (isLoggedIn === true) {
    // get the definition of the word and push it together
    var requestOptions = {
      method: 'GET',
      headers: { "Content-Type": "application/json" },
    };

    return fetch('/dictionaryWordsAndDefinitions', requestOptions)
      .then(response => response.json())
      .then(data => {
        //return "hello"
        //check each key for matching word
        for (var key in data) {
          console.log("KEY --->" + key);
          // detect match to get full info on the displayed definition

          if (_definitionOnDisplay === data[key].hintDef) {

          console.log("_definitionOnDisplay --->" + _definitionOnDisplay);
          console.log("data[key].hintDef --->" + data[key].hintDef);


            // ENGLISH
            if (parseInt(key) > 0 && parseInt(key) < 169) {
              console.log("Inside randomWord")
              return data[getRandomInt(1, 168)].word.toLowerCase();
            }

            // JAPANESE
            if (parseInt(key) > 168 && parseInt(key) < 268) {
              console.log("Inside randomWord")
              return data[getRandomInt(169, 267)].word.toLowerCase();
            }

            // SPANISH
            if (parseInt(key) > 267 && parseInt(key) < 328) {
              console.log("Inside randomWord")
              return data[getRandomInt(268, 327)].word.toLowerCase();
            }
          }
        }
      })
      .catch(error => console.log(error));
  } else {
    return words[Math.floor(Math.random() * words.length)].toLowerCase();
  }

}



//display selection at random
async function selectionOrNot () {
  var displayOrNot = Math.floor(Math.random() * 5);
  var displayRandomizer = Math.floor(Math.random() * 3);
  document.querySelector('#crossword-container').classList.add('hide');
  document.querySelector('#crossword-text').classList.add('hide');
  if (RE_CALL_WORDS.length < 3) {displayOrNot = 1}
  //start game with selection
  if (score === 0) {displayOrNot = 1};
  //track if user had to skip, to then show selection next
  if (hasSkipped === 1) { displayOrNot = 1 };
  //prevent selection if correct word has whitespace
  if (containsWhitespace(_correctAnswer) === true) { displayOrNot = 2 };
  
  if (displayOrNot === 0 || displayOrNot === 1 || displayOrNot === 2) {
    //display selection
    ANSWER_CONTAINER.classList.add('hide');
    document.querySelector('#crossword-container').classList.add('hide');
    document.querySelector('#crossword-text').classList.add('hide');
    SELECTIONS.classList.remove('hide');
    //assign innerText to Elements, one will be correct, the others wrong.
    if (displayRandomizer === 0) {
      SELECTION1.innerText = _correctAnswer.toLowerCase();
      console.log("Inside")

    } else {SELECTION1.innerText = await setRandomWord()} // encompassing amount of words
    if (displayRandomizer === 1) {
      console.log("Inside")

      SELECTION2.innerText = _correctAnswer.toLowerCase();
    } else {SELECTION2.innerText = await setRandomWord()}
    if (displayRandomizer === 2) {
      console.log("Inside")

      SELECTION3.innerText = _correctAnswer.toLowerCase();
    } else {SELECTION3.innerText = await setRandomWord()}


  } else if (displayOrNot === 3) {
    displayCrossword();
  } else {
    ANSWER_CONTAINER.classList.remove('hide');
    SELECTIONS.classList.add('hide');
    document.querySelector('#crossword-container').classList.add('hide');
    document.querySelector('#crossword-text').classList.add('hide');
    QUESTION.innerHTML = `${_definitionOnDisplay}`;
    ///////////////////
  }
  hasSkipped = 0;
 };

//check selection answer (HTML inline JS was used aswell)
 function selectionAnswerCheck (selection) {
  console.log("SECELTION1:" + SELECTION1.innerText)
  console.log("SECELTION2:" + SELECTION2.innerText)
  console.log("SECELTION3:" + SELECTION3.innerText)

  let isValidated;
   if (selection === 'selection1') {
     if (SELECTION1.innerText === _correctAnswer.toLowerCase()) {
      SELECTION1.style.borderBlockColor = '#fed885';
      isValidated = true;
      bonusChest();
     } else { isValidated = false; }
   }
   if (selection === 'selection2') {
    if (SELECTION2.innerText === _correctAnswer.toLowerCase()) {
      SELECTION2.style.borderBlockColor = '#fed885';
      isValidated = true;
      bonusChest();
    } else { isValidated = false; }
  }
  if (selection === 'selection3') {
    if (SELECTION3.innerText === _correctAnswer.toLowerCase()) {
      SELECTION3.style.borderBlockColor = '#fed885';
      isValidated = true;
      bonusChest();
    } else { isValidated = false; }
  }
//check if answer was correct and check if bonus chest is activated
  if (isValidated === true && BONUS_CHEST.classList.contains('invisible') === true) {
    clearInterval(interval);
    correctAnswer(); //correct
    whenHideSkipButton();
  } else if (isValidated === false && livesLeft === 1 || isValidated === false && livesLeft === 1 && timeLeft <= 1) {
    clearInterval(interval);
    if (isLoggedIn === true) {
      // check completed games for level up
      checkUserMetadata();
    }
    lastWrongAnswer();  //last answer
  } else if (isValidated === false) {
    clearInterval(interval);
    wrongAnswer();  //wrong
    whenHideSkipButton();
  }
}

function displayCrossword() {

  let alphabet;

  var requestOptions = {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
  };
  fetch('/dictionaryWordsAndDefinitions', requestOptions)
    .then(response => response.json())
    .then(data => {
      //check each element for matching word
      Object.keys(data).forEach(element => {
        if (_correctAnswer.toLowerCase() === data[element].word.toLowerCase())
          if (data[element].language === "jp") {
            // Japanese Jōyō Kanji letters 
            alphabet = '猿凹渦靴稼拐涯垣殻潟喝褐缶頑挟矯襟隅渓蛍嫌洪溝昆崎皿桟傘肢遮蛇酌汁塾尚宵縄壌唇甚据杉斉逝仙栓挿曹槽藻駄濯棚挑眺釣塚漬亭偵泥搭棟洞凸屯把覇漠肌鉢披扉猫頻瓶雰塀泡俸褒朴僕堀磨抹岬妄厄癒悠羅竜戻枠';
          } else alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
      })
    })
    .then(() => {

      timeLeft = 12;
      ANSWER_CONTAINER.classList.add('hide');
      SELECTIONS.classList.add('hide');
      document.querySelector('#crossword-container').classList.remove('hide');
      document.querySelector('#crossword-text').classList.remove('hide');
      var blocks = 100;
      const cb = document.querySelector('#crossword-container');
      var md = false;
      var num_words = 1;

   

      function addBlocks() {
        for (var i = 0; i < blocks; i++) {
          var b = document.createElement('div')
          b.className = 'block'
          cb.appendChild(b)
        }
      }

      function addWords() {
        var words = [_correctAnswer];
        // max word length of 10
        words.sort(() => Math.random() - 0.5);
        words = words.slice(0, num_words);

        var arr = [];
        while (arr.length < 3) {
          var r = Math.floor(Math.random() * 10);
          if (arr.indexOf(r) === -1) arr.push(r);
        }

        words.forEach(function (elm) {
          var word_length = elm.length;
          var offset = Math.floor(Math.random() * (11 - word_length));
          var w_start = offset + (arr[0] * 10);
          arr.shift();
          elm.split('').forEach(function (e) {
            var b = document.querySelectorAll('.block')[w_start];
            b.innerHTML = e;
            b.classList.add('letter');
            b.classList.add(elm);
            b.onmousedown = function () {
              this.classList.add('letter_pop');
              this.style.background = this.classList[2];
              const letters = document.querySelectorAll(".letter");
              let lettersRequired;
              let lettersDetected = [];
              letters.forEach((ltr) => {
                if (ltr.classList.contains("letter_pop")) {
                  lettersDetected.push(ltr.outerText);
                  
                  if (_correctAnswer.toLowerCase() === lettersDetected.join('').toLowerCase()) {
                    correctAnswer();
                    clearInterval(interval);
                  }
                }
              });
            }
            b.onmouseenter = function () {
              if (md) {
                this.classList.add('letter_pop');
                this.style.background = this.classList[2];
                const letters = document.querySelectorAll(".letter");
                let lettersRequired;
                let lettersDetected = [];
                letters.forEach((ltr) => {
                  if (ltr.classList.contains("letter_pop")) {
                    lettersDetected.push(ltr.outerText);
                 
                    if (_correctAnswer.toLowerCase() === lettersDetected.join('').toLowerCase()) {
                      correctAnswer();
                      clearInterval(interval);
                    }
                  }
                });
              }
            }

            if (elm.split('').indexOf(e) == 0
              && (b.previousSibling
                && !b.previousSibling.classList.contains(elm))
              || !b.previousSibling) {
              b.classList.add('first_letter')
            }
            if (elm.split('').indexOf(e) == elm.split('').length - 1) {
              b.classList.add('last_letter')
            }
            w_start++
          })
        })
      }

      function fillInEmpty() {
        var b = document.querySelectorAll('.block')
        b.forEach(function (elm) {
          if (elm.innerHTML == '') {
            var letter = alphabet.split('')[Math.floor(Math.random() * alphabet.length)]
            elm.innerHTML = letter
          }
        })
      }

      function mouse_down(event) {
        if (!md) {
          md = true
        } else {
          md = false
        }

        if (event.type == 'touchmove') {
          var block = document.elementFromPoint(event.touches[event.touches.length - 1].clientX, event.touches[event.touches.length - 1].clientY)
          if (block.classList.contains('letter')) {
            block.style.background = block.classList[2]
            block.classList.add('letter_pop');
            if (getMobileOperatingSystem() === 'Android') {
              navigator.vibrate(50); // vibrate 
            }
            const letters = document.querySelectorAll(".letter");
            let lettersRequired;
            let lettersDetected = [];
            letters.forEach((ltr) => {
              if (ltr.classList.contains("letter_pop")) {
                lettersDetected.push(ltr.outerText);
                if (_correctAnswer.toLowerCase() === lettersDetected.join('').toLowerCase()) {
                  correctAnswer();
                  clearInterval(interval);
                }
              }
            });
          }
          var elm = block.classList[2]
        }
      }

      cb.innerHTML = ''
      cb.className = ''
      addBlocks()

      setTimeout(() => {
      fillInEmpty();


      addWords()



      }, 5);

      cb.addEventListener('mousedown', mouse_down)
      cb.addEventListener('mouseup', mouse_down)
      cb.addEventListener('touchmove', mouse_down)
    })
    .catch(error => console.log(error));

}


function containsWhitespace(str) {
  return /\s/.test(str);
}

//hide skip when lives left = 1
function whenHideSkipButton () {
  if (livesLeft === 1) {
    SKIP_BUTTON.classList.add('hide');
  }
}

//check streak count and show random success message
function streakCheck () {
  const headingRandomizer = Math.floor(Math.random() * 6);
  if (streakCount === 3) {
    STREAK_TEXT.innerText = `${streak}X Correct Streak Bonus: ${streak * 30} Points!`
    STREAK_TEXT.classList.remove('hide');
    UPPER_CORRECT.classList.remove('margin_bottom7percent');
    FIRE_GIF.classList.remove('hide');
    //show random words for streak
    if (headingRandomizer === 0) {
      CORRECT_HEADING_TEXT.innerText = 'Awesome!';
    } else if (headingRandomizer === 1) {
      CORRECT_HEADING_TEXT.innerText = 'Impressive!';
    } else if (headingRandomizer === 2) {
      CORRECT_HEADING_TEXT.innerText = 'Wonderful!';
    } else if (headingRandomizer === 3) {
      CORRECT_HEADING_TEXT.innerText = 'Magnificent.';
    } else if (headingRandomizer === 4) {
      CORRECT_HEADING_TEXT.innerText = 'Amazing!';
    } else if (headingRandomizer === 5) {
      CORRECT_HEADING_TEXT.innerText = 'Incredible!';
    }
    score += streak * 30;
  } 
}

// Switch to profile 
function openProfile() {
  checkUserLogin()
    .then(() => {
      if (isLoggedIn === true) {
        askHighscoreSharePopup();
        displayAddToHomescreen();
        //automatically close nav menu
        NAV_CONTAINER.classList.toggle('nav-container-open');
        NAV.classList.toggle('nav-open');
        LINE_ONE.classList.toggle('line-cross');
        LINE_TWO.classList.toggle('line-fade-out');
        LINE_THREE.classList.toggle('line-cross');
        LINK.classList.toggle('fade-in');
        MENU_BUTTON.classList.toggle('menu-btn-open');
        // switch pages by loading assets
        CENTER_CONTAINER.classList.toggle('hide');
        START_BUTTON.classList.toggle('hide');
        SLIDER.classList.toggle('hide');
        OR_WATCH_TUTORIAL.classList.toggle('hide');
        MOBILE_CONTAINER.classList.toggle('change-background-for-profile');
        TOP_RIGHT_PROFILE.classList.toggle('hide');
        PROFILE_SPACE.classList.toggle('hide');
        STARS.classList.add('hide');
      } else {
        //redirect to login page
        location.href = '/login';
      }
    })
}


async function reFillButton () {
  updateStars()
    .then(() => {
      if (stars >= 40) {
        takeStars(40);
        reFillAnimation();
      } else if (stars < 40) {
        // not enough stars popup
        POPUPS.classList.remove('hide');
        NOT_ENOUGH_STARS.classList.remove('hide');
        NOT_ENOUGH_STARS_TEXT.innerText = `You need ${40} stars!`;
      }
    })
}


function reFillAnimation () {
  if (competenceClickable === true) {
    competenceClickable = false;
    REFILL_BUTTON.classList.add('hide');
    COMPETENCE_GIF.classList.remove('hide');
    //adjust sizes and select gif
    COMPETENCE_GIF.src = '/Images/fill-up-states/1.gif';
    COMPETENCE_GIF.style.width = '74.5%';
    COMPETENCE_GIF.style.height = '74.5%';
    COMPETENCE_GIF.style.marginLeft = '15%';
    COMPETENCE_GIF.style.marginTop = '10%';
    saveCompetence(1)
    updateStars()
    setTimeout(() => {
      COMPETENCE_PNG.src = '/Images/fill-up-states/1.png';
      COMPETENCE_PNG.classList.toggle('hide');
      COMPETENCE_PNG.style.width = '96.9%';
      COMPETENCE_GIF.classList.toggle('hide');
    }, 1360)
  }
}


COMPETENCE_PNG.addEventListener('click', () => {
  if (competenceClickable === true) {
    // make it clickable again after timeout
    competenceClickable = false;
    // check competence state first
    updateCompetence()
      .then(() => updateStars())
      .then(() => {
        if (stars >= 40) {
          //make sure that user cant click competence when its full
          if (competence !== 3) {
            //handle each case of the competence status
            if (competence === 1) {
              takeStars(40);
              //adjust sizes and select gif
              COMPETENCE_GIF.src = '/Images/fill-up-states/2.gif';
              COMPETENCE_GIF.style.width = '74.5%';
              COMPETENCE_GIF.style.height = '74.5%';
              COMPETENCE_GIF.style.marginLeft = '15%';
              COMPETENCE_GIF.style.marginTop = '10%';
              saveCompetence(2)
              updateStars();
              setTimeout(() => {
                COMPETENCE_PNG.src = '/Images/fill-up-states/2.png';
                COMPETENCE_PNG.classList.toggle('hide');
                COMPETENCE_PNG.style.width = '96.9%';
                COMPETENCE_GIF.classList.toggle('hide');
              }, 1360)
            } else if (competence === 2) {
              takeStars(40);
              //adjust sizes and select gif
              COMPETENCE_GIF.src = '/Images/fill-up-states/3.gif';
              COMPETENCE_GIF.style.width = '101%';
              COMPETENCE_GIF.style.height = '102%';
              COMPETENCE_GIF.style.marginLeft = '2.50%';
              COMPETENCE_GIF.style.marginTop = '-2.1%';
              saveCompetence(3)
              updateStars();
              setTimeout(() => {
                COMPETENCE_PNG.src = '/Images/fill-up-states/3.png';
                COMPETENCE_PNG.classList.toggle('hide');
                COMPETENCE_PNG.style.marginRight = '0.08%';
                COMPETENCE_GIF.classList.toggle('hide');
              }, 2790)
            }
            COMPETENCE_PNG.classList.toggle('hide');
            COMPETENCE_GIF.classList.toggle('hide');
          } else { COMPETENCE_PNG.style.cursor = 'not-allowed' };
        } else if (stars < 40) {
          // not enough stars popup
          POPUPS.classList.remove('hide');
          NOT_ENOUGH_STARS.classList.remove('hide');
          NOT_ENOUGH_STARS_TEXT.innerText = `You need ${40} stars!`;
        }
      });
  }
})


// give bonus chest randomly after correct answer
function bonusChest() {
  var firstClick;
  var bonusProbability = Math.floor(Math.random() * 16);
  refreshImage('bonus-chest-confetti', '/Images/confetti.gif');
  if (bonusProbability === 1 && score > 65 && livesLeft > 1) {
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(50); // vibrate for 50ms
    }
    bonusChestActive = true;
    //make selection button border green
    BONUS_CHEST_HEADER.classList.toggle('invisible');
    BONUS_CHEST_HEALTH.classList.toggle('invisible');
    BONUS_CHEST.classList.toggle('invisible');
    disableButton(SELECTION1);
    disableButton(SELECTION2);
    disableButton(SELECTION3);
    BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    setTimeout(() => {
      BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    }, 800);
  }
}

// crack open bonus chest
BONUS_CHEST.addEventListener('click',	 function () {
  //!! wrap this code in a if condition to if variable bonuschest variable is active

  // Randomize HP subtraction based on how many times chest was clicked
  let param = 10;
  chestClickCount += 1;
  if (chestClickCount >= 30) {
    param = 11;
  } else if (chestClickCount >= 60) {
    param = 13;
  } else if (chestClickCount >= 120) {
    param = 14;
  }

  hpSubtraction = getRandomInt(param, param + 10);
  chestHP -= hpSubtraction;
  // check for switch between 1500 and 1000 chest Health
  if (chestHPMode === 1000) {
  BONUS_CHEST_HEALTH.style.backgroundSize = `${chestHP / 10}%`;
  } else if (chestHPMode === 1500) {
  BONUS_CHEST_HEALTH.style.backgroundSize = `${chestHP / 15}%`;
  } else if (chestHPMode === 2000) {
    BONUS_CHEST_HEALTH.style.backgroundSize = `${chestHP / 20}%`;
    } else if (chestHPMode === 800) {
      BONUS_CHEST_HEALTH.style.backgroundSize = `${chestHP / 8}%`;
      } else if (chestHPMode === 650) {
        BONUS_CHEST_HEALTH.style.backgroundSize = `${chestHP / 6.5}%`;
        } else if (chestHPMode === 300) {
          BONUS_CHEST_HEALTH.style.backgroundSize = `${chestHP / 3}%`;
          } 
  BONUS_CHEST_HEALTH.classList.remove('BGrepeat');
  LEFT_HP.innerText = chestHP;
  if (chestHP > 700 && chestHP < 800) {
    refreshImage('bonus-chest-confetti', '/Images/confetti.gif');
    BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(30); // vibrate for 30 ms
    }
    setTimeout(() => {
      BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    }, 800);	
    BONUS_CHEST_CONFETTI.classList.toggle('invisible');
  } else if (chestHP > 350 && chestHP < 450) {
    refreshImage('bonus-chest-confetti', '/Images/confetti.gif');
    BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(55); // vibrate for 55 ms
    }
    setTimeout(() => {
      BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    }, 800);	
  } else if (chestHP > 100 && chestHP < 200) {
    refreshImage('bonus-chest-confetti', '/Images/confetti.gif');
    BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(80); // vibrate for 80 ms
    }
    setTimeout(() => {
      BONUS_CHEST_CONFETTI.classList.toggle('invisible');
    }, 800);	
  }
  // display minus hp animation
  if (isAlreadyHidden(MINUS_HP1, 'invisible') === false) {
    MINUS_HP1.classList.toggle('invisible');
    MINUS_HP1.innerText = `-${hpSubtraction}`;
    MINUS_HP1.style.left = `${xCursorPosition}px`;
    MINUS_HP1.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP2, 'invisible') === false) {
    MINUS_HP2.classList.toggle('invisible');
    MINUS_HP2.innerText = `-${hpSubtraction}`;
    MINUS_HP2.style.left = `${xCursorPosition}px`;
    MINUS_HP2.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP3, 'invisible') === false) {
    MINUS_HP3.classList.toggle('invisible');
    MINUS_HP3.innerText = `-${hpSubtraction}`;
    MINUS_HP3.style.left = `${xCursorPosition}px`;
    MINUS_HP3.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP4, 'invisible') === false) {
    MINUS_HP4.classList.toggle('invisible');
    MINUS_HP4.innerText = `-${hpSubtraction}`;
    MINUS_HP4.style.left = `${xCursorPosition}px`;
    MINUS_HP4.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP5, 'invisible') === false) {
    MINUS_HP5.classList.toggle('invisible');
    MINUS_HP5.innerText = `-${hpSubtraction}`;
    MINUS_HP5.style.left = `${xCursorPosition}px`;
    MINUS_HP5.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP6, 'invisible') === false) {
    MINUS_HP6.classList.toggle('invisible');
    MINUS_HP6.innerText = `-${hpSubtraction}`;
    MINUS_HP6.style.left = `${xCursorPosition}px`;
    MINUS_HP6.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP7, 'invisible') === false) {
    MINUS_HP7.classList.toggle('invisible');
    MINUS_HP7.innerText = `-${hpSubtraction}`;
    MINUS_HP7.style.left = `${xCursorPosition}px`;
    MINUS_HP7.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP8, 'invisible') === false) {
    MINUS_HP8.classList.toggle('invisible');
    MINUS_HP8.innerText = `-${hpSubtraction}`;
    MINUS_HP8.style.left = `${xCursorPosition}px`;
    MINUS_HP8.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP9, 'invisible') === false) {
    MINUS_HP9.classList.toggle('invisible');
    MINUS_HP9.innerText = `-${hpSubtraction}`;
    MINUS_HP9.style.left = `${xCursorPosition}px`;
    MINUS_HP9.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP10, 'invisible') === false) {
    MINUS_HP10.classList.toggle('invisible');
    MINUS_HP10.innerText = `-${hpSubtraction}`;
    MINUS_HP10.style.left = `${xCursorPosition}px`;
    MINUS_HP10.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP11, 'invisible') === false) {
    MINUS_HP11.classList.toggle('invisible');
    MINUS_HP11.innerText = `-${hpSubtraction}`;
    MINUS_HP11.style.left = `${xCursorPosition}px`;
    MINUS_HP11.style.top = `${yCursorPosition}px`;
  } else if (isAlreadyHidden(MINUS_HP12, 'invisible') === false) {
    MINUS_HP12.classList.toggle('invisible');
    MINUS_HP12.innerText = `-${hpSubtraction}`;
    MINUS_HP12.style.left = `${xCursorPosition}px`;
    MINUS_HP12.style.top = `${yCursorPosition}px`;
  } else {
    MINUS_HP1.classList.toggle('invisible');
    MINUS_HP1.innerText = `-${hpSubtraction}`;
    MINUS_HP1.style.left = `${xCursorPosition}px`;
    MINUS_HP1.style.top = `${yCursorPosition}px`;
  }
  setTimeout(() => {
    MINUS_HP1.classList.add('invisible');
    MINUS_HP2.classList.add('invisible');
    MINUS_HP3.classList.add('invisible');
    MINUS_HP4.classList.add('invisible');
    MINUS_HP5.classList.add('invisible');
    MINUS_HP6.classList.add('invisible');
    MINUS_HP7.classList.add('invisible');
    MINUS_HP8.classList.add('invisible');
    MINUS_HP9.classList.add('invisible');
    MINUS_HP10.classList.add('invisible');
    MINUS_HP11.classList.add('invisible');
    MINUS_HP12.classList.add('invisible');
  }, 485);
  // stop condition
  if (chestHP <= 0) {
    chestOpened();
    if (getMobileOperatingSystem() === 'Android') {
      navigator.vibrate(700); // vibrate for 700ms
    }
  }
});

//display popup for achieved bonus chest (also used for profile chest)
function chestOpened () {
  if (bonusChestActive === true || profileChestActive === true) {
    //wait before user can click competence to fill up
    if (profileChestActive === true) {
      var starAnimCheckInterval;
      resetCompetenceCompletion();
      COMPETENCE_PNG.style.pointerEvents = 'none';
      COMPETENCE_PNG.style.cursor = 'not-allowed';
      REFILL_BUTTON.style.pointerEvents = 'none';
      REFILL_BUTTON.style.cursor = 'not-allowed';
      starAnimCheckInterval = setInterval(function () {
        if (starAnimIntervalRunning === false) {
          clearInterval(starAnimCheckInterval)
          COMPETENCE_PNG.style.pointerEvents = null;
          COMPETENCE_PNG.style.cursor = null;
          REFILL_BUTTON.style.pointerEvents = null;
          REFILL_BUTTON.style.cursor = null;
        }
      }, 500)
    }

    //hide HP animation
    MINUS_HP1.classList.add('invisible');
    MINUS_HP2.classList.add('invisible');
    MINUS_HP3.classList.add('invisible');
    MINUS_HP4.classList.add('invisible');
    MINUS_HP5.classList.add('invisible');
    MINUS_HP6.classList.add('invisible');
    MINUS_HP7.classList.add('invisible');
    MINUS_HP8.classList.add('invisible');
    MINUS_HP9.classList.add('invisible');
    MINUS_HP10.classList.add('invisible');
    MINUS_HP11.classList.add('invisible');
    MINUS_HP12.classList.add('invisible');
    chestClickCount = 0;
    var starReward = getRandomInt(40, 200);
    refreshImage('confetti-gif', '/Images/confetti.gif');
    clearInterval(interval);
    streakCheck();
    POPUPS.classList.remove('hide');
    BONUS_CHEST_OPENED.classList.remove('hide');
    BONUS_CHEST_OPENED_TEXT.innerText = `You received ${starReward} Stars!`;
    CONFETTI.classList.remove('hide');
    STARS.classList.remove('hide');
    SPARKLE.classList.remove('hide');
    SPARKLE_GIF.style.marginBottom = '30%';
    if (isLoggedIn) {
      giveStarReward(starReward)
        .then(() => updateStars());
    };

    //Hide bonus chest
    PROFILE_CHEST.classList.add('hide');
    BONUS_CHEST.classList.add('invisible');
    BONUS_CHEST_HEADER.classList.add('invisible');
    BONUS_CHEST_HEALTH.classList.add('invisible');
    BONUS_CHEST_CONFETTI.classList.add('invisible');

    //remove chestActive status
    profileChestActive = false;
  }
}

// unlock language pack, PATCH data to app_data
function languagePackOpened(price) {
  if (POPUPS.classList.contains('hide') === true && LANGUAGE_PACK_OPEN.classList.contains('hide') === true) {
    starAnimLimit = true;
    takeStars(price)
      .then(() => {
        var last = languagePacks[languagePacks.length - 1];
        var updatedLanguagePack = languagePacks;
        updatedLanguagePack.push(last + 1);

        if (getMobileOperatingSystem() === 'Android') {
          navigator.vibrate(700); // vibrate for 700ms
        }
        // show opening popup
        POPUPS.classList.remove('hide');
        LANGUAGE_PACK_OPEN.classList.remove('hide');
        CONFETTI.style.zIndex = '3';
        CONFETTI.style.marginTop = '-30%';
        CONFETTI.classList.remove('hide');
        SPARKLE.classList.remove('hide');
        SPARKLE.style.marginTop = '-30%';
        SPARKLE.style.zIndex = '5';
        //update app_data
        var newLanguagePacks = {
          "languagePacks": updatedLanguagePack
        };

        var requestOptions = {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLanguagePacks)
        };

        fetch("/user", requestOptions)
          .then(handleLanguagePack())
          .then(addActiveLanguagePack(last + 1))
          .catch(error => console.log('error', error));
      });
  } else {
    checkUserMetadata()
    //GET languagePack that user has unlocked and apply for game
      .then(() => {
        handleLanguagePack();
      });
    // hide opening popup
    POPUPS.classList.add('hide');
    LANGUAGE_PACK_OPEN.classList.add('hide');
    CONFETTI.style.zIndex = null;
    CONFETTI.style.marginTop = null;
    CONFETTI.classList.add('hide');
    SPARKLE.classList.add('hide');
    SPARKLE.style.marginTop = null;
    SPARKLE.style.zIndex = null;
    starAnimLimit = false;
  }
}

// langage packs event listeners/handlers 
PACK_TWO.addEventListener('click', () => {
  checkUserMetadata()
    .then(() => updateStars())
    //GET languagePack that user has unlocked and apply for game
    .then(() => {
  
      //check if user has unlocked already
      if (languagePacks.some(element => element === 2) === true) {
        removeActiveLanguagePack(2);
        addActiveLanguagePack(2);
        setTimeout(() => {
          checkUserMetadata()
            .then(() => handleLanguagePack())
        }, 3000)
      } else {
        //check star balance first
        if (stars >= 1000) {
          languagePackOpened(1000);
        } else if (stars < 1000) {
          // not enough stars popup
          POPUPS.classList.remove('hide');
          NOT_ENOUGH_STARS.classList.remove('hide');
          NOT_ENOUGH_STARS_TEXT.innerText = `You need ${1000} stars!`;
        }
      }
    })
    .catch(error => console.log('error', error));
})

// langage packs event listeners/handlers 
PACK_THREE.addEventListener('click', () => {
  checkUserMetadata()
    .then(() => updateStars())
    //GET languagePack that user has unlocked and apply for game
    .then(() => {
      //check if user has unlocked already
      if (languagePacks.some(element => element === 3) === true) {
        removeActiveLanguagePack(3);
        addActiveLanguagePack(3);
        setTimeout(() => {
          checkUserMetadata()
            .then(() => handleLanguagePack())
        }, 3000)
      } else {
        //check star balance first
        if (stars >= 2000) {
          languagePackOpened(2000);
        } else if (stars < 2000) {
          // not enough stars popup
          POPUPS.classList.remove('hide');
          NOT_ENOUGH_STARS.classList.remove('hide');
          NOT_ENOUGH_STARS_TEXT.innerText = `You need ${2000} stars!`;
        }
      }
    })
    .catch(error => console.log('error', error));
})


// PREMIUM LPs don't need unlocking.....

// PREMIUM langage packs event listeners/handlers 
PACK_FOUR.addEventListener('click', () => {
  checkUserMetadata()
    //GET languagePack that user has unlocked and apply for game
    .then(() => {
      removeActiveLanguagePack(4);
      addActiveLanguagePack(4);
        setTimeout(() => {
          checkUserMetadata()
            .then(() => handleLanguagePack())
        }, 3000)
    })
    .catch(error => console.log('error', error));
})

// premium langage packs event listeners/handlers 
PACK_FIVE.addEventListener('click', () => {
  checkUserMetadata()
    //GET languagePack that user has unlocked and apply for game
    .then(() => {
      removeActiveLanguagePack(5);
      addActiveLanguagePack(5);
        setTimeout(() => {
          checkUserMetadata()
            .then(() => handleLanguagePack())
        }, 3000)
    })
    .catch(error => console.log('error', error));
})

// premium langage packs event listeners/handlers 
PACK_SIX.addEventListener('click', () => {
  checkUserMetadata()
    //GET languagePack that user has unlocked and apply for game
    .then(() => {
      removeActiveLanguagePack(6);
      addActiveLanguagePack(6);
        setTimeout(() => {
          checkUserMetadata()
            .then(() => handleLanguagePack())
        }, 3000)
    })
    .catch(error => console.log('error', error));
})

// premium langage packs event listeners/handlers 
PACK_SEVEN.addEventListener('click', () => {
  checkUserMetadata()
    //GET languagePack that user has unlocked and apply for game
    .then(() => {
      removeActiveLanguagePack(7);
      addActiveLanguagePack(7);
        setTimeout(() => {
          checkUserMetadata()
            .then(() => handleLanguagePack())
        }, 3000)
    })
    .catch(error => console.log('error', error));
})

// premium langage packs event listeners/handlers 
PACK_EIGHT.addEventListener('click', () => {
  checkUserMetadata()
    //GET languagePack that user has unlocked and apply for game
    .then(() => {
      removeActiveLanguagePack(8);
      addActiveLanguagePack(8);
        setTimeout(() => {
          checkUserMetadata()
            .then(() => handleLanguagePack())
        }, 3000)
    })
    .catch(error => console.log('error', error));
})




//asking user to share highscore on twitter (western market only)
function askHighscoreSharePopup() {
  checkUserMetadata()
    .then(() => {
      const question = 'Share a Screenshot of your highscore on twitter and get rewarded!';
      if (highscoreShared === false && highscore >= 300) {
        //set onclicks
        SALES_FORM_LEFT_BUTTON.onclick = function () {
          setTimeout(() => {
            giveStarReward(120);
          }, 200);
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }
        SALES_FORM_RIGHT_BUTTON.onclick = function () {
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }

        //make question display if it have not all been shown already.
        SALES_FORM_QUESTION.innerText = question;
        POPUPS.classList.remove('hide');
        SALES_FORM.classList.remove('hide');
        addHighscoreShared();
      }
    })
}


//display sales questions in random order if not answered before
function displaySingleForm() {

  const question0 = 'Do you wish to come across as more professional?';
  const question1 = 'If you practice every day, you can become and stay a fantastic speaker. Do you agree?';
  const question2 = "Do you want to expand your vocabulary and be more charismatic in your professional, social, and romantic relationships?";

  let questionRandomizer = Math.floor(Math.random() * 3);


  if (questionsAnswered !== undefined) {


    // mix randomizer again to avoid repeating same question
    if (questionsAnswered["question0"] === true && questionsAnswered["question1"] === undefined && questionRandomizer === 0) {
      questionRandomizer = 1;
    } else if (questionsAnswered["question1"] === true && questionsAnswered["question2"] === undefined && questionRandomizer === 1) {
      questionRandomizer = 2;
    } else if (questionsAnswered["question2"] === true && questionRandomizer === 2) {
      questionRandomizer = Math.floor(Math.random() * 3);
    }

    //display popup
    if (questionsAnswered["question0"] === undefined || questionsAnswered["question1"] === undefined || questionsAnswered["question2"] === undefined) {
      if (window.matchMedia('(display-mode: standalone)').matches === true) {
        //set onclicks
        SALES_FORM_LEFT_BUTTON.onclick = function () {
          if (questionRandomizer === 2) {
            SALES_FORM.classList.add('hide');
            FEATURE_VIEW.classList.remove('hide');
            FEATURE_VIEW_PRICE.classList.remove('hide');
            FEATURE_VIEW_BUTTON.classList.remove('hide');
            FEATURE_VIEW_BUTTON.onclick = () => {
              openCheckout(807567);
            }
            FEATURE_VIEW_CANCEL_ANYIME.classList.remove('hide');
          } else {
            POPUPS.classList.add('hide');
            SALES_FORM.classList.add('hide');
          }
        }
        SALES_FORM_RIGHT_BUTTON.onclick = function () {
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }



        //make questions display randomly and if they have not all been shown already.
        if (questionRandomizer === 0) {
          if (questionsAnswered["question0"] === undefined) {
            SALES_FORM_QUESTION.innerText = question0;
            POPUPS.classList.remove('hide');
            SALES_FORM.classList.remove('hide');
            patchQuestion("question0");
          }
        } else if (questionRandomizer === 1) {
          if (questionsAnswered["question1"] === undefined) {
            SALES_FORM_QUESTION.innerText = question1;
            UPPER_SALES_FORM.style.width = '75%';
            POPUPS.classList.remove('hide');
            SALES_FORM.classList.remove('hide');
            patchQuestion("question1");
          }
        } else if (questionRandomizer === 2) {
          if (questionsAnswered["question2"] === undefined) {
            SALES_FORM_QUESTION.innerText = question2;
            UPPER_SALES_FORM.style.width = '90%';
            SALES_FORM_QUESTION.style.margin = '5%';
            POPUPS.classList.remove('hide');
            SALES_FORM.classList.remove('hide');
            patchQuestion("question2");
          }
        }
      }
    }

  } else {

    if (window.matchMedia('(display-mode: standalone)').matches === true) {
      //set onclicks
      SALES_FORM_LEFT_BUTTON.onclick = function () {
        if (questionRandomizer === 2) {
          SALES_FORM.classList.add('hide');
          FEATURE_VIEW.classList.remove('hide');
          FEATURE_VIEW_PRICE.classList.remove('hide');
          FEATURE_VIEW_BUTTON.classList.remove('hide');
          FEATURE_VIEW_BUTTON.onclick = () => {
            openCheckout(807567);
          }
          FEATURE_VIEW_CANCEL_ANYIME.classList.remove('hide');
        } else {
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }
      }
      SALES_FORM_RIGHT_BUTTON.onclick = function () {
        POPUPS.classList.add('hide');
        SALES_FORM.classList.add('hide');
      }

      SALES_FORM_QUESTION.innerText = question0;
      POPUPS.classList.remove('hide');
      SALES_FORM.classList.remove('hide');

      // Patch Metadata
      var payload = {
        "questionsAnswered": { "question0": true }
      };
      var requestOptions = {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      };

      fetch("/user", requestOptions)
        .catch(error => console.log('error', error));

    }
  }

}

function patchQuestion(questionNum) {

  if (questionsAnswered[questionNum] === undefined) {
    var updatedquestionsAnswered = questionsAnswered;

    updatedquestionsAnswered[questionNum] = true;

    // Patch Metadata
    var payload = {
      "questionsAnswered": updatedquestionsAnswered
    };
    var requestOptions = {
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    };

    fetch("/user", requestOptions)
      .catch(error => console.log('error', error));
  }
}

// questions warming user up for sale
function salesFormSequence() {
  if (questionsAnswered !== undefined) {
    let displayProbability = Math.floor(Math.random() * 5);
    if (displayProbability === 1 && questionsAnswered["feedbackAsked"] === true && questionsAnswered["question0"] === true && questionsAnswered["question1"] === true && questionsAnswered["question2"] === true && isAlreadyHidden(SALES_FORM, 'hide') === true && isAlreadyHidden(FEEDBACK, 'hide') === true && totalTimesPlayed > 7) {
      POPUPS.classList.remove('hide');
      SALES_FORM.classList.remove('hide');
      view1();
      function view1() {
        SALES_FORM_PARAGRAPH.classList.remove('hide');
        UPPER_SALES_FORM.classList.add('hide');

        SALES_FORM_PARAGRAPH.innerText = "Do you wish to be more confident, charismatic, and successful?";
        //change view to next view
        SALES_FORM_RIGHT_BUTTON.onclick = () => {
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }
        SALES_FORM_LEFT_BUTTON.onclick = () => {
          view2();
        }
      }
      function view2() {
        UPPER_SALES_FORM.classList.remove('hide');
        SALES_FORM_PARAGRAPH.classList.remove('hide');
        SALES_FORM_PARAGRAPH.innerText = "You're out of luck. Millions of other people share your desire. Whether that be the fast car, the beautiful home, the wonderful relationship, the lucrative career. However, there are some people who are simply better than you at communicating their competence. They stand out despite having the same credentials as you. They triumph, and YOU fail miserably.";
        SALES_FORM_TWO_BUTTON.classList.add('hide');
        SALES_FORM_QUESTION.innerText = 'INSERT HERE';
        SALES_FORM_RIGHT_BUTTON.classList.add('hide');
        SALES_FORM_LEFT_BUTTON.innerText = 'Continue';
        SALES_FORM_LEFT_BUTTON.onclick = () => {
          STARS.style.zIndex = '10';
          STARS.style.opacity = '.5';
          STARS.classList.remove('hide');
          setTimeout(() => {
            STARS.classList.add('hide');
          }, 1000);
          view3();
        }
      }
      function view3() {
        SALES_FORM_RIGHT_BUTTON.classList.remove('hide');
        SALES_FORM_LEFT_BUTTON.innerText = 'Yes';
        SALES_FORM_PARAGRAPH.innerText = "INSERT HERE";
        SALES_FORM_TWO_BUTTON.classList.add('hide');
        SALES_FORM_QUESTION.innerText = "Do you want to know the secret to skyrocketing your verbal competence and social influence?";
        SALES_FORM_RIGHT_BUTTON.onclick = () => {
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }
        SALES_FORM_LEFT_BUTTON.onclick = () => {
          view4();
        }
      }
      function view4() {
        SALES_FORM_PARAGRAPH.innerText = 'The kind of company you keep has an impact on your wellbeing.';
        SALES_FORM_TWO_BUTTON.classList.add('hide');
        SALES_FORM_QUESTION.innerText = 'Do you agree with what was just said?';
        SALES_FORM_RIGHT_BUTTON.onclick = () => {
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }
        SALES_FORM_LEFT_BUTTON.onclick = () => {
          view5();
        }
      }
      function view5() {
        SALES_FORM_PARAGRAPH.innerText = "INSERT HERE";
        SALES_FORM_TWO_BUTTON.classList.add('hide');
        SALES_FORM_QUESTION.innerText = 'Are you ready to put in the necessary effort to improve your life?';
        SALES_FORM_RIGHT_BUTTON.onclick = () => {
          POPUPS.classList.add('hide');
          SALES_FORM.classList.add('hide');
        }
        SALES_FORM_LEFT_BUTTON.onclick = () => {
          finalView();
        }
      }
      function finalView() {
        FEATURE_VIEW.classList.remove('hide');
        FEATURE_VIEW_BUTTON.classList.remove('hide');
        FEATURE_VIEW_BUTTON.innerText = 'Continue';
        document.querySelector('#top-feature-view h3').style.marginRight = '52%';
        document.querySelector('#top-feature-view img').classList.add('hide');
        FEATURE_VIEW_BUTTON.onclick = () => {
          FEATURE_VIEW.classList.add('hide');
          SALES_FORM.classList.add('hide');
          SALES_PAGE.classList.remove('hide');
          startSalesPageTimer();
        }
      }
    }
  }
}

function startSalesPageTimer () {
  TOP_RIGHT_PROFILE.style.zIndex = 6;
  var seconds = 59;
  var minutes = 02;
  var Interval;
  Interval = setInterval(startTimer, 1000);
  function startTimer() {
    seconds--;
    SALES_PAGE_SECONDS.innerHTML = seconds;
    SALES_PAGE_MINUTES.innerHTML = minutes;
    if (minutes >= 01) {
      SALES_PAGE_MINUTES.innerHTML = "0" + minutes;
    }

    if (seconds <= 9) {
      SALES_PAGE_SECONDS.innerHTML = "0" + seconds;
    }

    if (seconds === 0) {
      minutes--;
      SALES_PAGE_MINUTES.innerHTML = "0" + minutes;
      seconds = 59;
      SALES_PAGE_SECONDS.innerHTML = "0" + 0;
    }
    if (minutes < 9) {
      SALES_PAGE_MINUTES.innerHTML = minutes;
    }
    if (minutes === 00 && seconds === 01) {
      clearInterval(Interval);
      window.location.reload();
    }
  }
}
//toggle size of plan on screen
SIX_MONTH_PLAN.addEventListener('click', () => {
  //enlargen six month plan
  SIX_MONTH_CHECKMARK_ICON.classList.remove('hide');
  BUY_SUBSCRIPTION_BUTTON.innerText = 'Buy Now';
  BUY_SUBSCRIPTION_BUTTON.onclick = () => {
    openCheckout(807568)
  }
  SIX_MONTH_PLAN.style.transform = 'scale(1.089) translateY(-21px)';
  SIX_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
  SIX_MONTH_PLAN.style.border = 'solid #dbcab7 4px';
  SIX_MONTH_PLAN.style.opacity = '100%';
  TWELVE_MONTH_CHECKMARK_ICON.classList.add('hide');
  ONE_MONTH_CHECKMARK_ICON.classList.add('hide');

  if (TWELVE_MONTH_PLAN.style.transform !== true) {
    SALES_PAGE_MIDDLE_SPACE.style.background = 'radial-gradient(circle, rgb(83 83 83) 0%, rgb(0 0 0 / 15%) 0%, rgba(235,232,230,.0) 0%)';
    TWELVE_MONTH_PLAN.style.transform = 'scale(0.85) translateY(40px)';
    TWELVE_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
    TWELVE_MONTH_PLAN.style.opacity = '70%';
  }
  if (ONE_MONTH_PLAN.style.transform !== false) {
    ONE_MONTH_PLAN.style.transform = 'scale(1) translateY(0px)';
    ONE_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
    ONE_MONTH_PLAN.style.opacity = '70%';
  }
})

//toggle size of plan on screen
ONE_MONTH_PLAN.addEventListener('click', () => {
  //enlargen one month plan
  ONE_MONTH_CHECKMARK_ICON.classList.remove('hide');
  BUY_SUBSCRIPTION_BUTTON.innerText = 'Buy Now';
  BUY_SUBSCRIPTION_BUTTON.onclick = () => {
    openCheckout(807567)
  }
  ONE_MONTH_PLAN.style.transform = 'scale(1.089) translateY(-21px)';
  ONE_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
  ONE_MONTH_PLAN.style.border = 'solid #dbcab7 4px';
  ONE_MONTH_PLAN.style.opacity = '100%';
  TWELVE_MONTH_CHECKMARK_ICON.classList.add('hide');
  SIX_MONTH_CHECKMARK_ICON.classList.add('hide');

  if (TWELVE_MONTH_PLAN.style.transform !== true) {
    SALES_PAGE_MIDDLE_SPACE.style.background = 'radial-gradient(circle, rgb(83 83 83) 0%, rgb(0 0 0 / 15%) 0%, rgba(235,232,230,.0) 0%)';
    TWELVE_MONTH_PLAN.style.transform = 'scale(0.85) translateY(40px)';
    TWELVE_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
    TWELVE_MONTH_PLAN.style.opacity = '70%';
  }
  if (SIX_MONTH_PLAN.style.transform !== false) {
    SIX_MONTH_PLAN.style.transform = 'scale(1) translateY(0px)';
    SIX_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
    SIX_MONTH_PLAN.style.opacity = '70%';
  }
})

//toggle size of plan on screen
TWELVE_MONTH_PLAN.addEventListener('click', () => {
  //enlargen twelve month plan
  TWELVE_MONTH_CHECKMARK_ICON.classList.remove('hide');
  if (window.matchMedia('(display-mode: standalone)').matches === false) {
    TWELVE_MONTH_CHECKMARK_ICON.classList.add('hide');
  }
  TWELVE_MONTH_CHECKMARK_ICON.style.width = '3.1vh';
  TWELVE_MONTH_CHECKMARK_ICON.style.marginBottom = '26vh';
  TWELVE_MONTH_CHECKMARK_ICON.style.marginLeft = '78%';
  SALES_PAGE_MIDDLE_SPACE.style.background = 'radial-gradient(circle, rgb(83 83 83) 1%, rgb(0 0 0 / 15%) 64%, rgba(235,232,230,.0) 100%)';
  BUY_SUBSCRIPTION_BUTTON.innerText = 'Get 55% OFF now';
  BUY_SUBSCRIPTION_BUTTON.onclick = () => {
    openCheckout(807565)
  }
  TWELVE_MONTH_PLAN.style.transform = 'scale(1) translateY(0px)';
  TWELVE_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
  TWELVE_MONTH_PLAN.style.opacity = '100%';
  SIX_MONTH_CHECKMARK_ICON.classList.add('hide');
  ONE_MONTH_CHECKMARK_ICON.classList.add('hide');

  
  if (ONE_MONTH_PLAN.style.transform !== false) {
    ONE_MONTH_PLAN.style.transform = 'scale(1) translateY(0px)';
    ONE_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
    ONE_MONTH_PLAN.style.opacity = '70%';
  }
  if (SIX_MONTH_PLAN.style.transform !== false) {
    SIX_MONTH_PLAN.style.transform = 'scale(1) translateY(0px)';
    SIX_MONTH_PLAN.style.transition = 'all 800ms cubic-bezier(.8, 0, .33, 1)';
    SIX_MONTH_PLAN.style.opacity = '70%';
  }
})


function tutorialSequence () {
  POPUPS.classList.remove('hide');
  TUTORIAL.classList.remove('hide');
  view1();
  function view1 () {
    LEFT_ARROW.classList.add('hide');
    RIGHT_ARROW.classList.remove('hide');
    if (getMobileOperatingSystem() === 'iOS' && window.matchMedia("(max-width: 375px) and (max-height: 667px)").matches) {
      RIGHT_ARROW.style.marginLeft = '40%';
    }
    TUTORIAL_BUTTON.classList.add('hide');
    TUTORIAL_IMAGE.src = '/Images/view1.jpg';
    TUTORIAL_IMAGE.style.width = '90%';
    TUTORIAL_IMAGE.style.maxHeight = '30vh';
    TUTORIAL_PARAGRAPH.innerText = 'Guess the correct word before the time runs out, to gain points and not lose any lives.';
    //change view to next view
    RIGHT_ARROW.onclick = () => {
      view2();
    }
  }
  function view2 () {
    RIGHT_ARROW.classList.remove('hide');
    LEFT_ARROW.classList.remove('hide');
    if (getMobileOperatingSystem() === 'iOS') {
      LEFT_ARROW.classList.add('hide');
    }
    TUTORIAL_BUTTON.classList.add('hide');
    TUTORIAL_IMAGE.src = '/Images/view2.jpg';
    TUTORIAL_IMAGE.style.width = '100%';
    if (getMobileOperatingSystem() === 'iOS' && window.matchMedia("(max-width: 375px) and (max-height: 667px)").matches) {
      TUTORIAL_IMAGE.style.maxHeight = '6vh';
    }
    TUTORIAL_PARAGRAPH.innerText = 'Get a streak and bonus points by answering correctly multiple times.';

    //change view to next view
    RIGHT_ARROW.onclick = () => {
      view3();
    }
    //change view to next view
    LEFT_ARROW.onclick = () => {
      view1();
    }
  }
  function view3 () {
    RIGHT_ARROW.classList.remove('hide');
    TUTORIAL_BUTTON.classList.add('hide');
    TUTORIAL_IMAGE.src = '/Images/view3.jpg';
    TUTORIAL_IMAGE.style.width = '60%';
    if (getMobileOperatingSystem() === 'iOS' && window.matchMedia("(max-width: 375px) and (max-height: 667px)").matches) {
      TUTORIAL_IMAGE.style.maxHeight = '15vh';
    }
    TUTORIAL_PARAGRAPH.innerText = "Receive chests if you're lucky! Click them quickly, to open them before the time runs out.";

    //change view to next view
    RIGHT_ARROW.onclick = () => {
      view4();
    }
    //change view to next view
    LEFT_ARROW.onclick = () => {
      view2();
    }
  }
  function view4 () {
    RIGHT_ARROW.classList.remove('hide');
    TUTORIAL_BUTTON.classList.add('hide');
    TUTORIAL_IMAGE.src = '/Images/view4.jpg';
    TUTORIAL_IMAGE.style.width = '80%';
    if (getMobileOperatingSystem() === 'iOS' && window.matchMedia("(max-width: 375px) and (max-height: 667px)").matches) {
      TUTORIAL_IMAGE.style.maxHeight = '20vh';
    }
    TUTORIAL_PARAGRAPH.innerText = 'Level up and reach new highscores! Get rewarded with stars which you can use to revive yourself.';

    //change view to next view
    RIGHT_ARROW.onclick = () => {
      view5();
    }
    //change view to next view
    LEFT_ARROW.onclick = () => {
      view3();
    }
  }
  function view5 () {
    RIGHT_ARROW.classList.remove('hide');
    TUTORIAL_BUTTON.classList.add('hide');
    TUTORIAL_IMAGE.src = '/Images/view5.jpg';
    TUTORIAL_IMAGE.style.width = '60%';
    if (getMobileOperatingSystem() === 'iOS' && window.matchMedia("(max-width: 375px) and (max-height: 667px)").matches) {
      TUTORIAL_IMAGE.style.maxHeight = '17vh';
    }
    TUTORIAL_PARAGRAPH.innerText = 'Open the dashboard via the Menu and fill up your competence everyday using stars, in order to maintain your level.';

    //change view to next view
    RIGHT_ARROW.onclick = () => {
      view6();
    }
    //change view to next view
    LEFT_ARROW.onclick = () => {
      view4();
    }
  }
  function view6 () {
    RIGHT_ARROW.classList.add('hide');
    TUTORIAL_BUTTON.classList.remove('hide');
    TUTORIAL_IMAGE.src = '/Images/Knight_Pack/Locked/Knight.jpg';
    TUTORIAL_IMAGE.style.width = '120%';
    if (getMobileOperatingSystem() === 'iOS' && window.matchMedia("(max-width: 375px) and (max-height: 667px)").matches) {
      TUTORIAL_IMAGE.style.maxHeight = '8vh';
    }
    TUTORIAL_PARAGRAPH.innerText = 'Unlock rare new language packs using stars, and learn more remarkable words.';

    //change view to next view
    LEFT_ARROW.onclick = () => {
      view5();
    }
  }
}

addEventListener('offline', (event) => { });
onoffline = (event) => {
  POPUPS.classList.remove('hide');
  CONNECTION_LOST.classList.remove('hide');
};

addEventListener('online', (event) => { });
ononline = (event) => {
  POPUPS.classList.add('hide');
  CONNECTION_LOST.classList.add('hide');
};


function displayFeedback() {
  if (questionsAnswered !== undefined) {
    if (questionsAnswered["feedbackAsked"] === undefined && questionsAnswered["question0"] === true && questionsAnswered["question1"] === true && questionsAnswered["question2"] === true && isAlreadyHidden(SALES_FORM, 'hide') === true && totalTimesPlayed > 10) {
      POPUPS.classList.remove('hide');
      FEEDBACK.classList.remove('hide');
      patchQuestion('feedbackAsked')
    }
  }
}

function displayAddToHomescreen() {
  if (window.matchMedia('(display-mode: standalone)').matches === false) {
    if (getMobileOperatingSystem() === 'iOS') {
      POPUPS.classList.remove('hide');
      ADD_TO_HOMESCREEN.classList.remove('hide');
      ADD_TO_HOMESCREEN_ICON.src = '/Icons/shareiOS.svg';
    } else if (getMobileOperatingSystem() === 'Android') {
      POPUPS.classList.remove('hide');
      ADD_TO_HOMESCREEN.classList.remove('hide');
      ADD_TO_HOMESCREEN_ICON.src = '/Icons/dots.svg';
    } else if (getMobileOperatingSystem() === 'Windows Phone') {
      POPUPS.classList.remove('hide');
      ADD_TO_HOMESCREEN.classList.remove('hide');
      ADD_TO_HOMESCREEN_ICON.src = '/Icons/dots.svg';
    }
  }
}

// display popup requiring user to enable notifications
function displayAllowNotificationPermission() {
  if (checkUserPermission() === 'denied') {
    // display popup
      POPUPS.classList.remove('hide');
      ALLOW_NOTIFICATIONS.classList.remove('hide');
      if (getMobileOperatingSystem() === "unknown" && window.matchMedia("(min-width: 482px)").matches) {
        document.getElementById('middle-allow-notifications-text').innerText = 'Open Chrome Settings → Privacy and security → Site settings → Notifications.'
      }
  }
}

//speech synthesis 
function speakWord(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  //british = utterance.lang = 'en-gb';
  //japanese = utterance.lang = 'ja';
  utterance.lang = utteranceLang;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
}

function setUtterance () {
  // get the definition of the word and push it together
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  fetch('/dictionaryWordsAndDefinitions', requestOptions)
    .then(response => response.json())
    .then(data =>  { 
      //check each element for matching word
      Object.keys(data).forEach(element => {
        if (_correctAnswer.toLowerCase() === data[element].word.toLowerCase()) {
          if (data[element].language === "en") {
            utteranceLang = "en-gb";
          }
          if (data[element].language === "es") {
            utteranceLang = "es";
          }
          if (data[element].language === "jp") {
            utteranceLang = "ja";
          }
        }
      })
    })
    .catch(error => console.log(error));
}

function showDefinition () {
  // get the definition of the word and push it together
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  fetch('/dictionaryWordsAndDefinitions', requestOptions)
    .then(response => response.json())
    .then(data =>  { 
      //check each element for matching word
      Object.keys(data).forEach(element => {
        if (_correctAnswer.toLowerCase() === data[element].word.toLowerCase()) {
          DIC_DEFINITION.innerText = data[element].dicDef;
        }
      })
      DEFINITION_POPUP.classList.remove('hide');
    })
    .catch(error => console.log(error));
}

// track amount of times a words is answered right
// if answered 5 times, display word on cards page until competence falls to zero
let wordsCount = {
  // word: amount of times answered right in a game
}

function wordCounter (word) {
  // check existence
  let currentCount;

  if (wordsCount[word] === undefined) {
    currentCount = 1;
  } else currentCount = wordsCount[word];


  wordsCount = Object.assign(wordsCount, { [word]: currentCount+= 1 } )
 
}

// patch metadata with learned words (counted to 5 in a game)
function pushWordsToVocab () {
  // get the definition of the word and push it together
  var requestOptions = {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
  };
  fetch('/dictionaryWordsAndDefinitions', requestOptions)
    .then(response => response.json())
    .then(data =>  { 
      let newVocab = vocabulary;
      Object.keys(data).forEach(dataKey => {
        Object.keys(wordsCount).forEach(key => {

          if (key === data[dataKey].word.toLowerCase()) {
            if (wordsCount[key] >= 5) {
              newVocab = Object.assign(newVocab, { [key]: data[dataKey].dicDef } );
            }
          }
        });
      });
    
      // Patch Metadata
      var payload = {
        "vocabulary": newVocab
      };
      var requestOptions = {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      };
      fetch("/user", requestOptions)
        .catch(error => console.log('error', error));
    })
    .catch(error => console.log(error));
}

function checkChallengeCompletion () {
  if (challenge !== undefined) {
    const challengeTypes = [];

    //values to be achieved
    const achieveScoreValues = [];
    const reachLevelValues = [];
    const collectStarsValues = [];

    //add all challenge types
    Object.keys(challenges).forEach(element => {

      if (challengeTypes.includes(challenges[element].challenge.title) === false) {
        challengeTypes.push(challenges[element].challenge.title);
      }

    })

    // add values for individual challenge types arrays
    Object.keys(challenges).forEach(element => {

      //HANDLE DIFFERENT CASES

      // Case: type: Achieve a score of
      if (challenges[element].challenge.title === "Achieve a score of") {
        achieveScoreValues.push(challenges[element].challenge.value);
      }

      // Case: type: Reach level
      if (challenges[element].challenge.title === "Reach level") {
        reachLevelValues.push(challenges[element].challenge.value);
      }

      // Case: type: Collect Star Amount:
      if (challenges[element].challenge.title === "Collect Star Amount:") {
        collectStarsValues.push(challenges[element].challenge.value);
      }

    })

    //check game variables for challenge completion
    if (achieveScoreValues !== undefined) {
      achieveScoreValues.forEach(element => {
        // challenge achieved
        if (score >= element) {
          
          Object.keys(challenges).forEach(el => {
            if (challenges[el].challenge.status === undefined) {
              //MATCH CORRECT OBJECT TO PATCH
              if (challengeTypes.includes(challenges[el].challenge.title) === true && challenges[el].challenge.value === element) {

                setTimeout(() => {
                  let newChallenge = challenges;

                  Object.assign(newChallenge[el].challenge, { "status": "complete" });
                  var newStatus = {
                    "challenges": newChallenge
                  };

                  var requestOptions = {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newStatus)
                  };

                  fetch("/user", requestOptions)
                    .catch(error => console.log('error', error));

                }, 1000 + Math.floor(Math.random() * 500))

              }
            }
          })

        }
      })
    }





    if (reachLevelValues !== undefined) {
      reachLevelValues.forEach(element => {
        // challenge achieved
        if (level >= element) {
          
          Object.keys(challenges).forEach(el => {
            if (challenges[el].challenge.status === undefined) {
              //MATCH CORRECT OBJECT TO PATCH
              if (challengeTypes.includes(challenges[el].challenge.title) === true && challenges[el].challenge.value === element) {

                setTimeout(() => {
                  let newChallenge = challenges;

                  Object.assign(newChallenge[el].challenge, { "status": "complete" });
                  var newStatus = {
                    "challenges": newChallenge
                  };

                  var requestOptions = {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newStatus)
                  };

                  fetch("/user", requestOptions)
                    .catch(error => console.log('error', error));

                }, 1000 + Math.floor(Math.random() * 500))

              }
            }
          })

        }
      })
    }





    if (collectStarsValues !== undefined) {
      collectStarsValues.forEach(element => {
        // challenge achieved
        if (stars >= element) {
          
          Object.keys(challenges).forEach(el => {
            if (challenges[el].challenge.status === undefined) {
              //MATCH CORRECT OBJECT TO PATCH
              if (challengeTypes.includes(challenges[el].challenge.title) === true && challenges[el].challenge.value === element) {


                setTimeout(() => {
                  let newChallenge = challenges;

                  Object.assign(newChallenge[el].challenge, { "status": "complete" });
                  var newStatus = {
                    "challenges": newChallenge
                  };

                  var requestOptions = {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newStatus)
                  };

                  fetch("/user", requestOptions)
                    .catch(error => console.log('error', error));

                }, 1000 + Math.floor(Math.random() * 500))

              }
            }
          })

        }
      })
    }





  }
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

//used to make sure all popups are closed to avoid multiple overlapping
function closeAllPopups () {
  POPUPS.classList.add('hide');
  for (const child of POPUPS.children) {
      child.classList.add('hide');
  };
}

// new challenge when pressing ENTER button on popup.
window.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    if (CORRECT_ANSWER.classList.contains('hide') === false) {
      correctAnswer(); 
      newChallenge();
    } else if (WRONG_ANSWER.classList.contains('hide') === false) {
      wrongAnswer(); 
      newChallenge();
    } else if (TIME_EXPIRED.classList.contains('hide') === false) {
      timeExpired();
    }
  }
});


if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('./sw.js').then((registration) => {
    console.log('Service worker registration succeeded:', registration);
  }, /*catch*/ (error) => {
    console.error(`Service worker registration failed: ${error}`);
  });
} else {
  console.error('Service workers are not supported.');
}

async function subscribeToNotifications() {
    // only if user metadata shows that sub is undefined!
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'INSERT HERE'
    });
    addNotificationSub(push);
}

function setLoading (state) {
  if (state === true) {
    POPUPS.classList.remove('hide');
    LOADER.classList.remove('hide');
  } else if (state === false) {
    LOADER.classList.add('hide');
    POPUPS.classList.add('hide');
  }
}

function openWaitingListForm () {
  window.location.href = "";
}
function openFeedbackForm () {
  window.location.href = "";
  POPUPS.classList.add('hide');
  FEEDBACK.classList.add('hide');
}

function checkUserPermission() {
  return Notification.permission;
}


function handleUserSubscription() {
  // get server date for handling cancellation_effective_date
  fetch('/serverDate')
    .then(response => response.json())
    .then(data => serverDate = data.date)
    .then(() => {
      // check if subscription exists 
      if (subscription !== undefined) {

        // check if subscription is cancelled
        if (subscription.status === 'cancelled') {
          if (subscription.cancellation_effective_date > serverDate) {
            premiumPass = true;
          } else premiumPass = false;
        } else if (subscription.status === 'refunded') {
          premiumPass = false;
        } else if (subscription.status === 'deleted') {
          if (subscription.cancellation_effective_date !== undefined) {
            if (subscription.cancellation_effective_date > serverDate) {
              premiumPass = true;
            } else premiumPass = false;
          }
        } else if (subscription.status === 'active' || subscription.status === 'past_due') {
          premiumPass = true;
        }
      }
    })
    .then(() => {
      if (premiumPass === true) {
        document.getElementById('menu-premium').classList.add('hide');
      }
    })
    .then(() => handleLanguagePack())
    .catch(error => console.log(error));
}



/* PADDLE CHECKOUT */ 
function openCheckout(id) {
  if (isLoggedIn === true) {
    if (premiumPass === false) {
      if (blockedFromSubscribing === false) {
        Paddle.Checkout.open({
          product: id,
          email: `${userEmail}`,
          success: '/success',
          passthrough: `{"user_id": "${userID}"}`
        });
      }
    }
  } else location.href = '/login';
}


/*

SOME PARTS OF THIS SOFTWARE CONTAINS AND/OR STEMS FROM THIRD-PARTY CODE. BELOW ARE THE LICENSES AND THE SOURCES.


Copyright (c) 2022 by Kit Jenson (https://codepen.io/kitjenson/pen/eYRxwJR)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




Copyright (c) 2022 by Florian Gropp (https://codepen.io/florian-gropp/pen/wLGrqj)
Fork of an original work Sliding Menu (https://codepen.io/dev_loop/pen/ZZPoEB

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



Copyright (c) 2022 by Cinzia (https://codepen.io/cinzia-ferrero/pen/zbdOqY)
Fork of an original work Pure Css Responsive Auto Slider (https://codepen.io/hamadafayyad/pen/NpPVOE

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



Copyright (c) 2022 by Landon (https://codepen.io/TTV-Rebirth/pen/LYjLoxb)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



Copyright (c) 2022 by Yoav Kadosh (https://codepen.io/ykadosh/pen/ZEJLapj)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



*/


