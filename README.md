# data-visual

``` JS
// Context API
class Provider<T> extends React.Component<{ value: T, children?: ReactNode }>{ }

class Consumer<T> extends React.Component<{ children: (value: T) => ReactNode }>{ }

interface Context<T> {
    Provider: { new(): Provider<T> };
    Consumer: { new(): Consumer<T> };
}

function createContext<T>(defaultValue?: T): Context<T>;
```