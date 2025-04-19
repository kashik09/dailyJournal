// Just a lil DRY practice session 💻✨ had to tidy things up—future me will thank me (I hope) hehe 💭
// All the CSS magic lives here now ✨ central command for the vibes 💅

const now = new Date();
const isValentine = now.getMonth() === 1 && now.getDate() >= 13 && now.getDate() <= 16;
const defaultTheme = isValentine ? "valentine" : "lofi";
// val vibes ✨

tailwind.config = {
  plugins: [window.daisyui],
  daisyui: {
    themes: [
      "lofi", "pastel", "retro", "valentine", "caramellatte",
      "wireframe", "silk", "dim",
      {
        black: {
          ...daisyui.themes["black"],
          "--rounded-box": "0.3rem",
          "--rounded-btn": "0.3rem",
          "--rounded-badge": "0.3rem",
        },
        // a lil personal touch to the corners 💖
      },
      "night", "synthwave"
    ],
    darkTheme: "black",
    base: true,
    styled: true,
    logs: false,
  },
};
