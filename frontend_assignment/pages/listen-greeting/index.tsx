import Greeter from "artifacts/contracts/Greeters.sol/Greeters.json";
import { Contract, providers, utils } from "ethers";
import React from "react";
import styles from "../../styles/Home.module.css";

export default function ListenGreeting() {
  const [logs, setLogs] = React.useState("");
  React.useEffect(() => {
    const provider = new providers.WebSocketProvider("ws://localhost:8545");
    const contract = new Contract(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      Greeter.abi,
      provider
    );
    contract.on("NewGreeting", (message) => {
      const parsedMessage = utils.parseBytes32String(message);
      setLogs(`Lastest NewGreeting message: "${parsedMessage}"`);
    });
  }, []);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Listen Greeting</h1>

        <p className={styles.description}>
          Displays NewGreeting events emitted by the Greeters contract
        </p>
        <div className={styles.logs}>{logs}</div>
      </main>
    </div>
  );
}
