const searchon = document.querySelector('#searchopen');
const searchoff = document.querySelector('#removesearch');
const searchinput = document.querySelector('.searchinput');

searchinput.style.display = "none";

searchon.addEventListener('click', () => {
    if (searchinput.style.display === 'none') {
        searchinput.style.display = 'flex';
    } else {
        searchinput.style.display = 'none';
    }
});

searchoff.addEventListener('click', () => {
    if (searchinput.style.display === 'flex') {
        searchinput.style.display = 'none';
    } else {
        searchinput.style.display = 'flex';
    }
});
// slider header

const posts = [
    {
        title: "Brownie Cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://google.com/",
        backgroundImage: "../images/cookies.jpg",
        label: "cookies"
    },
    {
        title: "Chicken Pasta",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide2",
        backgroundImage: "../images/yummy.jpg",
        label: "cookies"
    },
    {
        title: "Healthy Steak",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../images/steak.jpg",
        label: "cookies"
    },
];

let currentSlide = 0;


function showSlide(slideIndex) {
    const slide = posts[slideIndex];
    document.querySelector('.headertitle').textContent = slide.title;
    document.querySelector('.headerpera').textContent = slide.description;
    document.querySelector('.headerbtn').href = slide.link;
    document.querySelector('.headerimg').style.backgroundImage = `url(${slide.backgroundImage})`;
}

// Initial slide
showSlide(currentSlide);


// header posts change slider
const headerPosts = document.querySelector('.headercards');


const headerPostsCards = () => {

    const updateSlider = () => {
        headerPosts.innerHTML = ''; // Clear existing content   
        for (let i = currentSlide; i < currentSlide + 6; i++) {
            const post = posts[i % posts.length];
            const postElement = document.createElement('a');
            postElement.classList.add('headercard');
            postElement.classList.add('flex');
            postElement.href = `${post.link}`;
            postElement.innerHTML = `
               <img src="${post.backgroundImage}" alt="">
               <div class="hcardinfo">
                   <span>${post.label}</span>
                   <h3>${post.title}</h3>
               </div>
           `;
            headerPosts.appendChild(postElement);
        }
    };

    // left right scroll
    const leftBtn = document.getElementById('sleft');
    const rightBtn = document.getElementById('sright');

    leftBtn.addEventListener('click', function () {
        currentSlide = (currentSlide - 6 + posts.length) % posts.length;
        updateSlider();
        showSlide(currentSlide);
    });

    rightBtn.addEventListener('click', function () {
        currentSlide = (currentSlide + 6) % posts.length;
        updateSlider();
        showSlide(currentSlide);
    });

    // Initialize the slider
    updateSlider();
};

headerPostsCards();


function nextSlide() {
    currentSlide = (currentSlide + 1) % posts.length;
    showSlide(currentSlide);
    headerPostsCards(currentSlide);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);


