const http = require('http');

const options = {
  host: '106.ihuyi.com',
  headers:{
    refer:'106.ihuyi.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3514.0 Safari/537.36'
  },
  path: encodeURI(`/webservice/sms.php?method=Submit&account=C52667758&password=4157776d6d21dddf74efacc0e650312c&mobile=15550918652&content=1111您的验证码是：1111。请不要把验证码泄露给其他人。`)
};

const req = http.request(options,res=>{
    
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    var body = ''
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        console.log(body)
        
        console.log(  'code',body.match(/\<code\>(\S+)\<\/code\>/m)[1] )
        console.log('msg',body.match(/\<msg\>(\S+)\<\/msg\>/)[1])

    });
})
req.on('error',(err)=>{
    console.log(err)
})
req.end();