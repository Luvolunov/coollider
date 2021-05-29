import UserAPI from '../../api/user.api';

type RoleGuardProps = {
  children: any,
  someRoles: Array<string>;
};

export default function RoleGuard({ children, someRoles }: RoleGuardProps) {
  const { data: user } = UserAPI.current();
  const canSee = !!user?.roles.find(
    (role: any) => !!someRoles.find((roleName) => role.name === roleName)
  );
  return canSee ? children : null;
}
