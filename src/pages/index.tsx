import { Button } from "components/Button";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const onClick = (_id: string) => {
    if (!_id) return;
    console.log("_id", _id);
  };

  return (
    <main>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center mb-2">
          Which subject is more relevant?
        </div>

        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <Button onClick={() => onClick("1")}>1</Button>
          <span className="p-8">vs</span>
          <Button onClick={() => onClick("2")}>2</Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
