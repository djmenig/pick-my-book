// 1. set up index.ejs as a landing page (before selection)
// 2. set up selection.ejs as the results page (after selection)


import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/selection", async (req, res) => {
    let subject = req.body.selectedSubject;
    const randomBook = await axios.get(`https://openlibrary.org/search.json?subject=${subject}&ebook_access=borrowable&limit=100&sort=random`);
    const selection = randomBook.data.docs[Math.floor(Math.random() * randomBook.data.docs.length)];
    console.log(req.body.selectedSubject);
    res.render("selection.ejs", {
        title: selection.title,
        author: selection.author_name,
        year: selection.first_publish_year,
        link: selection.key,
        cover: selection.isbn[0],
    });
    
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});