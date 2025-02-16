import * as anchor from "@project-serum/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import * as fs from "fs";

// 1️⃣ Set up Solana connection
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// 2️⃣ Load wallet keypair
const secretKey = Uint8Array.from([
  186, 11, 49, 252, 132, 206, 43, 31, 207, 63, 214, 113, 3, 209, 63, 184,
  188, 92, 151, 45, 15, 144, 9, 27, 55, 217, 200, 120, 162, 56, 68, 205, 201,
  149, 225, 250, 13, 241, 197, 73, 236, 137, 197, 81, 164, 215, 87, 241, 118,
  250, 136, 73, 17, 232, 177, 149, 57, 70, 147, 80, 223, 164, 94, 25
]);
const wallet = Keypair.fromSecretKey(secretKey);
console.log("Wallet Public Key:", wallet.publicKey.toBase58());

// 3️⃣ Set up Anchor provider
const provider = new anchor.AnchorProvider(connection, new anchor.Wallet(wallet), {
  preflightCommitment: "processed",
});
anchor.setProvider(provider);

// 4️⃣ Load IDL from the generated file
const idl = JSON.parse(fs.readFileSync("src/idl.json", "utf8"));

// 5️⃣ Define the Program ID (from your Rust contract)
const PROGRAM_ID = new PublicKey("G29Rx14JfyvSXoYxzm9ttKNugFiSVRWYHGXnor4GTA15");

// 6️⃣ Load the program using the correct IDL
const program = new anchor.Program(idl, PROGRAM_ID, provider);

async function callHello() {
  console.log("Calling the `hello` function...");

  // 7️⃣ Call the "hello" instruction
  const tx = await program.methods.hello().rpc();

  console.log("Transaction Signature:", tx);
}

// you can run solana confirm -v <tx signature> to see the transaction details and logs

callHello().catch(console.error);