class Movie:
    def __init__(self, rating, title, synopsis, medium_cover_image, url):
        self.rating = rating
        self.title = title
        self.synopsis = synopsis
        self.medium_cover_image = medium_cover_image
        self.url = url
    def __str__(self):
        return f"title : '{self.title}' rating : '{self.rating}'"
