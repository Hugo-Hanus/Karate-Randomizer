import {
  Button,
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
  Image,
  Divider,
  Text,
  Badge,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from "@fluentui/react-components";
import { SaveRegular, CopyRegular } from "@fluentui/react-icons";
import { Attack } from "./model/Attack";
import { Defense } from "./model/Defense";
import React from "react";
import { Move } from "./model/Move";
import { addToCookie } from "./service/CookieService";

interface CardComboProps {
  combo: Move[];
  title: string;
}
async function getDefense(level: string[]): Promise<Defense[]> {
  const data = await fetch("./data/DefenseData.json");
  const json = await data.json();
  return json.filter((defense: Defense) =>
    level.some((lvl) => defense.level.includes(lvl))
  );
}

async function getAttack(level: string[]): Promise<Attack[]> {
  const data = await fetch("./data/AttackData.json");
  const json = await data.json();
  return json.filter((attack: Defense) =>
    level.some((lvl) => attack.level.includes(lvl))
  );
}

function copyClipBoard(name: string, combos: Move[]) {
  const formattedText = `
  Nom: ${name}
  Combos:
  ${combos.map((move, index) => `${index + 1}. ${move.name}`).join("\n")}
`;

  navigator.clipboard.writeText(formattedText);
  alert("Texte copié dans le presse-papiers !");
}

function CardCombo({ combo }: CardComboProps, title: string) {
  const [listDefense, setListDefense] = React.useState<Defense[]>([]);
  const [listAttack, setListAttack] = React.useState<Attack[]>([]);
  const [isOpenDialog, setIsOpenDialog] = React.useState<boolean>(false);
  const [titleCombo, setTitleCombo] = React.useState<string>(title);

  React.useEffect(() => {
    const fetchDefenses = async () => {
      const defenses = await getDefense(
        combo.flatMap((attack) => attack.level)
      );
      setListDefense(defenses);
    };
    const fetchAttack = async () => {
      const attacks = await getAttack(combo.flatMap((attack) => attack.level));
      setListAttack(attacks);
    };
    fetchAttack();
    fetchDefenses();
  }, [combo]);

  return (
    <div>
      <TeachingPopover size="large">
        <TeachingPopoverTrigger>
          <Button style={{ width: "100%" }}>
            <section style={{ width: "100%" }}>
              {combo.map((move: Move) => (
                <div
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    width: "100%",
                    margin: "0.5rem 0rem",
                  }}
                >
                  <Badge
                    style={{ padding: "1rem", width: "100%" }}
                    appearance="filled"
                    color={
                      move.category === undefined
                        ? "success"
                        : move.category === "Tsuki"
                        ? "brand"
                        : move.category === "Uchi"
                        ? "warning"
                        : "danger"
                    }
                    size="extra-large"
                    as="div"
                  >
                    <Text size={500}>{move.name}</Text>
                  </Badge>
                </div>
              ))}
            </section>
          </Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverCarousel defaultValue={"0"}>
            {combo.map((move: Move, index) => (
              <div>
                <TeachingPopoverCarouselCard value={index.toString()}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <section style={{ display: "flex", alignItems: "center" }}>
                      <Badge
                        style={{ marginRight: "1rem" }}
                        appearance="filled"
                        color={
                          move.category === undefined
                            ? "success"
                            : move.category === "Tsuki"
                            ? "brand"
                            : move.category === "Uchi"
                            ? "warning"
                            : "danger"
                        }
                        size="extra-large"
                      />
                      <TeachingPopoverTitle style={{ paddingBottom: "0rem" }}>
                        {move.name}
                      </TeachingPopoverTitle>
                    </section>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <SaveRegular
                        onClick={() => setIsOpenDialog(true)}
                        style={{
                          fontSize: 35,
                        }}
                      />
                      <CopyRegular
                        onClick={() => copyClipBoard(titleCombo, combo)}
                        style={{
                          fontSize: 35,
                        }}
                      />
                    </div>
                  </div>
                  <TeachingPopoverBody
                    media={
                      <Image
                        shadow
                        alt="test image"
                        fit="contain"
                        src={
                          move.category !== undefined
                            ? `././data/imgAtk/${move.img}`
                            : `././data/imgDf/${move.img}`
                        }
                      />
                    }
                  >
                    {move.level.map((lvl: string) => (
                      <section key={lvl}>
                        <div>
                          Level : <span>{lvl}</span>
                        </div>
                        {move.category !== undefined ? (
                          <>
                            <div>Defense :</div>
                            {listDefense
                              .filter((defense) => defense.level.includes(lvl))
                              .map((defense) => defense.name)
                              .join(", ")}
                            <Divider />
                          </>
                        ) : (
                          <>
                            <div>Attack :</div>
                            {listAttack
                              .filter((attack) => attack.level.includes(lvl))
                              .map((attack) => attack.name)
                              .join(", ")}
                            <Divider />
                          </>
                        )}
                      </section>
                    ))}
                  </TeachingPopoverBody>
                </TeachingPopoverCarouselCard>
              </div>
            ))}

            <TeachingPopoverCarouselFooter
              next="Next"
              previous="Previous"
              initialStepText="Close"
              finalStepText="Finish"
            >
              <TeachingPopoverCarouselNav>
                {() => <TeachingPopoverCarouselNavButton />}
              </TeachingPopoverCarouselNav>
            </TeachingPopoverCarouselFooter>
          </TeachingPopoverCarousel>
        </TeachingPopoverSurface>
      </TeachingPopover>
      <Dialog modalType="modal" open={isOpenDialog}>
        <DialogSurface aria-describedby={undefined}>
          <DialogBody>
            <DialogTitle>Name this combo</DialogTitle>
            <DialogContent>
              <Field label="Name">
                <Input
                  type="text"
                  onChange={(event) => setTitleCombo(event.currentTarget.value)}
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  onClick={() => setIsOpenDialog(false)}
                  appearance="secondary"
                >
                  Close
                </Button>
              </DialogTrigger>
              <Button
                onClick={() => {
                  addToCookie({ name: titleCombo, moves: combo });
                  setIsOpenDialog(false);
                }}
                appearance="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
}

export default CardCombo;
