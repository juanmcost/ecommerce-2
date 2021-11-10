const seeder = require('mongoose-seed');
const data = require('./data.json');
const db = 'mongodb://localhost/ecommerce';

seeder.connect(db, () => {
    seeder.loadModels(['./models/Products.js']);
    seeder.clearModels(['Product']);
    seeder.populateModels(data, function (err, done) {
        console.log(done);
    });
});
