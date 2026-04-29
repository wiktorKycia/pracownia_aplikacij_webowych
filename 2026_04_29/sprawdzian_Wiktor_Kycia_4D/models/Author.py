__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Wiktor Kycia 4D"

class Author:
    def __init__(self, _id: int, first_name: str, last_name: str):
        self._id: int = _id
        self.first_name: str = first_name
        self.last_name: str = last_name

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'