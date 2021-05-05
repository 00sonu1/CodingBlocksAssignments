const methodOverride = require('method-override');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

mongoose.connect("mongodb://localhost/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));
app.use(express.static("public")); 
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


var commentSchema = new mongoose.Schema({
  comment: {type: String, required:true}
})
var Comment = mongoose.model('Comment',commentSchema);

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now},
  comments: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
});

var Blog = mongoose.model('Blog', blogSchema);


app.get('/', function(req, res) {
  res.redirect('/blogs');
})

app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

app.get('/blogs/new', function(req, res) {
  res.render('new');
});

app.post('/blogs', function(req, res) {
  Blog.create(req.body.blog, function(err, newBlog) {
    if(err) {
      res.render('new');
    } else {
      res.redirect('/blogs');
    }
  }) 
});

app.get('/blogs/:id', function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if(err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {blog: foundBlog});
    }
  })
});

app.get('/blogs/:id/edit', function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if(err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  })
});

app.put('/blogs/:id', function(req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if(err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  })
});

app.delete('/blogs/:id', function(req, res) {
  Blog.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  })
});

app.post('/blogs/:id/comment', (req,res)=>{
  Blog.findById(req.params.id, function(err) {
    if(err) {
      res.redirect('/blogs');
    } else {
      const comment = new Comment(req.body);
      console.log(comment)

      Blog.comments=comment._id;

      let newBlog=  new Blog();

      // Comment.save();
      Blog:blogSchema.save();
      res.redirect('/blogs');
    }
  })
})

app.listen(3000, function(req, res) {
  console.log("Blog server running on port 3000...")
})
