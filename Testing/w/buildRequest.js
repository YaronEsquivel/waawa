const readFile = require('./readfiles');
const constants = require('./constants');

var methods = {
    createCsvVariables: function (schema){
        var variables = '';
        for(let p in schema.properties){
            if(variables !== ''){
                variables += ','
            }
    
            variables += p;
        }
    
        return variables;
    },

    createBody: function (request, schema){
        if(request.Body === '[Build]'){
            var body = '';
            for(let p in schema.properties){
                var propType = Reflect.get(schema.properties, p).type;
                if(body !== '') {
                    body += ',';
                }
    
                body += '\"'+ p + '\":${'+ p + '}';
                if(propType === 'string'){
                    body = body.replace('\":${'+ p + '}', '\":\"${'+ p + '}\"')
                }
            }
    
            return '{'+ body + '}';
        }
        else if(request.Body === '[UsePrev]'){
            return '${JSONResponse}';
        }
        else{
            return request.Body;
        }
    },
    
    replaceData: function (xmlFile, request){
        for (var key in request) {
            var times = 1;
            if(key === 'ApplicationJson'){
                times = 2;
            }
            for (let i = 0; i< times; i++){
                xmlFile = xmlFile.replace(`[${key}]`, Reflect.get(request, key))
            }
        }
    
        return xmlFile
    },

    createXMLString(xmlFile, request) {
        const textoBuscado = "</HTTPSamplerProxy>";
    
        const methodKey = request.Method.toUpperCase() + '_' + request.Authorization.toString();
    
        let xmlContent = constants.xmlMappings[methodKey];
    
        if (xmlFile.includes(textoBuscado)) {
            xmlFile = xmlFile.replace("</hashTree><ResultCollector", readFile.data.readFileSync(xmlContent, constants.fileEncoding) + "</hashTree><ResultCollector");
        } else {
            xmlFile = xmlFile.replace("</ThreadGroup>", `</ThreadGroup><hashTree>${readFile.data.readFileSync(xmlContent, constants.fileEncoding)}`);
        }
    
        return xmlFile;
    },
}

exports.data = methods;