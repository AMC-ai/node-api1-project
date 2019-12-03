// implement your API here
const express = require("express");
const cors = require("cors");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.use(cors());


// intializing comms 
server.get("/", (req, res) => {
    res.send({ api: "up and running..." });
});


// list of users
server.get('/api/users', (req, res) => {
    // Returns an array of all the user objects contained in the database.
    db.find()
        .then(user => {
            res
                .status(200)
                .json(user);
        })
        .catch(error => {
            console.log('error on GET /users', error);
            res
                .status(500)
                .json({ errorMessage: 'The users information could not be retrieved.' });
        });

});


// find user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if (!user) {
                res
                    .status(404)
                    .json({ message: 'The user with the specified ID does not exist.' })
            } else {
                res
                    .json(user);
            }
        })
        .catch(error => {
            console.log('error on GET /users/:id', error);
            res
                .status(500)
                .json({ error: 'The user information could not be retrieved.' });
        });
});

// add a user
server.post('/api/users', (req, res) => {
    // get the data the client sent
    const userData = req.body;
    const { name, bio } = userData
    if (!name || !bio) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        // call the db and add the user
        db.insert(userData)
            .then(user => {
                res
                    .status(201)
                    .json(user);
            })
            .catch(error => {
                console.log('error on POST /users', error);
                res
                    .status(500)
                    .json({ error: 'There was an error while saving the user to the database.' })
            });
    };
});


// remove a user by id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(user => {
            if (!user) {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            } else {
                db.remove(id)
                    .then(user => {
                        res
                            .status(201)
                            .json(user)
                    })
                    .catch(error => {
                        console.log('error on DELETE /users', error);
                        res
                            .status(500)
                            .json({ error: "The user could not be removed" })
                    })
            }
        })

})

// update user, passing the id and changes
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const modify = req.body

    db.findById(id)
        .then(user => {
            if (!user) {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            } else if (!modify.name || !modify.bio) {
                res
                    .status(400)
                    .json({ errorMessage: "Please provide name and bio for the user." })
            } else {
                db.update(id, modify)
                    .then(user => {
                        res
                            .status(200)
                            .json(user)
                    })
                    .catch(error => {
                        console.log('error on PUT /users', error);
                        res
                            .status(500)
                            .json({ error: "The user information could not be modified." });
                    });
            }
        });
});




const port = 4001;

server.listen(port, () =>
    console.log(`\n **API running on port ${port} **\n`)
);