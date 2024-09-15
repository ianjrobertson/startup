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
