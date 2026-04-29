__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wiktor Kycia 4D"

from sprawdzian_Wiktor_Kycia_4D.models.Author import Author


class Book:
    def __init__(self, _id: int, title: str, author: Author, year: int):
        self._id: int = _id
        self.title: str = title
        self.author: Author = author
        self.year: int = year

    def __str__(self) -> str:
        return f'{self.title} ({self.year}) {self.author}'