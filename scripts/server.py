import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map[".html"] = "text/html"
Handler.extensions_map[".js"] = "text/javascript"
Handler.extensions_map[".jsm"] = "text/javascript"

with socketserver.TCPServer(("", PORT), Handler) as httpd:
	print("Serving HTTP at port ", PORT)
	httpd.serve_forever()
