const request = require("request"),
    logger = require('./logger');
    
    const performance = require('perf_hooks').performance;
// utility function for http request
function invokeService(identifier, trackerURL, method, jsonData, keyId, keySecret, isSkip, timeout, isForm){
	let options = {
		url: trackerURL,
		method: method,
		headers: {
			'User-Agent': 'request',
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		timeout: timeout || 5000
	}

	if(isForm){
        options.headers["Content-Type"]='application/x-www-form-urlencoded';
        options.body= jsonData ;
    }
	else if(jsonData != null) options.json = jsonData;
	
	if(keyId != null) options.headers["x-ibm-client-id"] = keyId;
	if(keySecret != null) options.headers["x-ibm-client-secret"] = keySecret;
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	return new Promise(async function(resolve, reject) {
    	if(!isSkip){
			// Do async job
			// logger.debug("["+identifier+"]INVOKING REQUEST: "+trackerURL+" ::: method: "+method+(jsonData==null?"":" ::: body: "+JSON.stringify(jsonData)));
			await request(options, function(err, resp, body) {
				try{
					// logger.debug("["+identifier+"]INVOKE RESPONSE: "+trackerURL+" ::: Resp: "+resp+" ::: error: "+err+" ::: body: "+JSON.stringify(body));
					if (err || resp.statusCode < 200 || resp.statusCode > 299) {
						reject(err);
					} else if(body.statusCode != null && (body.statusCode<200 || body.statusCode>299)){
						reject(body.status);						
					} else {
						resolve(body);
					}
				}catch(err){
					logger.error("["+identifier+"]"+err);
					reject(err);
				}
			})
		}else{
			resolve("SKIPPED");
		}
	})
}
async function hitBC(i){
    let t0 = performance.now();
    try {
            let x = await invokeService(i,"http://localhost:3000/person/1","GET","","","",0,5000,0);
    } catch (error) {
        
    }

    let t1 = performance.now();
    logger.debug('PerfLog, checkTokenBc, ROUTINES, '+(t1-t0)+' milliseconds.');
    // console.log(x+"result "+i+" Finish");
}

async function main(){
    for (let index = 0; index < 10; index++) {
    hitBC(index);
    await sleep(10)
    }
}

main();

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}