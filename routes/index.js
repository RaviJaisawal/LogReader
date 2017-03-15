var express = require('express');
var router = express.Router();
var multer  = require('multer');
var upload = multer();
var geoip = require('geoip-lite');



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Faasos' });
});

router.post('/dashboard',upload.single('dashboard'), function(req, res, next) {
  console.log('Inside post requets');
   if(req.file)
   {
  	    var fileData = req.file.buffer.toString('utf-8');
	    if(fileData)
	    {
	    	var fileSplitData = fileData.split("\n");
	    	var bool=[];       
                        
	    	var DataArray=[];

	    	for(var i=0;i<fileSplitData.length;i += 2)
	    	{
	    		var fileLineData  = fileSplitData[i].split(' ');
                var ipAddressPort;
                console.log(fileSplitData[i]);
                DataArray.push(fileSplitData[i]);
	    		

	    		if(fileLineData.length === 17)
	    		{
				    				    	
			    	    var ipAddress = fileLineData[8];
                   	    var ipAddress = ipAddressPort.split(':');

                        var strHeader = fileLineData[3].replace("\"","");
                   	     var geo =  geoip.lookup(ipAddress[0]);
                   	 	 if(geo.country  !== 'IN')
			             {
                            bool.push("Yes");
			             }
			             else if(strHeader==='MATLAB')
					    	{
					    		bool.push("Yes");
					    	}
			             else
			             {
			             
                            bool.push("No");
			             }			    	
	    		}
	    		else
	    		{
	    			
				    	ipAddressPort = fileLineData[9];
				    	var ipAddress = ipAddressPort.split(':');
				    	var strHeader = fileLineData[3].replace("\"","");
                     
                   	    var geo =  geoip.lookup(ipAddress[0]);
                   	 	if(geo.country  !== 'IN')
			             {
                            bool.push("Yes");
			             }
			             else if(strHeader ==='MATLAB')
				    	{
				    		bool.push("Yes");
				    	}
			             else
			             {
			             
                            bool.push("No");
			             }	

	    		}

	    	}

	    	res.render('dashboard', { bool: bool,DataArray:DataArray});
	    }
	    else
	    {
	    	res.send('File is Empty');
	    }  
	}
	else
	{
       res.send('Please uplaod the File');
	}

  
});

module.exports = router;
