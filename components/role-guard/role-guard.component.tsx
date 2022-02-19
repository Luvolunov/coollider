import UserAPI from '../../shared/api/user.api';
import { Roles } from '../../shared/types/roles.enum';

type RoleGuardProps = {
  children: any,
  someRoles: Array<Roles>;
};

export default function RoleGuard({ children, someRoles }: RoleGuardProps) {
  const { data: user } = UserAPI.current();
  const canSee = !!user?.roles.find(
    (role: any) => !!someRoles.find((roleId) => role.id === roleId),
  );
  return canSee ? children : null;
}
