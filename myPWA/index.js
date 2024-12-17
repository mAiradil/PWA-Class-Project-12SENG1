// index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 7000;
//compress the pages for fast loading
const compression = require('compression');
app.use(compression());

//swlite3 db to store data
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('recipe.db');

app.use(express.json());
// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files like HTML, CSS, and JS
app.use(express.static(path.join(__dirname, 'frontend')));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


 // Get top 3 recipes
app.get('/api/get-recipe', (req, res) => {
    //db.all('SELECT * FROM recipes ORDER BY recipe_id DESC   LIMIT 3', [], (err, rows) => {
    db.all(`
        SELECT recipes.*,c.name AS catname , sc.name AS subcatname, rt.name AS typename  FROM recipes 
 JOIN    cat_subcat_type_recipe cstr ON 
recipes.recipe_id =cstr.recipe_id
JOIN categories c  ON cstr.cat_id = c.cat_id 
JOIN sub_categories sc  ON cstr.subcat_id = sc.subcat_id 
JOIN recipe_types rt   ON cstr.type_id = rt.type_id 
ORDER BY recipes.recipe_id DESC   LIMIT 3
`, [], (err, rows) => {


        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});
 

  // Get All recipe
app.get('/api/get-all-recipe', (req, res) => {
    //db.all('SELECT * FROM recipes ORDER BY recipe_id DESC   LIMIT 3', [], (err, rows) => {
    db.all(`
        SELECT recipes.*,c.name AS catname , sc.name AS subcatname, rt.name AS typename  FROM recipes 
 JOIN    cat_subcat_type_recipe cstr ON 
recipes.recipe_id =cstr.recipe_id
JOIN categories c  ON cstr.cat_id = c.cat_id 
JOIN sub_categories sc  ON cstr.subcat_id = sc.subcat_id 
JOIN recipe_types rt   ON cstr.type_id = rt.type_id 
ORDER BY recipes.recipe_id DESC    
`, [], (err, rows) => {


        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});


//Get top 3 categories to display on home page
app.get('/api/get-recipe-by-category/:cat_id', (req, res) => {
    const { cat_id } = req.params;
    db.all(`
        SELECT recipes.*,c.name AS catname , sc.name AS subcatname, rt.name AS typename  FROM recipes 
 JOIN    cat_subcat_type_recipe cstr ON 
recipes.recipe_id =cstr.recipe_id
JOIN categories c  ON cstr.cat_id = c.cat_id 
JOIN sub_categories sc  ON cstr.subcat_id = sc.subcat_id 
JOIN recipe_types rt   ON cstr.type_id = rt.type_id 
WHERE c.cat_id =? 
ORDER BY recipes.recipe_id DESC    
`, [cat_id], (err, rows) => {


        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});


// Get saved recipe by user id
app.get('/api/get-saved-recipe/:id', (req, res) => {
    const { id } = req.params;

    //db.all('SELECT * FROM recipes ORDER BY recipe_id DESC   LIMIT 3', [], (err, rows) => {
    db.all(`
       SELECT  r.*,c.name AS catname , sc.name AS subcatname, rt.name AS typename  FROM users_recipes ur  
JOIN    recipes r  ON ur.recipe_id =r.recipe_id
 JOIN    cat_subcat_type_recipe cstr ON 
r.recipe_id =cstr.recipe_id
JOIN categories c  ON cstr.cat_id = c.cat_id 
JOIN sub_categories sc  ON cstr.subcat_id = sc.subcat_id 
JOIN recipe_types rt   ON cstr.type_id = rt.type_id 
WHERE ur.user_id =?
ORDER BY r.recipe_id DESC   
`, [id], (err, rows) => {


        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});




// Get a single recipe  by ID
app.get('/api/get-recipe/:id', (req, res) => {
    const { id } = req.params;
    db.get(
`
SELECT recipes.*,c.name AS catname , sc.name AS subcatname, rt.name AS typename  
,c.cat_id AS catid , sc.subcat_id AS subcatid, rt.type_id AS typeid
FROM recipes 
 JOIN    cat_subcat_type_recipe cstr ON 
recipes.recipe_id =cstr.recipe_id
JOIN categories c  ON cstr.cat_id = c.cat_id 
JOIN sub_categories sc  ON cstr.subcat_id = sc.subcat_id 
JOIN recipe_types rt   ON cstr.type_id = rt.type_id 
 WHERE recipes.recipe_id = ?
 `
        , [id], (err, row) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else if (!row) {
            res.status(404).send('Data not found');
        } else {
            res.status(200).json(row);
        }
    });
});

// Create a new recipe
app.post('/api/add-recipe', (req, res) => {
    const { recipename, html_ing, html_ins ,recipeimage, recipecategoryval, recipesubcategoryval, recipetypeval} = req.body;

   db.run(`INSERT INTO recipes (title, ingredients, instructions, image_path) VALUES (?, ?, ?, ?)`,
        [recipename, html_ing, html_ins ,recipeimage],
        function (err) {
            if (err) {
                res.status(500).send('Error inserting data');
            } else {

                db.run(`INSERT INTO cat_subcat_type_recipe (cat_id, subcat_id, type_id, recipe_id) VALUES (?, ?, ?, ?)`,
                    [recipecategoryval, recipesubcategoryval, recipetypeval ,this.lastID],
                    function (err) {
                        if (err) {
                            res.status(500).send('Error inserting data');
                        } else {
                            //res.status(201).json({ id: this.lastID });
                        }
                });

                res.status(201).json({ id: this.lastID });
            }
    });
         
});
 
//Save the recipe ID to user favourite by user id
app.post('/api/add-user-recipe', (req, res) => {
    const { recp_id, usr_id} = req.body;
   db.run(`INSERT INTO users_recipes (user_id, recipe_id) VALUES (?, ?)`,
        [usr_id, recp_id],
        function (err) {
            if (err) {
                res.status(500).send('Error inserting data');
            } else {
                res.status(201).json({ id: usr_id });
            }
    });
         
});

//Delete recipe from users favourite list
app.post('/api/remove-user-recipe', (req, res) => {
    const { recp_id, usr_id} = req.body;
   db.run(`delete from users_recipes where user_id = ? and  recipe_id= ?`,
        [usr_id, recp_id],
        function (err) {
            if (err) {
                res.status(500).send('Error deleting data');
            } else {
                res.status(201).json({ id: null });
            }
    });
         
});


// Get categories
app.get('/api/get-categories', (req, res) => {
    db.all('SELECT * FROM  categories ORDER BY name ', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});

//Get categories with recipe count to display on home page
app.get('/api/get-main-page-categories', (req, res) => {
    db.all(`
SELECT  COUNT(*) TotalCount, 
        b.cat_id , 
        b.name ,
         b.image_path 
FROM    cat_subcat_type_recipe a
        INNER JOIN categories b
            ON a.cat_id = b.cat_id 
GROUP   BY b.cat_id , b.name 
      `, [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});



// Get sub categories
app.get('/api/get-subcategories', (req, res) => {
    db.all('SELECT * FROM  sub_categories ORDER BY name ', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});

// Get recipe type
app.get('/api/get-recipetypes', (req, res) => {
    db.all('SELECT * FROM  recipe_types ORDER BY name ', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else {
            res.status(200).json(rows);
        }
    });
});


// Define an endpoint to handle DELETE requests for deleting a specific  recipe
app.delete('/api/delete-recipe/:id', (req, res) => {
    
    // Extract the 'id' parameter from the URL using 'req.params'
    const { id } = req.params;

    // Execute a SQL query to delete  with the given 'id' from the database
    db.run(`DELETE FROM recipes WHERE recipe_id = ?`, id, function (err) {
       
    // Check if there was an error during the query execution
    if (err) {
        // If an error occurred, respond with a 500 status code (Internal Server Error)
        res.status(500).send('Error deleting data');
    } else {
        // If the query was successful,delete entry from cat_subcat_type_recipe table
        db.run(`delete from   cat_subcat_type_recipe  where  recipe_id = ? `,id ,
            function (err) {
                if (err) {
                    res.status(500).send('Error inserting data');
                } else {
                   
                }
        });

        res.status(200).send('Deleted successfully');
    }
});
});



// UPdate   recipe by ID
app.post('/api/update-recipe/:id', (req, res) => {
    const { recipeid, recipename, html_ing, html_ins ,recipeimage, recipecategoryval, recipesubcategoryval, recipetypeval} = req.body;

   db.run(`Update   recipes set  title = ? , ingredients =? , instructions = ? , image_path= ? where recipe_id = ?`,
        [recipename, html_ing, html_ins ,recipeimage, recipeid],
        function (err) {
            if (err) {
                res.status(500).send('Error updating data');
            } else {

                db.run(`delete from   cat_subcat_type_recipe  where  recipe_id = ? `,
                    [ recipeid],
                    function (err) {
                        if (err) {
                            res.status(500).send('Error deleting  data');
                        } else {
                            
                            db.run(`INSERT INTO cat_subcat_type_recipe (cat_id, subcat_id, type_id, recipe_id) VALUES (?, ?, ?, ?)`,
                                [recipecategoryval, recipesubcategoryval, recipetypeval ,recipeid],
                                function (err) {
                                    if (err) {
                                        res.status(500).send('Error inserting data');
                                    } else {
                                        //res.status(201).json({ id: this.lastID });
                                    }
                            });
                        }
                });
                

                res.status(201).json({ id: this.lastID });
            }
    });
         
});
 
//check user email and password to login 
app.post('/api/login', (req, res) => {
    const { email, password} = req.body;
    db.all('SELECT * FROM users where email= ?  and password = ? ', [email, password ], (err, row) => {
        if (err) {
            res.status(500).send('Error retrieving data');
        } else if (!row) {
            res.status(404).send('Invalid username or password. User does not exist');
        } else {
            res.status(200).json(row);
        }
    });
});

//create new user on sign up page
app.post('/api/signup', (req, res) => {
    const { email, password} = req.body;
    db.run(`INSERT INTO users (email, password ) VALUES (?, ?)`,
        [ email, password],
        function (err) {
            if (err) {
                res.status(500).send('Error inserting data');
            } else {
                res.status(201).json({ id: this.lastID });
            }
    });
});
