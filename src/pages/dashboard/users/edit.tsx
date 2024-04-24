import EditUser from "@/components/EditUser";
import { useOne } from "@refinedev/core";
import { UserData } from "@/utils/authProvider";
import { useParams } from "react-router-dom";

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
