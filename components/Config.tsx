import { useConfig, type Config } from './ConfigContext';

function Config() {
  const { config, setConfig } = useConfig();

  return (
    <form className="w-full max-w-sm gap-3 border dark:border-zinc-700 md:ml-5">
      <h2 className="mb-2 border-b bg-zinc-100 py-2 px-3 text-sm font-bold uppercase text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
        Config
      </h2>

      <div className="flex flex-col gap-5 p-2">
        <label htmlFor="apiKey">
          <p className="mb-1 block font-semibold">OpenAI API key</p>
          <input
            id="apiKey"
            type="text"
            className="w-full border px-2 py-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
            value={config.apiKey}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
          />
        </label>

        <label htmlFor="model">
          <p className="mb-1 block font-bold">Model</p>
          <select
            id="model"
            className="w-full border px-2 py-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
            value={config.model}
            onChange={(e) => setConfig({ ...config, model: e.target.value })}
          >
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            {/* <option value="text-davinci-003">text-davinci-003</option> */}
          </select>
        </label>
      </div>
    </form>
  );
}

export default Config;
