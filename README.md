# startup
Startup Application for BYU CS 260

[notes.md file](notes.md)

# Specification

## Elevator Pitch
A web application that allows users to upload images and locations of hammock spots. A user can create a profile and create a hammock spot to upload to a content sharing page. Each spot includes a geo-location to allow other users to find it, images or videos of the the location, and a description of the spot. Users can save, like, and comment on other hammock spots. 

## Technologies
- **HTML** Login page. Hammock spot feed page. Create/upload spot page. Notification page that shows how others have interacted with your posts. Page for saved spots. 
- **CSS** Profressional, simple clean style. Model after outdoor brand websites such as REI, Patagonia websites. 
- **JavaScript** Login page, content creation page, pull to refresh content page. 
- **React** Content page will have componets for each content post in frames, new content loads as page is scrolled. 
- **Web Service**
  - createPost
  - getNewPosts
  - likePost
  - savePost
  - viewPostLocation: Insert geoLocation with https://openlayers.org/
- **Authentication**
  - All actions need to be authenticated with authToken
  - Users create and verify an account. Create a username that allows them to interact with others. 
- **Database** Login information securely stored. Created posts are stored and associated with accounts. Post interactions are stored and associated with users and posts. 
- **WebSocket** Notify users when other users interact with their posts. Such as saving a hammock spot or saving it.

## Sketchup
![Website Sketch](CS260.png)


## HTML Deliverable 
Created skeleton of web app using several different pages. Included main, notifications, settings, create post and saved spots.
Including placeholder values for API and reactive components. Created links between pages on header. Basic log in page.
On Main page, created cards that represent basic Hammock spot posts, these include options to like, save, and bring up the location for the spots as well as a photo and a a description.



## CSS Deliverable 
Using Bootstrap styling on webpage. Created main.css file for styling and refactored some aspect of the page. 
Refactored header and created buttons. Brought everything onto one row in header. Changed order of links. 
Used accordion for Login input. 
Added styling for hammock cards. 
Styled table for saved spots. 
Added consistent footer throughout page with repo link. 
Tried to make design responsive but there are some possible improvements with header and footer. 
