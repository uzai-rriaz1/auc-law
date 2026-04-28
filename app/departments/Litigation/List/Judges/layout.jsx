import LayoutClient from "./component/layoutClient";

const layout = ({ children }) => {
  return (
    <>
      <LayoutClient />
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default layout;
