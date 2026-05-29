__copyright__ = "Zespół Szkół Komunikacji"
__author__ = "Jan Kowalski 4e"

import datetime
import json
import os

from models.Grades import Grades
from models.Student import Student
from models.Subject import Subject
from models.Teacher import Teacher
from year_grade import year_grade

BASE_DIR: str = os.path.dirname(os.path.abspath(__file__))

teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades: list[Grades] = []

# Wczytywanie nauczycieli
with open(os.path.join(BASE_DIR, "teachers.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        _id, name, surname = int(parts[0]), parts[1], parts[2]
        teachers.append(Teacher(_id, name, surname))

# Wczytywanie przedmiotów
with open(os.path.join(BASE_DIR, "subjects.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        _id, name, teacher_id = int(parts[0]), parts[1], int(parts[2])
        teacher = next((t for t in teachers if t._id == teacher_id), None)
        if teacher is None:
            continue
        subjects.append(Subject(_id, name, teacher))

# Wczytywanie uczniów
with open(os.path.join(BASE_DIR, "students.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        _id, first_name, last_name = int(parts[0]), parts[1], parts[2]
        birth_date = datetime.datetime.strptime(parts[3], '%Y-%m-%d').date()
        students.append(Student(_id, first_name, last_name, birth_date))

# Wczytywanie ocen
with open(os.path.join(BASE_DIR, "grades.txt"), encoding="utf-8") as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        parts = line.split()
        student_id, subject_id = int(parts[0]), int(parts[1])
        raw_grades = parts[2].split(",")

        student = next((s for s in students if s._id == student_id), None)
        subject = next((s for s in subjects if s._id == subject_id), None)
        if student is None or subject is None:
            continue

        grade_obj = Grades(student, subject)
        for g in raw_grades:
            grade_obj.add_grade(int(g))
        grades.append(grade_obj)

# Wyświetlanie ocen uczniów
print("Oceny i średnie poszczególnych uczniów")

for student in students:
    print(f"{student}:")
    student_grades = [g for g in grades if g.student._id == student._id]
    for grade_obj in student_grades:
        avg = round(grade_obj.get_average(), 2)
        ocena_koncowa = year_grade(avg)
        grades_str = ", ".join(str(g) for g in grade_obj.get_grades())
        print(f"\t{grade_obj.subject.name}:")
        print(f"\t\tOceny: {grades_str}")
        print(f"\t\tŚrednia: {avg}")
        print(f"\t\tOcena końcowa: {ocena_koncowa}")
    print()

# Eksport uczniów
students_data: list[dict] = []
for student in students:
    student_grades = [g for g in grades if g.student._id == student._id]
    subjects_dict: dict = {}
    for grade_obj in student_grades:
        avg = round(grade_obj.get_average(), 2)
        ocena_roczna = year_grade(avg)
        grades_str = ", ".join(str(g) for g in grade_obj.get_grades())
        subjects_dict[grade_obj.subject.name] = {
            "Oceny": grades_str,
            "Srednia": avg,
            "Ocena roczna": ocena_roczna
        }
    students_data.append({str(student): subjects_dict})

with open(os.path.join(BASE_DIR, "students.json"), "w", encoding="utf-8") as f:
    json.dump(students_data, f, indent=4, ensure_ascii=False)

print("=" * 50)
print()

# Wyświetlanie ocen
for subject in subjects:
    subject_grades_objs = [g for g in grades if g.subject._id == subject._id]
    all_grades: list[int] = []
    for g in subject_grades_objs:
        all_grades.extend(g.get_grades())

    if not all_grades:
        continue

    avg = round(sum(all_grades) / len(all_grades), 2)
    grades_str = ", ".join(str(g) for g in all_grades)
    print(f"{subject.name}:")
    print(f"\tNauczyciel: {subject.teacher}")
    print(f"\tOceny: {grades_str}")
    print(f"\tŚrednia: {avg}")
    print()

# Eksport
subjects_data: list[dict] = []
for subject in subjects:
    subject_grades_objs = [g for g in grades if g.subject._id == subject._id]
    all_grades_list: list[int] = []
    for g in subject_grades_objs:
        all_grades_list.extend(g.get_grades())

    if not all_grades_list:
        continue

    avg = round(sum(all_grades_list) / len(all_grades_list), 2)
    subjects_data.append({
        subject.name: {
            "Nauczyciel": str(subject.teacher),
            "Oceny": all_grades_list,
            "Srednia": avg
        }
    })

with open(os.path.join(BASE_DIR, "subjects.json"), "w", encoding="utf-8") as f:
    json.dump(subjects_data, f, indent=4, ensure_ascii=False)