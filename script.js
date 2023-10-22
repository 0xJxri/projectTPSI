document.addEventListener("DOMContentLoaded", function () {
    const menuContainer = document.getElementById("menu");

    fetch("menu.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            const menu = xmlDoc.getElementsByTagName("menu")[0];

            const categories = menu.getElementsByTagName("categoria");
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const categoryName = category.getAttribute("nome");

                const categoryDiv = document.createElement("div");
                categoryDiv.className = "categoria";
                menuContainer.appendChild(categoryDiv);

                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = categoryName;
                categoryDiv.appendChild(categoryTitle);

                const dishes = category.getElementsByTagName("piatto");
                for (let j = 0; j < dishes.length; j++) {
                    const dish = dishes[j];
                    const dishName = dish.getElementsByTagName("nome")[0].textContent;
                    const dishDescription = dish.getElementsByTagName("descrizione")[0].textContent;
                    const dishPrice = dish.getElementsByTagName("prezzo")[0].textContent;
                    const dishImageURL = dish.getElementsByTagName("URLimg")[0].textContent;

                    console.log("URLimg", dishImageURL)

                    const dishDiv = document.createElement("div");
                    dishDiv.className = "piatto";
                    categoryDiv.appendChild(dishDiv);

                    const dishImage = document.createElement("img");
                    dishImage.src = dishImageURL;
                    dishImage.alt = dishName;
                    dishImage.style.height= '150px';
                    dishImage.style.width = '250px';
                    dishImage.style.paddingLeft = '60px'
                    dishDiv.appendChild(dishImage);

                    const dishNameElement = document.createElement("h3");
                    dishNameElement.textContent = dishName;
                    dishDiv.appendChild(dishNameElement);

                    const dishDescriptionElement = document.createElement("p");
                    dishDescriptionElement.textContent = dishDescription;
                    dishDiv.appendChild(dishDescriptionElement);

                    const dishPriceElement = document.createElement("span");
                    dishPriceElement.className = "prezzo";
                    dishPriceElement.textContent = dishPrice;
                    dishDiv.appendChild(dishPriceElement);
                }
            }
        })
        .catch(error => console.error("Errore fixa = ", error));
});
