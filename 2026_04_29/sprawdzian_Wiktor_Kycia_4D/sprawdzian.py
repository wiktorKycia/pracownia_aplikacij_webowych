__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wiktor Kycia 4D"

import datetime
import json

from sprawdzian_Wiktor_Kycia_4D.loan_status import loan_status
from sprawdzian_Wiktor_Kycia_4D.models.Author import Author
from sprawdzian_Wiktor_Kycia_4D.models.Book import Book
from sprawdzian_Wiktor_Kycia_4D.models.Reader import Reader
from sprawdzian_Wiktor_Kycia_4D.models.Loan import Loan

authors: list[Author] = []
books: list[Book] = []
readers: list[Reader] = []
loans: list[Loan] = []

with open("authors.txt", "r") as f:
    for line in f.readlines():
        author_data: list[str] = line.split()
        authors.append(Author(int(author_data[0]), author_data[1], author_data[2]))

with open("books.txt", "r") as f:
    for line in f.readlines():
        book_data: list[str] = line.split()

        author_id: int = int(book_data[2])
        author: Author = [author for author in list(map(lambda a: a if a._id == author_id else None, authors)) if author][0]

        if not author is None:
            books.append(Book(int(book_data[0]), book_data[1], author, int(book_data[3])))

with open("readers.txt", "r") as f:
    for line in f.readlines():
        reader_data: list[str] = line.split()
        readers.append(Reader(
            _id = int(reader_data[0]),
            first_name = reader_data[1],
            last_name = reader_data[2],
            birth_date = datetime.datetime.strptime(reader_data[3],
'%Y-%m-%d').date()
        ))

with open("loans.txt", "r") as f:
    for line in f.readlines():
        loan_data: list[str] = line.split()

        reader_id: int = int(loan_data[0])
        book_id: int = int(loan_data[1])
        days: int = int(loan_data[2])

        reader: Reader = [reader for reader in list(map(lambda r: r if r._id == reader_id else None, readers)) if reader][0]
        book: Book = [book for book in list(map(lambda b: b if b._id == book_id else None, books)) if book][0]

        if not reader is None and not book is None:
            loans.append(Loan(reader, book, days))

print("Historia wypożyczeń")

exported_values: list[dict[str, list[dict[str, str | int]]]] = []

for reader in readers:
    print(f'{reader}:')

    book_lst: list[dict[str, str | int]] = []

    readers_loans: list[Loan] = [loan for loan in list(map(lambda l: l if l.reader is reader else None, loans)) if loan]
    for l in readers_loans:
        print(f'Książka: {l.book}')
        print(f'Dni: {l.days}')
        print(f'Status {loan_status(l.days)}')
        print(f'Opłata: {l.get_free()} zł')

        book_lst.append({"Tytuł": l.book, "Dni":l.days, "Status":loan_status(l.days), "Opłata": l.get_free()})

    person_dict: dict[str, list[dict[str, str | int]]] = {f'{reader}': book_lst}
    exported_values.append(person_dict)
    print()

try:
    with open("readers.json", "w") as f:
        json.dump(exported_values, f, indent=4)
except: pass

print("=" * 30)
print()

exported_values2: list[dict[str, list[dict[str, str | int | float]]]] = []

for book in books:
    print(f'{book.title}:')
    print(f'Autor: {book.author}')
    bks: int = len([loan for loan in list(map(lambda l: l.book if l.book is book else None, loans)) if book])
    print(f'Liczba wypożyczeń: {bks}')
    try:
        avg: float = sum([loan.days for loan in list(map(lambda l: l.book if l.book is book else None, loans)) if book]) / bks
    except:
        avg = 0
    print(f'Średni czas: {avg} dni')
    print()
    book_dct = {"Autor" : book.author, "Wypożyczenia": bks, "Średnia": avg}
    exported_values2.append({f'{book.title}': book_dct})

with open("books.json", "w") as f:
    json.dump(exported_values2, f, indent=4)