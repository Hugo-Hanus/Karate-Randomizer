import { makeStyles, Tab, TabList } from "@fluentui/react-components";
import { AppsListDetailFilled, HomeFilled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});

interface selectedV {
  value: string;
}

function NavBar({ value }: selectedV) {
  const styles = useStyles();
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <TabList defaultSelectedValue={value} size="large">
        <Tab
          onClick={() => navigate("/Home")}
          icon={<HomeFilled />}
          value="home"
        >
          Home
        </Tab>
        <Tab
          onClick={() => navigate("/Catalog")}
          icon={<AppsListDetailFilled />}
          value="catalog"
        >
          Catalog
        </Tab>
      </TabList>
    </div>
  );
}

export default NavBar;
