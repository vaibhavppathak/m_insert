var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://127.0.0.1/vaibhav');
var post_schema = mongoose.Schema({}, {
    strict: false,
    collection: 'pqr'
});
var post = conn.model('post', post_schema);
 
var records = [];
for (var i = 0; i < 10; i++) {
    records.push({
        "name": 'vaibhav' ,
        'dob': '21-12-1994',
    });
}
 
 
insertAndNotify(records, function(err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log('all done!!');
    process.exit();
 
    //continue all insert is done
});
 function insertAndNotify(records, main_callback) {
    async.eachLimit(records, 5, function(row, callback) {
        var new_post = new post({
            title: row.name,
            cat_id: row.dob,
            date: new Date(),
        });
        new_post.save(function(err, row) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                callback();
            }
        });
    }, function(err) {
        main_callback(err);
    });
}