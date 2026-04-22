class Teacher:
    def __init__(self, _id: int, name: str, surname: str):
        self._id: int = _id
        self.name: str = name
        self.surname: str = surname

    def __str__(self):
        return f'{self.name} {self.surname}'