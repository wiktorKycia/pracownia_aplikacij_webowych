from models.Teacher import Teacher

class Subject:
    def __init__(self, _id: int, name: str, teacher: Teacher):
        self._id: int = _id
        self.name: str = name
        self.teacher: Teacher = teacher

    def __str__(self):
        return f"{self.name} {self.teacher}"