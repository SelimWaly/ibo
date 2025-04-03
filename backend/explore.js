/** Search algorithm
* Notes:
* Possible use spell-checking library to correct search queries 
* (async function loadDictionary() {
*     const affix = await fetch("https://cdn.jsdelivr.net/npm/dictionaries-en/index.aff").then(res => res.text());
*     const dictionary = await fetch("https://cdn.jsdelivr.net/npm/dictionaries-en/index.dic").then(res => res.text());
*     spellChecker = nspell(affix, dictionary);
* })();
* Deprecated:
* @param {string} query - The user's search query
* @param {Array} db - The database to search through
* @returns {Array} - The search results
*/

import { db } from './db.js';

function toLowerCaseManual(str) {
    if (typeof str !== 'string') {
        return "";
      }
      let result = "";
      let index = 0;
      while (str[index] !== undefined) {
        const charCode = str.charCodeAt(index);
        if (charCode >= 65 && charCode <= 90) {
          result += String.fromCharCode(charCode + 32);
        } else {
          result += str[index];
        }
        index++;
      }
      return result;
}

function explore() {
    let resultsDiv = document.getElementById("results-div");
    if (!resultsDiv) {
        // console.error("Element with ID 'results-div' not found!");
        console.error("Results container not found.")
        return;
    }

    const resultsContent = db
        .filter(item => !isNaN(item.price)) // Filter out items with NaN price
        .map(item => `
        <div class="showcase" style="cursor: pointer" onclick="window.open('${item.link}', '_blank');">
          <div class="showcase-banner">
            <img src="${item.img}" alt="Image"
              class="product-img default" width="300" />
            <img src="${item.img}" alt="Image"
              class="product-img hover" width="300" />

            <div class="showcase-actions"></div>
          </div>

          <div class="showcase-content">
            <a class="showcase-category" onclick="window.open('results.html?query=${item.type}', '_blank')" style="color: darkslategray; margin-top: 0.5em;">${item.type}</a>

            <h3>
              <a class="showcase-title" style="color: black;">${item.name}</a>
            </h3>

            <div class="showcase-rating">
            </div>

            <div class="price-box">
              <p class="price">${item.price} EGP</p>
              <del style="text-decoration: none;">From ${item.brand}</del>
            </div>
          </div>
        </div>
        </div>
        `).join("");

        /**
         * <div class="grid-item">
            <div class="product" style="background: url('${item.img}'); background-size: cover; background-position: center; padding: 23px 22px; display: flex; flex-direction: column; justify-content: flex-end; color: #f5e0e0; border-radius: 20px;">
                <div class="product-inner">
                    <div class="front" style="margin-top: 2em; text-shadow: black 20px;">
                        <h2><b>${item.name}</b></h2>
                        <p>${item.price} EGP</p>
                        <button onclick="window.open('${item.link}', '_blank');">Buy from ${item.brand}</button>
                    </div>
                </div>
            </div>
        </div> **/

    console.log(db);

    resultsDiv.innerHTML = resultsContent || "<p>We couldn't find any items matching your query.</p>";

    // Fallback for missing images
    document.querySelectorAll(".product").forEach(productDiv => {
        const backgroundImage = productDiv.style.backgroundImage;
        if (backgroundImage.startsWith("url(")) {
            const imgUrl = backgroundImage.slice(5, -2); // Extract URL from "url('...')"
            const img = new Image();
            img.src = imgUrl;

            img.onload = () => {
                // Image loaded successfully, no changes needed
            };

            img.onerror = () => {
                // Fallback to NoImage if the original image fails to load
                productDiv.style.backgroundImage = "url('./assets/img/NoImage.png')";
            };
        } else {
            // If no valid backgroundImage URL exists, set NoImage
            productDiv.style.backgroundImage = "url('./assets/img/NoImage.png')";
        }
    });

}


export { explore };