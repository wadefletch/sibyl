import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

const LOCALSTORAGE_CONFIG_NAME = 'sibyl-config';

export type Config = {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
};

type ConfigContext = {
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
  lastSaved: Date | null;
};

const initialConfig: Config = {
  apiKey: '',
  model: 'gpt-3.5-turbo',
  temperature: 0.9,
  maxTokens: 500,
};

function loadConfig() {
  if (typeof window !== 'undefined') {
    const localStorageConfig = JSON.parse(
      window.localStorage.getItem(LOCALSTORAGE_CONFIG_NAME) || '{}'
    );

    if (Object.keys(localStorageConfig).length > 0) {
      return localStorageConfig;
    }
  }

  return initialConfig;
}

const ConfigContext = createContext<ConfigContext>({
  config: initialConfig,
  setConfig: () => {},
  lastSaved: null,
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState(loadConfig());
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_CONFIG_NAME, JSON.stringify(config));
    setLastSaved(new Date());
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, setConfig, lastSaved }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
