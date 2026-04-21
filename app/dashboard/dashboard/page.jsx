import AuthCheck from "@/app/authWrapper/authCheck";
import DepartmentCard from "../../components/layout/DepartmentCard";
import Departmentheader from "../../components/layout/Departmentheader";

const Dashboard = () => {
  const handleclick = () => {};
  return (
    <>
      <AuthCheck>
        <Departmentheader />
        <DepartmentCard />
      </AuthCheck>
    </>
  );
};

export default Dashboard;
