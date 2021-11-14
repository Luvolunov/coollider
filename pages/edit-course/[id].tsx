/* eslint-disable jsx-a11y/control-has-associated-label,object-curly-newline,no-param-reassign,react/jsx-one-expression-per-line */
import React, {
  FormEvent, useCallback, useEffect, useRef, useState,
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { setTitle } from '../../store/title';
import styles from './edit-course.module.scss';
import Textfield from '../../shared/components/textfield/textfield.component';
import Button from '../../shared/components/button/button.component';
import { useForm } from '../../shared/hooks/useForm.hook';
import { courseSchema } from '../../shared/schemas/course.schema';
import Card from '../../shared/components/card/card.component';
import { CourseInterface } from '../../shared/types/course.interface';
import Modal from '../../shared/components/modal/modal.component';
import { lessonSchema } from '../../shared/schemas/lesson.schema';
import { ApiResponse } from '../../shared/types/api-response.interface';
import { Lesson } from '../../shared/types/lesson.interface';
import { buildUrl } from '../../shared/utils/build-url';
import { Roles } from '../../shared/types/roles.enum';
import { User } from '../../shared/types/user.interface';
import Checkbox from '../../shared/components/checkbox/checkbox.component';
import { getCourse } from '../../shared/utils/get-course.function';

type EditCourseProps = {
  course: CourseInterface
};

type LessonProps = {
  lesson: Lesson,
  removeLesson: (id: number) => void,
  index: number;
  moveLesson: (from: number, to: number) => void;
};

const LessonRow = ({ lesson, removeLesson, index, moveLesson }: LessonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dragProps, drag] = useDrag({
    type: 'lesson',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => ({ index }),
  });
  const [, drop] = useDrop({
    accept: 'lesson',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: any, monitor) => {
      const itemIndex = item.index;
      if (itemIndex === index || !ref.current) { return; }

      const hoverLessonRect = ref.current?.getBoundingClientRect();
      const middlePoint = (hoverLessonRect.bottom - hoverLessonRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverLessonRect.top;
      if ((itemIndex < index && hoverClientY < middlePoint)
        || (itemIndex > index && hoverClientY > middlePoint)) { return; }
      setTimeout(() => moveLesson(itemIndex, index));
      item.index = index;
    },
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={styles.lesson}
      style={{
        opacity: dragProps.isDragging ? 0 : 1,
        cursor: dragProps.isDragging ? 'move' : 'pointer',
      }}
    >
      <button
        type="button"
        className={styles.dragButton}
        title="move lesson"
      />
      <div>
        <span className={styles.lessonName}>
          {lesson.name}
        </span>
        <span className={styles.rating}>
          <b>{lesson.rating || 0}</b> ({lesson.ratingsCount || 0})
        </span>
      </div>

      <div>
        <Link href="/edit-lesson/[id]" as={`/edit-lesson/${lesson.id}`}>
          <button
            type="button"
            className={styles.editButton}
            title="delete lesson"
          >
            <img className={styles.buttonImage} src="/settings.svg" alt="delete lesson" />
          </button>
        </Link>
        <button
          onClick={() => removeLesson(lesson.id)}
          type="button"
          className={styles.removeButton}
          title="delete lesson"
        >
          <img className={styles.buttonImage} src="/delete.svg" alt="delete lesson" />
        </button>
      </div>
    </div>
  );
};

export default function EditCoursePage({ course }: EditCourseProps) {
  const {
    values,
    valid,
    handleInput,
    handleCheckbox,
    errors: courseErrors,
  } = useForm(courseSchema, course);
  const {
    handleInput: handleLessonInput,
    errors: lessonErrors,
    values: lessonValues,
    valid: lessonFormValid,
    handleCheckbox: handleLessonCheckbox,
  } = useForm(lessonSchema, { available: true });
  const router = useRouter();
  const [showing, setShowing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [lessonCreating, setLessonCreating] = useState(false);
  const [lessons, setLessons] = useState<Array<Lesson>>(course.lessons || []);
  const updateCourse = async () => {
    if (processing) { return; }
    setProcessing(true);
    const body = {
      ...values,
      lessons: lessons.map((lesson) => ({
        lessonId: lesson.id,
        order: lesson.order,
      })),
    };
    await fetch(`/api/course/${course.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    setProcessing(false);
    await router.push('/admin/courses');
  };
  const createLesson = async (event: FormEvent) => {
    event.preventDefault();
    if (lessonCreating) { return; }
    const data = { ...lessonValues, courseId: course.id };
    setLessonCreating(true);
    const response = await fetch('/api/lesson/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const lesson = await response.json() as ApiResponse<Lesson>;
    if (lesson.success) {
      setLessons([...lessons, lesson.body]);
    }
    setLessonCreating(false);
    setShowing(false);
  };
  const removeLesson = async (lessonId: number) => {
    if (!window.confirm('Вы точно хотите удалить урок?')) { return; }
    await fetch(`/api/lesson/${lessonId}`, {
      method: 'DELETE',
    });
    setLessons(lessons?.filter((lesson) => lesson.id !== lessonId));
  };
  const moveLesson = useCallback((fromIndex: number, toIndex: number) => {
    const updatedLessons = lessons.slice();
    if (toIndex > fromIndex) {
      const currentSlide = lessons[fromIndex];
      currentSlide.order = toIndex + 1;
      updatedLessons.splice(toIndex + 1, 0, currentSlide);
      updatedLessons.splice(fromIndex, 1);
    } else {
      const currentSlide = lessons[toIndex];
      currentSlide.order = fromIndex + 1;
      updatedLessons.splice(fromIndex + 1, 0, currentSlide);
      updatedLessons.splice(toIndex, 1);
    }
    const changedOrderLessons = updatedLessons
      .map((lesson, idx) => ({ ...lesson, order: idx + 1 }));
    setLessons(changedOrderLessons);
  }, [lessons]);
  useEffect(() => {
    setTitle('Редактировать курс');
  });
  return (
    <>
      <Head>
        <title>
          {course.name}
          &nbsp;|&nbsp;Редактирование&nbsp;|&nbsp;Куллайдер
        </title>
      </Head>
      <Card>
        <div className={styles.formContainer}>
          <div className={styles.mainInfo}>
            <Textfield
              errors={courseErrors.name}
              value={values.name}
              name="name"
              onInput={handleInput}
              placeholder="Название курса"
            />
            <Textfield
              errors={courseErrors.imageUrl}
              value={values.imageUrl}
              name="imageUrl"
              onInput={handleInput}
              placeholder="Ссылка на картинку"
            />
            <Textfield
              fieldType="textarea"
              errors={courseErrors.description}
              value={values.description}
              name="description"
              onInput={handleInput}
              placeholder="Описание курса"
            />
            <Checkbox
              checked={values.published}
              name="published"
              onChange={handleCheckbox}
            >
              Опубликован
            </Checkbox>
            <br />
            <br />
            <Button
              processing={processing}
              onClick={updateCourse}
              disabled={!valid}
            >
              Сохранить
            </Button>
          </div>
          <div className={styles.lessonsPanel}>
            <button onClick={() => setShowing(true)} type="button" className={styles.addLessonButton}>
              <img width={50} src="/plus.svg" alt="plus" />
            </button>
            <br />
            <div className={styles.lessonList}>
              {
                lessons?.map((lesson, index) => (
                  <LessonRow
                    key={`${lesson.id}${lesson.name}`}
                    lesson={lesson}
                    removeLesson={removeLesson}
                    index={index}
                    moveLesson={moveLesson}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </Card>
      <Modal showing={showing} onRequestToClose={() => setShowing(false)}>
        <form onSubmit={createLesson}>
          <span className={styles.modalTitle}>Создать урок</span>
          <Textfield errors={lessonErrors.name} name="name" onInput={handleLessonInput} placeholder="Название урока" />
          <Checkbox
            checked={lessonValues.available}
            onChange={handleLessonCheckbox}
            name="available"
          >
            Доступен
          </Checkbox>
          <br />
          <br />
          <Button processing={lessonCreating} type="submit" disabled={!lessonFormValid}>Создать</Button>
        </form>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (Number.isNaN(+ctx.params?.id!)) {
    return { props: {}, notFound: true };
  }
  const res = await fetch(buildUrl('/user/profile'), {
    headers: {
      Cookie: ctx.req.headers.cookie || '',
    },
  });
  const { body: user } = await res.json() as ApiResponse<User>;
  const canSee = !!user?.roles.find((role) => Roles.CanCreateCourse === role.id);
  if (!user || !canSee) {
    return {
      notFound: true,
      props: {},
    };
  }
  const { success, body } = await getCourse(ctx, true);
  if (!success) {
    return { props: {}, notFound: true };
  }
  return { props: { course: body } };
};
