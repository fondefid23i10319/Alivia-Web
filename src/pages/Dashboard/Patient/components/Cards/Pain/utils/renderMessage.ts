const increase = {
  content: "Tú dolor ha empeorado",
  textColor: "#F9052B",
  bgColor: "#F9052B33",
};

const keeps = {
  content: "Tú dolor se ha mantenido",
  textColor: "#A65F00",
  bgColor: "#FEFCE8",
};

const decrease = {
  content: "Tú dolor ha mejorado",
  textColor: "#4476B5",
  bgColor: "#EFF6FF",
};

function renderMessage(currentValue: number, previousValue: number) {
  if (currentValue < previousValue) {
    return decrease;
  } else if (currentValue === previousValue) {
    return keeps;
  } else return increase;
}

export default renderMessage;
