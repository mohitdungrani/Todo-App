module.exports = function(app){
    var bodyParser = require('body-parser');
    var mongoose = require('mongoose');

    mongoose.connect('mongodb+srv://test:test@cluster0.nrarj.mongodb.net/todo?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });

    var todoSchema = new mongoose.Schema({
        item: String
    });

    var Todo = mongoose.model('Todo', todoSchema);

    var urlencodedParser = bodyParser.urlencoded({extended: false});

    app.get('/todo', function(req, res){
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos : data});
        });        
    });

    app.post('/todo', urlencodedParser, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
        
    });

    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
};