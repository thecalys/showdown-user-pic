// ==UserScript==
// @name         Pokémon Showdown User Sprite
// @namespace    https://github.com/thecalys/showdown-user-pic
// @version      1.0.1-beta
// @description  Changes your Pokémon Showdown user sprite to a custom (pre-fixed) one
// @author       thecalys
// @license      MIT
// @match        https://*.pokemonshowdown.com/*
// @run-at       document-end
// @icon         https://icons.duckduckgo.com/ip2/joanwestenberg.com.ico
// @grant        none
// ==/UserScript==

window.customSprite = { DEBUG: false, Logger: undefined };
window.customSprite.LoggerPrefix = "[ShowdownCustomSprite]"
window.customSprite.Logger = (style = "neutral", content) => {
    let styles = {
        error: "color: crimson; font-weight: bold",
        success: "color: limegreen; font-weight: bold",
        neutral: "color: gray; font-weight: normal",
    };

    console[style === "error" ? style : "log"](
        content,
        styles[style] || undefined,
        style.neutral
    );
};


(async function () {
    "use strict";
    window.customSprite.Logger("user script has been initiated.");

    // TODO: Allow users to upload their own sprite(s)
    const userSpriteURL =
          "https://play.pokemonshowdown.com/sprites/trainers/theroyal.png";

    const userSpriteSelector = ".trainersprite.yours";
    let userSpriteElem = document.querySelector(userSpriteSelector);
    const observer = new MutationObserver((mutations) => {
        if (document.querySelector(userSpriteSelector)) {
            userSpriteElem = document.querySelector(userSpriteSelector);
            if (window.customSprite.DEBUG === true) window.customSprite.Logger("success", `%cUser Sprite "img" element found%c. Custom sprite URL will be applied.`);
            userSpriteElem.src = userSpriteURL;
        } else if (window.customSprite.DEBUG === true) {
            window.customSprite.Logger(
                "error",
                `%cUser Sprite "img" element could not be found%c. Observer will wait for the DOM to change.`
      );
    }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
})();
