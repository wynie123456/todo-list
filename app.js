const express = require("express")
const path = require("path")
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");


//const date = require("./date");



app.set("view engine", "ejs");

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))
//const uri = "mongodb+srv://israelgodwin12345:XlZAVmG8X5vrL5X4@cluster0.cmp55ar.mongodb.net/?retryWrites=true&w=majority/todolistDB";



let see = "WELCOME TO OUR APARTMENT";

const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcom to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to have a new item"
});


const item3 = new Item({
    name: "<-- Hit this to delete an Item"
});

const defaultItems = [item1,  item2, item3];

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);



app.get("/", (req, res) => {

    Item.find({}).then(foundItems => {
        if(foundItems.length === 0) { 

      Item.insertMany(defaultItems).then(Item => {
    console.log("item added to default succesesfully")
    res.redirect("/")
}) 
        } else {
            res.render("list",  {listTitle: "today", newListItems: foundItems})
        }
    })

    //const day = date.getDate();
    
})


 app.get("/:customListName",   async (req, res) => {

  const customListName = req.params.customListName;
    try {
        const list = await List.findOne({name: customListName}).then(async (error, foundList) => {
            if(error) {

               // console.log(error)
              //  if(!foundList) { 
                   //console.log("does not esist")
                   

                  /*    const list = new List({
                     name: customListName,
                     items: defaultItems
                })
               await list.save();  */
                    
               // }  else{ console.log("exist");
                    //res.render("list", {listTitle: foundList.name}) 

                //}

              //  if(foundList  === true) { console.log("exist");}

             
                
            } else {};

        });
       // list.save();
           
} 
catch  {  } 


 

});  



app.post("/", (req, res)=> {
     itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    })
   
    item.save();
    res.redirect("/");
    
});

app.post("/delete", (req, res) => {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove(checkedItemId).then(Item => { 
        console.log("successfully deleted checked item");
        
    });
    res.redirect("/")
})


app.get("/about", (req, res) => {
  
    res.render("about", { now: see });
    
});
app.get("/listing", (req, res) => { res.send("<h1>Hello</h1>")})

app.listen(3000, (req, res) => {
    console.log("Server is running at port 3000");
});