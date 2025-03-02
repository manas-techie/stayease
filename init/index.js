const mongoose = require('mongoose');
const initdata = require('./data1.js');
const Listing = require('../models/listing.js');

main()
    .then(() => {
        console.log("connection succesful")
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/stayease');

}


const initDB = async () => {
    await Listing.deleteMany({});
    initdata.data1 = initdata.data1.map((obj) => ({ ...obj, owner: "67c47a4ce9d6372177dca1e7" }));
    await Listing.insertMany(initdata.data1);
    console.log("Data was intialized");
};

initDB();