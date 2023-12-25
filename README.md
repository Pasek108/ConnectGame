# ConnectGame Readme
<details>
  <summary>❓Why my commits often have no names and I'm not using branches❓</summary>
  <ul>
    <li>I often create with bursts many things at once</li>
    <li>I don't plan things ahead, I just create things that seems good at that moment</li>
    <li>Sometimes I have bad internet connection and it is troublesome to send commits</li>
    <li>I'm coding alone so creating branches and describing commits is not useful for me</li>
  <ul>
</details>

## Table of Contents
* [Informations](#informations)
  * [Technologies](#technologies)
  * [Features](#features)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details](#details)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

## Informations
Small set of connections-based puzzle games about recreating right connections beetween objects.<br>
See [live demo](https://tic-tac-toe-alqu.onrender.com).

![preview](/_for_readme/preview.png)

----------------------------------

### Technologies
Languages:
- HTML5
- CSS3
- JS ES2018

Libraries and frameworks:
- [LESS](https://lesscss.org)
- [FontAwesome](https://fontawesome.com) 6.1.1
- [GoogleFonts](https://fonts.google.com)
- [canvas-confetti v1.5.1](https://www.npmjs.com/package/canvas-confetti)
  
Programs:
- [VSCode](https://code.visualstudio.com)
- [Prepros](https://prepros.io) (auto preview, processing less)
  
----------------------------------

### Features
- Menu background animation
- Four game modes:
  - Squares (with 3 levels of difficulty) - moving and rotating blocks to make all of them correctly connected to each other
  - Bridges - connecting all islands together with horizontal and vertical bridges that cannot cross each other but islands have limited bridges that can connect to them
  - Pipes - rotating pipes to connect all endpoints to the source
  - Sliders - sliding rows or columns of pipes to connect all endpoints to the source
- Three game mode levels editors:
  - Squares
  - Bridges
  - Pipes and Sliders (both use the same editor)
- Genarting random levels for:
  - Squares
  - Pipes and Sliders
- Multiple languages:
  - Polish
  - English

<br>

> [!NOTE]  
> Room for improvements:
> - In-game instruction about game modes
> - Bridges game mode levels generator
> - Creating at least 200, increasingly harder levels for game modes and their difficulties
> - Improving responsiveness on mobile devices
> - Adding more game modes (eg. Flow Free, 1 LINE)
> - Adding more languages
> - Multiplayer

----------------------------------

### Setup
Ways to run this program: 
1. Use the [live demo](https://tic-tac-toe-alqu.onrender.com)
2. Follow the same steps as for editing the program

To edit this program:
- Download this repo
- Download and install Python
- Run app.py file
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Create config.py file in project folder
- Run this code in some online Python IDE
  - *import secrets*
  - *print(secrets.token_hex(16))*
- Put generated string in config.py eg. *SECRET_KEY = "generated_string"*
- Start coding

----------------------------------

### Acknowledgements
- [Simon Tatham's Portable Puzzle Collection](https://www.chiark.greenend.org.uk/~sgtatham/puzzles/)
- [Connect Me - Logic Puzzle](https://play.google.com/store/apps/details?id=net.bohush.connect.me.logic.puzzle&hl=en&gl=US)
- [Hashi (Bridges)](https://play.google.com/store/apps/details?id=ch.aorlinn.bridges&hl=en&gl=US)
- [1 LINE](https://alternativeto.net/software/1-line--connect-the-dots/about/)
- [Flow Free](https://play.google.com/store/apps/details?id=com.bigduckgames.flow&hl=pl&gl=US)

## Details
This section is a general description of the project required to understand how it works, the exact details are in the code or simply are the code.

### User interface
#### Main menu
![main menu](/_for_readme/main_menu.png)


----------------------------------

#### Main menu
![main menu](/_for_readme/main_menu.png)

----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: TicTacToe (project folder)
  - :page_facing_up: *github and prepros config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Images - :page_facing_up: *images used in the project*
  - :file_folder: Js
    - :page_facing_up: *top level script files (eg. menu, language, global utilities)*
    - :file_folder: build - :page_facing_up: *js files compiled by prepros*
    - :file_folder: Views - :page_facing_up: *scripts for views (windows that can create history)*
    - :file_folder: Bridges - :page_facing_up: *scripts for bridges game mode and its levels*
    - :file_folder: Squares - :page_facing_up: *scripts for squares game mode and its levels*
    - :file_folder: PipesAndSliders - :page_facing_up: *scripts for pipes and sliders game mode and its levels*
  - :file_folder: Css
    - :page_facing_up: *css files compiled by prepros*
    - :file_folder: less - :page_facing_up: *less files*

----------------------------------

### Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

Menu is entry of the program.

Menu creates and manages one instance of each of the classes:
- MenuWindow (Credits)
- Difficulty
- TopScore
- Game

Difficulty and TopScore classes are extension of MenuWindow class which is responsible for showing and hiding menu window with transition

Game class creates and manages:
- One instance of RoadBackground class
- Two instances of treesBackground class (left and right side)
- One instance of classes:
  - HealthBar
  - EnergyBar
  - PointsCounter
  - GameOver
- One instance of Player class
- Many instances of classes:
  - Enemy
  - Deer
  - HappyDeer

