import { Navigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { AppRoute, ValueOf } from '../../types';
import { AccountLayout } from '../../pages';

type Props = {
  children: React.ReactElement;
  redirectPath?: ValueOf<typeof AppRoute>;
};

export const ProtectedRoute: React.FC<Props> = ({
  children,
  redirectPath = AppRoute.ROOT,
}) => {
  const { user } = useAppSelector(store => store.auth);

  const hasUser = Boolean(user);

  if (!hasUser) {
    return (
      <Navigate
        to={redirectPath}
        replace
      />
    );
  }

  return <AccountLayout>{children}</AccountLayout>;
};
