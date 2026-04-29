__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wiktor Kycia 4D"

from sprawdzian_Wiktor_Kycia_4D.models.Book import Book
from sprawdzian_Wiktor_Kycia_4D.models.Reader import Reader


class Loan:
    def __init__(self, reader: Reader, book: Book, days: int):
        self.reader: Reader = reader
        self.book: Book = book
        self.days: int = days

    def get_free(self) -> int:
        return max(0, self.days - 14)

