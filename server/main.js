import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // start up function that creates entries in the Websites databases.
    if (!Websites.findOne()){
    	  Websites.insert({
    		title:"Goldsmiths Computing Department",
    		url:"http://www.gold.ac.uk/computing/",
    		description:"This is where this course was developed.",
    		createdOn:new Date(),
        rating: 0,
        upvotedCounter: 0,
        downvotedCounter: 0
    	});
    	 Websites.insert({
    		title:"University of London",
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
    		description:"University of London International Programme.",
    		createdOn:new Date(),
        rating: 0,
        upvotedCounter: 0,
        downvotedCounter: 0
    	});
    	 Websites.insert({
    		title:"Coursera",
    		url:"http://www.coursera.org",
    		description:"Universal access to the world’s best education.",
    		createdOn:new Date(),
        rating: 0,
        upvotedCounter: 0,
        downvotedCounter: 0
    	});
    	Websites.insert({
    		title:"Google",
    		url:"http://www.google.com",
    		description:"Popular search engine.",
    		createdOn:new Date(),
        rating: 0,
        upvotedCounter: 0,
        downvotedCounter: 0
    	});
    }
});
