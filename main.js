/*
A user should be able to search something in the search bar, and get a list of videos back, with one showing up in the main screen.

AppView should listen to user search
On userSearch, should update model with search term.
AppModel performs the fetch based on user search.
Fetch adds video models to videoscollection.
when new videos added to videos collection, render views

When a user clicks a video in the list on the right, the main video should change to that video.
Each time a user clicks a different video, the title and description beneath the main video should update as well.
When the user first loads the page, there should be a default search so the page is not blank.
*/


//my Youtube API key: AIzaSyC8fgos94ydLf_pDTtLOIIP8HcEhdrSxtM


//append searchString to : https://www.googleapis.com/youtube/v3/search?key=AIzaSyC8fgos94ydLf_pDTtLOIIP8HcEhdrSxtM&part=snippet&q=


var appModel = new AppModel();
var appView = new AppView({ model: appModel });

//to set main video, do a collection.get to find first video (is this 0 or 1?)
