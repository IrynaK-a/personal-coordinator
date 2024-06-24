import { Navigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { AppRoute, ValueOf } from '../../types';

type Props = {
  children: React.ReactElement;
  redirectPath?: ValueOf<typeof AppRoute>;
};

export const PublicRoute: React.FC<Props> = ({
  children,
  redirectPath = AppRoute.HOME,
}) => {
  const { user } = useAppSelector(store => store.auth);

  const hasUser = Boolean(user);

  if (hasUser) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return children;
};
