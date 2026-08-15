interface Classroom {
  id: string;
  name: string;
}

interface Lesson {
  id: string;
  title: string;
}

interface EvaluationFiltersProps {
  classrooms: Classroom[];
  lessons: Lesson[];

  selectedClassroom: string;
  selectedLesson: string;

  onClassroomChange: (id: string) => void;
  onLessonChange: (id: string) => void;
}

export default function EvaluationFilters({

  classrooms,

  lessons,

  selectedClassroom,

  selectedLesson,

  onClassroomChange,

  onLessonChange,

}: EvaluationFiltersProps) {

  return (

    <div className="bg-white rounded-2xl shadow p-6 mb-8">

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">

            Turma

          </label>

          <select

            value={selectedClassroom}

            onChange={(e) =>

              onClassroomChange(e.target.value)

            }

            className="border rounded-xl p-3 w-full"

          >

            <option value="">

              Selecione uma turma

            </option>

            {classrooms.map((item) => (

              <option

                key={item.id}

                value={item.id}

              >

                {item.name}

              </option>

            ))}

          </select>

        </div>

        <div>

          <label className="block mb-2 font-semibold">

            Aula

          </label>

          <select

            value={selectedLesson}

            onChange={(e) =>

              onLessonChange(e.target.value)

            }

            className="border rounded-xl p-3 w-full"

            disabled={!selectedClassroom}

          >

            <option value="">

              Selecione uma aula

            </option>

            {lessons.map((lesson) => (

              <option

                key={lesson.id}

                value={lesson.id}

              >

                {lesson.title}

              </option>

            ))}

          </select>

        </div>

      </div>

    </div>

  );

}