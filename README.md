# VideoGame
The Video Game, for our project. This README file will be updated weekly depending on changes we have made or new ideas that we decide to used in our weekly Standup meetings.

## Download and Running Instructions
1. Ensure that the latest installation of [Python](https://www.python.org/downloads/) 3 is installed, as well as a text editor and [Git](https://git-scm.com/downloads).
	- You can check your version of Python with `python --version`. If this prints "Python 2.x", you're using the wrong version -- but you may still have Python 3 installed: if `python3 --version` also works, you can substitute `python` for `python3` in later commands.
2. Clone this repository by using `git clone` and pasting the repo link.
3. Open up the directory where the repo was cloned in your text editor.
4. Run the `git pull` command to ensure you have the latest version of our code.
5. Open up a terminal window, making sure you are in the project's root directory: `VideoGame/`
6. Install the dependencies for the local server using `python -m pip install -r requirements.txt` from this repository's root directory.
	- After you do this the first time, you won't have to do it again. It doesn't hurt to run it again, though -- `pip` will skip over any already-installed libraries.
7. In the terminal, run the command `python server.py` to start the local Python server.
8. Navigate to `localhost:8000` on your computer in an internet browser to see what the game currently looks like.

You can also run the most recent commit by going to [the GitHub Pages instance](https://ksu-se-2022-teamplusplus.github.io/VideoGame/), also linked in the sidebar.

## Game Information
* characters - old man, basketball
* enemies - sprite pack with cute stuff
* main map - man chasing ball with backyard background
* background - custom made pixel art

## Game Design Ideas
* number of lanes - new lanes would have different colored grass, background would change, basketball would be moving vertically
* sideways basketball hoops that give you a burst and confetti
* if you hit a barrier you would get closer to the old man
* hole in the wall obstacles, old man bursts through them while basketball has to time it correctly
* play death frame for enemies when they run into old man
* something that makes the old man "trip" so that you get more time (max of 3, if you pick up more then you get a bonus of some sort)

## Screen Order Ideas

## Credits
* Ball Graphic - from [Kenney.nl](https://www.kenney.nl/assets/sports-pack) (Creative Commons)
* p5.js TypeScript Definitions - from [the `.zip` linked here](https://stackoverflow.com/a/60693021/)
* Character Graphic - from https://www.pngwing.com/en/free-png-xkfra (Fair Use License DMCA)
* Spinning Monkeys Kevin MacLeod (incompetech.com) - Licensed under [Creative Commons: By Attribution 3.0 License](http://creativecommons.org/licenses/by/3.0/)
