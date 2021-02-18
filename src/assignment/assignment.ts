
/* Reading below format of JSON Object from CSV file

{
    'No;Country;Level of development;European Union Membership;Currency;Women Entrepreneurship Index;Entrepreneurship Index;Inflation rate;Female Labor Force Participation Rate': '10;China;Developing;Not Member;National Currency;38.3;36.4;1.4;62.4'
}
*/

async function getCSVData(filePath: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const csv = require('csv-parser')
        const fs = require('fs')
        var headers: any = [];
        var values: any = [];

        fs.createReadStream(filePath).pipe(csv()).on('data', async function (data: any) {
            Object.keys(data).forEach(function (keyHeader) {
                if (headers.length == 0) {
                    headers = keyHeader.split(";");
                } else {
                    if (data[keyHeader] != undefined) {
                        var value = data[keyHeader].split(";");
                        var rowValue = [];
                        for (var i = 0; i < value.length; i++) {
                            rowValue.push(value[i])
                        }
                        values.push(rowValue);
                    }
                }
            })
        }).on('end', async () => {
            var stats = fs.statSync(filePath)
            var fileSizeInBytes = stats.size;
            var result = {
                jsonData: await generateJson(headers, values, fileSizeInBytes),
                htmlData: await generateHtml(headers, values, fileSizeInBytes)
            }
            resolve(result)
        });
    });
}

async function generateHtml(headers: any, values: any, fileSizeInBytes: any) {

    return new Promise((resolve,reject) => {
        var htmlHeader = "";
        var htmlRows = "";
        for (var i = 0; i < headers.length; i++) {
            htmlHeader += "<th>" + headers[i] + "</th>"
        }

        for (var i = 0; i < values.length; i++) {
            var valueRow = "<tr>";
            for (var j = 0; j < values[i].length; j++) {
                valueRow += "<td>" + values[i][j] + "</td>"
            }
            htmlRows += valueRow + "</tr>"
        }

        var table = "<table style='text-align: center;'>" + htmlHeader + htmlRows + "</table>";
        var finalHtml = '<div> <p> <strong>File Size : </strong>' + fileSizeInBytes + 
        ' bytes </p> <p> <strong> No of Rows including Header : </strong>' + (values.length + 1) + '<p>' + '<div>' + table + '<div>';
        resolve(finalHtml)
      
    });
}
async function generateJson(headers: any, values: any, fileSizeInBytes: any) {
    return new Promise((resolve,reject) => {
        const result = {
            "total_rows": (values.length + 1),
            "file_size": fileSizeInBytes,
            "header": headers,
            "values": values
        }
        resolve(result)
    });
}

export default { getCSVData }
