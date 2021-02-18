# To Run Test
npm run test

# To run application in DEV mode
npm run start:dev

# To make the build
npm run build

# To build and start
npm run start 


# After running the application please hit below url for the results
http://localhost:8000/report

# Generating the result in below JSON format:

{
"error":null,
"data":
{
"jsonData":
          {
          "total_rows":51,
          "file_size":3441,
          "header":[name,age,country],
          "values":[
            ["Rahul","28","india"],
            ["Rohit",31,"India"],
            ["Gaurav",34,"India"]
           ]
          },

"htmlData":"<Result in HTML format>"
}
}




