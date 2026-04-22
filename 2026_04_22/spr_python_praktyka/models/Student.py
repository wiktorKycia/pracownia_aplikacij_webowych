import datetime


class Student:
    def __init__(self, _id: int, first_name: str, last_name: str, birth_date: datetime.date):
        self._id: int = _id
        self.first_name: str = first_name
        self.last_name: str = last_name
        self.birth_date: datetime.date = birth_date

    @property
    def age(self):
        return datetime.date.today().year - self.birth_date.year

    def __str__(self):
        return f'{self.first_name} {self.last_name} ({self.age})'
