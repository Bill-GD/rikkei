class Student {
  id: number; // Mã sinh viên duy nhất.
  name: string; // Tên sinh viên.

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Course {
  id: number; // Mã khóa học duy nhất.
  title: string; // Tên khóa học.

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }
}

class Enrollment {
  student: Student; // Thông tin sinh viên.
  course: Course; // Thông tin khóa học.
  scheduleTime: string; // Thời gian học.

  constructor(student: Student, course: Course, scheduleTime: string) {
    this.student = student;
    this.course = course;
    this.scheduleTime = scheduleTime;
  }
}

class StudyManager {
  students: Student[]; // Danh sách sinh viên.
  courses: Course[]; // Danh sách khóa học.
  enrollments: Enrollment[]; // Danh sách thời khóa biểu.

  constructor(students: Student[], courses: Course[], enrollments: Enrollment[]) {
    this.students = students;
    this.courses = courses;
    this.enrollments = enrollments;
  }

  // Thêm sinh viên mới vào danh sách.
  addStudent(name: string): void {
    let ids = this.students.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.students.push(new Student(ids[ids.length - 1] + 1, name));
  }

  // Thêm khóa học mới vào danh sách.
  addCourse(title: string): void {

    let ids = this.courses.map(e => e.id).sort();
    ids.length <= 0 && ids.push(0);
    this.courses.push(new Course(ids[ids.length - 1] + 1, title));
  }

  // Đăng ký khóa học cho sinh viên tại một thời gian cụ thể.
  enrollStudent(studentId: number, courseId: number, scheduleTime: string): void {
    const em = this.students.find(e => e.id = studentId);
    const t = this.courses.find(e => e.id = courseId);
    if (em === undefined || t === undefined) return;
    this.enrollments.push(new Enrollment(em, t, scheduleTime));
  }

  // Hiển thị danh sách thời khóa biểu bao gồm sinh viên, khóa học và thời gian học.
  listEnrollments(): void {
    for (let i = 0; i < this.enrollments.length; i++) {
      const student = this.enrollments[i].student;
      const course = this.enrollments[i].course;
      console.log(
        (i === 0 ? '--ENROLLMENTS--\n' : '') +
        `${i + 1}.\n` +
        ` - Student: ${student.name} (${student.id})\n` +
        ` - Course: ${course.title} (${course.id})\n` +
        ` - Time: ${this.enrollments[i].scheduleTime}\n` +
        '---------------',
      );
    }
  }
}

enum TimeInput {addStudent = 1, addCourse, enroll, list, end}

class TimetableMain {
  run(): void {
    const manager = new StudyManager([], [], []);
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${TimeInput.addStudent}. Thêm sinh viên mới.\n` +
        `${TimeInput.addCourse}. Thêm khóa học mới.\n` +
        `${TimeInput.enroll}. Đăng ký khóa học cho sinh viên.\n` +
        `${TimeInput.list}. Hiển thị thời khóa biểu học tập.\n` +
        `${TimeInput.end}. Dừng chương trình.\n`,
      ));

      switch (input) {
        case TimeInput.addStudent:
          const newName = String(prompt(`Enter new student's name`));
          if (newName.length <= 0) {
            errorText = `Name can't be empty`;
            break;
          }
          manager.addStudent(newName);
          errorText = '';
          break;
        case TimeInput.addCourse:
          const title = String(prompt('Enter course title'));
          if (title.length <= 0) {
            errorText = `Title can't be empty`;
            break;
          }
          manager.addCourse(title);
          errorText = '';
          break;
        case TimeInput.enroll:
          const studentId = Number(prompt('Enter student id'));
          const courseId = Number(prompt('Enter course id'));
          const scheduleTime = String(prompt(
            'Enter schedule time\n\n' +
            'Format:\n' +
            '  mm/dd/yyyy, hh:MM:ss\n\n' +
            '- mm: month\n' +
            '- dd: date\n' +
            '- yyyy: year\n' +
            '- hh: hour\n' +
            '- MM: minute\n' +
            '- ss: second',
          ));
          if (scheduleTime.length <= 0) {
            errorText = `Deadline can't be empty`;
            break;
          }
          if (!scheduleTime.match(/^([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}, [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})$/)) {
            // console.log(`Deadline format is wrong.`);
            errorText = `Deadline format is wrong.`;
            break;
          }
          if (!(new Date(scheduleTime) instanceof Date && !isNaN(new Date(scheduleTime).getTime()))) {
            // console.log(`Deadline value is wrong`);
            errorText = `Deadline value is wrong`;
            break;
          }
          manager.enrollStudent(studentId, courseId, scheduleTime);
          break;
        case TimeInput.list:
          manager.listEnrollments();
          break;
        case TimeInput.end:
          return;
      }
    }
  }
}

const timeApp = new TimetableMain();
