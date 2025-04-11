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

class Brands {
    constructor() {
        this.brands = [
            { name: "Asili", base: "Asili" },
            { name: "Strike", base: "Strike" },
            { name: "CAC Drip", base: "CAC Drip" },
            { name: "CAC", base: "CAC Drip" },
            { name: "Needle It", base: "Needle" },
            { name: "Replica", base: "Replica" },
            { name: "Denjo", base: "Denjo" },
            { name: "ERAS", base: "ERAS" },
            { name: "Manifest", base: "Manifest" },
            { name: "GoNative", base: "GoNative" },
            { name: "Go", base: "GoNative" },
            { name: "Native", base: "GoNative" }
        ];
    }
}

class Clothing {
    constructor() {
        this.categories = [
            { name: "Shirt", base: "Shirt" },
            { name: "Shirts", base: "Shirt" },
            { name: "T-Shirt", base: "Shirt" },
            { name: "T-Shirts", base: "Shirt" },
            { name: "TShirt", base: "Shirt" },
            { name: "Tshirts", base: "Shirt" },
            { name: "Sweater", base: "Sweater" },
            { name: "Sweaters", base: "Sweater" },
            { name: "Hoodie", base: "Hoodie" },
            { name: "Hoodies", base: "Hoodie" },
            { name: "Pants", base: "Pants" },
            { name: "Pant", base: "Pants" },
            { name: "Jeans", base: "Pants" },
            { name: "Shorts", base: "Pants" },
            { name: "Short", base: "Pants" },
            { name: "Jacket", base: "Jacket" },
            { name: "Jackets", base: "Jacket" },
            { name: "Blazer", base: "Jacket" },
            { name: "Blazers", base: "Jacket" },
            { name: "Suit", base: "Suit" },
            { name: "Suits", base: "Suit" },
            { name: "Dress", base: "Dress" },
            { name: "Dresses", base: "Dress" },
            { name: "Skirt", base: "Skirt" },
            { name: "Skirts", base: "Skirt" },
            { name: "Shoes", base: "Shoes" },
            { name: "Shoe", base: "Shoes" },
            { name: "Boots", base: "Shoes" },
            { name: "Boot", base: "Shoes" }
        ];
    }
}

class Colors {
    constructor() {
        this.palette = [
            { name: "Red", base: "Red" },
            { name: "Blue", base: "Blue" },
            { name: "Green", base: "Green" },
            { name: "Yellow", base: "Yellow" },
            { name: "Gold", base: "Yellow" },
            { name: "Black", base: "Black" },
            { name: "White", base: "White" },
            { name: "Purple", base: "Purple" },
            { name: "Grey", base: "Grey" },
            { name: "Gray", base: "Grey" },
            { name: "Pink", base: "Red" },
            { name: "Orange", base: "Yellow" },
            { name: "Brown", base: "Red" },
            { name: "Navy", base: "Blue" },
            { name: "Sky Blue", base: "Blue" },
            { name: "Lavender", base: "Purple" },
            { name: "Olive", base: "Green" },
            { name: "Turquoise", base: "Blue" },
            { name: "Beige", base: "Brown" },
        ];
    }
}

class Specifics {
    constructor() {
        this.specifics = [
            { name: "Puffer", base: "Puffer" },
            { name: "Zipper", base: "Zipper" },
            { name: "Zipped", base: "Zipper" },
            { name: "Zip", base: "Zipper" },
            { name: "Cropped", base: "Crop"},
            { name: "Baggy", base: "Oversized"},
            { name: "Bagged", base: "Oversized"},
            { name: "Bagging", base: "Oversized"},
            { name: "Oversized", base: "Oversized"},
            { name: "Oversize", base: "Oversized"},
            // { name: "Embirodery", base: "Embirodery"},
            // { name: "Embiroded", base: "Embirodery"},
            { name: "Crop", base: "Crop"},
            { name: "Croptop", base: "Crop"},
            { name: "Crop-top", base: "Crop"},
            { name: "Cotton", type: "Cotton" },
            { name: "Denim", type: "Denim" },
            { name: "Leather", type: "Leather" },
            { name: "Wool", type: "Wool" },
            { name: "Silk", type: "Silk" },
            { name: "Linen", type: "Linen" },
            { name: "Vintage", type: "Vintage" },
            { name: "Casual", type: "Casual" },
            { name: "Formal", type: "Formal" }
        ];
    }
}

