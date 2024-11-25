// Nav Sticky

const mainnav = document.querySelector('.mainnav');
const url = window.location.pathname;
const pageName = url.substring(url.lastIndexOf('/') + 1);
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 2) {
        mainnav.classList.add('sticky');
    } else {
        mainnav.classList.remove('sticky');
    }
});

// slider header

// DO NOT TOUCH

const posts = [
    {
        title: "Browny Cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide1",
        backgroundImage: "../img/cookies-7.jpg",
        label: "cookies"
    },
    {
        title: "Caramel Cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide2",
        backgroundImage: "../img/cookies-6.jpg",
        label: "cookies"
    },
    {
        title: "Cheese Pizza",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../img/cheesepizza.jpg",
        label: "Pizza"
    },
    {
        title: "Wrap",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../img/nacho.jpg",
        label: "Mexican"
    },
    {
        title: "Oat Cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../img/grilled1.jpg",
        label: "cookies"
    }
];


 
let currentSlide = 0;

if(pageName == "")
{   
 
    function showSlide(slideIndex) {
        const slide = posts[slideIndex];
        document.querySelector('.headertitle').textContent = slide.title;
        document.querySelector('.headerpera').textContent = slide.description;
        document.querySelector('.headerbtn').href = slide.link;
        document.querySelector('.headerimg').style.backgroundImage = `url(${slide.backgroundImage})`;
    }





    // Initial slide
    showSlide(currentSlide);
}else{}

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
    if(pageName == "")
    {
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
    }else{}
};

headerPostsCards();


function nextSlide() {
    currentSlide = (currentSlide + 1) % posts.length;
    showSlide(currentSlide);
    headerPostsCards(currentSlide);
}
if(pageName == "")
{   
// Change slide every 3 seconds
setInterval(nextSlide, 3000);
}else{}



// searchinput js
const searchon = document.querySelector('#searchopen');
const searchoff = document.querySelector('#removesearch');
const searchinput = document.querySelector('.searchinput');

searchinput.style.display = "none";

searchon.addEventListener('click', () => {
    if (searchinput.style.display === 'none') {
        searchinput.style.display = 'flex'
    } else {
        searchinput.style.display = 'none'
    }
})

searchoff.addEventListener('click', () => {
    if (searchinput.style.display === 'flex') {
        searchinput.style.display = 'none'
    } else {
        searchinput.style.display = 'flex'
    }
});





// navonoff js

const navdiv = document.querySelector('.navonoff');
const navtoggle = document.querySelector('#checkbox2');
const navlist = document.querySelector('.navlist');

navtoggle.addEventListener('change', ()=>{
    if (navtoggle.checked) {
        navlist.style.right = '-150px'
    } else {
        navlist.style.right = '-400px'
    }
})


// adding to favoruites. 
