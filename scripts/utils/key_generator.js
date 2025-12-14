function generateSymbol () {
  const num = Math.random()
  let lastNum = 0.016
  
  if (num < lastNum){
    return 'a';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'b';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'c';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'd';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'e';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'f';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'g';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'h';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'i';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'j';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'k';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'l';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'm';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'n';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'o';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'p';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'q';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'r';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 's';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 't';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'u';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'v';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'w';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'x';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'y';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'z';
  } else {lastNum += 0.016};

  if (num < lastNum){
    return 'A';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'B';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'C';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'D';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'E';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'F';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'G';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'H';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'I';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'J';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'K';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'L';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'M';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'N';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'O';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'P';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'Q';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'R';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'S';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'T';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'U';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'V';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'W';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'X';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'Y';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return 'Z';
  } else {lastNum += 0.016};

  if (num < lastNum){
    return '0';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '1';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '2';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '3';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '4';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '5';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '6';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '7';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '8';
  } else {lastNum += 0.016};
  if (num < lastNum){
    return '9';
  } else {lastNum = 1};

  if (lastNum === 1){
    return generateSymbol();
  };
};

export default function generateKey (length = 10, equals = 5) {
  let symbolsQuantity = Math.round(length);
  const symbols = [];
  let keyString = '';

  while (symbolsQuantity !== 0){
    symbolsQuantity --;
    symbols.push(String(generateSymbol()));
  };

  console.log(symbols);

  let symbolCount = 0;
  let lastSymbol = 0;
  let symbolsString = '';
  symbols.forEach(v => {
    const symbol = v;

    symbolsString += symbol;
    symbolCount ++;
    lastSymbol ++;

    if (symbolCount === Math.round(length/equals)){
      if (lastSymbol === length){
        keyString += symbolsString;
        symbolsString = '';
        symbolCount = 0;
      } else {
        symbolsString += '-';
        keyString += symbolsString;
        symbolsString = '';
        symbolCount = 0;
      };   
    };

    if (length < 4, lastSymbol === length){
      keyString += symbolsString;
      symbolsString = '';
      symbolCount = 0;
    }
  });

  return keyString;
};