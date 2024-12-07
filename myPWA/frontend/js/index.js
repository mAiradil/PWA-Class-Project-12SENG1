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
 
if(pageName == "submitrecipe.html")
{ 
    /*const quill_ins = new Quill('#editor-ins', {
        theme: 'snow'
    });
    const quill_ing = new Quill('#editor-ing', {
        theme: 'snow'
    });*/
}




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
        title: "Healthy Steak",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../img/steak-food.jpg",
        label: "Mexican"
    },
    {
        title: "Grilled Chicken",
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




// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    if(pageName == "")
    { 
        loadRecipes(); // Load recipe  when the page loads
    }

    if(pageName == "recipe.html")
    { 
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');   
        loadRecipeById(id);  
    }
    if(pageName == "submitrecipe.html")
    { 

        recipeForm.onsubmit = addRecipe; 
        loadCategories()
        loadSubCategories()
        loadTypes()
    }

});


// Function to load recipe from the backend
function loadRecipes() {
    fetch('http://localhost:7000/api/get-recipe')
        .then(response => response.json())
        .then(data => {
            recipeList.innerHTML = ''; // Clear the existing list
            data.forEach(session => {
                const recipeItem = document.createElement('div');

                const instructions = session.instructions.split(/\s+/);
                // Take the first 200 words.
                const first200Words = instructions.slice(0, 30);
                const result_instructions = first200Words.join(' ');

                recipeItem.className = 'recipe-item';
                recipeItem.innerHTML = `
                <div class="tcard-recipe">
                    <div class="tcardimgrecipe">
                        <img src="${session.image_path}" alt="">
                    </div>
                    <div class="tcardinforecipe flex">
                        <label class="tlabel">${session.catname}</label>
                        <h2>${session.title}</h2>
                         
                        <p>${result_instructions}...</p>
                         
                        <a href="recipe.html?id=${session.recipe_id}" class="tcardbtnrecipe">Read More</a>
                    </div>
                </div>


                   
                `;
                recipeList.appendChild(recipeItem);

                //alert(recipeList)
            });
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

function loadRecipeById(id) {

    fetch('http://localhost:7000/api/get-recipe/'+id)
        .then(response => response.json())
        .then(data => {
            // Display the fetched data
            document.getElementById('recipebyid_title').innerHTML=data.title
            document.getElementById('recipebyid_image').src=data.image_path
            document.getElementById('recipebyid_ingredients').innerHTML=data.ingredients
            document.getElementById('recipebyid_instructions').innerHTML=data.instructions
            document.getElementById('recipebyid_breadcrumb').innerHTML=`<ul class="breadcrumb">
                        <li>Home</li>
                        <li>${data.catname}</li>
                        <li>${data.subcatname}</li>
                        <li>${data.typename}</li>
                     </ul>
                      <div id="recipebyid_breadcrumb_right">
                        <button onclick="editRecipe(${data.recipe_id})">Edit</button>
                        <button onclick="deleteRecipe(${data.recipe_id})">Delete</button>
                    </div>`;



         })
        .catch(error => {
            document.getElementById('recipebyid_ingredients').innerHTML="No Recipe Found"
            console.error('Error fetching recipes:', error);
        });
}


// Function to add a new study session
function addRecipe(event) {

    event.preventDefault(); // Prevent form from submitting in the traditional way


    const recipename = document.getElementById('recipename').value;
    const recipeimage = document.getElementById('recipeimage').value;
    const recipecategoryval = document.getElementById('recipecategoryval').value;
    const recipesubcategoryval = document.getElementById('recipesubcategoryval').value;
    const recipetypeval = document.getElementById('recipetypeval').value;

    const length_ing = quill_ing.getLength();
    const html_ing = quill_ing.getSemanticHTML();
    const length_ins = quill_ins.getLength();
    const html_ins = quill_ins.getSemanticHTML();


 

    // Ensure all fields are filled out
    if (recipename && recipeimage && length_ing >1 && length_ins > 1) {
        // Send a POST request to add the study session
        fetch('http://localhost:7000/api/add-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipename, html_ing, html_ins ,recipeimage, recipecategoryval, recipesubcategoryval, recipetypeval}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recipe  added:', data);
            document.getElementById('recipemessage').innerHTML ="Recipe  added"

            recipeForm.reset(); // Clear the form fields
            quill_ins.setText('');
            quill_ing.setText('');

        })
        .catch(error => {
            document.getElementById('recipemessage').innerHTML ="ERROR while adding recipe"
            console.error('Error:', error);
        });
    } else {
        alert('Please fill in all required fields.');
    }
}



// Function to load categories from the backend
function loadCategories() {
    fetch('http://localhost:7000/api/get-categories')
        .then(response => response.json())
        .then(data => {
            cattext=''
            cattext='<select name="recipe-category"" id="recipecategoryval" required>'
            recipecategory.innerHTML=''
            data.forEach(session => {
                 
                cattext+=`<option value='${session.cat_id}'>${session.name}</option>`
                
 ;
            });
            cattext +='</select>'
            recipecategory.innerHTML = cattext
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Function to loadSubCategories from the backend
function loadSubCategories() {
    fetch('http://localhost:7000/api/get-subcategories')
        .then(response => response.json())
        .then(data => {
            cattext=''
            cattext='<select name="recipe-category"" id="recipesubcategoryval" required>'
            recipesubcategory.innerHTML=''
            data.forEach(session => {
                 
                cattext+=`<option value='${session.subcat_id}'>${session.name}</option>`
                
 ;
            });
            cattext +='</select>'
            recipesubcategory.innerHTML = cattext
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Function to loadTypes from the backend
function loadTypes() {
    fetch('http://localhost:7000/api/get-recipetypes')
        .then(response => response.json())
        .then(data => {
            cattext=''
            cattext='<select name="recipe-category"" id="recipetypeval" required>'
            recipetype.innerHTML=''
            data.forEach(session => {
                 
                cattext+=`<option value='${session.type_id}'>${session.name}</option>`
                
 ;
            });
            cattext +='</select>'
            recipetype.innerHTML = cattext
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}


// Define a function to delete a specific recipe
function deleteRecipe(id) {
   
    // Display a confirmation dialog to the user before proceeding
    if (confirm('Are you sure you want to delete this recipe?')) {
       
        // Send a DELETE request to the server using the Fetch API
        fetch(`http://localhost:7000/api/delete-recipe/${id}`, {
           
            // Specify the HTTP method as 'DELETE'
            method: 'DELETE',
        })
        // Handle the response once the DELETE request is successful
        .then(() => {
           
            // Log a message to the console to indicate success
            console.log('Recipe  deleted');
           
            window.location.href = "/";
        })
        // Handle any errors that occur during the fetch request
        .catch(error => {
           
            // Log the error message to the console
            console.error('Error deleting Recipe:', error);
        });
    }
}


