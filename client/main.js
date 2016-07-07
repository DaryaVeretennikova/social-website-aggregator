import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


//Routing

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to: 'navbar'
  });
  this.render('websiteMain', {
    to: 'main'
  });
});

// Router.route('/images', function () {
//   this.render('navbar', {
//     to: 'navbar'
//   });
//   this.render('images', {
//     to: 'main'
//   });
// });
//
Router.route(':_id', function () {
  this.render('navbar', {
    to: 'navbar'
  });
  this.render('detailPage', {
    to: 'main',
    data: function() {
      return Websites.findOne({_id: this.params._id});
    }
  });
});

//end Routing

//comments

Comments.ui.config({
   template: 'bootstrap',
   defaultAvatar: function() {
     var size = Math.round(Math.random() * 100);
     return 'http://placekitten.com/' + size +'/' + size +'/';
   }()
});

// /end comments

/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
    return Websites.find({}, {sort: {rating: -1}});

    //return Images.find({}, { sort: { createdOn: -1, rating: -1 }, limit: Session.get('imageLimit') });
  }
});


/////
// template events
/////

Template.website_item.events({
  "click .js-upvote":function(e){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;

    console.log(Meteor)

    Websites.update(
      website_id,
      {$set: {
        rating: ++this.rating,
        upvotedCounter: ++this.upvotedCounter
      }}
    );

    console.log(this)

    console.log("Up voting website with id "+website_id);
    // put the code in here to add a vote to a website!

    return false;// prevent the button from reloading the page
  },
  "click .js-downvote":function(event){

    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;

    Websites.update(
      website_id,
      {$set: {
        rating: --this.rating,
        downvotedCounter: ++this.downvotedCounter
      }}
    );

    console.log("Down voting website with id "+website_id);

    // put the code in here to remove a vote from a website!

    return false;// prevent the button from reloading the page
  }
})

Template.website_form.events({
  "click .js-toggle-website-form":function(event){
    $("#website_form").toggle('slow');
  },
  "submit .js-save-website-form":function(event){

    // here is an example of how to get the url out of the form:
    var url = event.target.url.value;
    var title = event.target.title.value;
    var description = event.target.description.value;

    if (url && description) {
      Websites.insert({
        url: url,
        title: title || 'Noname title',
        description: description,
        createdOn: new Date(),
        createdBy: Meteor.user()._id,
        rating: 0,
        upvotedCounter: 0,
        downvotedCounter: 0
      })


      $('#website_form')
        .find('input').val('');
      $('#website_form').toggle('slow');
    } else {
      alert('Add and url and a description to add new website!')
    }



    console.log(url, title, description)
    console.log("The url they entered is: "+url);

    //  put your website saving code in here!

    return false;// stop the form submit from reloading the page

  }
});
