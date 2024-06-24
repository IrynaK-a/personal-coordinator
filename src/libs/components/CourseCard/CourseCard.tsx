import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import cn from 'classnames';
import courseImage from '../../../assets/icons/tasks.svg';

import { AppRoute, ICourse, IDefaultCourse } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as coursesActions from '../../slices/coursesSlice';

import styles from './CourseCard.module.scss';

type Props = {
  course: IDefaultCourse;
};

export const CourseCard: React.FC<Props> = ({
  course: { description, name, image = courseImage, link },
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { myCourses } = useAppSelector(state => state.courses);

  const hasInMyCourses = useMemo(() => {
    return !!myCourses?.find(course => course.name === name);
  }, [myCourses, name]);

  const handleAddToMyCourses = async () => {
    const { payload } = await dispatch(
      coursesActions.createNewCourse({
        link,
        name,
        description,
        image,
      }),
    );

    const newCourse = payload as ICourse;
    const hasId = Object.prototype.hasOwnProperty.call(newCourse, 'id');

    if (user && hasId) {
      navigate(`${AppRoute.MY_COURSES}/${newCourse.id}`);
    }
  };

  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.image}
      />

      <div className={styles.info}>
        <Link
          to={link}
          className={styles.link}
          target="_blank"
        >
          <h3 className={styles.title}>{name}</h3>
        </Link>

        <p className={styles.description}>{description}</p>
      </div>

      <button
        type="button"
        className={cn(styles.button, {
          [styles.activeButton]: hasInMyCourses,
        })}
        onClick={handleAddToMyCourses}
        disabled={hasInMyCourses}
      >
        +
      </button>
    </div>
  );
};
