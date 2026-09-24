export default function Home() {
  return (
    <div style={{ color: "red" }}>
      <span className="bg-blue-100 text-blue-700 text-xs font-bold rounded-full px-4 py-1">
        <span className="w-2 h-2 bg-orange-400 rounded-full inline-block mr-1"></span>
        TU CIUDAD, HOY
      </span>

      <p style={{ color: "red" }}>¿Buscas planes?</p>

      <p className="text-lg text-slate-600 max-w-md mt-2">
        Encuentra eventos espontáneos, actividades con amigos y nuevas
        experiencias cerca de ti.
      </p>

      <form
        action="/plans"
        style={{ color: "red" }}
        className="flex items-center bg-white rounded-full shadow-lg p-2 mt-10 w-full max-w-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 ml-3 text-blue-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <input
          type="text"
          name="search"
          style={{ color: "red" }}
          placeholder="Conciertos, cenas, escapadas..."
          className="flex-1 px-3 outline-none"
        />
        <button
          type="submit"
          style={{ color: "red" }}
          className="background"
        >
          Explorar →
        </button>
      </form>

      <p className="text-sm text-slate-600 mt-10">
        <span className="text-green-700">✓</span> Sin reservas complicadas ni
        ataduras
      </p>
    </div>
  );
}
