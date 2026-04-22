from Teacher import Teacher

class Subject:
    def __init__(self, _id: int, name: str, teacher: Teacher):
        self._id: int = _id
        self.name: str = name
        self.teacher: Teacher = teacher