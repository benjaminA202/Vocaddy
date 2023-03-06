import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'https://cdn.skypack.dev/react-icons/ti';



let vocabulary = {};


var requestOptions = {
  method: 'GET',
  headers: { "Content-Type": "application/json" },
};
fetch('/userMetadata', requestOptions)
  .then(response => response.json())
  .then(data => {
    vocabulary = data.vocabulary;
    let totalWordsCount = 0;
    Object.keys(vocabulary).forEach(() => {
      totalWordsCount += 1;
    })
    // check if object is empty
    if (Object.keys(vocabulary).length !== 0 && vocabulary.constructor === Object) {

      // LOAD CARDS PAGE WITH REACT


      // check if cards h2 contents already exist
      const allCards = document.getElementsByClassName('card'); 
      const alreadyAdded = {};
      
      function changeAllCardsH2() {
        let counter = 0;
        Object.keys(vocabulary).forEach(element => {
            allCards[counter].childNodes[0].innerText = element;
          counter++;
        })
      }

      function changeAllCardsParagraph() {
        let counter = 0;
        Object.keys(vocabulary).forEach(element => {
            allCards[counter].childNodes[1].innerText = vocabulary[element];
          counter++;
        })
      }

      const CARDS = totalWordsCount;
      const MAX_VISIBILITY = 3;

      const Card = ({ title, content }) => /*#__PURE__*/
        React.createElement("div", { className: "card" }, /*#__PURE__*/
          React.createElement("h2", null, title), /*#__PURE__*/
          React.createElement("p", null, content));

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
          React.createElement(
            "img",
            {
              src: "/Icons/leave.svg",
              onClick: () => { location.replace('/') }
            },
            null
          ),
          React.createElement(Carousel, null,
            [...new Array(CARDS)].map((_, i) => /*#__PURE__*/
              React.createElement(Card, { title: "X" + (i + 1), content: "X" }))),
          React.createElement(
            "h4",
            null,
            "Copyright © 2022 | ",
            React.createElement(
              'span',
              {
                onClick: () => { location.replace('/impressum') }
              },
              'Impressum')
          ))


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
    }
  })
  .catch(error => console.log(error));
