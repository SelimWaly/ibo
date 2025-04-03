console.log("✅ latest.js has been loaded!");
import { db } from './db.js';

function latestItems(data){
  return data.slice(-4);
}

function showLatest(){
    console.log("🔥 showLatest() is being executed!");
    let latest = latestItems(db);
    let late = document.getElementById("latest-div");
    if (!late) {
        // console.error("Element with ID 'latest-div' not found!");
        console.error("Results container not found.")
        return;
    }

    let latestContent = latest
        .map(item => `
        <div class="showcase" style="cursor: pointer;" onclick="window.open('${item.link}', '_blank')">
            <a class="showcase-img-box" style="cursor: pointer;">
              <img src="${item.img}" alt="Image"
                width="70" class="showcase-img" />
            </a>

            <div class="showcase-content" style="cursor: pointer;">
              <a>
                <h4 class="showcase-title">${item.name}</h4>
              </a>

              <a class="showcase-category">${item.type}</a>

              <div class="price-box">
                <p class="price">${item.price} EGP</p>
                <del style="text-decoration: none;">From ${item.brand}</del>
              </div>
            </div>
          </div>
        `).join("");

    console.log(latestContent);

    late.innerHTML = latestContent || "<p>An error has occured</p>";
}


export { showLatest };