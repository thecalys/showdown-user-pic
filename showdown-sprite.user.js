// ==UserScript==
// @name         Pokémon Showdown User Sprite
// @namespace    https://github.com/thecalys/showdown-user-pic
// @version      0.0.1
// @description  Changes your Pokémon Showdown user sprite to a custom (pre-fixed) one
// @author       thecalys
// @license      MIT
// @match        https://*.pokemonshowdown.com/*
// @run-at       document-end
// @icon         https://icons.duckduckgo.com/ip2/joanwestenberg.com.ico
// @grant        none
// ==/UserScript==

// https://stackoverflow.com/a/61511955
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

(async function() {
    'use strict';

    const elem = await waitForElm(".userdetails > img");

    elem.src = "https://play.pokemonshowdown.com/sprites/trainers/theroyal.png";
})();