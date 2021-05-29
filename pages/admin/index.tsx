import React, { useEffect } from 'react';
import { setTitle } from '../../store/title';
import styles from './admin.module.scss';
import Glass from '../../shared/components/glass/glass.component';
import UserAPI from '../../shared/api/user.api';
import CourseAPI from '../../shared/api/course.api';
import Spinner from '../../shared/components/spinner/spinner.component';

export default function AdminPage() {
  const { data: users } = UserAPI.count();
  const { data: courses } = CourseAPI.count();
  useEffect(() => {
    setTitle('Админка');
  });
  return (
    <div className={styles.widgetList}>
      <div className={styles.widgetOuter}>
        <Glass>
          <div className={styles.widget}>
            Users:
            &nbsp;
            {
              users
                ? users.body.count
                : <Spinner />
            }
          </div>
        </Glass>
      </div>
      <div className={styles.widgetOuter}>
        <Glass>
          <div className={styles.widget}>
            Courses:
            &nbsp;
            {
              courses
                ? courses.body.count
                : <Spinner />
            }
          </div>
        </Glass>
      </div>
    </div>
  );
}
