const jose = require("jose");

(async () => {
    const secret = new TextEncoder().encode("cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2");
    const alg = "HS256";

    const jwt = await new jose.SignJWT({}).sign(secret);

    console.log(await jose.jwtVerify(jwt, secret));
})();
