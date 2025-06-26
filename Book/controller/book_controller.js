// const Books = require('../model/bookmodel');

const books = require('../model/bookmodel')

module.exports={
    getallbooks: async (req,res)=>{
        const books=await books.find()
        res.json(books)
    },
    getbyid:(req,res)=>{
        const value=books.findById(req.params.id)
        if (!value) 
            return res.status(404).json({message:'Task not found'})
        res.status(200).json(value)
    },
    searchbook: async(req, res) => {
        const searchQuery = req.query.search;
        if (!searchQuery) return res.status(400).json({ message: 'No search query provided' });

        const result =await books.find({
            title:{
                $regex:searchQuery,$options:'i'
            }
        })
        
        // filter((b) =>
        //     b.title.toLowerCase().includes(searchQuery.toLowerCase())
        // );

        if (result.length === 0)
            return res.status(404).json({ message: 'No books match your search' });

        res.json(result);
    },
    addbook:(res,req)=>{
        const newbook= new books(req.body)
        newbook.save()
        return res.json(newbook)
    },
    // updatebook:(res,req)=>{
    //       const value=books.find((book)=>book.id===parseInt(req.params.id));
    //       value.title = req.body.title;
    //       res.json(value)
    // },
      updatebook: async (req, res) => {
        const book = books.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // const { title, author, publishyear, genre } = req.body;
        // book.updateMany({
        //     title:title,
        //     auther:author,
        //     publishyear:publishyear,
        //     genre:genre

        // })

        // await book.save()

        // if (title) book.title = title;
        // if (author) book.author = author;
        // if (publishyear) book.publishyear = publishyear;
        // if (genre) book.genre = genre;

        res.json(book);
    },

    deletebook:async (res,req)=>{
        await books.findOneAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });

    },
    rentbook: async (req,res)=>{
        const value=books.find((book)=>book.id===parseInt(req.params.id));
        if (!value) 
                return res.status(404).json({ message: 'Book not found' });
        const {rented} = req.body

        value.rented = rented;

        await value.save()

        res.json(value)
    },
    sortbyyear :async (req,res)=>{
        const sortedbook= await books.find().sort({
            publishyear:-1
        })
        res.json(sortedbook)

        //  [...books].sort((a,b)=> a.publishyear - b.publishyear)
    }
}