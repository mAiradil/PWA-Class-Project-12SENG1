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
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ut, quam corporis excepturi cum ipsa",
        link: "https://google.com/",
        bgImg: "../images/cookies.jpg",
        label: "cookies"
    },
    {
        title: "Angus Beef Burger",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ut, quam corporis excepturi cum ipsa",
        link: "https://google.com/",
        bgImg: "../images/burger.jpg",
        label: "cookies"
    },
    {
        title: "Creamy Olive Pizza",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ut, quam corporis excepturi cum ipsa",
        link: "https://google.com/",
        bgImg: "../images/pizza.jpg",
        label: "cookies"
    },
];

let currentSlide = 0;

function showSlide(slideIndex){
    const slide = posts[slideIndex];
    document.querySelector('.headertitle').textContent = slide.title;
    document.querySelector('.headerpera').textContent = slide.desc;
    document.querySelector('.headerbtc').href = slide.link;
    document.querySelector('.headerimg').style.backgroundImage = slide.img;

}

// intial slide
showSlide(currentSlide);


// header Posts CHanging slide
const headerPosts = document.querySelector('.headercards');

const headerPostsCards = () => {
    const updateSlider = () => {
        headerPosts.innerHTML = '';
        for (let i = currentSlide; i < currentSlide + 6; i++){
            const post = posts[i % posts.length];
            const postElement = document.createElement('a');
            postElement.classList.add('headercard');
            postElement.classList.add('flex');
            postElement.href = `${post.link}`;
            postElement.innerHTML = `
            <img src="${post.bgImg}" alt="">
                    <div class="hcardinfo">
                        <span>${post.label}</span>
                        <h3${post.title}</h3>
                    </div>
            `
            headerPosts.appendChild(postElement);

        }
    };
 // initiaalise the slider
    updateSlider();
          
}

headerPostsCards();

 