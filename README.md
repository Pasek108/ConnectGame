<h1 align="center">ConnectGame - Readme</h1>
<p align="center">
  <strong>
    A small set of connection-based puzzle games about recreating the correct connections between objects
  </strong>
</p>

<div align="center">
  <img src="_for_readme/banner.png?">
</div>

<br>

# Table of Contents
* [Overview :sparkles:](#overview-sparkles)
  * [About](#about)
  * [Features](#features)
  * [Technologies](#technologies)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details :scroll:](#details-scroll)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

# Overview :sparkles:

## About
A small set of connection-based puzzle games about recreating the correct connections between objects.

Check out the [live version](https://pasek108.github.io/ConnectGame/).

<br>

![preview](/_for_readme/preview.png)

## Technologies
Languages:
- JavaScript
- HTML
- CSS

Libraries and frameworks:
- [LESS](https://lesscss.org)
- [FontAwesome](https://fontawesome.com) 6.1.1
- [GoogleFonts](https://fonts.google.com)
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) 1.5.1
  
Programs:
- [VSCode](https://code.visualstudio.com)
- [Prepros](https://prepros.io) (auto preview, processing less and js)

## Features
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

## Setup
Ways to run this program: 
1. Use the [live demo](https://pasek108.github.io/ConnectGame/)
2. Download this repo and start live server ([VSCode LiveServer Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), Prepros preview etc.) 

To edit this program:
- Download this repo
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Start coding

## Acknowledgements
- [Simon Tatham's Portable Puzzle Collection](https://www.chiark.greenend.org.uk/~sgtatham/puzzles/)
- [Connect Me - Logic Puzzle](https://play.google.com/store/apps/details?id=net.bohush.connect.me.logic.puzzle&hl=en&gl=US)
- [Hashi (Bridges)](https://play.google.com/store/apps/details?id=ch.aorlinn.bridges&hl=en&gl=US)
- [1 LINE](https://alternativeto.net/software/1-line--connect-the-dots/about/)
- [Flow Free](https://play.google.com/store/apps/details?id=com.bigduckgames.flow&hl=pl&gl=US)

<br>

# Details :scroll:


## Project structure
- :file_folder: ConnectGame (project folder)
  - :page_facing_up: *github and prepros config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Images - :page_facing_up: *images used in the project*
  - :file_folder: Js
    - :page_facing_up: *top level script files (eg. menu, language, global utilities)*
    - :file_folder: Build - :page_facing_up: *js files compiled by prepros*
    - :file_folder: Views - :page_facing_up: *scripts for views (windows that can create history)*
    - :file_folder: Bridges - :page_facing_up: *scripts for bridges game mode and its levels*
    - :file_folder: Squares - :page_facing_up: *scripts for squares game mode and its levels*
    - :file_folder: PipesAndSliders - :page_facing_up: *scripts for pipes and sliders game mode and its levels*
  - :file_folder: Css
    - :page_facing_up: *css files compiled by prepros*
    - :file_folder: less - :page_facing_up: *less files*

## Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