class Textures {
    constructor() {
        this.textures = [
            { name: "Smooth", base: "Soft" },
            { name: "Velvet", base: "Soft" },
            { name: "Silk", base: "Soft" },
            { name: "Cotton", base: "Soft" },
            { name: "Rough", base: "Rough" },
            { name: "Suede", base: "Rough" },
            { name: "Leather", base: "Rough" },
            { name: "Fleece", base: "Soft" },
            { name: "Corduroy", base: "Rough"},
        ];
    }
}

function detectBrand(query) {
    let brands = new Brands();
    const brands_query = query.split(' ');

    for (let brands_keyword of brands_query) {
        let brand = brands.brands.find(item => item.name.toLowerCase() === brands_keyword.toLowerCase());
        if (brand) {
            return brand.base;
        }
    }
    return null;
}
     
function getCategory(query) {
    let clothing = new Clothing();
    const category_query = query.split(' ');

    for (let category_keyword of category_query) {
        let category = clothing.categories.find(item => item.name.toLowerCase() === category_keyword.toLowerCase());
        if (category) {
            return category.base;
        }
    }
    return null;
}

function getColor(query) {
    let colors = new Colors();
    let color_query = query.split(' ');

    for (let color_keyword of color_query) {
        let color = colors.palette.find(item => item.name.toLowerCase() === color_keyword.toLowerCase());
        if (color) {
            return color.base;
        }
    }
    return null;
}

function getSpecific(query) {
    let specifics = new Specifics();
    let specific_query = query.split(' ');

    for (let specific_keyword of specific_query) {
        let specific = specifics.specifics.find(item => item.name.toLowerCase() === specific_keyword.toLowerCase());
        if (specific) {
            return specific.base;
        }
    }
    return null;
}

function getTexture(query) {
    let textures = new Textures();
    let textures_query = query.split(' ');

    for (let texture_keyword of textures_query) {
        let texture = textures.textures.find(item => item.name.toLowerCase() === texture_keyword.toLowerCase());
        if (texture) {
            return texture.base;
        }
    }
    return null;
}


function search(query, data) {
    let queryTerms = query.trim().replace(/\s+/g, " ").toLowerCase().split(" ");
    let brand = detectBrand(query);
    let category = getCategory(query);
    let color = getColor(query);
    let specific = getSpecific(query);
    let texture = getTexture(query);

    console.log(`Brand: ${brand}`)
    console.log(`Category: ${category}`)
    console.log(`Color: ${color}`)
    console.log(`Specific: ${specific}`)
    console.log(`Texture: ${texture}`)

    let nameList = [...queryTerms];

    if (brand) {
        nameList = nameList.filter(word => word !== toLowerCaseManual(brand));
    }
    if (category) {
        nameList = nameList.filter(word => word !== toLowerCaseManual(category));
    }
    if (color) {
        nameList = nameList.filter(word => word !== toLowerCaseManual(color));
    }
    if (specific) {
        nameList = nameList.filter(word => word !== toLowerCaseManual(specific));
    }
    if (texture) {
        nameList = nameList.filter(word => word !== toLowerCaseManual(texture));
    }

    let extractName = nameList.join(" ");

    let filteredDb = data.filter(item =>
        (!brand || toLowerCaseManual(item.brand) === toLowerCaseManual(brand)) &&
        (!category || toLowerCaseManual(item.type) === toLowerCaseManual(category)) &&
        (!color || toLowerCaseManual(item.color) === toLowerCaseManual(color)) &&
        (!specific || toLowerCaseManual(item.specific) === toLowerCaseManual(specific))
        // (!specific || item.keywords.includes(specific.toLowerCase()))
        // && (!texture || item.keywords.includes(texture.toLowerCase()))
    );

    let searchedDb = filteredDb.filter(item2 =>
        item2.name.toLowerCase() === extractName.toLowerCase()
    );

    return searchedDb.length > 0 ? searchedDb : filteredDb;
}

function results(searchQuery) {
    let content = search(searchQuery, db);
    let resultsDiv = document.getElementById("results-div");
    if (!resultsDiv) {
        // console.error("Element with ID 'results-div' not found!");
        console.error("Results container not found.")
        return;
    }

    const resultsContent = content
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

    console.log(content);

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


export { results };
