// database.js


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./recipe.db');


const resetDatabase = () => {
  db.serialize(() => {
    // Drop existing tables (adjust based on your schema)
    db.run("DROP TABLE IF EXISTS users");
    db.run("DROP TABLE IF EXISTS recipes");
    db.run("DROP TABLE IF EXISTS users_recipes");
    db.run("DROP TABLE IF EXISTS categories");
    db.run("DROP TABLE IF EXISTS sub_categories");
    db.run("DROP TABLE IF EXISTS cat_subcat_type_recipe");
     db.run("DROP TABLE IF EXISTS recipe_types");

    db.run("DROP  INDEX  IF EXISTS users_recipes_1");
    db.run("DROP INDEX IF EXISTS cat_subcat_type_recipe_1");

    console.log("Existing tables dropped.");




        let users = [
          {
            user_id: "1",
            
            email: "user1@gmail.com",
            password: "user1",
          },
          {
            user_id: "2",
            
            email: "user2@gmail.com",
            password: "user2",
          } 
        ];
        db.run(
          `CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT,  email text NOT NULL,password text NOT NULL)`,
          (err) => {
             
              // Table just created, creating some rows
              var insert = "INSERT INTO users (user_id, email, password) VALUES (?, ?,?)";
              users.map((user) => {
                db.run(insert, [
                  `${user.user_id}`,
                   
                  `${user.email}`,
                  `${user.password}`,
                ]);
              });
             
          }
        );


        let recipes = [
          {
            recipe_id: "1",
            title: "Peri-peri Chicken Tray Bake",
            instructions: "<p>Preheat your oven to 220C / 200C fan / gas mark 7 / 425F.</p><p></p><p>Mix together all the marinade ingredients in a large bowl.</p><p></p><p>Turn the chicken thighs/legs in the marinade and place on a large oven tray.</p><p></p><p>Place the peppers and onions into the marinade, turn to coat and place on the oven tray.</p><p></p><p>Ensure everything is well spread out on the oven tray. (Use 2 oven trays if necessary.)</p><p></p><p>Place the oven tray into your preheated oven and roast for 40-45 minutes, until the chicken is cooked all the way through and the vegetables are slightly charred round the edges.</p><p></p><p>Serve with your choice of Parmentier Potatoes, Nandos Spicy Rice, Homemade Chips or Sweet Potato Wedges, and a green salad.</p>",
            ingredients: "<p><strong>Peri Peri Marinade:</strong></p><ul><li><ul><li>1 tablespoon olive oil</li><li>2 teaspoons chilli flakes</li><li>4 cloves garlic grated or crushed</li><li>Juice of 2 limes</li><li>2 teaspoons smoked paprika</li><li>2 teaspoons oregano</li><li>½ teaspoon salt</li><li>Black pepper to taste</li></ul></li></ul><p><strong>Traybake:</strong></p><ul><li><ul><li>8 chicken thighs or legs (skin on and bone in)</li><li>3 (bell) peppers (mix of red/yellow/orange) cut into thick slices</li><li>2 red onions cut into thick wedges</li></ul></li></ul><p><strong>To serve:</strong></p><ul><li><ul><li>Your choice of Parmentier Potatoes, Nandos Spicy Rice, Homemade Chips or Sweet Potato Wedges</li><li>Green Salad</li></ul></li></ul><p>Prep Time 15minutes minutes</p><p>Cook Time 40minutes minutes</p><p>Total Time 55minutes minutes</p>",
            image_path: "/img/recipe/periperichicken.jpg"
          },
          {
            recipe_id: "2",
            title: "Bruschetta with Beef Tartare",
            instructions: "<p>Step 1</p><p>Heat the oven to 180˚С. Whisk the yolks with mustard. Add olive oil, whisking until smooth.</p><p></p><p>Step 2</p><p>Chop the veal finely. Combine meat, sauces, gherkins, onions, capers, parsley, salt and pepper. Add to egg mixture. Mix delicately until well combined. You should get an even thick mass.</p><p></p><p>Step 3</p><p>Slice the bread. Dry in the oven for 3-5 minutes. Put the ready tartare on the bruschetta just before serving.</p>",
            ingredients: "<ul><li>400 g veal fillet, cleared of the silver skin</li><li>2 tbsp mustard</li><li>4 egg yolks</li><li>100 ml olive oil</li><li>½ small red onion, peeled and finely chopped</li><li>3-4 gherkins, finely chopped</li><li>5 capers, finely chopped</li><li>¼ bunch of parsley, finely chopped</li><li>2 tbsp soy sauce</li><li>1½ tbsp Worcester sauce</li><li>10-12 drops of Tabasco sauce</li><li>salt</li><li>ground black pepper</li><li>dark bread</li></ul>",
            image_path: "/img/recipe/bruschetta.jpg"
          },
          {
            recipe_id: "3",
            title: "Mexican Pasta with Salsa Roja",
            instructions: "<p>Step 1</p><p>Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.</p><p></p><p>Step 2</p><p>While pasta is cooking, heat olive oil over medium heat in a large skillet. Cook onions and bell pepper in oil until lightly browned, about 10 minutes.</p><p></p><p>Step 3</p><p>Stir in corn and heat through. Stir in black beans, tomatoes, salsa, olives, seasoning mix, and salt and pepper and cook until thoroughly heated, about 5 minutes.</p><p></p><p>Step 4</p><p>Toss sauce with cooked pasta and serve.</p>",
            ingredients: "<ul><li>½ pound seashell pasta</li><li>2 tablespoons olive oil</li><li>2 onions, chopped</li><li>1 green bell pepper, chopped</li><li>½ cup sweet corn kernels</li><li>1 (15 ounce) can black beans, drained</li><li>1 (14.5 ounce) can peeled and diced tomatoes</li><li>¼ cup salsa</li><li>¼ cup sliced black olives</li><li>1 ½ tablespoons taco seasoning mix</li><li>salt and pepper to taste</li></ul>",
            image_path: "/img/recipe/mexicanpasta.jpg"
          }
        ];
        db.run(
          `
           CREATE TABLE recipes (
              recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              instructions TEXT,
              ingredients TEXT,
              image_path TEXT
          );
          `,
          (err) => {
             
              // Table just created, creating some rows
              var insert = "INSERT INTO recipes (recipe_id, title, instructions, ingredients,image_path) VALUES (?,?,?,?,?)";
              recipes.map((recipe) => {
                db.run(insert, [
                  `${recipe.recipe_id}`,
                  `${recipe.title}`,
                  `${recipe.instructions}`,
                  `${recipe.ingredients}`,
                  `${recipe.image_path}`,
                ]);
              });
             
          }
        );
         


        let users_recipes = [
          {
            user_id: 1,
            recipe_id: 1 
          },
          {
            user_id: 1,
            recipe_id: 2 
          }
         
          ,
          {
            user_id: 2,
            recipe_id: 1 
          }
        ];
        /*
        `CREATE TABLE users_recipes (user_id INTEGER NOT NULL,recipe_id INTEGER NOT NULL, UNIQUE (user_id,recipe_id) ON CONFLICT REPLACE)`,
          
          */

        db.run(
          `
          CREATE TABLE users_recipes (
          user_id INTEGER NOT NULL,
          recipe_id INTEGER NOT NULL,
          CONSTRAINT users_recipes_users_FK FOREIGN KEY (user_id) REFERENCES users(user_id),
          CONSTRAINT users_recipes_recipes_FK FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
        );

        `,
          (err) => {
             
              // Table just created, creating some rows
              var insert = "INSERT INTO users_recipes (user_id, recipe_id ) VALUES (?, ?)";
              users_recipes.map((user_recipe) => {
                db.run(insert, [
                  `${user_recipe.user_id}`,
                  `${user_recipe.recipe_id}` 
                ]);
              });
             
          }
        );

        //db.serialize(() => {
          db.run("CREATE UNIQUE INDEX users_recipes_1 ON users_recipes (user_id,recipe_id)");
        //});

        let categories = [
          {
            cat_id: "1",
            name: "Asian",
            image_path: "/img/asian.jpg",
            
          },
          {
            cat_id: "2",
            name: "Italian",
            image_path: "/img/shrimp.jpg",
             
          },
          {
            cat_id: "3",
            name: "Mexican",
            image_path: "/img/nacho.jpg",
             
          },
        ];
        db.run(
          `CREATE TABLE categories (cat_id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL, image_path text NOT NULL )`,
          (err) => {
             
              // Table just created, creating some rows
              var insert = "INSERT INTO categories (cat_id, name ,image_path) VALUES (?, ? ,? )";
              categories.map((category) => {
                db.run(insert, [
                  `${category.cat_id}`,
                  `${category.name}` ,
                  `${category.image_path}` 
                ]);
              });
             
          }
        );

        let sub_categories = [
          {
            subcat_id: "1",
            name: "Breakfast",
            
          },
          {
            subcat_id: "2",
            name: "Lunch",
             
          },
          {
            subcat_id: "3",
            name: "Dinner",
             
          },{
            subcat_id: "4",
            name: "Dessert",
             
          },
        ];
        db.run(
          `CREATE TABLE sub_categories (subcat_id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL )`,
          (err) => {
             
              // Table just created, creating some rows
              var insert = "INSERT INTO sub_categories (subcat_id, name ) VALUES (?, ? )";
              sub_categories.map((sub_category) => {
                db.run(insert, [
                  `${sub_category.subcat_id}`,
                  `${sub_category.name}` 
                ]);
              });
             
          }
        );

        let recipe_types = [
          {
            type_id: "1",
            name: "Chicken",
            
          },
          {
            type_id: "2",
            name: "Lamb",
             
          },
          {
            type_id: "3",
            name: "Beef",
             
          },{
            type_id: "4",
            name: "Cake",
             
          },{
            type_id: "5",
            name: "Cookie",
             
          }
        ];
        db.run(
          `CREATE TABLE recipe_types (type_id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL )`,
          (err) => {
             
              // Table just created, creating some rows
              var insert = "INSERT INTO recipe_types (type_id, name ) VALUES (?, ? )";
              recipe_types.map((recipe_type) => {
                db.run(insert, [
                  `${recipe_type.type_id}`,
                  `${recipe_type.name}` 
                ]);
              });
             
          }
        );



        let cat_subcat_type_recipe = [
          {
            cat_id: 1,
            subcat_id: 2,
            type_id: 2,
            recipe_id: 1 
          },
          {
            cat_id: 2,
            subcat_id: 2,
            type_id: 3,
            recipe_id: 2
          },
          {
            cat_id: 3,
            subcat_id: 3,
            type_id: 1,
            recipe_id: 3
          }
         
         
        ];

        // `CREATE TABLE cat_subcat_type_recipe (cat_id INTEGER NOT NULL,subcat_id INTEGER NOT NULL,type_id INTEGER NOT NULL,recipe_id INTEGER NOT NULL, UNIQUE (cat_id,subcat_id,type_id,recipe_id) ON CONFLICT REPLACE)`,

        db.run(
          
          `
          CREATE TABLE cat_subcat_type_recipe (
          cat_id INTEGER NOT NULL,
          subcat_id INTEGER NOT NULL,
          type_id INTEGER NOT NULL,
          recipe_id INTEGER NOT NULL,

          CONSTRAINT cat_subcat_type_recipe_cat_id_FK FOREIGN KEY (cat_id) REFERENCES categories(cat_id),
          CONSTRAINT cat_subcat_type_recipe_subcat_id_FK FOREIGN KEY (subcat_id) REFERENCES sub_categories(subcat_id),
          CONSTRAINT cat_subcat_type_recipe_type_id_FK FOREIGN KEY (type_id) REFERENCES recipe_types(type_id),
          CONSTRAINT cat_subcat_type_recipe_recipe_id_FK FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
         
        );

        `,
         (err) => {
             
              // Table just created, creating some rows
              var insert = "INSERT INTO cat_subcat_type_recipe (cat_id, subcat_id ,type_id, recipe_id) VALUES (?, ?,?, ?)";
              cat_subcat_type_recipe.map((cat_subcat_type_recipe1) => {
                db.run(insert, [
                  `${cat_subcat_type_recipe1.cat_id}`,
                  `${cat_subcat_type_recipe1.subcat_id}`,
                  `${cat_subcat_type_recipe1.type_id}`,
                  `${cat_subcat_type_recipe1.recipe_id}`,
                ]);
              });
             
          }
        );

       // db.serialize(() => {
          db.run("CREATE UNIQUE INDEX cat_subcat_type_recipe_1 ON cat_subcat_type_recipe (cat_id,subcat_id,type_id,recipe_id)");
       // });


    console.log("Tables recreated.");
 



 
  });

   
};

resetDatabase();

 