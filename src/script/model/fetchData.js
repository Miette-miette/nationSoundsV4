/*fetch('https://127.0.0.1:8000/api/concerts')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const conteneurCarousel = document.getElementById("conteneurCarousel");
        data.forEach((e) => {
            const concertCard = document.createElement("div");
            concertCard.className = "carouselCard d-flex flex-column";
            concertCard.id = e.id;
            concertCard.style.backgroundImage = `url(${e.image || 'default-image.jpg'})`;
            concertCard.innerHTML = `
                <div class="infoCard">
                    <h3 class="title">${e.title}</h3>
                    <p class="scene">${e.location || ''}</p>
                    <p class="date">${e.date}</p>
                </div>
           `;
            conteneurCarousel.appendChild(concertCard);
        });
    })
    .catch(error => console.error("Erreur lors de la récupération des concerts:", error));*/