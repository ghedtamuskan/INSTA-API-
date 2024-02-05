const express = require ('express')
const multer = require ('multer')
const app = express()
const port = 3000;
const methodOverride = require('method-override');
const path = require("path")   // for using folder like views and public

const { v4: uuidv4 } = require('uuid');
uuidv4(); 
app.use (methodOverride("_method"))
app.use (express.urlencoded({extended :true}))


app.set("view engine","ejs")   //setting path ejs
app.set("views" , path.join(__dirname,"views"))    //setting views folder
app.use(express.static (path.join(__dirname,"public")) )   //setting public folder 



// 1 Index route :GET

let posts =[{
    id :uuidv4(),
    image : "img.jpg",
    username : "muskanghedta_",
     bio : "Too many chemicals",
     photos: Math.floor(Math.random()*50)+1,
      followers : Math.floor(Math.random()*1000)+1,
      following : Math.floor(Math.random()*200)+1,
  
    },
  ]


app.get("/posts", (req, res) => {
  res.render("index.ejs",{posts});
});
// 2 POST request : create or add
app.get('/posts/add',(req,res)=>{     //1 serve the form (new info)
  res.render("add.ejs",{posts})

})

app.post("/posts",(req,res)=>{         //2 submit info

  let { username, bio } = req.body;
  let newUserId = uuidv4();
  let newPost = {
    id: newUserId,
    image: "img2.jpg",
    username,
    bio,
    photos: Math.floor(Math.random() * 50) + 1,
    followers: Math.floor(Math.random() * 1000) + 1,
    following: Math.floor(Math.random() * 200) + 1,
  };
  posts.push(newPost);
res.redirect("/posts")
})

// 3 Patch request to edit or update

app.get("/posts/edit/:id",(req,res)=>{
  let {id}=req.params;
  let post = posts.find((p)=> id===p.id)
    res.render("edit.ejs",{post})
  })

// Handle PATCH request to edit or update a post
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newBio = req.body.bio;
  let newUsername = req.body.username
  // Find the post by ID and update the bio
  let post = posts.find((p) => id === p.id);
   post.bio = newBio;
   post.username = newUsername;
 // Redirect to the posts page after updating
  res.redirect("/posts");
});

//4 To delete 
app.delete("/posts/:id",(req,res)=>{
let {id} = req.params;
 posts = posts.filter((p)=> id !==p.id)
res.redirect ("/posts")
})




app.listen (port,()=>{
    console.log (`listening to port : ${port}`)
})
