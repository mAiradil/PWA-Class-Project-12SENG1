// database.js


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./recipe.db');

 /*
db.serialize(() => {
  db.run("Drop TABLE cat_subcat_type_recipe");
}); 
db.serialize(() => {
  db.run("Drop TABLE categories");
}); 
db.serialize(() => {
  db.run("Drop TABLE recipe_types");
});
db.serialize(() => {
  db.run("Drop TABLE recipes");
});
db.serialize(() => {
  db.run("Drop TABLE sub_categories");
});
db.serialize(() => {
  db.run("Drop TABLE users");
});
db.serialize(() => {
  db.run("Drop TABLE users_recipes");
});
 */
/*
db.run(
  `Drop TABLE cat_subcat_type_recipe`,
  (err) => {
    if (err) {
    } else {}
  }
);

db.run(
  `Drop TABLE categories`,
  (err) => {
    if (err) {
    } else {}
  }
);

db.run(
  `Drop TABLE recipe_types`,
  (err) => {
    if (err) {
    } else {}
  }
);

db.run(
  `Drop TABLE recipes`,
  (err) => {
    if (err) {
    } else {}
  }
);

db.run(
  `Drop TABLE sub_categories`,
  (err) => {
    if (err) {
    } else {}
  }
);
db.run(
  `Drop TABLE users`,
  (err) => {
    if (err) {
    } else {}
  }
);
db.run(
  `Drop TABLE users_recipes`,
  (err) => {
    if (err) {
    } else {}
  }
);

*/


let users = [
  {
    user_id: "1",
    name: "User 1",
    email: "user1@gmail.com",
    password: "user1",
  },
  {
    user_id: "2",
    name: "User 2",
    email: "user2@gmail.com",
    password: "user2",
  },
  {
    user_id: "3",
    name: "User 3",
    email: "user3@gmail.com",
    password: "user3",
  },
];
db.run(
  `CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL,email text NOT NULL,password text NOT NULL)`,
  (err) => {
     
      // Table just created, creating some rows
      var insert = "INSERT INTO users (user_id, name, email, password) VALUES (?, ?,?,?)";
      users.map((user) => {
        db.run(insert, [
          `${user.user_id}`,
          `${user.name}`,
          `${user.email}`,
          `${user.password}`,
        ]);
      });
     
  }
);

 
let recipes = [
  {
    recipe_id: "1",
    title: "Recipes 1",
    instructions: "Recipes 1 instructions",
    ingredients: "Recipes 1 ingredients<br>Recipes 1 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "2",
    title: "Recipes 2",
    instructions: "Recipes 2 instructions",
    ingredients: "Recipes 2 ingredients<br>Recipes 2 ingredients ",
    image_path: "/img/recipe/steak-food.jpg"
  },
  {
    recipe_id: "3",
    title: "Recipes 3",
    instructions: "Recipes 3 instructions",
    ingredients: "Recipes 3 ingredients<br>Recipes 3 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "4",
    title: "Recipes 4",
    instructions: "Recipes 4 instructions",
    ingredients: "Recipes 4 ingredients<br>Recipes 3 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "5",
    title: "Recipes 5",
    instructions: "Recipes 5 instructions",
    ingredients: "Recipes 5 ingredients<br>Recipes 5 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "6",
    title: "Recipes 6",
    instructions: "Recipes 6 instructions",
    ingredients: "Recipes 6 ingredients<br>Recipes 6 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "7",
    title: "Recipes 7",
    instructions: "Recipes 7 instructions",
    ingredients: "Recipes 7 ingredients<br>Recipes 7 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "8",
    title: "Recipes 8",
    instructions: "Recipes 8 instructions",
    ingredients: "Recipes 8 ingredients<br>Recipes 8 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "9",
    title: "Recipes 9",
    instructions: "Recipes 9 instructions",
    ingredients: "Recipes 9 ingredients<br>Recipes 3 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "10",
    title: "Recipes 10",
    instructions: "Recipes 10 instructions",
    ingredients: "Recipes 10 ingredients<br>Recipes 10 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "11",
    title: "Recipes 11",
    instructions: "Recipes 11 instructions",
    ingredients: "Recipes 11 ingredients<br>Recipes 11 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
  {
    recipe_id: "12",
    title: "Recipes 12",
    instructions: "Recipes 12 instructions",
    ingredients: "Recipes 12 ingredients<br>Recipes 12 ingredients ",
    image_path: "/img/recipe/Alfredo.jpg"
  },
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
  ` ,
(err) => {
      // Table just created, creating some rows
      var insert = "INSERT INTO recipes (recipe_id, title, instructions, ingredients,image_path) VALUES (?,?,?,?,?)";
      recipes.map((recipe) => {
        db.run(insert, [
          `${recipe.recipe_id}`,
          `${recipe.title}`,
          `${recipe.instructions}`,
          `${recipe.ingredients}`,
          `${recipe.image_path}`
        ]);
      });
     
  }
);


let users_recipes = [
  {
    user_id: 1,
    recipe_id: 11 
  },
  {
    user_id: 1,
    recipe_id: 12 
  }
  ,
  {
    user_id: 1,
    recipe_id: 1 
  }
  ,
  {
    user_id: 1,
    recipe_id: 14 
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

db.serialize(() => {
  db.run("CREATE UNIQUE INDEX users_recipes_1 ON users_recipes (user_id,recipe_id)");
});

let categories = [
  {
    cat_id: "1",
    name: "Asian",
    
  },
  {
    cat_id: "2",
    name: "Italian",
     
  },
  {
    cat_id: "3",
    name: "Mexican",
     
  },
];
db.run(
  `CREATE TABLE categories (cat_id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL )`,
  (err) => {
     
      // Table just created, creating some rows
      var insert = "INSERT INTO categories (cat_id, name ) VALUES (?, ? )";
      categories.map((category) => {
        db.run(insert, [
          `${category.cat_id}`,
          `${category.name}` 
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
    type_id: 1,
    recipe_id: 1 
  },
  {
    cat_id: 1,
    subcat_id: 2,
    type_id: 2,
    recipe_id: 4
  }
  ,{
    cat_id: 1,
    subcat_id: 2,
    type_id: 3,
    recipe_id: 5
  }
  ,{
    cat_id: 1,
    subcat_id: 3,
    type_id: 1,
    recipe_id: 2
  }
  ,{
    cat_id: 1,
    subcat_id: 3,
    type_id: 2,
    recipe_id: 6
  }
  ,{
    cat_id: 1,
    subcat_id: 3,
    type_id: 3,
    recipe_id: 7
  }
  ,{
    cat_id: 1,
    subcat_id: 2,
    type_id: 1,
    recipe_id: 3
  }
  ,{
    cat_id: 1,
    subcat_id: 3,
    type_id: 1,
    recipe_id: 11
  }
  ,{
    cat_id: 1,
    subcat_id: 3,
    type_id: 1,
    recipe_id: 12
  }
  ,{
    cat_id: 1,
    subcat_id: 2,
    type_id: 1,
    recipe_id:11
  }
  ,{
    cat_id: 1,
    subcat_id: 2,
    type_id: 1,
    recipe_id:10
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

db.serialize(() => {
  db.run("CREATE UNIQUE INDEX cat_subcat_type_recipe_1 ON cat_subcat_type_recipe (cat_id,subcat_id,type_id,recipe_id)");
});





/*
// Create a table if not exists
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
});

module.exports = db;

*/