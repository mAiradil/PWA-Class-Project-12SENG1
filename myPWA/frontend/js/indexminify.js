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
const posts = [
   /* {
        title: "Browny Cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide1",
        backgroundImage: "../img/cookies-7.webp",
        label: "cookies"
    },
*/
    {
        title: "Cheese Pizza",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../img/cheesepizza.webp",
        label: "Pizza"
    },

    {
        title: "Caramel Cookies",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide2",
        backgroundImage: "../img/cookies-6.webp",
        label: "cookies"
    }
    /*
    ,
    {
        title: "Wrap",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../img/nacho.webp",
        label: "Mexican"
    },
    {
        title: "Grilled Chicken",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
        link: "https://example.com/slide3",
        backgroundImage: "../img/grilled1.webp",
        label: "cookies"
    }
        */
];


 
let currentSlide = 0;
//define page name to load specific functions
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
        loadMainPageCategories();
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
        loadCategories(id='')
        loadSubCategories(id='')
        loadTypes(id='')
    }
    
    if(pageName == "listrecipe.html")
    { 
        loadAllRecipes();  
    }
    if(pageName == "listrecipebycategory.html")
    { 
        const params = new URLSearchParams(window.location.search);
        const cat_id = params.get('cat_id');  
        loadRecipesByCategory(cat_id);  
    }

    if(pageName == "savedrecipe.html")
    { 
        if(getCookie('userid')){}else{ window.location.href = "/"; }
        loadSavedRecipes();  
    }
    if(pageName == "editrecipe.html")
    { 
       
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');   
        editRecipeById(id);  
        recipeFormUpdate.onsubmit = UpdateRecipe; 
    }
    if(pageName == "signin.html")
    { 
        signinForm.onsubmit = loginUser; 
    }
    if(pageName == "signup.html")
    { 
        signupForm.onsubmit = SignupUser; 
    }


});

//set cookie function for sign in user
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

//getcookie function to check user signed in or not
function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

//erase cookie when user click on logout
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

//logout function when user click on logout link
function logout(){
    eraseCookie('userid')
    window.location.href = "/";
}

//If user signed in the change the top nav bar
if(getCookie('userid')){
    document.getElementById('signupli').remove();
    document.getElementById('savedrecipeli').innerHTML=`<a href="/savedrecipe.html">Saved Recipes</a>`;
    
    document.getElementById('signinli').innerHTML=`<a onclick="logout()">Logout</a>`;
}else{
    document.getElementById('savedrecipeli').remove();
    document.getElementById('signupli').innerHTML=`<a href="/signup.html">Sign up</a>`;
    
}

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
                        <span class="fa fa-star" onclick="saverecipe(${session.recipe_id})"></span>
                    </div>
                    <div class="tcardinforecipe flex">
                        <label class="tlabel">${session.catname}</label>
                        <h2>${session.title}</h2>
                        <div class="recipedatadetail">
                        <p>${result_instructions}...</p>
                        </div>
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

