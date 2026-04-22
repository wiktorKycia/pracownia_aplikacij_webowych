from Subject import Subject
from Student import Student

class Grades:
    def __init__(self, student: Student, subject: Subject):
        self.grades: list[int] = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade: int):
        if grade < 1 or grade > 6:
            raise ValueError("Grade must be between 1 and 6")
        else:
            self.grades.append(grade)

    def get_grades(self) -> list[int]:
        return self.grades

    def get_average(self) -> float:
        return sum(self.grades) / len(self.grades)