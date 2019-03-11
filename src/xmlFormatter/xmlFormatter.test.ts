import * as xmlFormatter from "./xmlFormatter";

const createTestFields = (objectName: string) => {
  return "<" + objectName + "_id>field1</" + objectName + "_id>"
    + "<field1>field1</field1>"
    + "<field2>field2</field2>"
    + "<nullField3/>"
    + "<nullField4/>"
    + "<field5>field5</field5>";
}

const createTestObject = (objectName: string) => {
  return "<" + objectName + ">"
    + createTestFields(objectName)
    + "</" + objectName + ">";
}

const createTestObjects = (objectName: string) => {
  return "<" + objectName + "s>"
    + createTestObject(objectName + "1")
    + createTestObject(objectName + "2")
    + "<" + objectName + ">" + objectName + " with no fields</" + objectName + ">"
    + "</" + objectName + "s>"
}

const indent = xmlFormatter.indentString;
const newLine = xmlFormatter.newLine;

export const testObjects1 = {
  testXml: "<object>"
    + createTestObjects("staff")
    + createTestObjects("customer")
    + createTestObjects("appointment")
    + "</object>",

  expectedOutput:
    "<object>" + newLine
    + indent.repeat(1) + "<staffs>" + newLine
    + indent.repeat(2) + "<staff1>" + newLine
    + indent.repeat(3) + "<staff1_id>field1</staff1_id>" + newLine
    + indent.repeat(3) + "<field1>field1</field1>" + newLine
    + indent.repeat(3) + "<field2>field2</field2>" + newLine
    + indent.repeat(3) + "<nullField3/>" + newLine
    + indent.repeat(3) + "<nullField4/>" + newLine
    + indent.repeat(3) + "<field5>field5</field5>" + newLine
    + indent.repeat(2) + "</staff1>" + newLine
    + indent.repeat(2) + "<staff2>" + newLine
    + indent.repeat(3) + "<staff2_id>field1</staff2_id>" + newLine
    + indent.repeat(3) + "<field1>field1</field1>" + newLine
    + indent.repeat(3) + "<field2>field2</field2>" + newLine
    + indent.repeat(3) + "<nullField3/>" + newLine
    + indent.repeat(3) + "<nullField4/>" + newLine
    + indent.repeat(3) + "<field5>field5</field5>" + newLine
    + indent.repeat(2) + "</staff2>" + newLine
    + indent.repeat(2) + "<staff>staff with no fields</staff>" + newLine
    + indent.repeat(1) + "</staffs>" + newLine
    + indent.repeat(1) + "<customers>" + newLine
    + indent.repeat(2) + "<customer1>" + newLine
    + indent.repeat(3) + "<customer1_id>field1</customer1_id>" + newLine
    + indent.repeat(3) + "<field1>field1</field1>" + newLine
    + indent.repeat(3) + "<field2>field2</field2>" + newLine
    + indent.repeat(3) + "<nullField3/>" + newLine
    + indent.repeat(3) + "<nullField4/>" + newLine
    + indent.repeat(3) + "<field5>field5</field5>" + newLine
    + indent.repeat(2) + "</customer1>" + newLine
    + indent.repeat(2) + "<customer2>" + newLine
    + indent.repeat(3) + "<customer2_id>field1</customer2_id>" + newLine
    + indent.repeat(3) + "<field1>field1</field1>" + newLine
    + indent.repeat(3) + "<field2>field2</field2>" + newLine
    + indent.repeat(3) + "<nullField3/>" + newLine
    + indent.repeat(3) + "<nullField4/>" + newLine
    + indent.repeat(3) + "<field5>field5</field5>" + newLine
    + indent.repeat(2) + "</customer2>" + newLine
    + indent.repeat(2) + "<customer>customer with no fields</customer>" + newLine
    + indent.repeat(1) + "</customers>" + newLine
    + indent.repeat(1) + "<appointments>" + newLine
    + indent.repeat(2) + "<appointment1>" + newLine
    + indent.repeat(3) + "<appointment1_id>field1</appointment1_id>" + newLine
    + indent.repeat(3) + "<field1>field1</field1>" + newLine
    + indent.repeat(3) + "<field2>field2</field2>" + newLine
    + indent.repeat(3) + "<nullField3/>" + newLine
    + indent.repeat(3) + "<nullField4/>" + newLine
    + indent.repeat(3) + "<field5>field5</field5>" + newLine
    + indent.repeat(2) + "</appointment1>" + newLine
    + indent.repeat(2) + "<appointment2>" + newLine
    + indent.repeat(3) + "<appointment2_id>field1</appointment2_id>" + newLine
    + indent.repeat(3) + "<field1>field1</field1>" + newLine
    + indent.repeat(3) + "<field2>field2</field2>" + newLine
    + indent.repeat(3) + "<nullField3/>" + newLine
    + indent.repeat(3) + "<nullField4/>" + newLine
    + indent.repeat(3) + "<field5>field5</field5>" + newLine
    + indent.repeat(2) + "</appointment2>" + newLine
    + indent.repeat(2) + "<appointment>appointment with no fields</appointment>" + newLine
    + indent.repeat(1) + "</appointments>" + newLine
    + "</object>",
}