//Load the recipe by recipe id
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
                        <button onclick="editReciperedirect(${data.recipe_id})">Edit</button>
                        <button onclick="deleteRecipe(${data.recipe_id})">Delete</button>
                    </div>`;



         })
        .catch(error => {
            document.getElementById('recipebyid_ingredients').innerHTML="No Recipe Found"
            console.error('Error fetching recipes:', error);
        });
}


// Function to add a new recipe
function addRecipe(event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    const recipename = document.getElementById('recipename').value;
    const recipeimage = document.getElementById('recipeimage').value;
    const recipecategoryval = document.getElementById('recipecategoryval').value;
    const recipesubcategoryval = document.getElementById('recipesubcategoryval').value;
    const recipetypeval = document.getElementById('recipetypeval').value;

    var html_ing = tinymce.get("recipe-ingredient").getContent();
    var html_ins = tinymce.get("recipe-instructions").getContent();

 
    // Ensure all fields are filled out
    if (recipename && recipeimage && html_ing != ""  && html_ins != "" ) {
        // Send a POST request to add the recipe
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
function loadCategories(id) {
    fetch('http://localhost:7000/api/get-categories')
        .then(response => response.json())
        .then(data => {
            cattext=''
            cattext='<select name="recipe-category"" id="recipecategoryval" required>'
            recipecategory.innerHTML=''
            data.forEach(session => {
                if(id == session.cat_id){
                    cattext+=`<option value='${session.cat_id}' selected>${session.name}</option>`
                }else{
                    cattext+=`<option value='${session.cat_id}' >${session.name}</option>`
                }            
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
function loadSubCategories(id) {
    fetch('http://localhost:7000/api/get-subcategories')
        .then(response => response.json())
        .then(data => {
            cattext=''
            cattext='<select name="recipe-category"" id="recipesubcategoryval" required>'
            recipesubcategory.innerHTML=''
            data.forEach(session => {
                if(id == session.subcat_id){
                    cattext+=`<option value='${session.subcat_id}' selected>${session.name}</option>`
                }else{
                    cattext+=`<option value='${session.subcat_id}'>${session.name}</option>`
                } ;
            });
            cattext +='</select>'
            recipesubcategory.innerHTML = cattext
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}

// Function to load Recipe Types from the backend
function loadTypes(id) {
    fetch('http://localhost:7000/api/get-recipetypes')
        .then(response => response.json())
        .then(data => {
            cattext=''
            cattext='<select name="recipe-category"" id="recipetypeval" required>'
            recipetype.innerHTML=''
            data.forEach(session => {
                if(id == session.type_id){
                    cattext+=`<option value='${session.type_id}' selected>${session.name}</option>`
                }else{
                    cattext+=`<option value='${session.type_id}'>${session.name}</option>`
                }     
 ;
            });
            cattext +='</select>'
            recipetype.innerHTML = cattext
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
        });
}


// Define a function to delete a specific recipe by ID
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
           
            window.location.href = "/listrecipe.html";
        })
        // Handle any errors that occur during the fetch request
        .catch(error => {
           
            // Log the error message to the console
            console.error('Error deleting Recipe:', error);
        });
    }
}


// Function to load recipe from the backend
function loadAllRecipes() {

    fetch('http://localhost:7000/api/get-all-recipe')
        .then(response => response.json())
        .then(data => {
            recipeListAll.innerHTML = ''; // Clear the existing list
            data.forEach(recipedata => {

                const recipeItem = document.createElement('div');

                const instructions = recipedata.instructions.split(/\s+/);
                // Take the first 200 words.
                const first200Words = instructions.slice(0, 30);
                const result_instructions = first200Words.join(' ');

                recipeItem.className = 'recipe-item';
                recipeItem.innerHTML = `

                <div class="tcard-recipe-all">
                    <div class="tcardimgrecipeall">
                        <img src="${recipedata.image_path}" alt="">
                        <span class="fa fa-star" onclick="saverecipe(${recipedata.recipe_id})"></span>
                    </div>
                    <div class="tcardinforecipeall">
                        <label class="tlabel">${recipedata.catname} - ${recipedata.subcatname} - ${recipedata.typename}</label>
                        <h2>${recipedata.title}</h2>
                        <div>
                            ${result_instructions}...
                        </div>
                        <div style="padding-top: 18px;">
                            <a href="recipe.html?id=${recipedata.recipe_id}" class="tcardbtnrecipe">View</a>
                            <a href="editrecipe.html?id=${recipedata.recipe_id}" class="tcardbtnrecipe">Edit </a>
                            <a href="#" onclick="deleteRecipe(${recipedata.recipe_id})" class="tcardbtnrecipe">Delete</a>
                        </div>
                    </div>
                </div>
                   
                `;
                recipeListAll.appendChild(recipeItem);

                //alert(recipeList)
            });
        })
        .catch(error => {

            document.getElementById('recipeListAll').innerHTML="No Recipe/s Found"
            console.error('Error fetching recipes:', error);
        });
}



//Function to load the recipes by categrories id
function loadRecipesByCategory(cat_id) {

    fetch(`http://localhost:7000/api/get-recipe-by-category/${cat_id}`)
        .then(response => response.json())
        .then(data => {
            recipeListAll.innerHTML = ''; // Clear the existing list
            if(data == ''){
                document.getElementById('recipeListAll').innerHTML ="No recipe found under this category"
            }else{

                data.forEach(recipedata => {

                    const recipeItem = document.createElement('div');

                    const instructions = recipedata.instructions.split(/\s+/);
                    // Take the first 200 words.
                    const first200Words = instructions.slice(0, 30);
                    const result_instructions = first200Words.join(' ');

                    recipeItem.className = 'recipe-item';
                    recipeItem.innerHTML = `

                    <div class="tcard-recipe-all">
                        <div class="tcardimgrecipeall">
                            <img src="${recipedata.image_path}" alt="">
                            <span class="fa fa-star" onclick="saverecipe(${recipedata.recipe_id})"></span>
                        </div>
                        <div class="tcardinforecipeall">
                            <label class="tlabel">${recipedata.catname} - ${recipedata.subcatname} - ${recipedata.typename}</label>
                            <h2>${recipedata.title}</h2>
                            <div>${result_instructions}...</div>
                            <div style="padding-top: 18px;">
                                <a href="recipe.html?id=${recipedata.recipe_id}" class="tcardbtnrecipe">View</a>
                                <a href="editrecipe.html?id=${recipedata.recipe_id}" class="tcardbtnrecipe">Edit </a>
                                <a href="#" onclick="deleteRecipe(${recipedata.recipe_id})" class="tcardbtnrecipe">Delete</a>
                            </div>
                        </div>
                    </div>
                       
                    `;
                    recipeListAll.appendChild(recipeItem);
                });
            }
        })
        .catch(error => {

            document.getElementById('recipeListAll').innerHTML="No Recipe/s Found"
            console.error('Error fetching recipes:', error);
        });
}

