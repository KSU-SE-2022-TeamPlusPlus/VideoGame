#!/usr/bin/env python

# Simple Python version check.
# https://stackoverflow.com/a/48056064/
def check_version():
	import sys
	
	if sys.hexversion < 0x030600f0:
		version_str = "{}.{}".format(sys.version_info.major, sys.version_info.minor)
		exit("""
You are using Python {}.
This server only works on Python 3.6 and up.
You may need to install a newer version of Python.""".format(version_str))

check_version()

# -- ok now the actual script --

import bottle
import sqlite3

# Which port to serve HTTP on.
PORT = 8000

# Correct MIME types, to make JavaScript Modules not error.
bottle.mimetypes.add_type("text/javascript", ".js")

app = bottle.Bottle(catchall = False)

# https://bottlepy.org/docs/dev/recipes.html#ignore-trailing-slashes
@app.hook('before_request')
def strip_path():
	bottle.request.environ['PATH_INFO'] = bottle.request.environ['PATH_INFO'].rstrip("/")

# I don't know a better way to keep our existing folder structure,
# but this works well enough!

@app.route("/")
@app.route("/<filename>")
def server_static(filename="index.html"):
	return bottle.static_file(filename, root="./")

@app.route("/assets/<filepath:path>")
def server_static(filepath):
	return bottle.static_file(filepath, root="./assets/")

@app.route("/source/<filepath:path>")
def server_static(filepath):
	return bottle.static_file(filepath, root="./source/")

@app.route("/tests")
@app.route("/tests/<filepath:path>")
def server_static(filepath="index.html"):
	return bottle.static_file(filepath, root="./tests/")

# Anyway, here's the real backend.

# Submit a score as a JSON string.
@app.post("/scores/post")
def index():
	data = bottle.request.json
	
	name = data['name']
	score = data['score']
	
	# Forbid extremely long names.
	if len(name) > 64:
		return "chill out a bit please."
	
	# Ensure the score is a positive integer without any exponent or anything.
	if not score.isnumeric():
		return "please give your score as a positive integer, thanks."
	
	# Take out all leading zeroes.
	score = score.lstrip('0')
	
	# If we're left with nothing, their score was probably 0.
	if len(score) == 0:
		return "that's nothing to write home about, sorry."
	
	# Otherwise, add it to the leaderboard!
	kon.execute("INSERT INTO scores (name, score) VALUES (?, ?)", (name, score))

# Get the list of scores as a JSON??? string???
@app.get("/scores/get")
def index():
	pass

# HTML Leaderboard
@app.route("/scores")
def index():
	# gross, oops
	meee = """
<!DOCTYPE html>
<meta charset=\"UTF-8\" />
<link rel=\"stylesheet\" type=\"text/css\" href=\"../style.css\" />
<h1>Worldwide Leaderboard</h1>
<table border>
<thead>
<tr><th>#<th>Name<th>Score
<tbody>
"""
	i = 0
	
	cur = kon.cursor()
	cur.execute("SELECT * FROM scores ORDER BY score COLLATE score_compare")
	for (_score_id, name, score) in cur:
		i += 1
		meee += f"<tr><th>{i}<td>{name}<td style=\"text-align: right;\"><code>{score}</code>"
	
	return meee

# Open the database.
kon = sqlite3.connect("hewwo.db")

# Compares two strings of numbers, seeing which one is greater.
def score_compare(a, b):
	la, lb = len(a), len(b)
	
	if la < lb:
		return 1
	elif la > lb:
		return -1
	else:
		for i in range(la):
			if a[i] < b[i]:
				return 1
			elif a[i] > b[i]:
				return -1
	
	return 0

# Properly sort scores
kon.create_collation("score_compare", score_compare)

# Force text to use UTF-8 encoding (???)
kon.execute("PRAGMA encoding = 'UTF-8';")
# kon.text_factory = bytes

# TODO: lol this has to change soon.
# why do scores need a primary key???
# we're only ever gonna show the top 10
# (maybe it's good to keep all of them though?)
kon.executescript("""
	CREATE TABLE IF NOT EXISTS scores (
		id INTEGER PRIMARY KEY NOT NULL,
		name TEXT NOT NULL,
		score TEXT NOT NULL
	);
""")

# Do the thing!!!
app.run(host = "localhost", port = PORT, debug = True)
# ...and then once the program ends,

# Save and close the database.
kon.commit()
kon.close()
