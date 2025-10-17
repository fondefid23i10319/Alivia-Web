const low = {
  text: "Negativo",
  color: "#F9052B",
  bgColor: "#F9052B33",
};

const medium = {
  text: "Medio",
  color: "#A65F00",
  bgColor: "#FEFCE8",
};

const hight = {
  text: "Medio",
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
    return low;
  } else if (30 < value && value < 60) {
    return medium;
  } else return hight;
}

export default renderLabel;