//FUnction to load the categories on home page
function loadMainPageCategories() {
    fetch('http://localhost:7000/api/get-main-page-categories')
        .then(response => response.json())
        .then(data => {
            mainpagecatList.innerHTML = ''; // Clear the existing list
            data.forEach(catdata => {
                const mainpagecatItem = document.createElement('div');
                mainpagecatItem.innerHTML = `

                <a href="listrecipebycategory.html?cat_id=${catdata.cat_id}" class="catecard">
                    <div class="cateimg">
                        <img src="${catdata.image_path}" alt="${catdata.name}" height="170px" width="250px">
                    </div>
                    <div class="catecardinfo flex">
                        <span>${catdata.TotalCount} Recipe</span>
                        <h3>${catdata.name}</h3>
                    </div>
                </a>
                   
                `;
                mainpagecatList.appendChild(mainpagecatItem);
            });
        })
        .catch(error => {

            document.getElementById('mainpagecatList').innerHTML="No Category/s Found"
            console.error('Error fetching :', error);
        });
}


//FUnction to edit the recipe by ID
function editRecipeById(id) {

    fetch('http://localhost:7000/api/get-recipe/'+id)
        .then(response => response.json())
        .then(data => {
            loadCategories(data.catid)
            loadSubCategories(data.subcatid)
            loadTypes(data.typeid)
            // Display the fetched data
            document.getElementById('recipename').value=data.title
            document.getElementById('recipeid').value=id
            

            document.getElementById('recipeimage').value=data.image_path
          
             tinymce.init({
                menubar:false,
                statusbar: false,
                  selector: 'textarea#recipe-ingredient',
                  height: 500,
                  plugins: [
                   'lists'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent  ' ,
                  advlist_bullet_styles: 'square'  ,
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',

                  setup: (editor) => {
                          editor.on('init', () => {
                            editor.setContent(data.ingredients);
                          });
                        },
            });

             tinymce.init({
                menubar:false,
                statusbar: false,
                  selector: 'textarea#recipe-instructions',
                  height: 500,
                  plugins: [
                   'lists'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent  ' ,
                  advlist_bullet_styles: 'square'  ,
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',

                  setup: (editor) => {
                          editor.on('init', () => {
                            editor.setContent(data.instructions);
                          });
                        },
            });
             
         })
        .catch(error => {
            //console.error('Error fetching recipes:', error);
        });
}

// load the edit recipe page  
function editReciperedirect(id) {
    window.location.href = "/editrecipe.html?id="+id;
}

// Function to update a recipe after editing 
function UpdateRecipe(event) {

    event.preventDefault(); // Prevent form from submitting in the traditional way

    const recipeid = document.getElementById('recipeid').value;
    const recipename = document.getElementById('recipename').value;
    const recipeimage = document.getElementById('recipeimage').value;
    const recipecategoryval = document.getElementById('recipecategoryval').value;
    const recipesubcategoryval = document.getElementById('recipesubcategoryval').value;
    const recipetypeval = document.getElementById('recipetypeval').value;

     

    var html_ing = tinymce.get("recipe-ingredient").getContent();
    var html_ins = tinymce.get("recipe-instructions").getContent();

 
    // Ensure all fields are filled out
    if (recipename && recipeimage && html_ing != ""  && html_ins != "" ) {
        // Send a POST request to add the recipe
        fetch('http://localhost:7000/api/update-recipe/'+recipeid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipeid, recipename, html_ing, html_ins ,recipeimage, recipecategoryval, recipesubcategoryval, recipetypeval}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recipe  Updated:', data);
            document.getElementById('recipemessage').innerHTML ="Recipe  Updated"
            window.location.href = "/listrecipe.html";
        })
        .catch(error => {
            document.getElementById('recipemessage').innerHTML ="ERROR while updating recipe"
            console.error('Error:', error);
        });
    } else {
        alert('Please fill in all required fields.');
    }
}

