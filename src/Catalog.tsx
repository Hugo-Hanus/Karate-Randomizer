import {
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  Display,
  Divider,
  Text,
  makeStyles,
  Title1,
  Spinner,
  Badge,
} from "@fluentui/react-components";
import NavBar from "./NavBar";
import style from "../src/assets/home.module.css";
import React from "react";
import { Attack } from "./model/Attack";
import { Defense } from "./model/Defense";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});

async function getDefense(): Promise<Defense[]> {
  const data = await fetch("./data/DefenseData.json");
  const json = await data.json();
  return json;
}

async function getAttack(): Promise<Attack[]> {
  const data = await fetch("./data/AttackData.json");
  const json = await data.json();
  return json;
}

const sortAttacksByCategory = (attacks: Attack[]): Attack[][] => {
  return Object.values(
    attacks.reduce((acc, attack) => {
      if (!acc[attack.category]) {
        acc[attack.category] = [];
      }
      acc[attack.category].push(attack);
      return acc;
    }, {} as { [key: string]: Attack[] })
  );
};

function Catalog() {
  const styles = useStyles();
  const [listDefense, setListDefense] = React.useState<Defense[]>([]);
  const [listAttack, setListAttack] = React.useState<Attack[][]>([]);

  React.useEffect(() => {
    const fetchDefenses = async () => {
      return getDefense().then((result) => {
        setListDefense(result);
      });
    };
    const fetchAttack = async () => {
      return getAttack().then((result) => {
        setListAttack(sortAttacksByCategory(result));
      });
    };
    fetchAttack();
    fetchDefenses();
  }, []);

  return (
    <div className={styles.container}>
      <Display align="center">Karate Moves Randomizer</Display>
      <NavBar value="catalog" />
      <section
        style={{
          display: "flex",
          alignItems: "baseline",
          padding: "2rem 0 0 1rem",
        }}
      >
        <Badge
          style={{ marginRight: "1rem" }}
          appearance="filled"
          color="brand"
          size="extra-large"
        />
        <Title1>Tsuki</Title1>
      </section>
      <section className={style.Grid}>
        {listAttack[0] === undefined ? (
          <Spinner />
        ) : (
          listAttack[0].map((tsuki: Attack) => (
            <Card orientation="horizontal">
              <CardPreview>
                <img
                  src={`././data/imgAtk/${tsuki.img}`}
                  alt="App Name Document"
                />
              </CardPreview>

              <CardHeader
                header={<Text weight="semibold">{tsuki.name}</Text>}
                description={<Caption1>{tsuki.level.join(",")}</Caption1>}
              />
            </Card>
          ))
        )}
      </section>
      <Divider />
      <section
        style={{
          display: "flex",
          alignItems: "baseline",
          padding: "2rem 0 0 1rem",
        }}
      >
        <Badge
          style={{ marginRight: "1rem" }}
          appearance="filled"
          color="warning"
          size="extra-large"
        />
        <Title1>Uchi</Title1>
      </section>
      <section className={style.Grid}>
        {listAttack[1] === undefined ? (
          <Spinner />
        ) : (
          listAttack[1].map((uchi: Attack) => (
            <Card orientation="horizontal">
              <CardPreview>
                <img
                  src={`././data/imgAtk/${uchi.img}`}
                  alt="App Name Document"
                />
              </CardPreview>

              <CardHeader
                header={<Text weight="semibold">{uchi.name}</Text>}
                description={<Caption1>{uchi.level.join(",")}</Caption1>}
              />
            </Card>
          ))
        )}
      </section>
      <Divider />
      <section
        style={{
          display: "flex",
          alignItems: "baseline",
          padding: "2rem 0 0 1rem",
        }}
      >
        <Badge
          style={{ marginRight: "1rem" }}
          appearance="filled"
          color="danger"
          size="extra-large"
        />
        <Title1>Geri</Title1>
      </section>
      <section className={style.Grid}>
        {listAttack[2] === undefined ? (
          <Spinner />
        ) : (
          listAttack[2].map((geri: Attack) => (
            <Card orientation="horizontal">
              <CardPreview>
                <img
                  src={`././data/imgAtk/${geri.img}`}
                  alt="App Name Document"
                />
              </CardPreview>

              <CardHeader
                header={<Text weight="semibold">{geri.name}</Text>}
                description={<Caption1>{geri.level.join(",")}</Caption1>}
              />
            </Card>
          ))
        )}
      </section>
      <Divider />
      <section
        style={{
          display: "flex",
          alignItems: "baseline",
          padding: "2rem 0 0 1rem",
        }}
      >
        <Badge
          style={{ marginRight: "1rem" }}
          appearance="filled"
          color="success"
          size="extra-large"
        />
        <Title1>Uke</Title1>
      </section>
      <section className={style.Grid}>
        {listDefense.map((uke: Defense) => (
          <Card orientation="horizontal">
            <CardPreview>
              <img src={`././data/imgDf/${uke.img}`} alt="App Name Document" />
            </CardPreview>

            <CardHeader
              header={<Text weight="semibold">{uke.name}</Text>}
              description={<Caption1>{uke.level.join(",")}</Caption1>}
            />
          </Card>
        ))}
      </section>
      <Divider />
    </div>
  );
}

export default Catalog;