it("should put all elements on their own line", () => {
  const output = xmlFormatter.parseElemntsToOwnLines(testObjects1.testXml);
  expect(output).toBe(testObjects1.expectedOutput.replace(new RegExp(indent, "g"), ""))
});

it("should remove whitespaces", () => {
  const testData = [
    "   test0   ",
    "   test1",
    "test2   "
  ];

  const output = xmlFormatter.removeWhiteSpace(testData);
  expect(output[0]).toMatch("test0");
  expect(output[1]).toMatch("test1");
  expect(output[2]).toMatch("test2");
});

it("should split elements", () => {
  const output = xmlFormatter.splitElements("<a><b></b></a>");
  expect(output.length).toBe(4);
  expect(output[0]).toMatch("<a>");
  expect(output[1]).toMatch("<b>");
  expect(output[2]).toMatch("</b>");
  expect(output[3]).toMatch("</a>");
});

it("should create string", () => {
  expect(xmlFormatter.createString(1) == "  ").toBe(true);
  expect(xmlFormatter.createString(2) == "    ").toBe(true);
  expect(xmlFormatter.createString(3) == "      ").toBe(true);
  expect(xmlFormatter.createString(4) == "        ").toBe(true);
})

it("should output xml should match expected xml", () => {
  const output = xmlFormatter.formatXmlString(testObjects1.testXml);
  expect(output).toMatch(testObjects1.expectedOutput);
});

it("should be able to handled pretty xml formatted", () => {
  const prettyFormat = xmlFormatter.formatXmlString(testObjects1.testXml);
  const output = xmlFormatter.formatXmlString(prettyFormat);
  expect(output).toMatch(testObjects1.expectedOutput);
});

it("should be able to handled pretty xml formatted many times", () => {
  let output = xmlFormatter.formatXmlString(testObjects1.testXml);
  for (let i = 0; i < 99; i++) {
    output = xmlFormatter.formatXmlString(output);
  }
  expect(output).toMatch(testObjects1.expectedOutput);
});

it("should parse xml with a header", () => {
  let header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
  const xmlWithHeader = header + newLine + testObjects1.testXml
  const expectedOutputWithHeader = header + newLine + testObjects1.expectedOutput
  const outputWithHeader = xmlFormatter.formatXmlString(xmlWithHeader);
  expect(outputWithHeader).toMatch(expectedOutputWithHeader);
});

it("should parse '<a></a>' to json", () => {
  const xml = "<a></a>";
  const xmlDOM = xmlFormatter.parseXmlStringToDocument(xml);

  const output = xmlFormatter.xmlToJson(xmlDOM);
  expect(JSON.stringify(output)).toMatch('{"a":{}}');
});

it("should parse '<a>test</a>' to json", () => {
  const xml = "<a>test</a>";
  const xmlDOM = xmlFormatter.parseXmlStringToDocument(xml);
  
  const output = xmlFormatter.xmlToJson(xmlDOM);
  expect(JSON.stringify(output)).toMatch('{"a":"test"}');
});

it("should parse xml with header to json", () => {
  const xmlDOM = xmlFormatter.parseXmlStringToDocument(testObjects1.testXml);
  const output = xmlFormatter.xmlToJson(xmlDOM);
  expect(output["object"]["staffs"]["staff1"]["staff1_id"]).toMatch("field1");
  expect(output["object"]["staffs"]["staff1"]["field2"]).toMatch("field2");

  const expected = '{"object":{"staffs":{"staff1":{"staff1_id":"field1","field1":"field1","field2":"field2","nullField3":{},"nullField4":{},"field5":"field5"},"staff2":{"staff2_id":"field1","field1":"field1","field2":"field2","nullField3":{},"nullField4":{},"field5":"field5"},"staff":"staff with no fields"},"customers":{"customer1":{"customer1_id":"field1","field1":"field1","field2":"field2","nullField3":{},"nullField4":{},"field5":"field5"},"customer2":{"customer2_id":"field1","field1":"field1","field2":"field2","nullField3":{},"nullField4":{},"field5":"field5"},"customer":"customer with no fields"},"appointments":{"appointment1":{"appointment1_id":"field1","field1":"field1","field2":"field2","nullField3":{},"nullField4":{},"field5":"field5"},"appointment2":{"appointment2_id":"field1","field1":"field1","field2":"field2","nullField3":{},"nullField4":{},"field5":"field5"},"appointment":"appointment with no fields"}}}';
  expect(JSON.stringify(output)).toMatch(expected);
});

it("should parse xml string to xml document, then back to string", () => {
  const xmlDOM = xmlFormatter.parseXmlStringToDocument(testObjects1.testXml);
  const output = xmlFormatter.xmlDocumentToString(xmlDOM);
});