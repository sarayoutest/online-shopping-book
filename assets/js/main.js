const searchButton = document.getElementById("search-button");
const searchDropdown = document.getElementById("search-dropdown");

searchButton.addEventListener("click", () => {
  if (searchDropdown.style.display === "block") {
    searchDropdown.style.display = "none";
  } else {
    searchDropdown.style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("hasVisitedBefore")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
});


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function addToCart(e) {
    const btn = e.target;
    const id = btn.getAttribute('data-id');
    const title = btn.getAttribute('data-title');
    const price = parseFloat(btn.getAttribute('data-price'));
    const image = btn.getAttribute('data-image');

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartDropdown(); 
    
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', addToCart);
});

updateCartCount();
function showCartDropdown() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItemsDiv = document.getElementById('cart-items');
  if (!cartItemsDiv) return;

  if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p style="text-align:center;">EMPTY CART</p>';
      cartItemsDiv.style.display = 'block';
      return;
  }

  let html = '';
  cart.forEach(item => {
      html += `
          <div style="display:flex;align-items:center;margin-bottom:8px;">
              <img src="${item.image}" width="35" style="margin-right:8px;border-radius:4px;">
              <div>
                  <div style="font-size:13px;">${item.title}</div>
                  <div style="font-size:12px;color:#888;">${item.quantity} × $${item.price}</div>
              </div>
          </div>
      `;
  });
  cartItemsDiv.innerHTML = html;
  cartItemsDiv.style.display = 'block';
}

document.getElementById('cart-icon').addEventListener('click', function(e) {
  showCartDropdown();
});

const booksData = {
  "1": {
    author: "Elena Marquez",
    location: " Library",
    releaseDate:"  2012-10-3",
    summary: "celebrates coffee farmers and may tell stories about their journey or about the culture of coffee cultivation."
  },
  "2": {
    author: " Mehmet Murat ",
    location: "Library",
    releaseDate:" 2021-11-15 ",
    summary: "To explore the world of birds in a journey filled with images and information, it appears to focus on nature and wildlife."
  },
  "4": {
    author: " Marie Kondo",
    location:"Library",
    releaseDate: " 2020-07-22",
    summary: "It carries a core message: 'All you need is less', reflecting the essence of a simple and calm style."
  },
  "5": {
    author: " Ellen Lupton ",
    location: "Library",
    releaseDate:" 2019-03-10 ",
    summary: "It focuses on poster design using muted colors, offering ready-made templates and creative ideas for visual design."
  }
};

document.querySelectorAll('.featured__card').forEach(card => {
  const cardInner = card.querySelector('.card-inner');
  const cardBack = card.querySelector('.card-back');
  const detailsContent = cardBack ? cardBack.querySelector('.details-content') : null;
  const searchBtn = card.querySelector('.search-btn');
  const viewBtn = card.querySelector('.view-btn');
  const likeBtn = card.querySelector('.like-btn i');
  const backBtn = card.querySelector('.back-btn');

  let currentView = null; 

  const bookId = card.querySelector('.add-to-cart').getAttribute('data-id');
  const bookInfo = booksData[bookId];

  if (!bookInfo) {
    console.warn(`There is no data for the book with the identifier ${bookId}`);
    return;} 
  
  function showDetails(type) {
    if (!detailsContent) return;
    if (type === 'search') {
      detailsContent.innerHTML = `
        <p><strong>Author:</strong> ${bookInfo.author}</p>
        <p><strong>Available at:</strong> ${bookInfo.location}</p>
        <p><strong>Event Date:</strong> ${bookInfo.releaseDate}</p>
      `;
    } else if (type === 'view') {
      detailsContent.innerHTML = `
        <p><strong>The content of the book:</strong></p>
        <p>${bookInfo.summary}</p>
      `;
    }
    if (cardInner) {
      cardInner.style.transform = 'rotateY(180deg)';
    }
    currentView = type;
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (currentView === 'search') {
        if (cardInner) cardInner.style.transform = 'rotateY(0deg)';
        currentView = null;
      } else {
        showDetails('search');
      }
    });
  }

  if (viewBtn) {
    viewBtn.addEventListener('click', () => {
      if (currentView === 'view') {
        if (cardInner) cardInner.style.transform = 'rotateY(0deg)';
        currentView = null;
      } else {
        showDetails('view');
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (cardInner) cardInner.style.transform = 'rotateY(0deg)';
      currentView = null;
    });
  }

  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      if (likeBtn.classList.contains('ri-heart-3-line')) {
        likeBtn.classList.remove('ri-heart-3-line');
        likeBtn.classList.add('ri-heart-3-fill');
        likeBtn.style.color = 'red';
      } else {
        likeBtn.classList.add('ri-heart-3-line');
        likeBtn.classList.remove('ri-heart-3-fill');
        likeBtn.style.color = '';
      }
    });
  }
});


//dark them
const themeButton = document.getElementById('theme-button');
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (document.body.classList.contains("dark-theme")) {
    themeButton.classList.remove("ri-moon-line");
    themeButton.classList.add("ri-sun-line"); 
  } else {
    themeButton.classList.remove("ri-sun-line");
    themeButton.classList.add("ri-moon-line"); 
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('.nav__menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show-menu');
    });
  }
});




