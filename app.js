//import libraries
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var http = require('http').Server(app);
 
//create neccessary objects
var app = express();
var router = express.Router();
 
//you need to update wp with your own database name
var db = monk('mongodb://user:user@ds135537.mlab.com:35537/web_group2'); //db name here
 
 
//use objects in app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(function(req,res,next){
	req.db = db;
	next();
});

//CLIENT SIDE ROUTING
app.set('views', __dirname+'/views');
 
app.get('/home', function(req, res){
  	res.render('home.ejs');
 
});
 
 
//SERVER SIDE ROUTING
app.use('/', router);

//PRODUCT
router.get('/products', function(req, res) {
    req.db.collection('products').find({},{"limit": 100},function(e,docs){
    	res.json(docs);
	});
});
 
router.get('/products/:id', function(req, res){
  	req.db.collection('products').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
});
 
router.put('/products/:id', function(req, res){
  	req.db.collection('products').update({_id: req.params.id}, {
		  productId: req.body.productId,
          productName: req.body.productName, 
          price: req.body.price, 
          description: req.body.description, 
          brand: req.body.brand, 
          producer: req.body.producer,
		  imageurl: req.body.imageurl,
		  productType: req.body.productType
        });
  	req.db.collection('products').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
 
});
 
router.delete('/products/:id', function(req, res){
  	req.db.collection('products').remove({_id: req.params.id}, function(e, doc){
        	res.json(doc);
  	})
});
 
router.post('/products', function(req, res){
  	console.log(req.body);
  	req.db.collection('products').insert(req.body, function(e, docs){
        	res.json(docs);
  	});
});

//PRODUCT CATEGORIES == PRODUCT TYPES???
router.get('/categories', function(req, res) {
    req.db.collection('categories').find({},{"limit": 100},function(e,docs){
    	res.json(docs);
	});
});
 
router.get('/categories/:id', function(req, res){
  	req.db.collection('categories').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
});
 
router.put('/categories/:id', function(req, res){
  	req.db.collection('categories').update({_id: req.params.id}, {
			categoryId: req.body.catergoryId,
        	categoryName: req.body.catergoryName,
        });
  	req.db.collection('categories').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
 
});
 
router.delete('/categories/:id', function(req, res){
  	req.db.collection('categories').remove({_id: req.params.id}, function(e, doc){
        	res.json(doc);
  	})
});
 
router.post('/categories', function(req, res){
  	console.log(req.body);
  	req.db.collection('categories').insert(req.body, function(e, docs){
        	res.json(docs);
  	});
});

//ORDER
router.get('/orders', function(req, res) {
    req.db.collection('orders').find({},{"limit": 100},function(e,docs){
    	res.json(docs);
	});
});
 
router.get('/orders/:id', function(req, res){
  	req.db.collection('orders').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
});
 
router.put('/orders/:id', function(req, res){
  	req.db.collection('orders').update({_id: req.params.id}, {
		  id: req.body.id,
          name: req.body.name, 
		  email: req.body.email,
		  phone: req.body.phone,
		  address: req.body.address,
		  orderDate: req.body.orderDate,
		  total: req.body.total,
        });
  	req.db.collection('orders').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
 
});
 
router.delete('/orders/:id', function(req, res){
  	req.db.collection('orders').remove({_id: req.params.id}, function(e, doc){
        	res.json(doc);
  	})
});
 
router.post('/orders', function(req, res){
  	console.log(req.body);
  	req.db.collection('orders').insert(req.body, function(e, docs){
        	res.json(docs);
  	});
});

//SHOPPING CART
router.get('/shoppingCarts', function(req, res) {
    req.db.collection('shoppingCarts').find({},{"limit": 100},function(e,docs){
    	res.json(docs);
	});
});
 
router.get('/shoppingCarts/:id', function(req, res){
  	req.db.collection('shoppingCarts').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
});
 
router.put('/shoppingCarts/:id', function(req, res){
  	req.db.collection('shoppingCarts').update({_id: req.params.id}, {
		  id: req.body.name,
          name: req.body.name,
        });
  	req.db.collection('shoppingCarts').findOne(req.params.id, function(e, doc){
        	res.json(doc);
  	})
 
});
 
router.delete('/shoppingCarts/:id', function(req, res){
  	req.db.collection('shoppingCarts').remove({_id: req.params.id}, function(e, doc){
        	res.json(doc);
  	})
});
 
router.post('/shoppingCarts', function(req, res){
  	console.log(req.body);
  	req.db.collection('shoppingCarts').insert(req.body, function(e, docs){
        	res.json(docs);
  	});
});

module.exports = app;
// app.listen(8080);
// http.listen(process.env.PORT || 8080, function(){
//     console.log('listening on', http.address().port);
//   });

// var server = app.listen(8080, function(){
//     console.log('Ready on port %d', server.address().port);
// });

app.set( 'port', ( process.env.PORT || 8080 ));

// Start node server at any port hosting give back
app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
});
