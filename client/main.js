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

// template helpers

// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
    return Websites.find({}, {sort: {rating: -1}});
  }
});

// /end template helpers


// template events

Template.website_item.events({
  "click .js-upvote":function(e){

    var website_id = this._id;

    Websites.update(
      website_id,
      {$set: {
        rating: ++this.rating,
        upvotedCounter: ++this.upvotedCounter
      }}
    );

    return false;// prevent the button from reloading the page
  },
  "click .js-downvote":function(event){

    var website_id = this._id;

    Websites.update(
      website_id,
      {$set: {
        rating: --this.rating,
        downvotedCounter: ++this.downvotedCounter
      }}
    );

    return false;// prevent the button from reloading the page
  }
})

Template.website_form.events({
  "click .js-toggle-website-form":function(event){
    $("#website_form").toggle('slow');




  },
  "submit .js-save-website-form":function(event){

    var url = event.target.url.value;
    var title = event.target.title.value;
    var description = event.target.description.value;

    if (url) {
      Meteor.http.call("GET", url, function(error,result) {
        console.log(error, result)
        if(!error && result.statusCode === 200) {
          var resultContent = result.content;
          var parser = new DOMParser();
          var parsedResult = parser.parseFromString(resultContent, 'text/html');
          var parsedTitle = parsedResult.getElementsByTagName('title')[0].innerHTML;
          var parsedDescription = parsedResult.querySelector("meta[name=\'description\']").content;
        } else {
          alert('Sorry, we can\'t get proper http answer, please fill description field to continue');
        }
     });
    }

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
      });

      $('#website_form')
        .find('input').val('');
      $('#website_form').toggle('slow');

    } else {
      alert('Add and url and a description to add new website!')
    }

    //  put your website saving code in here!

    return false;// stop the form submit from reloading the page

  }
});
