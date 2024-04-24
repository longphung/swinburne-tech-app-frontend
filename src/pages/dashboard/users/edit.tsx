import EditUser from "@/components/EditUser";
import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { UserData } from "@/interfaces";

const UsersEdit = () => {
  const { id } = useParams();
  const { data } = useOne<UserData>({
    resource: "users",
    id,
  });
  return (
    <>
      {data?.data ? (
        <EditUser userData={data.data} titleText="Edit User" />
      ) : null}
    </>
  );
};

export default UsersEdit;
