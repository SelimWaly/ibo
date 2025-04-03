console.log("✅ recommended.js has been loaded!");
import { db } from './db.js';

function recommendItems(data){
    let shuffled = [...data].sort(() => Math.random() - 0.5);
    console.log(shuffled.slice(0, 12))
    return shuffled.slice(0, 12);
}

function showRecommended(){
    console.log("🔥 showRecommended() is being executed!");
    let recommended = recommendItems(db);
    let home = document.getElementById("home-div");
    if (!home) {
        // console.error("Element with ID 'home-div' not found!");
        console.error("Results container not found.")
        return;
    }

    let recommendedContent = recommended
        .map(item => `
        <div class="showcase" style="cursor: pointer" onclick="window.open('${item.link}', '_blank');">
                <div class="showcase-banner">
                  <img src="${item.img}" alt="Image"
                    class="product-img default" width="300" />
                  <img src="${item.img}" alt="Image"
                    class="product-img hover" width="300" />
                </div>

                <div class="showcase-content">
                  <a class="showcase-category">${item.type}</a>

                  <h3>
                    <a class="showcase-title">${item.name}</a>
                  </h3>

                  <div class="price-box">
                    <p class="price">${item.price} EGP</p>
                    <del style="text-decoration: none;">From ${item.brand}</del>
                  </div>
                </div>
              </div>
        `).join("");

    console.log(recommendedContent);

    home.innerHTML = recommendedContent || "<p>An error has occured</p>";
}


export { showRecommended };