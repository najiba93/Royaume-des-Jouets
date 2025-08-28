// Données des produits (normalement elles viendraient d'une API)
const products = [
    {
        id: 1,
        name: "Le Trésor des Billes Magiques",
        price: 19.99,
        description: "Plongez dans un univers éclatant avec cette collection de billes en verre aux motifs variés. Chaque bille révèle un monde miniature : spirales hypnotiques, rayures vives, couleurs translucides et reflets scintillants. Un mélange captivant de rouge, bleu, jaune et orange qui évoque la magie du jeu et la beauté artisanale. Parfait pour illustrer l’univers ludique et sensoriel du Royaume des Jouets.",
        imageUrl: "images/1.jpg"
    },
    {
        id: 2,
        name: "Ensemble Lego",
        price: 49.99,
        description: "Kit de construction créative pour stimuler l'imagination. Idéal pour les enfants de 6 à 12 ans.",
        imageUrl: "images/10.jpg"
    },
    {
        id: 3,
        name: "Les Acrobates du Ciel Urbain",
        price: 29.99,
        description: "Suspendus au-dessus d’une métropole vertigineuse, deux peluches emblématiques — un grenouille malicieuse et une panthère rose espiègle — jouent les funambules sur une corde improbable. Le contraste entre leur posture ludique et les gratte-ciel imposants en arrière-plan crée une scène surréaliste, presque magique. Une touche d’humour et de poésie dans le tumulte de la ville, parfaite pour éveiller l’imagination des petits comme des grands.",
        imageUrl: "images/3.jpg"
    },
    {
        id: 4,
        name: "Mini-Héros LEGO",
        price: 14.99,
        description: "Une foule joyeuse de figurines LEGO envahit le cadre, chacune affichant son style unique, ses accessoires et sa personnalité. Astronautes, pirates, policiers, aventuriers et citoyens du quotidien se côtoient sur un tapis de plaques jaunes, créant une mosaïque vibrante et colorée. Cette scène célèbre la diversité, l’imagination et l’esprit communautaire du monde LEGO — un univers où chaque personnage a sa propre histoire à raconter.",
        imageUrl: "images/4.jpg"
    },
    {
        id: 5,
        name: "Les Compagnons du Sable",
        price: 9.99,
        description: "Un joyeux assortiment de jouets de plage attend les petites mains créatives sur le sable doré. Seaux colorés, râteaux et personnages rigolos invitent à construire châteaux, creuser tunnels et inventer des mondes marins. Chaque accessoire, du bleu éclatant au rouge vif, évoque l’été, la liberté et les rires partagés au bord de l’eau. Une scène parfaite pour illustrer les plaisirs simples et magiques des journées ensoleillées..",
        imageUrl: "images/5.jpg"
    },
    {
        id: 6,
        name: "Les Trois Kermits de la Sagesse",
        price: 32.99,
        description: "Trois peluches de Kermit la grenouille incarnent avec malice le célèbre proverbe des Trois Singes Sages : ne rien entendre, ne rien voir, ne rien dire. Sur fond noir, leurs gestes expressifs — oreilles bouchées, yeux cachés, bouche couverte — prennent une allure théâtrale et ludique. Une interprétation pop et décalée d’un message universel, parfaite pour éveiller la réflexion tout en amusant petits et grands.",
        imageUrl: "images/6.jpg"
    },
       {
        id: 7,
        name: "Les Petits Carrés en Balade",
        price: 18.99,
        description: "Deux figurines en bois, aux visages dessinés avec tendresse, partagent un moment suspendu sur une balançoire. L’un sourit les yeux en croix, l’autre observe avec curiosité, les sourcils levés et les yeux ronds. Sur fond noir, leurs expressions prennent vie, évoquant l’amitié, la rêverie et les instants simples qui font sourire. Une scène minimaliste mais expressive, parfaite pour stimuler l’imagination des enfants et ajouter une touche poétique à l’univers du Royaume des Jouets.",
        imageUrl: "images/7.jpg"
    },
       {
        id: 8,
        name: "Le Gardien Préhistorique du Futur",
        price: 35.99,
        description: "Ce dinosaure mécanique, inspiré du célèbre stégosaure, fusionne l’ère jurassique avec la technologie futuriste. Avec ses plaques dorsales dorées, ses articulations métalliques et ses couleurs éclatantes — argent, rouge, or et noir — il incarne la puissance et l’ingéniosité. Un petit bijou de design pour les passionnés de robots, de dinosaures et d’aventures extraordinaires. Parfait pour enrichir la collection du Royaume des Jouets et stimuler l’imagination des jeunes explorateurs du temps.",
        imageUrl: "images/8.jpg"
    },
       {
        id: 9,
        name: "Le Petit Train des Couleurs",
        price: 40.99,
        description: "Un train joyeux construit en briques colorées s’élance sur un tapis fleuri, transportant des blocs géants aux teintes vives : vert, jaune, violet et bleu. À bord de la locomotive bleue coiffée d’un toit rouge, un petit ours noir veille fièrement sur le voyage. Le chiffre 1 inscrit à l’avant annonce le départ d’une aventure ludique et éducative. Ce jouet stimule la créativité, la motricité et l’amour du jeu en plein air — une pépite du Royaume des Jouets pour les explorateurs en herbe.",
        imageUrl: "images/9.jpg"
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