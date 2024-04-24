import React, { FC } from "react";
import EditUser from "@/components/EditUser";
import { useGetIdentity } from "@refinedev/core";
import { UserData } from "@/utils/authProvider";

const Profile: FC = () => {
  const { data } = useGetIdentity<UserData>();
  return <EditUser titleText="Profile" userData={data!} />;
};

export default Profile;
