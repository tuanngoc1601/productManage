import { Fireworks } from "@fireworks-js/react";
const FireWork = () => {
  return (
    <div className="w-screen h-screen bg-black">
      <Fireworks
        options={{
          rocketsPoint: {
            min: 0,
            max: 100,
          },
          lineWidth: {
            min: 2.5,
            mã: 5,
          },
          acceleration: 1,
          intensity: 5,
          speed: 0.5,
          friction: 0.99, // Độ dài tia sáng
          opacity: 0.5, // Độ mờ
          particles: 120, // Độ rộng chùm nổ
          mouse: {
            max: 100,
            // move: true,
            click: true,
          },
          sound: {
            enabled: true,
            files: [
              "https://www.freesoundslibrary.com/wp-content/uploads/2022/01/firework-sound.mp3",
              "https://assets.mixkit.co/sfx/preview/mixkit-fireworks-bang-in-sky-2989.mp3",
            ],
            volume: {
              min: 4,
              max: 8,
            },
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          background: "#000",
        }}
      />
    </div>
  );
};

export default FireWork;
