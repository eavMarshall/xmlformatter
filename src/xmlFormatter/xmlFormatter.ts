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

export const formatXmlString = (xmlString: string): string => {
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

const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

export const xmlToJson = (xml: Element) => {
  let obj: any = {};

	if (xml.nodeType == ELEMENT_TYPE) {
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
        let attribute = xml.attributes.item(j);
        if (attribute != null) {
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
			}
		}
	} else if (xml.nodeType == TEXT_TYPE) {
		obj = xml.nodeValue;
	}

	if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
		obj = xml.childNodes[0].nodeValue;
	}
	else if (xml.hasChildNodes()) {
		for(let i = 0; i < xml.childNodes.length; i++) {
			let item = <Element> xml.childNodes.item(i);
			let nodeName = item.nodeName;
			if (typeof obj[nodeName] == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof obj[nodeName].push == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

export const parseXmlStringToDocument = (xmlString: string) => {
  return <Element> new DOMParser().parseFromString(xmlString, "text/xml").getRootNode();
}

export const xmlDocumentToString = (xmlDocument: Element) => {
  return new XMLSerializer().serializeToString(xmlDocument);
}