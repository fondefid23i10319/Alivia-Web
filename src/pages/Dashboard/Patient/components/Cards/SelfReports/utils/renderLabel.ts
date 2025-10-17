const good = {
  text: "Ánimo",
  color: "#F9052B",
  bgColor: "#F9052B33",
};

const veryGood = {
  text: "Muy bien",
  color: "#A65F00",
  bgColor: "#FEFCE8",
};

const excelent = {
  text: "Excelente",
  color: "#A65F00",
  bgColor: "#FEFCE8",
};

interface LabelProps {
  text: string;
  color: string;
  bgColor: string;
}

function renderLabel(value: number): LabelProps {
  if (0 <= value && value < 30) {
    return good;
  } else if (30 < value && value < 60) {
    return veryGood;
  } else return excelent;
}

export default renderLabel;
