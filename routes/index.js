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
                        
	    	var HTTP_METHOD =[];
	    	var URL =[];
	    	var HTTP_VERSION =[];
	    	var ORIGIN_HEADER  =[];
	    	var SSL_CIPHER =[];
	    	var SSL_PROTOCOL =[];
	    	var Time_Stamp  =[];
	    	var LB_NAME =[];
	    	var CLIENT_IP_port =[];
	    	var BACKEND_IP_port =[];
	    	var Req_proce_time =[];
	    	var Bac_proce_time =[];
	    	var Res_proce_time =[];
	    	var Elb_status_code =[];
	    	var Backend_status_code =[];
	    	var Received_bytes =[];
	    	var Sent_bytes =[];

	    	for(var i=0;i<fileSplitData.length;i += 2)
	    	{
	    		var fileLineData  = fileSplitData[i].split(' ');

	    		if(fileSplitData[i].indexOf('MATLAB') >= 0)
	    		{
	    		   bool.push("Yes");
	    		}
	    		else
	    		{   
	    		   console.log(2);                
                   var ipAddressPort;
                   if(fileLineData.length === 17)
                   {
                   	 ipAddressPort = fileLineData[8];

                   	 var ipAddress = ipAddressPort.split(':');

                   	 var geo =  geoip.lookup(ipAddress[0]);
                   	 	if(geo.country  !== 'IN')
			             {
                            bool.push("Yes");
			             }
			             else
			             {
			             
                            bool.push("No");
			             }       
                        
                   }
                   else if(fileLineData.length === 18)
                   {
                   	 
                     ipAddressPort = fileLineData[9];

                     var geo =  geoip.lookup(ipAddress[0]);
                      	if(geo.country  !== 'IN')
			             {
                            bool.push("Yes");
			             }
			             else
			             {
                            bool.push("No");
			             }
			             console.log(geo);                      
			             
                   }                  
                   

	    		}

	    		if(fileLineData.length === 17)
	    		{
	    			 HTTP_METHOD.push(fileLineData[0]);
			    	 URL.push(fileLineData[1]);
			    	 HTTP_VERSION.push(fileLineData[2]);
			    	 ORIGIN_HEADER.push(fileLineData[3]);
			    	 SSL_CIPHER.push(fileLineData[4]);
			    	 SSL_PROTOCOL.push(fileLineData[5]);
			    	 Time_Stamp.push(fileLineData[6]);
			    	 LB_NAME.push(fileLineData[7]);
			    	 CLIENT_IP_port.push(fileLineData[8]);
			    	 BACKEND_IP_port.push(fileLineData[9]);
			    	 Req_proce_time.push(fileLineData[10]);
			    	 Bac_proce_time.push(fileLineData[11]);
			    	 Res_proce_time.push(fileLineData[12]);
			    	 Elb_status_code.push(fileLineData[13]);
			    	 Backend_status_code.push(fileLineData[14]);
			    	 Received_bytes.push(fileLineData[15]);
			    	 Sent_bytes.push(fileLineData[16]);
	    		}
	    		else
	    		{
	    			 HTTP_METHOD.push(fileLineData[0]);
			    	 URL.push(fileLineData[1]);
			    	 HTTP_VERSION.push(fileLineData[2]);
			    	 var combineheader = fileLineData[3]+fileLineData[4];
			    	 ORIGIN_HEADER.push(combineheader)
			    	 SSL_CIPHER.push(fileLineData[5]);
			    	 SSL_PROTOCOL.push(fileLineData[6]);
			    	 Time_Stamp.push(fileLineData[7]);
			    	 LB_NAME.push(fileLineData[8]);
			    	 CLIENT_IP_port.push(fileLineData[9]);
			    	 BACKEND_IP_port.push(fileLineData[10]);
			    	 Req_proce_time.push(fileLineData[11]);
			    	 Bac_proce_time.push(fileLineData[12]);
			    	 Res_proce_time.push(fileLineData[13]);
			    	 Elb_status_code.push(fileLineData[14]);
			    	 Backend_status_code.push(fileLineData[15]);
			    	 Received_bytes.push(fileLineData[16]);
			    	 Sent_bytes.push(fileLineData[17]);

	    		}

	    	}

	    	res.render('dashboard', { bool: bool,HTTP_METHOD :HTTP_METHOD,URL:URL,HTTP_VERSION:HTTP_VERSION,ORIGIN_HEADER:ORIGIN_HEADER,
	    	                         SSL_CIPHER:SSL_CIPHER,SSL_PROTOCOL:SSL_PROTOCOL,Time_Stamp:Time_Stamp,LB_NAME:LB_NAME,
	    	                         CLIENT_IP_port:CLIENT_IP_port,BACKEND_IP_port:BACKEND_IP_port,Req_proce_time:Req_proce_time,
	    	                         Bac_proce_time:Bac_proce_time,Res_proce_time:Res_proce_time,Elb_status_code:Elb_status_code,
	    	                         Backend_status_code:Backend_status_code,Received_bytes:Received_bytes,Sent_bytes:Sent_bytes});
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
