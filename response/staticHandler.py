import os

from response.requestHandler import RequestHandler

class StaticHandler(RequestHandler):
    def __init__(self):
        self.filetypes = {
            ".html" : "text/html",
            ".js" : "text/javascript",
            ".json" : "application/json",
            ".css" : "text/css",
            ".jpg" : "image/jpeg",
            ".png" : "image/png",
            ".ico" : "image/png",
            "noutfound" : "text/plain"
        }
    
    def find(self, file_path):
        split_path = os.path.splitext(file_path)
        extension = split_path[1]

        try:
            if extension in (".jpg", ".jpeg", ".png", ".ico"):
                self.contents = open("public/{}".format(file_path), "rb")
            else:
                self.contents = open("public/{}".format(file_path), "r", encoding="utf-8")
            
            self.setContentType(extension)
            self.setStatus(200)
            return True
        except:
            self.setContentType("notfound")
            self.setStatus(404)
            return False
    
    def setContentType(self, ext):
        self.contentType = self.filetypes[ext]