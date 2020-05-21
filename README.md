# Air Tutor
Comp 2800 BBY Group 1
* [Third party APIs](#apis)
* [Soaring Eagles BBY Team 11](#team11)
* [General Info](#general-info)
* [Technologies](#technologies)
* [Getting Started As a Developer](#developer)
* [Database Configurations](#dev-config)
* [Contents](#content)

## Third Party APIs
We would like to start by thanking these third party APIs for allowing us to use their features towards our application. This list includes:

* [Peer.js] (https://peerjs.com/) - for voice chat features
* [Facebook] (https://developers.facebook.com/) - for sharing to social media
* [Twitter] (https://public.twitter.com/) - for sharing to social media
* [Firebase] (https://firebase.google.com/) - for hosting, database, and server side functions
* [Node.js] (https://nodejs.org/) - for managing client-server connections
* [EJS] (https://ejs.co/) - for the implementation of simplified HTML code

## Soaring Eagles BBY Team 11
We are a group of term 1 and term 2 BCIT students who came together during the COVID-19 pandemic with a vision to improve online learning for students and others alike.

* Dylan Sung @dys907
* Kurt Milan @kurtbot
* Christina Raganit @christinaraganit
* Vicly Xinyue Cao @ViclyC

## General Info
Air Tutor is a web application for students who are not doing well with their classes in remote learning. In Air Tutor, students can request help with their homework and tutors can message these students, eventually scheduling a session where both tutors and students can use voice call and canvas features so that the tutor can better teach the material and the student can better understand it. 

The features of this project include:
* A submission feature utilized by students so they can request help for homework
* A messaging feature utilized by tutors so they can communicate their ability to help with their homework
* A scheduling feature utilized by students so they can schedule sessions with a tutor
* A voice call feature utilized by both students and tutors so that tutors can better teach the material and the student can better understand the material
* A canvas feature utilized by both students and tutors so tutors can visually communicate the material and students can show the thought process of their learning
* A live chat feature utilized by both students and tutors where students can ask quick questions about their homework and tutors can respond in real time
* A rating feature utilized by students where they can rate their tutor after a session; this rating will then be displayed in the tutor’s profile page to highlight their credibility
* A Google sign in feature utilized by both students and tutors where they can easily sign in with their Google accounts 
* A social media share feature utilized by both students and tutors where they can share the link with their friends through Facebook or Twitter

## Technologies
Technologies that were used for this project:
* Firebase Hosting
* Firebase Firestore Database
* Firebase Storage
* Firebase Realtime Database
* HTML, CSS
* JavaScript
* Bootstrap 
* SourceTree

## Getting Started As a Developer 
If you want to be a developer for this project:
1. Clone the repository
1. Install the dependencies using:
```npm install```
1. In the repository directory using the terminal window
Install firebase hosting:
```npm install -g firebase-tools```
1. Login to your firebase/google account
1. Deploy using:
	```firebase serve```
1. Open http://localhost:5000 with your browser

## Database Configurations
Our project uses [Firebase](https://firebase.google.com/) as our database. If you would like access to the database we used for the project, please contact Kurt at kmilan@my.bcit.ca to be added as a collaborator.

## Content
Content of the project folder:

```
 Top level of project folder: 
├── .firebaserc               # 
├── .gitignore              # Git ignore file
├── database.rules.json             # 
├── firebase.json              # 
├── firebase-debug.json              # 
├── firebase.indexes.json               # 
├── firestore.rules              # 
├── storage.rules              # 

It has the following subfolders:
├── .firebase                # Folder for firebase
	/hosting.cHVibGlj.cache		#
├── .git                     # Folder for git repo
├── functions                     # 
	├── views		#
		├── pages
			/aboutus.ejs
		├── partials
├── public                    # Folder for static contents
	├── scripts
	├── src
		├── home
		
		├── index
	├── styles
	/404.html


 Top level of project folder: 
├── .gitignore               # Git ignore file
├── 404.html                 # File for error
├── account.html             # displays user stats and contributions
├── index.html               # landing HTML file
├── login.html               # login HTML file
├── main.html                # after logged in, you can make search results for recipes
├── recipe.html              # displays the recipe chosen from the result page. Shows review ratings
├── review.html              # reviews the recipe from recipe page
├── reviewcomplete.html      # confirms that the review has been submitted and rewards experience
├── searchresult.html        # shows the results from the database query
├── upload1.html             # allows you to enter data to create a cooking recipe
├── uploadcomplete.html      # confirms that the upload has been submitted and rewards experience
├── uploadrecipe.html        # shows you a mock up of the recipe page that will appear in search
└── README.md

It has the following subfolders:
├── .firebase                # Folder for firebase
├── .git                     # Folder for git repo
├── images                   # Folder for images
	/chef.png				 # Account page stock profile picture. Taken from https://www.pinterest.com
	/foodhold.jpg 			 # Placeholder picture for all recipe page images. Taken from https://www.fiverr.com
	/logo_navbar.png		 # Logo image used on all nav-bars and footers. Commissioned by Francis Sapanta
	/logo_nobg.png			 # Landing page logo. Commissioned by Francis Sapanta
	/logo_nobg_small.png	 # Placeholder image for all search result cards. Also used for upload complete page. Comisssioned by Francis Sapanta
	/slide1.png				 # Placeholder image for jumbotron images. One of two, taken from https://www.delish.com
	/slide2.png				 # Placeholder image for jumbotron images. Two of two, taken from https://www.wallpaperflare.com
├── scripts                  # Folder for scripts
    /account.js              # This is where all account.html functions are located
	/firebase_api_sunnyside.js 	# This is the file that accesses the firebase api for sunny side cooking
	/main.js              	 # This is where all the main.html functions are located
	/recipe.js               # This is where all the recipe.html functions are located
	/results.js              # This is where all the searchresult.html functions are located
	/review.js               # This is where all the review.html functions are located
	/reviewcomplete.js       # This is where all the reviewcomplete.html functions are located
	/upload.js               # This is where all the upload1.html functions are located
	/uploadcomplete.js       # This is where all the uploadcomplete.html functions are located
	/uploadrecipe.js         # This is where all the uploadrecipe.html functions are located
├── styles                   # Folder for styles
	/account.css         	 # This is where all the account.html styling is located
	/landing.css             # This is where all the index.html styling is located
	/main.css                # This is where all the main.html syling is located
	/recipe.css              # This is where all the recipe.html styling is located
	/review.css              # This is where all the review.html and reviewcomplete.html styling is located
	/searchresult.css        # This is where all the searchresult.html styling is located
	/upload.css         	 # This is where all the upload1.html, uploadcomplete.html and uploadrecipe.html styling is located

Firebase hosting files: 
├── .firebaserc              # Firebase file
├── firebase.json            # Firebase file
├── firestore.indexes.json   # Firebase file
├── firestore.rules          # Rules for read/write to firestore
```



