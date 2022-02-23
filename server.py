#!/usr/bin/env python

import sys

# Simple Python version check.
# https://stackoverflow.com/a/48056064/
if sys.hexversion < 0x030600f0:
	version_str = "{}.{}".format(sys.version_info.major, sys.version_info.minor)
	exit("""
You are using Python {}.
This script only works on Python 3.6 and up.
You may need to install a newer version of Python.

Python isn't required beyond this script, so if you have an alternative method
of running a local server that has the proper MIME types and such, you can
abandon Python entirely.""".format(version_str))

import http.server
import socketserver

# Which port to serve HTTP on.
PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

# Correct MIME types, to make JavaScript Modules not error.
Handler.extensions_map[".html"] = "text/html"
Handler.extensions_map[".js"] = "text/javascript"
Handler.extensions_map[".jsm"] = "text/javascript"

with socketserver.TCPServer(("", PORT), Handler) as httpd:
	print("Serving at localhost:" + str(PORT))
	
	# This will serve the page until you press Ctrl+C in the terminal.
	httpd.serve_forever()
