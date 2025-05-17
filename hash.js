import crypto from "crypto";

/* const text = "Test";
const text2 = "Test";

Comprueba que ingresando el mismo texto se genera el mismo hash.
const hash1 = crypto.createHash('sha256').update(text).digest('hex');
const hash2 = crypto.createHash('sha256').update(text2).digest('hex');

console.log('Hash 1:', hash1);
console.log('Hash 2:', hash2);

odifica ligeramente el texto y mira cuanto cambia el hash.
const text3 = "test";
const hash3 = crypto.createHash('sha256').update(text3).digest('hex');

console.log('Hash 3:', hash3);

Hash "Test": 532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25
Hash "test": 9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08 */


const iters = 100_000;
const longitud = 64;
const digest = "md5";
const saltbytes = 8;

export function hashPassword(password) {
  const salt = crypto.randomBytes(saltbytes).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, iters, longitud, digest).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, originalHash] = stored.split(":");
  const hash = crypto
    .pbkdf2Sync(password, salt, iters, longitud, digest)
    .toString("hex");

  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
}