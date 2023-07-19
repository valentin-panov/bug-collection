import React, { useContext, useEffect, useState } from "react";
import PageTitle from "@components/common/pageTitle/PageTitle";
import { FetchContext } from "@context/FetchContext";
import Card from "@components/common/card/Card";
import IUser from "@interfaces/IUser";
import Image from "next/image";
import s from "./Users.module.scss";
import defaultAvatar from "@images/defaultAvatar.png";
import { MainLayout } from "@layouts/index";

const UserDetailLabel: React.FC<{ text: string }> = ({ text }) => (
  <p className={s.userDetailLabel}>{text}</p>
);

const UserDetail: React.FC<{ user: IUser }> = ({ user }) => (
  <Card>
    <div className={s.cardContent}>
      <div className={s.avatarWrapper}>
        <Image
          src={user.avatar || defaultAvatar}
          alt="avatar"
          width={50}
          height={50}
        />
      </div>

      <div className={s.detailsWrapper}>
        <div className={s.names}>
          {user.firstName} {user.lastName}
        </div>
        <UserDetailLabel text="Bio" />
        {user.bio ? (
          <div
            className={s.bio}
            dangerouslySetInnerHTML={{ __html: user.bio }}
          />
        ) : (
          <div className={s.bio}>No bio set</div>
        )}
      </div>
    </div>
  </Card>
);

const Users: React.FC = () => {
  const fetchContext = useContext(FetchContext);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        return await fetchContext.authAxios.get("users");
      } catch (err) {
        console.log("getUsers error", err);
      }
    };
    getUsers().then((response) => {
      if (response?.status === 200) {
        setUsers(response.data.users);
      } else {
        // error handler
        console.log("getUsers then error", response?.data.message);
      }
    });
  }, [fetchContext]);

  return (
    <MainLayout>
      <PageTitle title="Users" />
      <div className={s.container}>
        {users?.length > 0 &&
          users.map((user: IUser) => (
            <div className={s.cardWrapper} key={user._id}>
              <UserDetail user={user} />
            </div>
          ))}
      </div>
    </MainLayout>
  );
};

export default Users;

// export async function getStaticProps() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const users: IUser[] = response.status === 200 ? await response.json() : [];
//     return {
//       props: { users }, // will be passed to the page component as props
//     };
//   } catch (e) {
//     const users: IUser[] = [];
//     return {
//       props: { users },
//     };
//   }
// }