//Function when user click on sign in to login 
function loginUser(event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way
    document.getElementById('signinmessage').innerHTML =""
   
    const email = document.getElementById('signinemail').value;
    const password = document.getElementById('signinpassword').value;
    // Ensure all fields are filled out
    if (email && password ) {
       
        // Send a POST request  
        fetch('http://localhost:7000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('   added:', data);
            if(data == ''){
                document.getElementById('signinmessage').innerHTML ="Invalid user/password OR user does not exist"
            }else{
                if(data[0]['user_id'] != ''){
                    setCookie('userid' ,data[0]['user_id'] ,1 )
                    window.location.href = "/";

                }
                 
            }

        })
        .catch(error => {
            document.getElementById('signinmessage').innerHTML ="Invalid user/password OR user does not exist"
            console.error('Error:', error);
        });


    } else {
        alert('Please fill in all required fields.');
    }
}

//Function when user sign up with email and password
function SignupUser(event) {
    document.getElementById('signupmessage').innerHTML =""
    event.preventDefault(); // Prevent form from submitting in the traditional way
    const email = document.getElementById('signupemail').value;
    const password = document.getElementById('signuppassword').value;
    // Ensure all fields are filled out
    if (email && password ) {
        // Send a POST request  
        fetch('http://localhost:7000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
        })
        .then(response => response.json())
        .then(data => {
            
            console.log('   added:', data);
            document.getElementById('signupmessage').innerHTML ="User created"
            signupForm.reset();

        })
        .catch(error => {
            document.getElementById('signupmessage').innerHTML ="Error while creating user"
            console.error('Error:', error);
        });

    } else {
        alert('Please fill in all required fields.');
    }

}

//Function to save recipe ID when user logged in as user favourite recipe
function saverecipe(id){

    recp_id = id
    usr_id = getCookie('userid')

    fetch('http://localhost:7000/api/add-user-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recp_id, usr_id}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recipe  added:', data);
            alert("Recipe  added to favourite")
 
        })
        .catch(error => {
           
            console.error('Error:', error);
        });



 }

//Function to remove the recipe ID from users favourite recipe list

function removerecipe(id){

    recp_id = id
    usr_id = getCookie('userid')

    fetch('http://localhost:7000/api/remove-user-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recp_id, usr_id}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recipe  added:', data);
            window.location.href = "/savedrecipe.html";

 
        })
        .catch(error => {
           
            console.error('Error:', error);
        });

 }

// Function to load recipe from the backend on users favourite recipe page by user id
function loadSavedRecipes() {
    usr_id = getCookie('userid')
 
    fetch('http://localhost:7000/api/get-saved-recipe/'+usr_id)
        .then(response => response.json())
        .then(data => {
            if(data != ''){
                recipeListAll.innerHTML = ''; // Clear the existing list
                data.forEach(recipedata => {

                    const recipeItem = document.createElement('div');

                    const instructions = recipedata.instructions.split(/\s+/);
                    // Take the first 200 words.
                    const first200Words = instructions.slice(0, 30);
                    const result_instructions = first200Words.join(' ');

                    recipeItem.className = 'recipe-item';
                    recipeItem.innerHTML = `

                    <div class="tcard-recipe-all">
                        <div class="tcardimgrecipeall">
                            <img src="${recipedata.image_path}" alt="">
                            <span class="fa fa-circle-xmark" onclick="removerecipe(${recipedata.recipe_id})"></span>
                        </div>
                        <div class="tcardinforecipeall">
                            <label class="tlabel">${recipedata.catname} - ${recipedata.subcatname} - ${recipedata.typename}</label>
                            <h2>${recipedata.title}</h2>
                            <div>${result_instructions}...</div>
                            <div style="padding-top: 18px;">
                                <a href="recipe.html?id=${recipedata.recipe_id}" class="tcardbtnrecipe">View</a>
                                <a href="editrecipe.html?id=${recipedata.recipe_id}" class="tcardbtnrecipe">Edit </a>
                                <a href="#" onclick="deleteRecipe(${recipedata.recipe_id})" class="tcardbtnrecipe">Delete</a>
                            </div>
                        </div>
                    </div>
                       
                    `;
                    recipeListAll.appendChild(recipeItem);

                    //alert(recipeList)
                });
            }else{
                document.getElementById('recipeListAll').innerHTML="No Recipe/s Found in favourite"
            }
        })
        .catch(error => {

            
            console.error('Error fetching recipes:', error);
        });
}

 
//service worker rgister
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
