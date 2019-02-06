export const newLine = "\r\n";
export const indentString = "  ";

export const parseElemntsToOwnLines = (xmlString: string): string => {
  return xmlString.replace(/(>)(<)(\/*)/g, "$1\r\n$2$3");
}

export const removeWhiteSpace = (arrayOfStrings: string[]): string[] => {
  for (let i = 0; i < arrayOfStrings.length; i++) {
    arrayOfStrings[i] = arrayOfStrings[i].trim();
  }

  return arrayOfStrings;
}

export const splitElements = (xmlString: string): string[] => {
  let splitElements = parseElemntsToOwnLines(xmlString).split(newLine);

  return removeWhiteSpace(splitElements);
}

export const createString = (length: number) => {
  return indentString.repeat(length);
}

export const formatString = (xmlString: string): string => {
  let outputString = "";
  let currentPadding = 0;
  let elementArray = splitElements(xmlString);

  for (let index = 0; index < elementArray.length; index++) {
    let indent = 0;

    if (elementArray[index].match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (elementArray[index].match(/^<\/\w/)) {
      currentPadding -= 1;
    } else if (elementArray[index].match(/^<\w[^>]*[^\/]>.*$/)) {
      indent = 1;
    }

    outputString += createString(currentPadding) + elementArray[index] + newLine;
    currentPadding += indent;
  }

  return outputString.trim();
}