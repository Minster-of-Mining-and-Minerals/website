const http = require('http');

const requestOTP = (email) => {
  const data = JSON.stringify({ email });
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/request-otp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: JSON.parse(body) });
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
};

const runTests = async () => {
  console.log("=== Testing Password Reset Request ===\n");

  try {
    console.log("1. Testing Admin Reset Request (admin@gmail.com)");
    const adminRes = await requestOTP('admin@gmail.com');
    console.log(`Status: ${adminRes.status}`);
    console.log(`Response:`, adminRes.body);
    console.log("Expected: OTP should be sent to momsystemsupport@gmail.com only.\n");

    console.log("2. Testing Normal User Reset Request (normal@gmail.com)");
    const normalRes = await requestOTP('normal@gmail.com');
    console.log(`Status: ${normalRes.status}`);
    console.log(`Response:`, normalRes.body);
    console.log("Expected: OTP should be sent to normal user's email if it exists.\n");

    console.log("3. Testing Rate Limiting (admin@gmail.com x 5 requests)");
    for(let i=0; i<6; i++) {
        console.log(`Attempt ${i+1}`);
        const rateLimitRes = await requestOTP('admin@gmail.com');
        console.log(`Status: ${rateLimitRes.status}, Message: ${rateLimitRes.body.message}`);
        if(rateLimitRes.status === 429) {
            console.log("Rate limiting successfully triggered!\n");
            break;
        }
    }
  } catch (error) {
    console.error("Test error:", error);
  }
};

runTests();
