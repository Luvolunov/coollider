import React, { useEffect } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setTitle } from '../../store/title';
import styles from './admin.module.scss';
import Glass from '../../shared/components/glass/glass.component';
import UserAPI from '../../shared/api/user.api';
import CourseAPI from '../../shared/api/course.api';

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
            &nbsp;
            Users:
            &nbsp;
            <b>
              {
                users
                  ? users.body.count
                  : <FontAwesomeIcon icon={faSpinner} spin />
              }
            </b>
          </div>
        </Glass>
      </div>
      <div className={styles.widgetOuter}>
        <Glass>
          <div className={styles.widget}>
            &nbsp;
            Courses:
            &nbsp;
            <b>
              {
                courses
                  ? courses.body.count
                  : <FontAwesomeIcon icon={faSpinner} spin />
              }
            </b>
          </div>
        </Glass>
      </div>
    </div>
  );
}
