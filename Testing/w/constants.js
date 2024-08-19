module.exports = {
 fileXmlInput :"./resources/jmeterResources/XmlInputs/TemplateBase.xml",
 fileDataInput : "./resources/input.txt",
 fileXmlOutput : "./resources/jmeterResources/requestBuild",
 fileEncoding : "utf8",
 fileCsv : './resources/entities.csv',
 jsonSchema : './jsonSchema',
 excelfile : './resources/DataPool.xlsx',
 jmeterProperties: './resources/jmeterResources/properties/myjmeter.properties',
 xmlResultsOutput: './outputLogs/testresults.xml',
 jmeterLogOutput: './outputLogs/jmeterLog.log', 
 sheet : 'Data',
 fileXmlInputCsv :"./resources/jmeterResources/XmlInputs/TemplateBaseCsv.xml",
 dictFields: {
    "Body":"TextNullable",
    "Host": "TextNoNull",
    "Port": "Number",
    "Protocol": "TextNoNull",
    "Path":"TextNoNull",
    "Method":"TextNoNull",
    "Content":"TextNoNull",
    "Accept":"TextNoNull",
    "ApplicationJson": "TextNoNull",
    "Authorization": "TextNoNull",
    "Jwt": "TextNullable"
},
xmlMappings : {
    "GET_true": "./resources/jmeterResources/XmlInputs/PartsTemplate/BearerAuthGetPart.xml",
    "GET_false": "./resources/jmeterResources/XmlInputs/PartsTemplate/GetPart.xml",
    "POST_true": "./resources/jmeterResources/XmlInputs/PartsTemplate/BearerAuthPostPart.xml",
    "POST_false": "./resources/jmeterResources/XmlInputs/PartsTemplate/PostPart.xml",
    "POST_auth": "./resources/jmeterResources/XmlInputs/PartsTemplate/AuthPostPart.xml"
}
}