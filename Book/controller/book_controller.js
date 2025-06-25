// const Books = require('../model/bookmodel');

const books = require('../model/bookmodel')

module.exports={
    getallbooks: (req,res)=>{
        res.json(books)
    },
    getbyid:(req,res)=>{
        const value=books.find((book)=>book.id===parseInt(req.params.id));
        if (!value) 
            return res.status(404).json({message:'Task not found'})
        res.status(200).json(value)
    },
    searchbook: (req, res) => {
        const searchQuery = req.query.search;
        if (!searchQuery) return res.status(400).json({ message: 'No search query provided' });

        const result = books.filter((b) =>
            b.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (result.length === 0)
            return res.status(404).json({ message: 'No books match your search' });

        res.json(result);
    },
    addbook:(res,req)=>{
        const {title, author, publishyear, genre,rented} = req.body;
        const newbook= {
        id:books.length+1,
        title, author, publishyear, genre,rented
        }
        books.push(newbook)
        return res.json(books)
    },
    // updatebook:(res,req)=>{
    //       const value=books.find((book)=>book.id===parseInt(req.params.id));
    //       value.title = req.body.title;
    //       res.json(value)
    // },
      updatebook: (req, res) => {
        const book = books.find((b) => b.id === parseInt(req.params.id));
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const { title, author, publishyear, genre } = req.body;
        if (title) book.title = title;
        if (author) book.author = author;
        if (publishyear) book.publishyear = publishyear;
        if (genre) book.genre = genre;

        res.json(book);
    },

    deletebook:(res,req)=>{
        const index=books.findIndex((book)=>book.id===parseInt(req.params.id));
        if (index === -1) 
                return res.status(404).json({ message: 'Book not found' });
          
        books.splice(index, 1);
        res.json({ message: 'Task deleted' });

    },
    rentbook:(req,res)=>{
        const value=books.find((book)=>book.id===parseInt(req.params.id));
        if (!value) 
                return res.status(404).json({ message: 'Book not found' });
        const {rented} = req.body

        value.rented = rented;

        res.json(value)
    },
    sortbyyear:(req,res)=>{
        res.json( [...books].sort((a,b)=> a.publishyear - b.publishyear))
    }
}