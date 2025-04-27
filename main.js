//Menu
let menu=document.querySelector('.menu-icon');

menu.onclick =() =>{
    menu.classList.toggle('move')
};
//Giriş Kayıt
function openLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function openRegister() {
  closeLogin();
  document.getElementById("registerModal").style.display = "flex";
}

function closeRegister() {
  document.getElementById("registerModal").style.display = "none";
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  closeLogin();
}

function register() {
  const fullName = document.getElementById("fullName").value;
  const phone = document.getElementById("phone").value;
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  closeRegister();
}

// Modala tıklamadan dışarı tıklanınca kapansın
window.onclick = function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = "none";
  }
};

// Modal dışına tıklayınca kapat
window.onclick = function(e) {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = "none";
  }
};
//Araçlar
const filterButtons = document.querySelectorAll(".filter-btn");
  
    let cars = [
      { id: 1, name: "Chery Tiggo", image: "img/lüks/Chery_Tiggo.jpg", category: "lüks", likes: 0,fuel:"Benzin",gear:"Otomatik",range:"350 Km",text:"1820 TL"},
      { id: 2, name: "Nissan Qasgai", image: "img/lüks/Nissan_Qasqai.jpg", category: "lüks", likes: 0,fuel:"Benzin",gear:"Otomatik",range:"350 Km",text:"1750 TL"},
      { id: 3, name: "Peugeot 3008", image: "img/lüks/Peugeot_3008.jpg", category: "lüks", likes: 0 ,fuel:"Dizel",gear:"Otomatik",range:"300 Km",text:"1600 TL"},
      { id: 4, name: "Ford Puma", image: "img/suv/Ford-Puma.jpg", category: "suv", likes: 0,fuel:"Benzin",gear:"Otomatik",range:"500 Km",text:"1250 TL" },
      { id: 5, name: "Peugeot 2008", image: "img/suv/Peugeot-2008.jpg", category: "suv", likes: 0,fuel:"Dizel/Benzin",gear:"Otomatik",range:"400 Km",text:"1300 TL" },
      { id: 6, name: "Skoda Kamiq", image: "img/suv/Skoda-Kamiq.jpg", category: "suv", likes: 0,fuel:"Benzin",gear:"Otomatik",range:"500 Km",text:"1270 TL" },
      { id: 7, name: "Fiat Egea", image: "img/ekonomik/Fiat_Egea.jpg", category: "ekonomik", likes: 0,fuel:"Benzin",gear:"Manuel",range:"180 Km",text:"750 TL" },
      { id: 8, name: "Renault Clio", image: "img/ekonomik/Renault_Clio.jpg", category: "ekonomik", likes: 0,fuel:"Benzin",gear:"Manuel",range:"180 Km",text:"700 TL" },
      { id: 9, name: "Renault Symbol", image: "img/ekonomik/Renault_Symbol.jpg", category: "ekonomik", likes: 0,fuel:"Dizel",gear:"Manuel",range:"180 Km",text:"720 TL" },
      { id: 10, name: "Fiat-Fiorino", image: "img/orta/Fiat-Fiorino.jpg", category: "orta", likes: 0,fuel:"Dizel/Benzin",gear:"Manuel",range:"400 Km",text:"1000 TL" },
      { id: 11, name: "Opel Mokka", image: "img/orta/Opel-Mokka.jpg", category: "orta", likes: 0,fuel:"Benzin",gear:"Otomatik",range:"500 Km",text:"1100 TL" },
      { id: 12, name: "Renault Kangoo", image: "img/orta/Renault-Kangoo.jpg", category: "orta", likes: 0,fuel:"Benzin",gear:"Otomatik",range:"500 Km",text:"1050 TL" },
      { id: 13, name: "Dacia Lodgy 7", image: "img/üst/Dacia-Lodgy-7.jpg", category: "üst", likes: 0,fuel:"Dizel/Benzin",gear:"Manuel",range:"500 Km",text:"1500 TL" },
      { id: 14, name: "Renault Fluence", image: "img/üst/Renault-Fluence.jpg", category: "üst", likes: 0,fuel:"Benzin",gear:"Manuel",range:"400 Km",text:"1570 TL" },
      { id: 15, name: "Skoda Octavia", image: "img/üst/Skoda-Octavia.jpg", category: "üst", likes: 0,fuel:"Dizel/Benzin",gear:"Manuel",range:"400 Km",text:"1525 TL" },
    ];

  
    const carContainer = document.getElementById("car-container");
    const trendContainer = document.getElementById("trendContainer");
  
    // Beğeni verisini localStorage'tan çek
    function loadLikesFromStorage() {
      const storedLikes = JSON.parse(localStorage.getItem("carLikes") || "{}");
      cars.forEach(car => {
        if (storedLikes[car.id]) car.likes = storedLikes[car.id];
      });
    }
  
    // Kaydet
    function saveLikesToStorage() {
      const likes = {};
      cars.forEach(car => (likes[car.id] = car.likes));
      localStorage.setItem("carLikes", JSON.stringify(likes));
    }
  
    // Beğeni butonlarının sadece oturumluk işareti (resetlenebilir)
    let userLikes = new Set();
  
    function renderCars(filterCategory) {
      carContainer.innerHTML = "";
      cars.forEach(car => {
        const isVisible = car.category === filterCategory;
        const card = document.createElement("div");
        const liked = userLikes.has(car.id);
        card.className = `col-md-4 mb-4 car-card ${isVisible ? "fade-in" : "fade-out"}`;
        card.setAttribute("data-category", car.category);
        card.innerHTML = `
          <div class="card h-100 d-flex flex-column justify-content-between">
            <div class="like-btn" onclick="toggleLike(${car.id}, this)">
              <i class="bi ${liked ? "bi-heart-fill text-danger" : "bi-heart"}"></i>
            </div>
            <h5 class="card-title">${car.name}</h5>
            <img src="${car.image}" class="card-img-top">
            <div class="card-body">
              <span class="card-span"><i class="bi bi-fuel-pump"></i>${car.fuel}</span>
              <span class="card-span"><i class="bi bi-sliders2-vertical"></i>${car.gear}</span>
              <span class="card-span"><i class="bi bi-speedometer2"></i>${car.range}</span>
            </div>
            <div class="card-footer text-center">
              <h4>${car.text}</h4>
              <a href="javascript:void(0)" onclick="openModal()" class="btn btn-primary mt-3 mx-3 ">Araç Kirala</a>
            </div>
          </div>
        `;
        carContainer.appendChild(card);
      });
    }
  
    function renderTrends() {
      const trendCars = [...cars].sort((a, b) => b.likes - a.likes).slice(0, 3);
      trendContainer.innerHTML = "";
      trendCars.forEach(car => {
        const card = document.createElement("div");
        card.className = "col-md-4";
        card.innerHTML = `
          <div class="card">
            <h5 class="card-title">${car.name}</h5>
            <img src="${car.image}" class="card-img-top">
          </div>
        `;
        trendContainer.appendChild(card);
      });
    }
  
    function toggleLike(id, btnElement) {
      const car = cars.find(c => c.id === id);
      if (!car) return;
  
      const icon = btnElement.querySelector("i");
      if (userLikes.has(id)) {
        // Geri alma
        userLikes.delete(id);
        car.likes = Math.max(0, car.likes - 1);
        icon.classList.remove("bi-heart-fill", "text-danger");
        icon.classList.add("bi-heart");
      } else {
        // Beğeni
        userLikes.add(id);
        car.likes++;
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill", "text-danger");
      }
  
      saveLikesToStorage();  // Kalıcı olarak kaydet
      renderTrends();        // Trendler güncellensin
    }
  
    function getSavedFilter() {
      return localStorage.getItem("activeFilter") || "lüks";
    }
  
    function saveFilter(filter) {
      localStorage.setItem("activeFilter", filter);
    }
  
    // Filtreleme işlemi
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        const cards = document.querySelectorAll(".car-card");
        cards.forEach(card => {
          const category = card.getAttribute("data-category");
          if (category === filter) {
            card.classList.remove("fade-out");
            card.classList.add("fade-in");
          } else {
            card.classList.remove("fade-in");
            card.classList.add("fade-out");
          }
        });
  
        saveFilter(filter);
      });
    });
  
    // Sayfa yüklendiğinde
    const currentFilter = getSavedFilter();
    loadLikesFromStorage(); // Kalıcı beğeni verileri
    renderCars(currentFilter);
    renderTrends();
  
    // Aktif filtreyi işaretle
    filterButtons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === currentFilter);
    });

    //Araç kiralama Butonu
    function openModal() {
    document.getElementById("paymentModal").style.display = "flex";
    }

    function closeModal() {
    document.getElementById("paymentModal").style.display = "none";
    }



    //depolanmış begeni degerlerini sıfırlamayı sağlar
    localStorage.removeItem("carLikes");

    //Yorum
    let secilenYildiz = 0;
    let slideIndex = 0;

    const yildizlar = document.querySelectorAll('#ratingStars i');
    const yorumListesi = document.getElementById("yorumListesi");

    yildizlar.forEach(star => {
      star.addEventListener('click', function () {
        secilenYildiz = parseInt(this.getAttribute('data-value'));
        guncelleYildizlar();
      });
    });

    function guncelleYildizlar() {
      yildizlar.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('selected', value <= secilenYildiz);
      });
    }

    function yorumEkle() {
      const isim = document.getElementById("username").value.trim();
      const yorum = document.getElementById("comment").value.trim();
      const foto = document.getElementById("carPhoto").files[0];

      if (isim === "" || yorum === "" || secilenYildiz === 0) {
        alert("Lütfen tüm alanları doldurun ve yıldız verin.");
        return;
      }

      const yorumDiv = document.createElement("div");
      yorumDiv.classList.add("yorum");

      let imgTag = "";
      if (foto) {
        const imgURL = URL.createObjectURL(foto);
        imgTag = `<img src="${imgURL}" alt="Araba Fotoğrafı">`;
      }

      let yildizHTML = "";
      for (let i = 1; i <= 5; i++) {
        yildizHTML += `<i class='bx bxs-star' style="color:${i <= secilenYildiz ? '#fbbf24' : '#ccc'};"></i>`;
      }

      yorumDiv.innerHTML = `
        <strong>${isim}</strong>
        <div class="yildizlar">${yildizHTML}</div>
        <p>${yorum}</p>
        ${imgTag}
        <button class="sil-btn" onclick="yorumuSil(this)">Sil</button>
      `;

      yorumListesi.appendChild(yorumDiv);
      kaydetYorumlar();

      // Formu sıfırla
      document.getElementById("username").value = "";
      document.getElementById("comment").value = "";
      document.getElementById("carPhoto").value = "";
      secilenYildiz = 0;
      guncelleYildizlar();
    }

    function kaydetYorumlar() {
      localStorage.setItem("yorumlar", yorumListesi.innerHTML);
    }

    function yorumuSil(button) {
      const yorumDiv = button.parentElement;
      yorumDiv.remove();
      kaydetYorumlar();
    }

    function kaydir(yön) {
      const yorumlar = document.querySelectorAll(".yorum");
      const slot = 320;
      const maxKaydir = (yorumlar.length - 1) * slot;

      slideIndex += yön;
      if (slideIndex < 0) slideIndex = 0;
      if (slideIndex * slot > maxKaydir) slideIndex = Math.floor(maxKaydir / slot);

      yorumListesi.style.transform = `translateX(-${slideIndex * slot}px)`;
    }

    window.onload = function () {
      const kayitliYorumlar = localStorage.getItem("yorumlar");
      if (kayitliYorumlar) {
        yorumListesi.innerHTML = kayitliYorumlar;
        // Butonlara tekrar olay bağla
        document.querySelectorAll(".sil-btn").forEach(btn => {
          btn.onclick = function () {
            yorumuSil(this);
          };
        });
      }
    };

    //Scrool Animasyonu
    const animate=ScrollReveal({
      origin:'top',
      distance:'60px',
      duration:'2500',
      delay:'400',   
    })

    animate.reveal(".nav,.trend");
    animate.reveal(".home-img img",{origin:"right"});
    animate.reveal(".car-cards",{interval: 100});