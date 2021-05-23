Task: Develop an application that searches the projects on Github.
The main components of the application:
1. Search field, when the value changes, run a keyword search using the endpoint
https://api.github.com/search/repositories?q=KEYWORD
Hang a debounce (1 second) on the field
2. List of found projects, in the format - user avatar, project name, project rating, project description,
link to the project, in which language the project is composed (e.g. Javascript, Python...), button
to add the project to favorites.
3. Project language selector - once the list of projects is found, a selector with all existing languages
in the list should be displayed. Selecting any value filters the list by the selected language.
4. List of favorite projects - by clicking the add to favorites button (in the project list item) the project
is added to the list of favorite projects (if it was not added earlier). The list of favorites must be
stored in the localStorage and must not be cleared on a new search. It is allowed to make the list
of favorites as a separate block or as a separate router (but requires creating a menu).
Technology requirements:
- React, TypeScript, HTML5, CSS3.
- Nice to use: Redux, Immutable.js
- The code must comply with all current standards and recommendations for writing applications
from the React team .
- Use the https://stackblitz.com/ platform to create the project
