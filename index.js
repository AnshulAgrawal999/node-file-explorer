
const http = require( 'http' )  ;

const fs = require( 'fs' )  ;

const path = require( 'path' )  ;

let flag = true  ;

const server = http.createServer( ( req , res ) => {

  res.setHeader("Content-type", "text/html")  ;

  if( flag )
  {
    const root = fs.readdirSync( '/' , "utf-8")  ;

    let filesToShow = "<ul>"  ;
        
        root.forEach( el => {
         
          filesToShow += `<li><a href="${el}">${'&#128193'}${el}</a></li>`  ;
        });

    filesToShow += "</ul>"  ;

    flag = false  ;
    
    res.end(filesToShow)  ;
  }
  else
  {
    fs.stat( req.url , (err, stats) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" })  ;
        res.end("404 Not Found");
      } 
      else 
      {
        if (stats.isDirectory()) 
        {
          res.setHeader("Content-type", "text/html")  ;
  
          const files = fs.readdirSync( req.url , "utf-8")  ;
  
          let filesToShow = "<ul>"  ;
          
          files.forEach((el) => {

            const itemPath = path.join( req.url , el )  ;

            const itemStats = fs.statSync( path.join( req.url , el ) )  ;

            const isDirectory = itemStats.isDirectory()  ;

            const unicodeIcon = isDirectory ? "&#128193;" : "&#128196;"  ;

            filesToShow += `<li><a href="${itemPath}">${unicodeIcon}${el}</a></li>`  ;
            
          });
  
          filesToShow += "</ul>"  ;

          res.end( filesToShow )  ;
        } 
        else 
        {
          const data = fs.readFileSync( req.url )  ;
          res.end( data )  ;
        }
      }
    });
  }

} )  ;


server.listen( 4000, ()=>{
    console.log( "server is running on http://localhost:4000" )  ;
})
