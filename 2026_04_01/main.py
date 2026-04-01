import os


class Course:
    def __init__(self, student_id: int, name: str):
        self.student_id: int = student_id
        self.name: str = name


class Student:
    def __init__(self, id: int, name: str, surname: str, age: int):
        self.id: int = id
        self.name: str = name
        self.surname: str = surname
        self.age: int = age

        self.courses: list[Course] = []

    def assign_course(self, course: Course):
        self.courses.append(course)

    def __str__(self):
        courses_names: list[str] = [c.name for c in self.courses]
        return f'{self.name} {self.surname} ({self.age} lat): {", ".join(courses_names)}'


def main():
    if not os.path.isdir('students'):
        os.mkdir('students')

    students_lines: list[str] = []

    with open(os.path.join('Python - zadanie 2', 'students_example.txt'), 'r') as f:
        students_lines = f.readlines()

    students: list[Student] = []

    for line in students_lines:
        arr: list[str] = line.split(',')
        students.append(Student(int(arr[0]), arr[1], arr[2], int(arr[3])))

    del students_lines

    courses_lines: list[str] = []

    with open(os.path.join('Python - zadanie 2', 'courses_example.txt'), 'r') as f:
        courses_lines = f.readlines()

    courses: list[Course] = []

    for line in courses_lines:
        arr: list[str] = line.split(',')
        _id: int = int(arr[0])
        course: Course = Course(_id, (arr[1]).strip())

        courses.append(course)
        students[_id - 1].assign_course(course)

    del courses_lines

    for student in students:
        print(student)
        filename = f"{student.name}_{student.surname}.txt"
        with open(os.path.join('students', filename), "w") as f:
            f.write("Kursy:\n")
            for course in student.courses:
                f.write(f"- {course.name},\n" if course is not student.courses[-1] else f"- {course.name}")


if __name__ == "__main__":
    main()