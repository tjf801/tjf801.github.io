import http.server
import socketserver

PORT = 8080

# print(http.server.SimpleHTTPRequestHandler.extensions_map)

http.server.SimpleHTTPRequestHandler.extensions_map.update(
	{
		'.wasm': 'application/wasm',
		'.js': 'application/javascript',
		'.ts': 'application/typescript',
	}
)

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as tcp_server:
	print("serving at port", PORT)
	tcp_server.serve_forever()