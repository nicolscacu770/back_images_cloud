const mongoose = require('mongoose');

//const mongodb_uri = 'mongodb://localhost/notes-app';
const mongodb_uri = 'mongodb+srv://nicoelduro556:hidesense8790@clusternicolas.5ytne.mongodb.net/images_cloud?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true
// }

//dirección de la BD
mongoose.connect(mongodb_uri)
.then(((db) => console.log("mongodb is connected to: ", db.connection.host)))
.catch((err) => console.error(err));

module.exports = mongoose;
