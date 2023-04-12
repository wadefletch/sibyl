import { useConfig, type Config } from './ConfigContext';

function Config() {
  const { config, setConfig, lastSaved } = useConfig();

  return (
    <form className="flex w-full max-w-sm flex-col border dark:border-zinc-700 md:ml-5">
      <h2 className="border-b bg-zinc-100 py-2 px-3 text-sm font-bold uppercase text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
        Config
      </h2>

      <label
        htmlFor="apiKey"
        className="space-y-2 border-b p-3 dark:border-zinc-600"
      >
        <p className="block font-semibold">OpenAI API key</p>
        <p className="text-xs dark:text-zinc-300">
          You can find your API key in the{' '}
          <a
            href="https://platform.openai.com/account/api-keys"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            OpenAI Dashboard
          </a>
          .
        </p>
        <input
          id="apiKey"
          type="text"
          className="w-full border px-2 py-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          value={config.apiKey}
          onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
        />
      </label>

      <label htmlFor="model" className="m-3 space-y-2">
        <p className="block font-bold">Model</p>
        <p className="text-xs dark:text-zinc-300">
          The model to use for chat completions. Find available models in the{' '}
          <a
            href="https://platform.openai.com/docs/models/model-endpoint-compatibility"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            OpenAI Docs
          </a>
          . All models may not be available for your account.
        </p>
        <select
          id="model"
          className="w-full border px-2 py-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          value={config.model}
          onChange={(e) => setConfig({ ...config, model: e.target.value })}
        >
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-4">gpt-4</option>
        </select>
      </label>

      <label htmlFor="temperature" className="m-3 space-y-2">
        <p className="block font-bold">Temperature</p>
        <p className="text-xs dark:text-zinc-300">
          The temperature controls the randomness of the model. Lower values
          result in less random completions. As the temperature approaches zero,
          the model will become repetitive.
        </p>
        <input
          id="temperature"
          type="number"
          className="w-full border px-2 py-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          value={config.temperature}
          onChange={(e) =>
            setConfig({ ...config, temperature: Number(e.target.value) })
          }
        />
      </label>

      <label htmlFor="maxTokens" className="m-3 space-y-2">
        <p className="block font-bold">Max tokens</p>
        <p className="text-xs dark:text-zinc-300">
          The maximum number of tokens to generate. The API will stop generating
          tokens when it reaches this number or when it reaches the end of its
          response, whichever comes first.
        </p>
        <input
          id="maxTokens"
          type="number"
          className="w-full border px-2 py-1 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
          value={config.maxTokens}
          onChange={(e) =>
            setConfig({ ...config, maxTokens: Number(e.target.value) })
          }
        />
      </label>

      <div className="flex-1" />

      <div className="flex justify-between border-t p-3 text-sm text-zinc-400 dark:border-zinc-600">
        <p className="font-semibold uppercase">Last Saved</p>
        <p>{lastSaved?.toLocaleString()}</p>
      </div>
    </form>
  );
}

export default Config;
