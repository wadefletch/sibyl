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
};

type ConfigContext = {
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
};

const initialConfig: Config = {
  apiKey: '',
  model: 'gpt-3.5-turbo',
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
});

interface ConfigProviderProps {
  children: React.ReactNode;
}

export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState(loadConfig());

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_CONFIG_NAME, JSON.stringify(config));
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
