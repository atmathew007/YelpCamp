var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");

var data = [
        {
            name: "Turner Falls", 
            image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/2f/ad/c0/campsite-on-honey-creek.jpg", 
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},

        {
            name: "Yosemite National Park", 
            image: "https://www.nps.gov/yose/planyourvisit/images/mercedlakeandhd_kennykarst.jpg", 
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"},

        {
            name: "Glacier National Park", 
            image: "http://www.mountainphotography.com/images/large/201207_crackerLakeTent.jpg", 
            description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"} ];

function seedDB() {
    Camp.remove({}, function(err) {
        // if(err) {
        //     console.log(err);
        // }
        // console.log("removed camps");
        // data.forEach(function(seed){
        //     Camp.create(seed, function(err, camp) {
        //         if(err) {
        //             console.log(err);
        //         } else {
        //             console.log("added");
        //             Comment.create(
        //                 {text:"Awesome Place!!!",
        //                 author:"ABC"
        //                 }, function(err, comment) {
        //                     if(err) {
        //                         console.log(err);
        //                     } else {
        //                         camp.comments.push(comment);
        //                         camp.save();
        //                         console.log("New Comment");
        //                     }
        //                 });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;