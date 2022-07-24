const mongoose = require("mongoose");
const data = require("./data");
const userdata = require("./user");
const URL = "mongodb://localhost:27017/amazon";

// useNewUrlParser , useUnifiedTopology , useFindAndModify , and useCreateIndex are no longer supported options.
mongoose.connect(URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
        console.log("Database connected");
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
        console.log("Database connected");
});

const books = data.books;
const users = userdata.users;

 const seedDB = async () => {
         try {
                await db.collection("books").deleteMany({});
                await db.collection("books").insertMany(books);    
                console.log("Collection books created");             
         }
         catch (err)
         {
                console.log("Failed to create collection books: " + err.message);
         }

       //   try {
       //          await db.collection("users").deleteMany({});
       //          await db.collection("users").insertMany(users);
       //          console.log("Collection users created");          
       //   }
       //   catch (err)
       //   {
       //          console.log("Failed to create collection users: " + err.message);
       //   }

};

seedDB().then(() => {
                mongoose.connection.close();
});
