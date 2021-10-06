import React from 'react';
import UserAPI from '../../shared/api/user.api';
import ProfilePage from '../../shared/pages/profile-page';

export default function Profile() {
  const { data: user } = UserAPI.current();
  return (
    <ProfilePage user={user!} />
  );
}
