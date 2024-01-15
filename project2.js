document.addEventListener('DOMContentLoaded', function () {
    
    function filterProducts(category) {
        fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
            .then(response => response.json())
            .then(data => {
                const categoryProducts = data.categories.find(cat => cat.category_name === category)?.category_products || [];

                const productContainer = document.getElementById('product-container');
                productContainer.innerHTML = '';

                categoryProducts.forEach(product => {
                    const card = createProductCard(product);
                    productContainer.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching products:', error));
    }

    
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        let cardTextContainer= document.createElement("div")
        cardTextContainer.className ="cardTextContainer"

        let cardPriceContainer= document.createElement("div")
        cardPriceContainer.className ="cardPriceContainer"

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        image.className = 'product-image';
        // image
        const title = document.createElement('h4');
        title.textContent = product.title;
    
        // badge :
        const badge = document.createElement('p');
        badge.classList.add("badge")
        badge.textContent = `${product.badge_text || " "}`;

        // vendor :

        const dot = document.createElement('span');


        const vendor = document.createElement('p');
        vendor.className="vendor"
    
        vendor.textContent = `*${product.vendor}`;

        
        // price
        const price = document.createElement('p');
        price.textContent = `Rs${product.price}`;

        // compare praice
        const compareAtPrice = document.createElement('p');
        compareAtPrice.classList.add("compare-price")
        compareAtPrice.textContent = `${product.compare_at_price || 'N/A'}`;

        // discount
        const discount = document.createElement('p');
        discount.classList.add("discount")
        const calculatedDiscount = calculateDiscount(product.price, product.compare_at_price);
        discount.textContent = `${calculatedDiscount}% off`;

        //add button
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add("button")
        addToCartButton.onclick = function() {
            alert('This is a dummy button. Add to cart functionality will be implemented in a real scenario.');
        };
        card.appendChild(badge);
        card.appendChild(image);
        cardTextContainer.append(title)
    
        cardTextContainer.append(vendor)
        card.appendChild(cardTextContainer);
        //new sesion
        
        
        cardPriceContainer.appendChild(price);
        cardPriceContainer.appendChild(compareAtPrice);
        cardPriceContainer.appendChild(discount);
        card.append(cardPriceContainer)
        card.appendChild(addToCartButton);

        return card;
    }

    // Function to calculate discount percentage
    function calculateDiscount(price, compareAtPrice) {
        if (compareAtPrice) {
            const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
            return discount.toFixed(2);
        }
        return 0;
    }

    // Initial load with all products for Men
    filterProducts('Men');

    // Add event listeners for tab buttons
    document.getElementById('men-tab').addEventListener('click', function () {
        filterProducts('Men');
    });

    document.getElementById('women-tab').addEventListener('click', function () {
        filterProducts('Women');
    });

    document.getElementById('kids-tab').addEventListener('click', function () {
        filterProducts('Kids');
    });
});