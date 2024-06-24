/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FIND_COURSES_FORM_DATA } from '../../constants';
import { IFindCourseFormData } from '../../types';
import { findCourseSchema } from '../../validationSchemas/findCourseSchema';
import { useAppDispatch } from '../../app/hooks';
import * as aiActions from '../../slices/aiSlice';
import { FindCourseButton } from '../FindCourseButton';

import styles from './FindCourseForm.module.scss';

export const FindCourseForm = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<IFindCourseFormData>({
    resolver: yupResolver(findCourseSchema),
  });

  const onSubmit = async (data: IFindCourseFormData) => {
    await dispatch(aiActions.getCourses(data));
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      {FIND_COURSES_FORM_DATA.map(({ label, value, fieldName }) => (
        <label
          className={styles.label}
          key={label}
        >
          {label}

          <textarea
            placeholder={value}
            className={styles.textarea}
            {...register(fieldName)}
          />
        </label>
      ))}

      <FindCourseButton type="button" />
    </form>
  );
};
