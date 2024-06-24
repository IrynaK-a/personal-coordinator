import cn from 'classnames';
import { useEffect, useMemo } from 'react';
import { ReactComponent as AvatarIcon } from '../../../assets/icons/avatar.svg';
import { ReactComponent as DoneIcon } from '../../../assets/icons/done.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as userActions from '../../slices/userSlice';
import { DataStatus } from '../../types';
import { Loader } from '../../components';

import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { userInfo, authRequestStatus } = useAppSelector(state => state.user);

  const isLoading = authRequestStatus === DataStatus.PENDING;
  const hasInfo = !isLoading && !!userInfo;

  const completedTasksPercentage = useMemo(() => {
    if (userInfo) {
      const { completedTasks, totalTasks } = userInfo;
      const resultValue = Math.round((completedTasks / totalTasks) * 100);

      return resultValue || 0;
    }

    return 0;
  }, [userInfo]);

  useEffect(() => {
    if (user) {
      dispatch(userActions.getUserInfo());
    }
  }, [dispatch, user]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}

      {hasInfo && (
        <>
          <div className={styles.personInfoContainer}>
            <AvatarIcon className={styles.avatar} />

            <div className={styles.personInfo}>
              <div className={styles.name}>{userInfo.name}</div>
              <div className={styles.emailContainer}>
                <span>email:</span>
                <span className={styles.email}>{userInfo.email}</span>
              </div>
            </div>
          </div>

          <div className={styles.statistics}>
            <h3 className={styles.statisticsTitle}>Overview</h3>

            <div className={styles.statisticCard}>
              <h4 className={styles.cardTitle}>Completed tasks</h4>

              <div
                className={cn(
                  styles.valueContainer,
                  styles.percentageValueContainer,
                )}
              >
                <DoneIcon />

                <span className={styles.percentageValue}>
                  {completedTasksPercentage}%
                </span>
              </div>

              <div className={styles.valueContainer}>
                <span className={styles.valueContainerTitle}>
                  completed tasks
                </span>
                <span className={styles.absoluteValue}>
                  {userInfo.completedTasks}
                </span>
              </div>

              <div className={styles.valueContainer}>
                <span className={styles.valueContainerTitle}>total tasks</span>
                <span className={styles.absoluteValue}>
                  {userInfo.totalTasks}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
