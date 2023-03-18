const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
//const uri         = process.env.MONGODB_URI;

var db = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log("Connected successfully to db server");

    //connect to badbank database
    db = client.db('badbank');
    const collection = db.collection('users');
});

//create user account
function create (name, email, password) {
    return new Promise ((resolve, reject) => {
        const collection  = db.collection ('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne (doc, {w:1}, function(err, result) {
            err ? reject (err) : resolve (doc);
        });
    })
}


// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// login.js
function login(email, password) {
    console.log("DAL: in login");
  
    return new Promise((resolve, reject) => {
      find(email)
        .then((selectedUser) => {
          console.log("DAL: selectedUser.password: " + selectedUser.password);
          console.log("DAL: password: " + password);
  
          if (selectedUser.password !== password) {
            console.log("Password does not equal user");
  
            // for invalid password
            reject(Error("Invalid Password"));
            return;
          }
          console.log("DAL: Logged in successfully");
          console.table(selectedUser);
          resolve(selectedUser);
        })
        .catch(() => {
          reject({ message: "User Not Found In Database" });
        });
    });
  }

// find a user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}


// all users
function all () {
    return new Promise ((resolve, reject) => {
        const customers = db
        .collection ('users')
        .find ({})
        .toArray(function(err, docs) {
            err ? reject (err) : resolve (docs);
        });
    })
}

module.exports = {create ,findOne, find, login, update, all};