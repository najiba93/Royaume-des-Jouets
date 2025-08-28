// Données des produits (normalement elles viendraient d'une API)
const products = [
    {
        id: 1,
        name: "Ours en Peluche",
        price: 19.99,
        description: "Ours doux et câlin pour les enfants, parfait pour les câlins et les jeux imaginatifs. Convient aux enfants dès 3 ans.",
        imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/13/20/toy-1870573_1280.jpg"
    },
    {
        id: 2,
        name: "Ensemble Lego",
        price: 49.99,
        description: "Kit de construction créative pour stimuler l'imagination. Idéal pour les enfants de 6 à 12 ans.",
        imageUrl: "https://cdn.pixabay.com/photo/2017/12/12/22/36/lego-3015134_1280.jpg"
    },
    {
        id: 3,
        name: "Poupée",
        price: 29.99,
        description: "Poupée élégante pour jeux imaginatifs, avec vêtements amovibles. Convient aux enfants dès 4 ans.",
        imageUrl: "https://cdn.pixabay.com/photo/2016/11/29/09/32/doll-1869383_1280.jpg"
    },
    {
        id: 4,
        name: "Voiture Miniature",
        price: 14.99,
        description: "Voiture jouet rapide et fun pour des courses endiablées. Pour enfants dès 3 ans.",
        imageUrl: "https://cdn.pixabay.com/photo/2017/01/31/22/32/car-2028028_1280.jpg"
    },
    {
        id: 5,
        name: "Puzzle",
        price: 9.99,
        description: "Puzzle éducatif avec 100 pièces pour développer la logique. Convient aux enfants dès 5 ans.",
        imageUrl: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg"
    },
    {
        id: 6,
        name: "Jeu de Société",
        price: 24.99,
        description: "Jeu familial pour des heures de plaisir, parfait pour les soirées en famille. Dès 8 ans.",
        imageUrl: "https://cdn.pixabay.com/photo/2017/12/09/21/41/game-3008794_1280.jpg"
    }
];

// Variable pour stocker les articles du panier
let cart = [];

// Fonction pour afficher les produits (sur index.html)
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return; // Ne rien faire si on n'est pas sur la page index.html
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price}€</div>
                </div>
            </a>
            <div class="product-info">
                <p class="product-description">${product.description}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    Ajouter au panier
                </button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Fonction pour afficher les détails d'un produit (sur product.html)
function displayProductDetails() {
    const productDetail = document.getElementById('product-detail');
    if (!productDetail) return; // Ne rien faire si on n'est pas sur la page product.html

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        productDetail.innerHTML = `
            <div class="product-detail-content">
                <img src="${product.imageUrl}" alt="${product.name}" class="product-detail-image">
                <div class="product-detail-info">
                    <h2 class="product-detail-title">${product.name}</h2>
                    <div class="product-detail-price">${product.price}€</div>
                    <p class="product-detail-description">${product.description}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Ajouter au panier</button>
                    <a href="index.html#products" class="btn btn-secondary">Retour aux produits</a>
                </div>
            </div>
        `;
    } else {
        productDetail.innerHTML = `<p>Produit non trouvé.</p>`;
    }
}

// Fonction pour ajouter un produit au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartDisplay();
    updateCartCount();
    showNotification();
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems.toString();
    }
}

// Fonction pour afficher le contenu du panier
function updateCartDisplay() {
    const cartContent = document.getElementById('cart-content');
    const emptyCart = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContent || !emptyCart || !cartTotal) return;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartTotal.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartTotal.style.display = 'block';
    
    cartContent.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price}€</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                </div>
            </div>
        `;
        
        cartContent.appendChild(cartItem);
    });
    
    updateTotal();
}

// Fonction pour augmenter la quantité d'un article
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        updateCartCount();
    }
}

// Fonction pour diminuer la quantité d'un article
function decreaseQuantity(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
        updateCartCount();
    }
}

// Fonction pour calculer et afficher le total
function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `Total: ${total.toFixed(2)}€`;
    }
}

// Fonction pour ouvrir/fermer le panier
function toggleCart() {
    const cart = document.getElementById('cart');
    const overlay = document.getElementById('cart-overlay');
    
    if (cart && overlay) {
        cart.classList.toggle('open');
        overlay.classList.toggle('active');
    }
}

// Fonction pour fermer le panier
function closeCart() {
    const cart = document.getElementById('cart');
    const overlay = document.getElementById('cart-overlay');
    
    if (cart && overlay) {
        cart.classList.remove('open');
        overlay.classList.remove('active');
    }
}

// Fonction pour afficher une notification
function showNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Fonction pour simuler une commande
function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide !');
        return;
    }
    
    alert('Merci pour votre commande ! 🎉');
    cart = [];
    updateCartDisplay();
    updateCartCount();
    closeCart();
}

// Fonction pour gérer le formulaire de contact
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const subject = document.getElementById('subject')?.value;
    const message = document.getElementById('message')?.value;
    
    if (name && email && subject && message) {
        alert(`Merci ${name} ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.`);
        document.getElementById('contact-form')?.reset();
    }
}

// Fonction pour s'abonner à la newsletter
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email')?.value;
    
    if (!email) {
        alert('Veuillez entrer votre adresse email');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Veuillez entrer une adresse email valide');
        return;
    }
    
    alert('Merci ! Vous êtes maintenant abonné à notre newsletter 📧');
    document.getElementById('newsletter-email').value = '';
}

// Fonction pour valider l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialisation de la page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    displayProductDetails();
    updateCartDisplay();
    updateCartCount();

    // Ajouter l'événement au formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});