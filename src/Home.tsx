import {
  Button,
  Display,
  Divider,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Field,
  Input,
  OverlayDrawer,
  RatingDisplay,
  Slider,
  Subtitle2Stronger,
  Title3,
  tokens,
} from "@fluentui/react-components";

import {
  Dismiss24Regular,
  ErrorCircleRegular,
  CheckmarkStarburstFilled,
  DeleteFilled,
} from "@fluentui/react-icons";

import * as React from "react";
import style from "../src/assets/home.module.css";
import { Attack } from "../src/model/Attack";
import CardCombo from "./CardCombo";
import { Defense } from "./model/Defense";
import NavBar from "./NavBar";
import { HistoryCombo } from "./model/HistoryCombo";
import { deleteToCookie, getCookie } from "./service/CookieService";
function Home() {
  const [count, setCount] = React.useState(1);
  const [countOverAll, setCountOverAll] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [sliderTsuki, setSliderTsuki] = React.useState(0);
  const [sliderUchi, setSliderUchi] = React.useState(0);
  const [sliderGeri, setSliderGeri] = React.useState(0);
  const [sliderUke, setSliderUke] = React.useState(0);
  const [allCombos, setAllCombos] = React.useState<Attack[][]>([]);
  const [savedCombos, setAllSavedCombos] = React.useState<HistoryCombo[]>([]);

  React.useEffect(() => {
    let histo = getCookie();
    setAllSavedCombos(histo);
  }, [savedCombos]);

  function validation(addNumber: number, from: string): void {
    setCountOverAll(countOverAll + addNumber);
    from = from;
    verification();
  }

  function generateCombo(
    tsuki: number,
    uchi: number,
    geri: number,
    uke: number
  ): void {
    Promise.all([
      fetch("./data/attackData.json").then((data) => data.json()),
      fetch("./data/defenseData.json").then((data) => data.json()),
    ])
      .then(([attackData, defenseData]) => {
        listing(tsuki, uchi, geri, uke, attackData, defenseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function listing(
    tsukiNB: number,
    uchiNB: number,
    geriNB: number,
    ukeNB: number,
    jsonAttack: Attack[],
    jsonDefense: Defense[]
  ) {
    const arrayTsuki: Attack[] = jsonAttack.filter(
      (element: Attack) => element.category === "Tsuki"
    );
    const arrayUchi: Attack[] = jsonAttack.filter(
      (element: Attack) => element.category === "Uchi"
    );
    const arrayGeri: Attack[] = jsonAttack.filter(
      (element: Attack) => element.category === "Geri"
    );
    let tsukiChoose = getRandomForNumber(
      tsukiNB >= arrayTsuki.length ? arrayTsuki.length - 1 : tsukiNB,
      arrayTsuki.length
    );
    let uchiChoose = getRandomForNumber(
      uchiNB >= arrayUchi.length ? arrayUchi.length - 1 : uchiNB,
      arrayUchi.length
    );
    let geriChoose = getRandomForNumber(
      geriNB >= arrayGeri.length ? arrayGeri.length - 1 : geriNB,
      arrayGeri.length
    );
    let ukeChoose = getRandomForNumber(
      ukeNB >= jsonDefense.length ? jsonDefense.length - 1 : ukeNB,
      jsonDefense.length
    );
    let AllMoves: any = [];
    tsukiChoose.forEach((index) => {
      AllMoves.push(arrayTsuki[index]);
    });
    uchiChoose.forEach((index) => {
      AllMoves.push(arrayUchi[index]);
    });
    geriChoose.forEach((index) => {
      AllMoves.push(arrayGeri[index]);
    });
    ukeChoose.forEach((index) => {
      AllMoves.push(jsonDefense[index]);
    });
    setAllCombos((prevCombos) => [...prevCombos, AllMoves]);
  }

  function getRandomForNumber(numberOfRandom: number, max: number) {
    let arrayOfRandoms: number[] = [];
    for (let i = 0; i < numberOfRandom; i++) {
      let number = Math.floor(Math.random() * max);
      if (arrayOfRandoms.includes(number)) {
        i--;
      } else {
        arrayOfRandoms.push(number);
      }
    }
    return arrayOfRandoms;
  }

  function verification(): boolean {
    return countOverAll === count;
  }

  return (
    <>
      <Display align="center">Karate Moves Randomizer</Display>
      <NavBar value="home" />

      <OverlayDrawer
        modalType="non-modal"
        open={isOpen}
        onOpenChange={(_, { open }) => setIsOpen(open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => {
                  setIsOpen(false);
                  setSliderTsuki(0);
                  setSliderUchi(0);
                  setSliderGeri(0);
                  setSliderUke(0);
                  setCount(1);
                  setCountOverAll(0);
                }}
              />
            }
          >
            Move Filter
          </DrawerHeaderTitle>
          <Field label="Numbers of Move" size="large">
            <Input
              type="number"
              defaultValue="1"
              min="1"
              onChange={(evt) => {
                setCount(Number(evt.currentTarget.value));
                setCountOverAll(0);
                setSliderTsuki(0);
                setSliderUchi(0);
                setSliderGeri(0);
              }}
            />
          </Field>
        </DrawerHeader>

        <DrawerBody>
          <Field label={`Tsuki : ${sliderTsuki}`}>
            <Slider
              onChange={(evt) => {
                setSliderTsuki(Number(evt.currentTarget.value));
                sliderTsuki > Number(evt.currentTarget.value)
                  ? validation(
                      -Math.abs(Number(evt.currentTarget.value) - sliderTsuki),
                      "Tsuki"
                    )
                  : validation(
                      Math.abs(Number(evt.currentTarget.value) - sliderTsuki),
                      "Tsuki"
                    );
              }}
              value={sliderTsuki}
              step={1}
              min={0}
              max={count}
            />
          </Field>
          <Field label={`Uchi : ${sliderUchi}`}>
            <Slider
              onChange={(evt) => {
                setSliderUchi(Number(evt.currentTarget.value));
                sliderUchi > Number(evt.currentTarget.value)
                  ? validation(
                      -Math.abs(Number(evt.currentTarget.value) - sliderUchi),
                      "Uchi"
                    )
                  : validation(
                      Math.abs(Number(evt.currentTarget.value) - sliderUchi),
                      "Uchi"
                    );
              }}
              value={sliderUchi}
              step={1}
              min={0}
              max={count}
            />
          </Field>
          <Field label={`Geri : ${sliderGeri}`}>
            <Slider
              onChange={(evt) => {
                setSliderGeri(Number(evt.currentTarget.value));
                sliderGeri > Number(evt.currentTarget.value)
                  ? validation(
                      -Math.abs(Number(evt.currentTarget.value) - sliderGeri),
                      "Geri"
                    )
                  : validation(
                      Math.abs(Number(evt.currentTarget.value) - sliderGeri),
                      "Geri"
                    );
              }}
              value={sliderGeri}
              step={1}
              min={0}
              max={count}
            />
          </Field>
          <Field label={`Uke : ${sliderUke}`}>
            <Slider
              onChange={(evt) => {
                setSliderUke(Number(evt.currentTarget.value));
                sliderUke > Number(evt.currentTarget.value)
                  ? validation(
                      -Math.abs(Number(evt.currentTarget.value) - sliderUke),
                      "Uke"
                    )
                  : validation(
                      Math.abs(Number(evt.currentTarget.value) - sliderUke),
                      "Uke"
                    );
              }}
              value={sliderUke}
              step={1}
              min={0}
              max={count}
            />
          </Field>
          <RatingDisplay
            size="extra-large"
            icon={
              count === countOverAll
                ? CheckmarkStarburstFilled
                : ErrorCircleRegular
            }
            compact
            value={countOverAll}
            count={count}
          />

          <Button
            appearance="primary"
            title="Generate Combo"
            disabled={!verification()}
            aria-label="GenerateCombo"
            onClick={() => {
              generateCombo(sliderTsuki, sliderUchi, sliderGeri, sliderUke);
              setIsOpen(false);
              setSliderTsuki(0);
              setSliderUchi(0);
              setSliderGeri(0);
              setSliderUke(0);
              setCount(1);
              setCountOverAll(0);
            }}
          >
            Generate Combo
          </Button>
        </DrawerBody>
      </OverlayDrawer>
      <Title3
        align="center"
        style={{
          color: tokens.colorStatusSuccessBorderActive,
          padding: "2rem",
        }}
      >
        Saved Combos
      </Title3>

      {savedCombos.length === 0 ? (
        <Subtitle2Stronger style={{ width: "100%" }} align="center" as="p">
          No Combo Saved
        </Subtitle2Stronger>
      ) : (
        savedCombos.map((combos, index) => (
          <section className={style.Grid}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem",
                }}
              >
                <Subtitle2Stronger align="justify">
                  {combos.name}
                </Subtitle2Stronger>
                <DeleteFilled
                  onClick={() => {
                    deleteToCookie(combos.name);
                  }}
                  style={{
                    fontSize: 20,
                  }}
                />
              </div>
              <CardCombo key={index} title={combos.name} combo={combos.moves} />
            </div>
          </section>
        ))
      )}
      <Divider appearance="strong" />
      <Title3
        align="center"
        style={{
          color: tokens.colorPaletteMarigoldForeground1,
          padding: "2rem",
        }}
      >
        Generated Combos
      </Title3>
      <Button appearance="primary" onClick={() => setIsOpen(!isOpen)}>
        Generate
      </Button>
      <section className={style.Grid}>
        {allCombos.map((combo, index) => (
          <CardCombo key={index} title={"Default :" + index} combo={combo} />
        ))}
      </section>
    </>
  );
}

export default Home;
