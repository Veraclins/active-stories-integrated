import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { rem } from 'styles';
import { RootState } from 'store/rootReducer';
import { logout } from 'state/auth';
import { white } from 'styles/colors';
import { User } from 'state/interfaces';

interface NavigationProps {
  theme: any;
  pathname?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

interface NavItemProps {
  to: string;
  pathname?: string;
}

interface ProfileProps {
  theme: any;
}
interface NavProps {
  authenticated: any;
}

const createInitials = (user: User) => {
  const firstName = user.firstName || user.email;
  const lastName = user.lastName || '';
  const words = [firstName, lastName];
  const initials = words.map(word => word.charAt(0).toUpperCase());
  return initials.join('');
};

const Navigation: React.FunctionComponent<NavigationProps> = ({
  theme,
  pathname,
  onClick,
}) => {
  const history = useHistory();

  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <Main authenticated={authenticated}>
      {authenticated ? (
        <React.Fragment>
          {user?.userRole === 'User' && (
            <NavItem
              pathname={pathname}
              theme={theme}
              onClick={onClick}
              to="/create-story"
            >
              Create a story
            </NavItem>
          )}
          {user && (
            <ProfileContainer>
              <Profile theme={theme}>{createInitials(user)}</Profile>
              <Dropdown theme={theme} onClick={logoutUser}>
                Logout
              </Dropdown>
            </ProfileContainer>
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavItem
            pathname={pathname}
            theme={theme}
            onClick={onClick}
            to="/login"
          >
            Login
          </NavItem>
          <NavItem
            pathname={pathname}
            theme={theme}
            onClick={onClick}
            to="/signup"
          >
            Signup
          </NavItem>
        </React.Fragment>
      )}
    </Main>
  );
};

const NavItem = styled(NavLink)<NavItemProps>`
  border-bottom: ${({ to, pathname }) =>
    pathname && pathname.includes(to) && '2px solid'};
  margin-bottom: ${rem(10)};

  @media screen and (min-width: ${rem(480)}) {
    margin: 0 auto;
  }
`;

const Main = styled.div<NavProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: ${({ authenticated }) =>
    authenticated ? 'space-between' : 'flex-end'};
  @media screen and (min-width: ${rem(480)}) {
    max-width: ${rem(800)};
    flex-direction: row;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.background};
  display: none;
  width: ${rem(100)};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 100%;
  height: ${rem(50)};
  border: ${rem(1)} solid ${white};
  cursor: pointer;
`;

const ProfileContainer = styled.div<ProfileProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 auto;

  &:hover {
    ${Dropdown} {
      display: flex;
    }
  }
`;

const Profile = styled.div<ProfileProps>`
  color: ${({ theme }) => theme.background};
  background: ${({ theme }) => theme.color};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${rem(50)};
  height: ${rem(50)};
  border-radius: 50%;
`;

export default Navigation;
