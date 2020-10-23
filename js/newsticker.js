/**
 * credit to Antimatter Dimensions, modified so that it fits my purposes.
 * You can find the orignal script here: https://github.com/IvarK/IvarK.github.io/blob/master/javascripts/core/newsticker.js
 * PS: There are spoilers for antimatter dimensions and swearing, so be warned.
 */

var newsArray;
var s = document.getElementById('news');
document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
        scrollNextMessage();
    }
}, false);
var scrollTimeouts = [];
var nextMsgIndex;

function scrollNextMessage() {
    if (player.options.newsHidden) return false
    nextMsgIndex = Math.floor(Math.random() * newsArray.length)

    scrollTimeouts.forEach(function (v) {
        clearTimeout(v);
    });
    scrollTimeouts = [];
    s.innerHTML = newsArray[nextMsgIndex];
    let parentWidth = s.parentElement.clientWidth;
    s.style.transition = '';
    s.style.transform = 'translateX(' + parentWidth + 'px)';

    //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
    scrollTimeouts.push(setTimeout(function () {
        let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
        let rate = 120; //change this value to change the scroll speed
        let transformDuration = dist / rate;
        s.style.transition = 'transform ' + transformDuration + 's linear';
        let textWidth = s.clientWidth;
        //we need to move it to -(width+parent padding) before it won't be visible
        s.style.transform = 'translateX(-' + (textWidth + 5) + 'px)';
        //automatically start the next message scrolling after this one finishes
        //you could add more time to this timeout if you wanted to have some time between messages
        scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000)));
    }, 100));
}

newsArray = [
    "Weather forecast looks for saves every 12 seconds.",
    "\"Every 60 seconds, a minute passes,\" some guy once said in another parallel universe",
    "Who needs actual content when you have news tickers?",
    "Totally didn't steal this news ticker's code from antimatter dimensions",
    "A team of explorers tried to find the end of the universe but when they got to 90% they got softcapped and then hardcapped at 99.99%",
    "Wow I haven't been softcapped ye-",
    "Wait a minute... I just found a door leading to the owners room... I've never been in here, and I think I just found out the owner of this thing im in is called aqu---uahjkdhfdshfssfdsfsgnskgmsmgf---fsdgnsgn. This message has been hardcapped.",
    "dont click <a href=\"https://youtu.be/jxuWJWr80Tg\" target=\"_blank\">this<a>, you wont regret it",
    "No logarithm, no game.",
    "A photon travels to a space with a quark which type was a strange. He asks \"\" and realized it was a quirk!",
    "Oh, do you really think news tickers are useless? Well you are completly wrong. I can... uh... send you to different links? And... I can entertain you (at least I think I can). There, proof I am not useless.",
    "Hey there, i'm news ticker, and heres my tip of the day: <span style=\"color:rgb(255, 50, 50);\">ERROR</span>: Could not find index 42 of [REDACTED]!",
    "Isn't spacetime supposed to be increasing in size, instead of just space?",
    "Yes, I did just slap that <sup>3</sup> to everything including something to do with three dimensional size.",
    "There aren't any errors in my game, it's just that your browser is acting wack.",
    "BREAKING NEWS: Asking aqualxx to add something into the game actually works!",
    "These are very original news tickers, according to this game we are getting data from.",
    "Don't mind me and my 6 trillion commits to fix tiny things, it's nothing compared to my other projects.",
    "Maybe my game breaks because I release updates too early... wait that's not in the script?"
];
/*
let script = 
fetch("../beemovie.txt")
.then(res => res.text())
.then(data => newsArray.push(data))*/