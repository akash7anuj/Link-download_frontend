document.querySelector(".login").addEventListener("click", function(event) {
    event.preventDefault(); // Prevents default link behavior
    window.location.href = "login/index.html";
});



function changeTab(selectedTab) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    selectedTab.classList.add('active');
}

function changeMode(selectedMode) {
    document.querySelectorAll('.mode-tab').forEach(mode => {
        mode.classList.remove('active');
    });
    selectedMode.classList.add('active');
}

document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        let isActive = item.classList.contains('active');

        // Hide all open answers before toggling the current one
        document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }

        let toggleBtn = item.querySelector('.toggle-btn');
        toggleBtn.textContent = item.classList.contains('active') ? '-' : '+';
    });
});

async function downloadVideo() {
    const url = document.getElementById('youtubeLink').value;
    const quality = document.getElementById('quality').value;
    const mode = document.querySelector('.mode-tab.active').innerText;

    if (!url) {
        alert("Please enter YouTube URL");
        return;
    }

    const response = await fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url, quality: quality, mode: mode })
    });

    if (!response.ok) {
        const error = await response.json();
        alert("Error: " + error.error);
        return;
    }

    const blob = await response.blob();
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = "downloaded_file";
    a.click();
}

const myCarousel = document.querySelector('#testimonialCarousel');
const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 2000,
    ride: 'carousel'
});

