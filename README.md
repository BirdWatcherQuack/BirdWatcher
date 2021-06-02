# Birdwatcher (Quack) Application

## Table of contents
 * [Overview](#Overview)
 * [Features](#Features)
 * [Deployment of application](#Deployment-of-application)
 * [Application Code](#Application-Code)
 * [Screenshots](#Screenshots)
 * [Future Developments](#Future-Developments)
 * [License](#License)
 * [Creators and Collaborators](#Creators-and-Collaborators)



# Overview
 Quack is a birdwatcher application which allows for users to view bird sightings (submitted by others) in an interactive map. Users can submit their own bird sightings; they can also learn more about individual birds by clicking on its respective cards.

 This application is centered around the Ottawa area, though users can still technically submit bird sightings from anywhere. 

# Features

  * Entering the application:
     * To enter the Quack website and view its contents, prospective users must either sign up or log in. Quack will confirm if the username and password match its database. 
     * A successful login redirects the user to the homepage.

  * Homepage:
     * The user is presented random HTML `cards` containing images of birds commonly found in the Ottawa area.
     * Hovering over the card with the mouse displays the name of the bird associated with the image, as well as a `Learn More` feature allowing you to view more details about the bird in question. This feature applies to all bird cards.
     * At the bottom of the random selection of birds, there is `View All Birds` link to see the complete list of birds, arranged alphabetically. This option is also available in the navigation bar.
     * by clicking on navigation bar, user can choose which page he/she/they would like to view at the moment.
     * The homepage includes a map containing existing markers. These markers represent bird sightings of the birds from the (above) cards in the homepage. Since the above cards are selected randomly from the database, these markers (and the birds they represent) will naturally be different every time the homepage loads!

  * Add Sighting
     * To add a bird sighting, the user clicks on the `View Map` link - found close to the map - or by clicking the `Add Sighting` in navigation bar.
     * The `/map` route brings you to a large map with two inputs above it. From there, our user chooses two things:
      - The bird you saw; this is an autocomplete list, coming directly from the database, and
      - The map coordinates (where you saw the bird); clicking on the map populates this input with its respective coordinates.
     * You can submit your bird by pressing the after user can press `Submit Bird Sighting For` button to submit your sighting to the database.
     * After submitting, the application redirects you to a `/singlebird:id` page which corresponds to the id of the bird you've submitted. (You don't have to worry about this; our code handles that!)
  
  * View Individual Birds
    * By clicking for more information of a bird, or by submitting a bird, you are brought to a `/singlebird` route, which presents you more specific information about your bird of choice, including its technical name, its top age and weight, and a detailed description.

  * Logging Out
    * At any time, user can log out from the page by clicking “Logout” on the navigation bar. The session terminates and the user is redirected to the sign in/sign up page. Our application also contains `Terms of Service`, and a `Privacy Policy` for security purposes.

 # Deployment of application

   To run the application, [click this link to be taken to the Heroku app.](https://birdwatcherquack.herokuapp.com/)

 # Application Code

   To view application code, [click this link to be taken to the Git repository.](https://github.com/BirdWatcherQuack/BirdWatcher)


 # Screenshots
 ### Login/Sign up page
<img src="./public/images/login.png" alt="Login page" width = "500"/>

  ### Side bar that displays username of logged-in user
<img src="./public/images/sidebar.png" alt="Side bar" width = "150"/>

  ### Home page with location markers (based on birds in above cards)
<img src="./public/images/homepage.png" alt="Home page" width = "500"/>

  ### Single bird description
<img src="./public/images/singlebird.png" alt="Single bird" width = "500"/>

  ### Form to submit a sighting for a bird
<img src="./public/images/submit.png" alt="Sighting page" width = "500"/>

 ### Markers on the map
<img src="./public/images/markers.png" alt="Markers" width = "500"/>

 ### Form to submit new bird
   ![New bird]()


 # Future Developments

The Quack application has a number of features, allowing you to add and view birds and bird sightings. Here are a few ways we can improve our applications going forward.

 * As it stands, the user can sign up using Facebook account. However, we should include a log out process, especially to comply with Facebook logout requirements. 

 * The login/signup page contains icons which allow a user to register through Twitter, Google, or LinkedIn. They currently do not work, but we can later link Quack with these social media accounts in the future, among others.

 * Since the user provides some personal information, we plan to stricten our requirements for password encryption as part of our improved security measures.

 * Furthermre, we would like to create user-specific account information, in which they may view birds they have added, as well as the option to create a “new" bird profile, including its age, weight, description, and to submit their personal photos of the bird they saw. This would require a performant server, as large numbers of images would otherwise slow down the operation of our website.

 * To prevent a user from overflowing the map with markers (in bad faith), we plan on setting up restrictions (e.g., one bird sighting submission per 30 seconds). Moreover, we would create an approval process, for administrators to review and approve the bird sighting/profile before it appears on the website for all to view. These measures would limit false information.

 Many extra features can be added to make Quack website more interactive.

## License
This project is licensed under:

### MIT License ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Creators and Collaborators

* Fabio Miguel Amorim Rodrigues 
* Nwakaego Gift Eze
* Ahmed Hakeem
* Anastasia Sorkin
* Daniel Pisani